import React from 'react';
import {Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Client, RootStackParamList} from '../helper/types';
import IconFeather from 'react-native-vector-icons/Feather';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type Navigation = NativeStackScreenProps<
  RootStackParamList,
  'ClientList'
>['navigation'];

interface Props {
  user: Client;
  navigation: Navigation;
  onPressCB: Function;
}

export default function User(props: Props) {
  return (
    <View style={styles.cardContainer}>
      <View>
        <Text>{`Id: ${props.user?.id}`}</Text>
        <Text>{`Name: ${props.user?.name}`}</Text>
        <Text>{`Email ${props.user?.email}`}</Text>
      </View>

      <View>
        <IconFeather name="edit" onPress={() => props.onPressCB()} size={26} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24,
    marginHorizontal: 20,
    padding: 20,
    fontSize: 13,
    borderRadius: 20,
    borderWidth: 4,
    ...Platform.select({
      ios: {
        backgroundColor: '#C2EEF5',
      },
      android: {
        backgroundColor: 'white',
      },
    }),
  },
  line: {
    flexDirection: 'row',
  },
});
