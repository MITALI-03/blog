import React, { useState } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import { useBlogContext } from "../context/BlogContext";
import { RootStackParamList } from "../../App";
import { StackNavigationProp } from "@react-navigation/stack";
import BlogPostForm from "../components/BlogPostForm";

type CreateScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Create"
>;

type Props = {
  navigation: CreateScreenNavigationProp;
};
const CreateScreen: React.FC<Props> = ({ navigation }) => {
  const { state, actions } = useBlogContext();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addBlogPost = (title: string, content: string) => {
    if (title.trim() !== "" && content.trim() !== "") {
      actions.addBlogPost(title, content);
      setTitle("");
      setContent("");
      navigation.navigate("Index");
    }
  };

  return (
    <View>
      <BlogPostForm navigation={navigation} 
      onSubmit={addBlogPost} />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 15,
    padding: 5,
    margin: 5,
  },
  label: {
    fontSize: 20,
    marginBottom: 5,
    marginLeft: 5,
  },
});

export default CreateScreen;
