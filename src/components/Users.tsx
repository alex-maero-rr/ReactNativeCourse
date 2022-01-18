

import React from 'react'
import { Platform, StyleSheet, Text, View } from 'react-native'
import { Client } from '../helper/types'

interface Props {
  user: Client
}

export default function User(props: Props){
  return (
    <View style={styles.item}>
      <Text>{`User id: ${props.user?.id}`}</Text>
      <Text>{`User name: ${props.user?.name}`}</Text>
      <Text>{`User email ${props.user?.email}`}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    marginTop: 24,
    marginHorizontal: 40,
    padding: 20, 
    fontSize: 13,
    borderRadius: 20,
    borderWidth: 4,
    ...Platform.select({ 
      ios: {
        backgroundColor: '#C2EEF5'
      },
      android: {
        backgroundColor: 'white',
      }
    })
  }
})