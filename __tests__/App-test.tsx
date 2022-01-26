/**
 * @format
 */
import 'react-native';
import React from 'react';
import Login from '../src/components/Login';
import Register from '../src/components/Register';
import {render, fireEvent, waitFor} from '@testing-library/react-native';
import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';

let component: any;

function renderWithNavigation() {
  const Stack = createNativeStackNavigator();
  const Navigation = (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  return render(Navigation);
}

describe('testing login form', () => {
  beforeEach(() => {
    component = renderWithNavigation();
  });

  it('submit button', () => {
    expect(component.getByText('Submit')).toBeTruthy();
  });

  it('register button', () => {
    expect(component.getByText('Register'));
  });

  it('password', () => {
    expect(component.getByPlaceholderText('Password'));
  });

  it('username', () => {
    expect(component.getByPlaceholderText('Username'));
  });

  it('shows both error messages', async () => {
    await waitFor(() => {
      fireEvent.press(component.getByTestId('submit-button'));
    });
    component.getByText('User is required.');
    component.getByText('Password is required.');
  });

  it('shows invalid username error message', async () => {
    await waitFor(() => {
      fireEvent.changeText(component.getByTestId('password-input'), 'passtest');
      fireEvent.press(component.getByTestId('submit-button'));
    });
    component.getByText('User is required.');
    expect(component.queryAllByText('Password is required.').length).toBe(0);
  });

  it('shows invalid password error message', async () => {
    await waitFor(() => {
      fireEvent.changeText(component.getByTestId('user-input'), 'usertest');
      fireEvent.press(component.getByTestId('submit-button'));
    });
    component.getByText('Password is required.');
    expect(component.queryAllByText('User is required.').length).toBe(0);
  });

  it('handles valid input submission', async () => {
    await waitFor(() => {
      mockAsyncStorage.setItem(
        'users',
        JSON.stringify([{user: 'usertest', password: 'passtest'}]),
      );
      fireEvent.changeText(component.getByTestId('user-input'), 'usertest');
      fireEvent.changeText(component.getByTestId('password-input'), 'passtest');
      fireEvent.press(component.getByTestId('submit-button'));
    });
  });
  it('handles invalid input submission', async () => {
    await waitFor(() => {
      mockAsyncStorage.setItem(
        'users',
        JSON.stringify([{user: 'usertest', password: 'passtest'}]),
      );
      fireEvent.changeText(component.getByTestId('user-input'), 'invaliduser');
      fireEvent.changeText(
        component.getByTestId('password-input'),
        'invalidpass',
      );
      fireEvent.press(component.getByTestId('submit-button'));
    });
  });
  it('handles invalid AsyncStorage data', async () => {
    await waitFor(() => {
      mockAsyncStorage.setItem('users', 'Not JSON Formatted Data');
      fireEvent.changeText(component.getByTestId('user-input'), 'jjj');
      fireEvent.changeText(component.getByTestId('password-input'), 'kkk');
      fireEvent.press(component.getByTestId('submit-button'));
    });
  });
  it('register button', () => {
    fireEvent.press(component.getByTestId('register-button'));
  });
});
