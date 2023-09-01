import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useBlogContext } from '../context/BlogContext';
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import BlogPostForm from '../components/BlogPostForm';

type EditScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Edit'
>;

type EditScreenRouteProp = RouteProp<RootStackParamList, 'Edit'>;
type Props = {
  route: EditScreenRouteProp;
  navigation: EditScreenNavigationProp;
};

const EditScreen: React.FC<Props> = ({ navigation, route }) => {
  const { state, actions } = useBlogContext();
  const blogPost = state.blogPosts.find(
    (blogPost) => blogPost.id === route.params.id
  );

  const [title, setTitle] = useState(blogPost?.title?.toString() || '');
  const [content, setContent] = useState(blogPost?.content || '');
  const editBlogPost = (title: string, content: string) => {
    if (title.trim() !== "" && content.trim() !== "") {
      actions.editBlogPost(route.params.id,title, content);
      setTitle("");
      setContent("");
      navigation.navigate("Index");
    }
  };

  return (
    <View>
        <BlogPostForm navigation={navigation} 
        initialValues={{
            title: blogPost?.title?.toString() || '',
            content: blogPost?.content || ''
          }}
        onSubmit={editBlogPost} /> 
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 18,
    borderWidth: 1,
    borderColor: 'black',
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

export default EditScreen;
