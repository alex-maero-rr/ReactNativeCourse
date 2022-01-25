import React, { useContext } from 'react'
import { Platform, StyleSheet, Text, FlatList, View, TouchableOpacity, Button } from 'react-native'
import User from './Users'
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import { RootStackParamList } from '../helper/types';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ClientContext } from '../context/ClientContext'


type Props = NativeStackScreenProps<RootStackParamList, 'List'>;


export default function List({ route, navigation }: Props) {
  const clientContext = useContext(ClientContext)
  const Header = (
    <View>
      <Text style={styles.title}>Client List</Text>
      <TouchableOpacity style={styles.bttnAdd} onPress={() => navigation.navigate('AddForm')}>
        <Ionicons name='person-add'  size={20}/>
        <Text style={styles.bttnAddText}>Add Client</Text>
      </TouchableOpacity>
    </View>
  )


  return (    
    <FlatList
        data={clientContext?.clients}
        contentContainerStyle={styles.container}
        renderItem={({item}) => (
          <>
            <TouchableOpacity
              onLongPress={() => clientContext?.deleteClient(item?.id)}
              onPress={() =>
                navigation.navigate('AddForm', {
                  client: item,
                })
              }>
              <User user={item} navigation={navigation}/>
            </TouchableOpacity>
          </>
        )}
        ListHeaderComponent={Header}
        ItemSeparatorComponent={() => (
          <View style={{height: 1, width: '100%'}} />
        )}
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
    alignSelf: 'center',
    flexDirection: 'row',
  },
    bttnAddText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
  },
})