import React from 'react';
import {
  Text,
  View,
  TextInput,
  Dimensions,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useForm, Controller} from 'react-hook-form';
import {Credentials} from '../helper/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../helper/types';

const screenDimensions = {
  width: Dimensions.get('window').width,
  height: Dimensions.get('window').height,
};

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function Login({route, navigation}: Props) {
  const handleLogin = async (credentials: Credentials) => {
    try {
      const users = await AsyncStorage.getItem('users');
      const parsedUsers = users && JSON.parse(users);
      if (
        Array.isArray(parsedUsers) &&
        parsedUsers.filter(
          (user: Credentials) =>
            user.user === credentials.user &&
            user.password === credentials.password,
        ).length
      ) {
        route.params?.setIsSignedIn(true);
      } else {
        console.log('Invalid credentials');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {
      user: '',
      password: '',
    },
  });
  const onSubmit = (data: Credentials) => {
    handleLogin(data);
  };
  return (
    <View style={styles.formContainer}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Log in</Text>
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
              placeholder="Username"
              testID="user-input"
            />
          </View>
        )}
        name="user"
      />
      {errors.user && <Text>User is required.</Text>}
      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: true,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <View style={styles.textInputsContainer}>
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              style={styles.textInput}
              value={value}
              placeholder="Password"
              testID="password-input"
            />
          </View>
        )}
        name="password"
      />
      {errors.password && <Text>Password is required.</Text>}

      <TouchableOpacity
        style={styles.button}
        testID="submit-button"
        onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        testID="register-button"
        onPress={() => navigation.navigate('Register')}>
        <Text style={styles.register}>Register</Text>
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
  register: {
    fontSize: 18,
    textDecorationLine: 'underline',
    textAlign: 'center',
    color: 'black',
    paddingTop: 80,
  },
});
