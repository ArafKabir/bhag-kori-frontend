import 'react-native-gesture-handler'
import React, { useContext } from 'react';
import { AuthContext, AuthProvider } from './context/AuthContext.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import CreateGroupScreen from './screens/CreateGroupScreen.tsx';


const Stack = createNativeStackNavigator();

function AppNavigator(){
  const {token} = useContext(AuthContext);

  return(
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions = {{
        headerShown: false,
      }}>
      {token ? (
        <Stack.Screen name="Home" component={HomeScreen} />
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
      <Stack.Screen name="SignUp" component={SignUpScreen}/>
      <Stack.Screen name="CreateGroup" component={CreateGroupScreen}/>
    </Stack.Navigator>
  </NavigationContainer>
  );
}
export default function App() {
  return(
    <AuthProvider>
      <AppNavigator/>
    </AuthProvider>
  );
}