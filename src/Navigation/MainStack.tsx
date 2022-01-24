import React, { useState } from 'react'
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from '../components/Login'
import Register from '../components/Register'
import List from '../components/List'
import AddForm from '../components/AddForm'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()


export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  return (
    <NavigationContainer>
      {isSignedIn ? (
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                if (route.name === 'List') {
                  return <Ionicons name={"list"} size={size} color={color} />;
                } else if (route.name === 'AddForm') {
                  return <AntDesign name={"form"} size={size} color={color} />;
                }                
              },
              tabBarActiveTintColor: 'tomato',
              tabBarInactiveTintColor: 'gray',
            })}
          >
          
            <Stack.Screen 
              name = 'List'
              component = { List }
              options={({navigation}) => ({
                headerRight: () => (
                  <TouchableOpacity onPress={() => setIsSignedIn(false)} style={styles.bttn}>
                    <View style={styles.logout}>
                      <Ionicons name='exit-outline'  size={20}/>
                      <Text >Logout</Text>
                    </View>
                  </TouchableOpacity>
                ),
                headerTitle: '',
                
              })}
            />
            <Stack.Screen 
              name = 'AddForm'
              initialParams={{setIsSignedIn}}
              component = { AddForm }
              options={({navigation}) => ({
                headerRight: () => (
                  <TouchableOpacity onPress={() => setIsSignedIn(false)} style={styles.bttn}>
                    <View style={styles.logout}>
                      <Ionicons name='exit-outline'  size={20}/>
                      <Text>Logout</Text>
                    </View>
                  </TouchableOpacity>
                ),
                headerTitle: '',

              })}
            />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen 
              name = 'Login'
              initialParams={{setIsSignedIn}}
              component = { Login }
              options={({navigation})=>({
                headerTitle: '',
              })}
            />
            <Stack.Screen 
              name = 'Register'
              component = { Register }
              options={({navigation})=>({
                headerTitle: '',
              })}
            />

          </Stack.Navigator>
        )
      }      
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  bttn: {
    paddingRight: 40,
  },
  logout: {
    alignItems: 'center'
  }
})