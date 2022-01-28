import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../helper/types';

type Navigation = NativeStackScreenProps<RootStackParamList, 'Home'>;
const screenDimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export default function HomeScreen({route, navigation}: Navigation) {
  return (
    <View style={styles.screen}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Welcome!</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('ClientList')}>
        <Text style={styles.list}>Client List</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#C2EEF5',
    width: '100%',
    height: '100%',
  },
  titleContainer: {
    marginHorizontal: screenDimensions.width * 0.25,
    marginTop: screenDimensions.height * 0.25,
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: 'black',
    fontSize: 42,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  list: {
    fontSize: 18,
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: 'black',
    paddingTop: 80,
  },
});
