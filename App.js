import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const numColumns = 3;

export default function App() {

	const data = [
		{ id: 1, key: 'A' }, { id: 2, key: 'B' }, { id: 3, key: 'C' }, { id: 4, key: 'D' },
		{ id: 5, key: 'E' }, { id: 6, key: 'F' }, { id: 7, key: 'G' }, { id: 8, key: 'H' }, { id: 9, key: 'I' }
	];

	const [randon, setRandon] = useState(Math.floor(Math.random() * data.length - 1) + 1);
	const [count, setCount] = useState(0);
	const [press, setPress] = useState(null);

	useEffect(() => {
		if (press != null && data[randon].id === press.id) {
			setCount(count + 1);
			setRandon(Math.floor(Math.random() * data.length - 1) + 1);
		}
	}, [press]);

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity onPress={() => setPress(item)} style={styles.item}>
				<Text style={styles.itemText}>{item.key}</Text>
			</TouchableOpacity>
		);

	};

	return (
		<LinearGradient colors={['rgba(25,38,68,1)', 'rgba(54,84,168,1)']} style={styles.container} >
			<View style={{ alignItems: 'center', marginBottom: 20 }}>
				<Text style={styles.itemText}>Comparação Matemática</Text>
				<Text style={styles.itemText}>Acertos: {count.toString()}</Text>
			</View>

			<View style={[styles.button]}>
				<Text style={styles.itemText}>{data[randon].key}</Text>
			</View>

			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item) => item.id}
				numColumns={numColumns}
			/>

		</LinearGradient>
	);

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		height: '100%',
		backgroundColor: 'rgb(54,84,168)'
	},
	item: {
		backgroundColor: '#3070d9',
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		margin: 3,
		height: Dimensions.get('window').width / numColumns,
		borderRadius: 5
	},
	button: {
		flex: 1,
		marginHorizontal: '30%',
		marginVertical: '5%',
		backgroundColor: '#7f89a3',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 5
		},
		shadowOpacity: 1.00,
		shadowRadius: 5,
		elevation: 15
	},
	itemInvisible: {
		backgroundColor: 'transparent',
	},
	itemText: {
		color: '#fff',
		fontSize: 32,
		fontWeight: 'bold'
	},
});