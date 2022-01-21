import React, { useEffect, useState } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import Login from '../components/Login'
import Register from '../components/Register'
import List from '../components/List'
import AddForm from '../components/AddForm'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Button } from 'react-native'


const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()


export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const [isAdded, setIsAdded] = useState(false)


  return (
    <NavigationContainer>
      {
        isSignedIn ? (
          <Tab.Navigator>
            
            {/* <Stack.Screen 
              name = 'List'
              component = { List }
              options={({navigation}) => ({
                headerRight: () => (
                  <Button
                    onPress={() => setIsSignedIn(false)}
                    title="Sign Out"
                    color="#017ACC"
                  />
                )
              })}
            /> */}
            <Stack.Screen 
              name = 'Form'
              component = { List }
              options={({navigation}) => ({
                headerRight: () => (
                  <Button
                    onPress={() => setIsSignedIn(false)}
                    title="Sign Out"
                    color="#017ACC"
                  />
                )
              })}
            />
            <Stack.Screen 
              name = 'AddForm'
              initialParams={{setIsSignedIn}}
              component = { AddForm }
              options={({navigation}) => ({
                headerRight: () => (
                  <Button
                    onPress={() => setIsSignedIn(false)}
                    title="Sign Out"
                    color="#017ACC"
                  />
                )
              })}
            />
          </Tab.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen 
              name = 'Login'
              initialParams={{setIsSignedIn}}
              component = { Login }
              
            />
            <Stack.Screen 
              name = 'Register'
              component = { Register }
            />

          </Stack.Navigator>
        )
      }      
    </NavigationContainer>
  )
}