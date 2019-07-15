import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import Home from './app/screens/Home';
import List from './app/screens/List';
import Pokemon from './app/screens/Pokemon';

const appNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      title: 'Pokedex',
      headerTintColor: '#ef5350',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  },
  List: {
    screen: List,
    navigationOptions: {
      title: 'Pokedex',
      headerTintColor: '#ef5350',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  },
  Pokemon: {
    screen: Pokemon,
    navigationOptions: {
      title: 'Pokedex',
      headerTintColor: '#ef5350',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
});

export default createAppContainer(appNavigator);
