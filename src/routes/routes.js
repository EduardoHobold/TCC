import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../pages/Home/index'

const Stack = createStackNavigator();

function HomeStack() {
	return (
		<Stack.Navigator initialRouteName="Home">
			<Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
		</Stack.Navigator>
	);
}

function Routes() {

	return (
		<NavigationContainer>
			<HomeStack />
		</NavigationContainer>
	);

}

export default Routes;