import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';


const stack = createNativeStackNavigator();
export default function App() {
  return(
    <NavigationContainer>
      <stack.Navigator
        initialRouteName="Login"
        screenOptions = {{
          headerShown: false,
      }}>
        <stack.Screen name="Login" component={LoginScreen}/>
        <stack.Screen name="SignUp" component={SignUpScreen}/>
        <stack.Screen name="Home" component={HomeScreen}/>
      </stack.Navigator>
    </NavigationContainer>
  );
}