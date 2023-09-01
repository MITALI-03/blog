import React from 'react';
import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useBlogContext } from '../context/BlogContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { EvilIcons } from "@expo/vector-icons";

  
type ShowScreenRouteProp = RouteProp<RootStackParamList, 'Show'>;
type ShowScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Show'>;

type Props = {
  route: ShowScreenRouteProp;
  navigation: ShowScreenNavigationProp;
};

const ShowScreen: React.FC<Props> = ({ route ,navigation}) => {

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Edit",{ id: route.params.id })}>
          <EvilIcons name="pencil" size={35} />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const { id } = route.params;
  const { state } = useBlogContext();
  const blogPost = state.blogPosts.find(
    (blogPost) => blogPost.id === id
  );

  if (!blogPost) {
    return (
      <View>
        <Text>Blog post not found.</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>{blogPost.title}</Text>
      <Text>{blogPost.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {},
  title: {},
  icon: {},
});

export default ShowScreen;
