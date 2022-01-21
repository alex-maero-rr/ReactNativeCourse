import React, { useState, useEffect } from 'react'
import { Platform, StyleSheet, Text, FlatList, View, TouchableOpacity, Button } from 'react-native'
import User from './Users'
import { Client } from '../helper/types'
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { RootStackParamList } from '../helper/types';
import AsyncStorage from '@react-native-async-storage/async-storage';


type Props = NativeStackScreenProps<RootStackParamList, 'List'>;


export default function List({ route, navigation }: Props) {
  const [people, setPeople] = useState<Client[]>([])

  const getClients = async() => {
    const clients = await AsyncStorage.getItem('clients');
    const parsedClients = clients && JSON.parse(clients);
    setPeople(parsedClients)
  }

  useEffect (() => {
    getClients();
  },[])

  const Header = (
    <View>

      <Text style={styles.title}>Client List</Text>
      <TouchableOpacity style={styles.bttnAdd} onPress={() => navigation.navigate('AddForm')}>
        <Text style={styles.bttnAddText}>Add Client</Text>
      </TouchableOpacity>

    </View>

  )


  return (    
    <FlatList style={styles.container}
      ListHeaderComponent={Header}
      keyExtractor={(item) => item?.id}
      data={people}
      renderItem={({ item }) => ( <User user={item}/> )} 
    />
  )
}


const styles = StyleSheet.create({
  container: {
    ... Platform.select({
      ios: {
        backgroundColor: 'white',
      },
      android: {
        backgroundColor: '#C2EEF5',
      }
    })
  },
  title: {
    fontSize: 32, 
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  bttnAdd: {
    ... Platform.select({
      ios: {
        backgroundColor: 'white',
      },
      android: {
        backgroundColor: '#C2EEF5',
      }
    }),
    marginHorizontal: 120,
    marginTop: 20,
    padding: 20,
    borderRadius: 50,
    backgroundColor: 'white',
  },
    bttnAddText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold'
  },
})