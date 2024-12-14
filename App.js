import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserListScreen from './Screen/UserListScreen';
import UserDetailsScreen from './Screen/UserDetailsScreen';
import {enableScreens} from 'react-native-screens'
const Stack = createStackNavigator();
enableScreens()
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="UserList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#007bff',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen 
          name="UserList" 
          component={UserListScreen} 
          options={{ title: 'User Directory' }}
        />
        <Stack.Screen 
          name="UserDetails" 
          component={UserDetailsScreen} 
          options={{ title: 'User Details' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;