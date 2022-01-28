import React, {useState} from 'react';
import {TouchableOpacity, Text, StyleSheet, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Login from '../components/Login';
import Register from '../components/Register';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import RNBootSplash from 'react-native-bootsplash';
import HomeScreen from '../components/Home';
import List from '../components/List';
import Add from '../components/AddForm';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <NavigationContainer onReady={() => RNBootSplash.hide()}>
      {isSignedIn ? (
        <Tab.Navigator
          backBehavior="history"
          screenOptions={({route}) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => setIsSignedIn(false)}
                style={styles.bttn}>
                <View style={styles.logout}>
                  <Ionicons name="exit-outline" size={20} />
                  <Text>Logout</Text>
                </View>
              </TouchableOpacity>
            ),
            tabBarHideOnKeyboard: true,
            tabBarIcon: ({focused, color, size}) => {
              if (route.name === 'Home') {
                return <AntDesign name={'home'} size={size} color={color} />;
              } else if (route.name === 'ClientList') {
                return <Ionicons name={'list'} size={size} color={color} />;
              }
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
          })}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            initialParams={{client: undefined}}
            options={({navigation}) => ({
              headerTitle: '',
            })}
          />
          <Stack.Screen
            name="ClientList"
            component={List}
            options={({navigation}) => ({
              title: 'Clients',
              headerTitle: '',
            })}
          />
          <Stack.Screen
            name="AddForm"
            component={Add}
            options={({navigation}) => ({
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.bttnL}>
                  <View style={styles.logout}>
                    <Ionicons name="arrow-back" size={20} />
                    <Text>Back</Text>
                  </View>
                </TouchableOpacity>
              ),
              headerTitle: '',
              tabBarButton: () => null,
              tabBarStyle: {display: 'none'},
            })}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            initialParams={{setIsSignedIn}}
            component={Login}
            options={({navigation}) => ({
              headerTitle: '',
            })}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            options={({navigation}) => ({
              headerLeft: () => (
                <TouchableOpacity
                  onPress={() => navigation.goBack()}
                  style={styles.bttnL}>
                  <View style={styles.logout}>
                    <Ionicons name="arrow-back" size={20} />
                    <Text>Back</Text>
                  </View>
                </TouchableOpacity>
              ),
              headerTitle: '',
            })}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  bttn: {
    paddingRight: 40,
  },
  bttnL: {
    paddingLeft: 40,
  },
  logout: {
    alignItems: 'center',
  },
});
