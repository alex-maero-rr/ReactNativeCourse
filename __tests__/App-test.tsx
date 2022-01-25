/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import AsyncStorageLib from '@react-native-async-storage/async-storage';

it('', () => {
  return AsyncStorageLib.getItem('foo').then(foo => {
    expect(foo).not.toBe('');
  });
});

it('renders correctly', () => {
  renderer.create(<App />);
});


