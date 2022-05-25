import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, FlatList, TouchableOpacity, Button, TextInput, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'

import getRealm from '../../services/realm';


export default function Transitividade() {

	const data = [
		{ id: 1, icon: 'numeric-1', origem: 'MaterialCommunityIcons' }, { id: 2, icon: 'numeric-2', origem: 'MaterialCommunityIcons' },
		{ id: 3, icon: 'numeric-3', origem: 'MaterialCommunityIcons' }, { id: 4, icon: 'numeric-4', origem: 'MaterialCommunityIcons' },
		{ id: 5, icon: 'numeric-5', origem: 'MaterialCommunityIcons' }, { id: 6, icon: 'numeric-6', origem: 'MaterialCommunityIcons' },
		{ id: 7, icon: 'numeric-7', origem: 'MaterialCommunityIcons' }, { id: 8, icon: 'numeric-8', origem: 'MaterialCommunityIcons' },
		{ id: 9, icon: 'numeric-9', origem: 'MaterialCommunityIcons' }
	];

	const [number1, setNumber1] = useState(Math.floor(Math.random() * (5 - 1) + 1));
	const [number2, setNumber2] = useState(Math.floor(Math.random() * (4 - 1) + 1));
	const [press, setPress] = useState(null);
	const [controle, setControle] = useState(0);

	const [countSeconds, setCountSeconds] = useState(0);
	const [customInterval, setCustomInterval] = useState();
	const [result, setResult] = useState([])
	const [loading, setLoading] = useState(true)
	const [idResultado, setIdResultado] = useState(0);
	const [nome, setNome] = useState();

	useEffect(() => {
		loadResultados();
		if (controle < 10) {
			setLoading(true)
			setLoading(false);
			validaResposta();
		}
	}, [press]);

	async function loadResultados() {
		const realm = await getRealm();
		const data = realm.objects('Respostas');

		setIdResultado(data.length + 1);
	}

	// Validação da resposta selecionada e monta array do obejto do resultado
	function validaResposta() {
		let resposta = false;
		let resultado;
		setCountSeconds((value) => value = 0);
		console.log('number 1', number1)
		console.log('number 2', number2)
		if (press != null && (number1 + 1) + (number2 + 1) === press.id) {
			resposta = true;
		}
		setNumber1(Math.floor(Math.random() * (5 - 1) + 1));
		setNumber2(Math.floor(Math.random() * (4 - 1) + 1));
		resultado = { id: result.length, acerto: resposta, tempo: countSeconds }

		if (resultado && resultado.tempo != 0) {
			result.push(resultado);
			setControle(controle + 1);
		}
		if (controle == 9) {
			salvarRespostas();
			stopTimer();
			setNome('');
		}
		console.log(result);
		console.log(controle);
	}

	// Funções para controle do contador de tempo
	const startTimer = () => {
		setCustomInterval(
			setInterval(() => {
				setCountSeconds((value) => value + 1)
			}, 1000)
		)
	}

	const stopTimer = () => {
		if (customInterval) {
			clearInterval(customInterval);
		}
	}

	async function salvarRespostas() {
		const data = {
			id: idResultado,
			nome: nome,
			tipo: 'Transitividade',
			resultado: result,
		};
		console.log('data', data);

		const realm = await getRealm();

		realm.write(() => {
			realm.create('Respostas', data);
		});
	}

	const renderItem = ({ item }) => {
		return (
			<TouchableOpacity onPress={() => setPress(item)} style={styles.item}>
				<IconMaterial name={item.icon} size={72} color="#fff" />
			</TouchableOpacity>
		);

	};

	if (!loading) {
		return (
			<LinearGradient keyboardShouldPersistTaps={false} colors={['rgba(25,38,68,1)', 'rgba(54,84,168,1)']} style={styles.container} >
				<View style={{ flexDirection: 'row', width: '100%' }}>
					<TextInput style={{ color: '#FFF', borderColor: '#FFF', borderWidth: 1, borderRadius: 5, textAlign: 'center', width: '45%' }} placeholder={'Informe seu nome'} placeholderTextColor="#FFF" onChangeText={(value) => setNome(value)} />
					<Text style={[styles.itemText, { marginTop: 5, marginLeft: 15, width: '10%', fontSize: 24 }]}>{countSeconds < 10 ? "0" + countSeconds : countSeconds}</Text>
					<View style={{ width: '40%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
						<Button title='Start' onPress={startTimer} />
						<Button title='Stop' onPress={stopTimer} />
					</View>
				</View>


				<View style={[styles.button, { flexDirection: 'row' }]}>
					<IconMaterial name={data[number1].icon} size={72} color="#fff" />
					<Text style={{ fontSize: 32, color: 'black' }}> + </Text>
					<IconMaterial name={data[number2].icon} size={72} color="#fff" />
				</View>

				<View style={{ margin: 8 }}>
					<FlatList
						data={data}
						renderItem={renderItem}
						keyExtractor={(item) => item.id}
						numColumns={3}
						refreshing={true}
					/>
				</View>
			</LinearGradient>
		);

	} else {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text> Carregando! </Text>
			</View>
		);
	}

}