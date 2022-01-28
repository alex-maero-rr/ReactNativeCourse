import React, {useContext, useEffect, useState} from 'react';
import {
  Text,
  View,
  TextInput,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {Client} from '../helper/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../helper/types';
import {ClientContext} from '../context/ClientContext';
import {useIsFocused} from '@react-navigation/native';

type Props = NativeStackScreenProps<RootStackParamList, 'AddForm'>;

const screenDimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

export default function Add({route, navigation}: Props) {
  const clientContext = useContext(ClientContext);
  const [id, setId] = useState<number>(-1);

  const isFocused = useIsFocused();

  const {
    control,
    handleSubmit,
    reset,
    formState: {errors},
  } = useForm<Client>();

  useEffect(() => {
    if (!isFocused) {
      reset({name: undefined, email: undefined});
      navigation.setParams({client: undefined});
    }
  }, [isFocused]);

  useEffect(() => {
    reset({
      name: route.params?.client?.name,
      email: route.params?.client?.email,
    }),
      setId(route.params?.client?.id ?? -1);
  }, [reset, route.params?.client]);

  const onSubmit = (data: Client) => {
    route.params?.client
      ? clientContext?.updateClient({...data, id})
      : clientContext?.addClient(data);
    navigation.navigate('ClientList');
  };
  return (
    <View style={styles.formContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>New User</Text>
      </View>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.textInputsContainer}>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.textInput}
              value={value}
              placeholder="Name"
            />
          </View>
        )}
        name="name"
      />
      {errors.name && <Text style={styles.textError}>This is required.</Text>}
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: true,
          pattern: /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.textInputsContainer}>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.textInput}
              value={value}
              placeholder="Email"
            />
          </View>
        )}
        name="email"
      />
      {errors.email && (
        <Text style={styles.textError}>Insert a valid email adress.</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginVertical: screenDimensions.height * 0.2,
    paddingHorizontal: 30,
    paddingVertical: 30,
    justifyContent: 'center',
    alignContent: 'center',
  },
  titleContainer: {
    marginHorizontal: screenDimensions.width * 0.15,
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    color: 'black',
    fontSize: 35,
    width: 200,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    marginVertical: 20,
    marginHorizontal: 90,
    marginTop: 60,
    padding: 20,
    borderRadius: 50,
    backgroundColor: '#C2EEF5',
  },
  buttonText: {
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
  textInputsContainer: {
    paddingBottom: 5,
    borderBottomWidth: 0.4,
  },
  textInput: {
    height: 40,
    paddingHorizontal: 10,
    margin: 5,
  },
  textError: {
    color: 'red',
  },
});
