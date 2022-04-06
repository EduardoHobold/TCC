import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, FlatList, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'

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

			<View style={{margin: 8}}> 
				<FlatList
					data={data}
					renderItem={renderItem}
					keyExtractor={(item) => item.id}
					numColumns={3}
				/>
			</View>

		</LinearGradient>
	);

}