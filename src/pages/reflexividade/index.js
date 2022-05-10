import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, FlatList, TouchableOpacity, Button, TextInput, Keyboard } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles'
import IconFont from 'react-native-vector-icons/FontAwesome5'
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons'

import getRealm from '../../services/realm';


export default function Reflexividade() {

	const data = [
		{ id: 1, icon: 'dog', origem: 'FontAwesome5' }, { id: 2, icon: 'cat', origem: 'FontAwesome5' },
		{ id: 3, icon: 'hippo', origem: 'FontAwesome5' }, { id: 4, icon: 'crow', origem: 'FontAwesome5' },
		{ id: 5, icon: 'frog', origem: 'FontAwesome5' }, { id: 6, icon: 'fish', origem: 'FontAwesome5' },
		{ id: 7, icon: 'horse', origem: 'FontAwesome5' }, { id: 8, icon: 'spider', origem: 'FontAwesome5' },
		{ id: 9, icon: 'dragon', origem: 'FontAwesome5' }, { id: 10, icon: 'bat', origem: 'MaterialCommunityIcons' },
		{ id: 11, icon: 'rabbit', origem: 'MaterialCommunityIcons' }, { id: 12, icon: 'pig-variant', origem: 'MaterialCommunityIcons' },
		{ id: 13, icon: 'bird', origem: 'MaterialCommunityIcons' }, { id: 14, icon: 'dolphin', origem: 'MaterialCommunityIcons' },
		{ id: 15, icon: 'bee', origem: 'MaterialCommunityIcons' }, { id: 16, icon: 'bee-flower', origem: 'MaterialCommunityIcons' },
		{ id: 17, icon: 'snake', origem: 'MaterialCommunityIcons' }, { id: 18, icon: 'duck', origem: 'MaterialCommunityIcons' },

	];

	const [randon, setRandon] = useState(Math.floor(Math.random() * 9 - 1) + 1);
	const [press, setPress] = useState(null);
	const [controle, setControle] = useState(0);

	const [countSeconds, setCountSeconds] = useState(0);
	const [customInterval, setCustomInterval] = useState();
	const [result, setResult] = useState([])
	const [loading, setLoading] = useState(true)
	const [itens, setItens] = useState([])
	const [idResultado, setIdResultado] = useState(0);
	const [nome, setNome] = useState();

	useEffect(() => {
		loadResultados();
		if (controle < 10) {
			setLoading(true)
			geraItens();
			setLoading(false);
			validaResposta();
		}
	}, [press]);

	async function loadResultados() {
		const realm = await getRealm();
		const data = realm.objects('Respostas');

		setIdResultado(data.length + 1);
	}

	function geraItens() {
		setItens([]);
		let c = 0
		let itensList = []
		let comparacao
		for (var i = 0; i < data.length; i++) {
			c = Math.floor(Math.random() * data.length - 1) + 1
			comparacao = itensList.find(element => element == data[c])
			if (!comparacao && itensList.length < 9) {
				itensList.push(data[c]);
			}
		}
		setItens(itensList)
		setRandon(Math.floor(Math.random() * 9 - 1) + 1);
	}

	// Validação da resposta selecionada e monta array do obejto do resultado
	function validaResposta() {
		let resposta = false;
		let resultado;
		setCountSeconds((value) => value = 0);
		if (press != null && itens[randon].id === press.id) {
			setRandon(Math.floor(Math.random() * 9 - 1) + 1);
			resposta = true;
		}
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
			tipo: 'Reflexividade',
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
				{item.origem == 'FontAwesome5' ? <IconFont name={item.icon} size={46} color="#fff" /> : <IconMaterial name={item.icon} size={40} color="#fff" />}
			</TouchableOpacity>
		);

	};

	if (!loading) {
		return (
			<LinearGradient keyboardShouldPersistTaps={false} colors={['rgba(25,38,68,1)', 'rgba(54,84,168,1)']} style={styles.container} >
					<View style={{ alignItems: 'center', marginBottom: 20 }}>
						<Text style={styles.itemText}>Reflexividade</Text>
						<TextInput style={{ color: '#FFF', borderBottomWidth: 1, textAlign: 'center' }} placeholder={'Informe seu nome'} placeholderTextColor="#FFF" onChangeText={(value) => setNome(value)} />
						<Text style={styles.itemText}>{countSeconds < 10 ? "0" + countSeconds : countSeconds}</Text>
						<View style={{ width: '50%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
							<Button title='Start' onPress={startTimer} />
							<Button title='Stop' onPress={stopTimer} />
						</View>
					</View>

					<View style={[styles.button]}>
						{itens[randon].origem == 'FontAwesome5' ? <IconFont name={itens[randon].icon} size={46} color="#fff" /> : <IconMaterial name={itens[randon].icon} size={46} color="#fff" />}
					</View>

					<View style={{ margin: 8 }}>
						<FlatList
							data={itens}
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