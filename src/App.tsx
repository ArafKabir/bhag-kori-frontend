import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from "./screens/LoginScreen.tsx";
import SignUpScreen from "./screens/SignUpScreen.tsx";
import CreateGroupScreen from "./screens/CreateGroupScreen.tsx";

const Stack = createNativeStackNavigator();

export default function App() {
    return <CreateGroupScreen/>
}