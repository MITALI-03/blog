import React, { useState ,useEffect} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useBlogContext } from '../context/BlogContext';
import { RootStackParamList } from '../../App';
import { StackNavigationProp } from "@react-navigation/stack";

type BlogPostFormNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Create"|"Edit"
>;

type Props = {
  navigation: BlogPostFormNavigationProp;
  onSubmit: (title: string, content: string) => void;
  initialValues?: { title: string; content: string };
};

const BlogPostForm :React.FC<Props> = ({ navigation,onSubmit ,initialValues}) => {
  const { state, actions } = useBlogContext();
  const [title, setTitle] = useState(initialValues?.title||'');
  const [content, setContent] = useState(initialValues?.content||'');
  const handleSave = () => {
    if (title.trim() !== '' && content.trim() !== '') {
      onSubmit(title, content);
      setTitle('');
      setContent('');
      navigation.navigate("Index");
    }
  };
  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setContent(initialValues.content);
    }
  }, [initialValues]);
  
  return (
    <View>
      <Text style={styles.label}>Enter Title:</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <Text style={styles.label}>Enter Content:</Text>
      <TextInput
        style={styles.input}
        value={content}
        onChangeText={setContent}
        
      />
      <Button title="SAVE BLOG POST" onPress={handleSave} />
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

export default BlogPostForm;
