import 'react-native-gesture-handler'
import React from 'react';
import {  AuthProvider } from './context/AuthContext.tsx';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import CreateGroupScreen from './screens/CreateGroupScreen.tsx';
import GroupsScreen from './screens/GroupsScreen.tsx';
import ComingSoonScreen from './screens/ComingSoonScreen.tsx';


const Stack = createNativeStackNavigator();

function AppNavigator(){
  //const {token} = useContext(AuthContext);

  return(
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions = {{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen}/>
      <Stack.Screen name="CreateGroup" component={CreateGroupScreen}/>
      <Stack.Screen name="Groups" component={GroupsScreen}/>
      <Stack.Screen name="Friends" component={ComingSoonScreen}/>
      <Stack.Screen name="Request" component={ComingSoonScreen}/>
      <Stack.Screen name="AddFriend" component={ComingSoonScreen}/>
      <Stack.Screen name="ProfileScreen" component={ComingSoonScreen}/>
      <Stack.Screen name="PayUp" component={ComingSoonScreen}/>
      <Stack.Screen name="Payables" component={ComingSoonScreen}/>
      <Stack.Screen name="Receivables" component={ComingSoonScreen}/>
      <Stack.Screen name="ActivityLog" component={ComingSoonScreen}/>
      <Stack.Screen name="Inbox" component={ComingSoonScreen}/>
      <Stack.Screen name="AddExpense" component={ComingSoonScreen}/>
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