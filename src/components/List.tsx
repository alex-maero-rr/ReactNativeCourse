import React, {useContext} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
  Button,
  Dimensions,
} from 'react-native';
import User from './Users';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../helper/types';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ClientContext} from '../context/ClientContext';

type Props = NativeStackScreenProps<RootStackParamList, 'ClientList'>;
const screenDimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export default function List({route, navigation}: Props) {
  const clientContext = useContext(ClientContext);
  const Header = (
    <View>
      <Text style={styles.title}>Client List</Text>
      <TouchableOpacity
        style={styles.bttnAdd}
        onPress={() => navigation.navigate('AddForm')}>
        <Ionicons name="person-add" size={20} />
        <Text style={styles.bttnAddText}>Add Client</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <FlatList
      data={clientContext?.clients}
      contentContainerStyle={styles.container}
      renderItem={({item}) => (
        <>
          <TouchableOpacity
            style={styles.item}
            onLongPress={() => clientContext?.deleteClient(item?.id)}>
            <User
              user={item}
              navigation={navigation}
              onPressCB={() =>
                navigation.navigate('AddForm', {
                  client: item,
                })
              }
            />
          </TouchableOpacity>
        </>
      )}
      ListHeaderComponent={Header}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      ios: {
        backgroundColor: 'white',
      },
      android: {
        backgroundColor: '#C2EEF5',
        width: '100%',
        height: '100%',
      },
    }),
  },
  item: {
    shadowColor: 'black',
    shadowOpacity: 25,
  },
  title: {
    fontSize: 32,
    marginTop: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
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
});
