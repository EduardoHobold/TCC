import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, FlatList, TouchableOpacity, Button } from 'react-native';
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

	const [countSeconds, setCountSeconds] = useState(0);
	const [customInterval, setCustomInterval] = useState();
	const [result, setResult] = useState([])

	useEffect(() => {
		validaResposta();
	}, [press]);

	// Validação da resposta selecionada e monta array do obejto do resultado
	function validaResposta() {
		let resposta = false
		let resultado
		setCountSeconds((value) => value = 0);
		if (press != null && data[randon].id === press.id) {
			setCount(count + 1);
			setRandon(Math.floor(Math.random() * data.length - 1) + 1);
			resposta = true
		}
		resultado = { id: result.length, acerto: resposta, tempo: countSeconds }
		if(resultado){
			result.push(resultado)
		}
		console.log(resposta, countSeconds)
		console.log(result)
	}

	// Funções para controle do contador de tempo
	const startTimer = () => {
		setCustomInterval(
			setInterval(() => {
				changeTime();
			}, 1000)
		)
	}

	const changeTime = () => {
		setCountSeconds((value) => value + 1)
	}

	const stopTimer = () => {
		if(customInterval) {
			clearInterval(customInterval)
		}
	}


	

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
				<Text style={styles.itemText}>{countSeconds < 10 ? "0" + countSeconds : countSeconds}</Text>
				<View style={{width: '50%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
					<Button title='Start' onPress={startTimer} />
					<Button title='Stop' onPress={stopTimer} />
				</View>	
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