import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BlogProvider } from './src/context/BlogContext';
import IndexScreen from './src/screens/IndexScreen';
import ShowScreen from './src/screens/ShowScreen';
import CreateScreen from './src/screens/CreateScreen';
import EditScreen from './src/screens/EditScreen';

export type RootStackParamList = {
  Create:undefined
  Index: undefined;
  Show: { id: number };
  Edit:{ id: number }
};
const Stack = createStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <BlogProvider>
        <Stack.Navigator initialRouteName="Index">
          <Stack.Screen name="Index" component={IndexScreen} options={{ title: 'Blogs' }} />
          <Stack.Screen name="Show" component={ShowScreen} />
          <Stack.Screen name="Create" component={CreateScreen} />
          <Stack.Screen name="Edit" component={EditScreen} />
        </Stack.Navigator>
      </BlogProvider>
    </NavigationContainer>
  );
};

export default App;