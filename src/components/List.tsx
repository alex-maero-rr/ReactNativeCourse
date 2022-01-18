import React, { useState, useEffect } from 'react'
import { Platform, StyleSheet, Text, View, FlatList, ScrollView } from 'react-native'
import User from './Users'
import { Client } from '../helper/types'

export default function Clients() {
  const [people, setPeople] = useState<Client[]>([])
  useEffect (() => {
    fetch ('https://jsonplaceholder.typicode.com/users')
    .then((response) => response.json())
    .then((responseJson) => setPeople(responseJson)) 
  },[])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Client List</Text>
      
      <FlatList 
        keyExtractor={(item) => item?.id}
        data={people}
        renderItem={({ item }) => ( <User user={item}/> )} 
      />
      
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 60,
    fontWeight: 'bold',
  }
})