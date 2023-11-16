import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screen/Login';
import TakeNote from './screen/TakeNote';
const stack=createStackNavigator();
export default function App() {
  return (
   <NavigationContainer>
      <stack.Navigator initialRouteName='Login'>
        <stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <stack.Screen name="TakeNote" component={TakeNote} options={{headerShown:false}}/>
      </stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
