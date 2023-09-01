import React,{useEffect} from "react";
import {StyleSheet,Text,View,FlatList,Button,TouchableOpacity,} from "react-native";
import { useBlogContext } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../App";

type IndexScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Index"
>;

type Props = {
  navigation: IndexScreenNavigationProp;
};

const IndexScreen: React.FC<Props> = ({ navigation }) => {
  const { state, actions } = useBlogContext();
  

  
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Create")}>
          <Feather name="plus" size={30} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  useEffect(() => {
    const focusListener = navigation.addListener('focus', () => {
      actions.getBlogPosts();
    });
  
    return () => {
      focusListener();
    };
  }, []);
  
  

  
  console.log(state.blogPosts)
  return (
    <View>
      <Button title="ADD POST"  />
      <FlatList
        data={state.blogPosts}
        keyExtractor={(blogPost) => blogPost.id.toString()}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate("Show", { id: item.id })}>
              <View style={styles.row}>
                <Text style={styles.title}>
                  {item.title}-{item.id}
                </Text>
                <TouchableOpacity
                  onPress={() => actions.deleteBlogPost(item.id)}>
                  <Feather style={styles.icon} name="trash" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    borderTopWidth: 1,
    paddingHorizontal: 10,
    borderColor: "grey",
  },
  title: {
    fontSize: 18,
  },
  icon: {
    fontSize: 24,
  },
});

export default IndexScreen;
