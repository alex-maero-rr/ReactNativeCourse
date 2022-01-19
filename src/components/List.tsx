import React, { useState, useEffect } from 'react'
import { Platform, StyleSheet, Text, FlatList } from 'react-native'
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
      <FlatList style={styles.container}
        ListHeaderComponent={<Text style={styles.title}>Client List</Text>}
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
  }
})