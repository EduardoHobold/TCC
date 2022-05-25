import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Reflexividade from '../pages/reflexividade/index'
import Simetria from '../pages/simetria/index'
import Transitividade from '../pages/transitividade/index'
import ListaResultados from '../pages/listaResultados/index'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function ReflexividadeStack() {
	return (
		<Stack.Navigator initialRouteName="Reflexividade" screenOptions={{ headerStyle: { backgroundColor: 'rgba(25,38,68,1)' }, headerTintColor: '#fff', headerTitleAlign: 'center' }}>
			<Stack.Screen name="Reflexividade" component={Reflexividade}/>
		</Stack.Navigator>
	);
}

function SimetriaStack() {
	return (
		<Stack.Navigator initialRouteName="Simetria" screenOptions={{ headerStyle: { backgroundColor: 'rgba(25,38,68,1)' }, headerTintColor: '#fff', headerTitleAlign: 'center' }}>
			<Stack.Screen name="Simetria" component={Simetria} />
		</Stack.Navigator>
	);
}

function TransitividadeStack() {
	return (
		<Stack.Navigator initialRouteName="Transitividade" screenOptions={{ headerStyle: { backgroundColor: 'rgba(25,38,68,1)' }, headerTintColor: '#fff', headerTitleAlign: 'center' }}>
			<Stack.Screen name="Transitividade" component={Transitividade} />
		</Stack.Navigator>
	);
}

function DrawerNavigator() {
	return (
		<Drawer.Navigator initialRouteName="Reflexividade">
			<Drawer.Screen name="Reflexividade" component={ReflexividadeStack} />
			<Drawer.Screen name="Simetria" component={SimetriaStack} />
			<Drawer.Screen name="Transitividade" component={TransitividadeStack} />
			<Drawer.Screen name="ListaResultados" component={ListaResultados} />
		</Drawer.Navigator>
	);
}

function Routes() {

	return (
		<NavigationContainer>
			<DrawerNavigator />
		</NavigationContainer>
	);

}

export default Routes;