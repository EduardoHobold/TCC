import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from './styles'
import LinearGradient from 'react-native-linear-gradient';

import getRealm from '../../services/realm';

export default function ListaResultados() {

	const [resultados, setResultados] = useState([]);
	const [loading, setLoading] = useState(true);
	const [dados, setDados] = useState([]);

	useEffect(() => {
		loadResultados();
	}, []);

	async function loadResultados() {
		setLoading(true);
		const realm = await getRealm();
		const data = realm.objects('Respostas');
		setResultados(arrumaObjectoDinamicos(data));
		setLoading(false);
		console.log(resultados)
	}

	function arrumaObjectoDinamicos(data) {
		let newResult = [];
		let newObject = {};
		data.map(e => {
			newObject = {};
			// lista de id, nome e resultado
			Object.keys(e).forEach(property => {
				// id, nome e resultado = []
				if (typeof e[property] === 'object' && e[property].length !== undefined) {
					// se a propriedade for um array percorro ele
					newObject[property] = arrumaObjectoDinamicos(e[property]);
				} else {
					newObject[property] = e[property]
				}
			})
			newResult.push(newObject);
		})
		return newResult;
	}

	// function arrumaObjectoDinamicos(data) {
	// 	let newResult = [];
	// 	let newObject = {};
	// 	data.map(e => {
	// 		// lista de id, nome e resultado
	// 		Object.keys(e).forEach(property => {
	// 			// resultado = []
	// 			if (typeof e[property] === 'object' && e[property].length !== undefined) {
	// 				// Se tipo do meu dado for um objeto e a propriedade dele for um array percorro ele.
	// 				let insideResult = [];
	// 				let insideObject = {};
	// 				e[property].map((element, index) => {
	// 					insideObject = {};
	// 					// Percorrendo o array de dentro do dado.
	// 					Object.keys(element).forEach(subProperty => {
	// 						insideObject[subProperty] = element[subProperty];
	// 					})
	// 					insideResult.push(insideObject)
	// 				})
	// 				newObject[property] = insideResult;
	// 			} else {
	// 				newObject[property] = e[property]
	// 			}
	// 		})
	// 		newResult.push(newObject);
	// 	})
	// 	return newResult;
	// }

	const buscaDados = () => {
		loadResultados();
		montaDados(resultados);
		console.log('Cons', resultados);
	}

	const montaDados = (resultados) => {
		let newResult = [];
		let newObject = {};
		let acertos = 0;
		let erros = 0;
		let tempo = 0;
		console.log(resultados)
		resultados.map(element => {
			newObject = {};
			acertos = 0; erros = 0; tempo = 0;
			element.resultado.map(e => {
				if (e.acerto == false) {
					erros = erros + 1;
				} else {
					acertos = acertos + 1;
				}
				tempo = tempo + e.tempo;
			})
			newObject = { id: element.id, nome: element.nome, acertos: acertos, erros: erros, tempo: tempo / 10 }
			newResult.push(newObject);
		})
		setDados(newResult);
		console.log('newResult:', newResult);
		console.log('Dados:', dados);
	}

	if (!loading) {
		if (resultados[0] !== undefined) {
			return (
				<LinearGradient colors={['rgba(25,38,68,1)', 'rgba(54,84,168,1)']} style={styles.container} >
					<View style={{ flex: 1 }}>
						<View style={{ alignItems: 'center', padding: 10 }}>
							<View>
								<Text style={styles.title}>Resultados das Atividades</Text>
							</View>
							<View style={{ marginVertical: 10 }}>
								<TouchableOpacity style={styles.button} title='Buscar Dados' onPress={() => buscaDados()}>
									<Text style={styles.itemText}>Buscar Dados</Text>
								</TouchableOpacity>
							</View>
						</View>
						<SafeAreaView style={{ alignItems: 'center' }}>
							<FlatList
								data={dados}
								renderItem={({ item }) =>
									<View style={styles.item}>
										<Text style={styles.itemText}>Id: {item.id}</Text>
										<Text style={styles.itemText}>Nome: {item.nome}</Text>
										<Text style={styles.itemText}>Erros: {item.erros}</Text>
										<Text style={styles.itemText}>Acertos: {item.acertos}</Text>
										<Text style={styles.itemText}>Tempo Médio: {item.tempo}</Text>
									</View>
								}
								keyExtractor={(item) => item.id.toString()}
							/>
						</SafeAreaView>
					</View>
				</LinearGradient>
			);
		} else {
			return (
				<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
					<Text> Não há dados para exibir </Text>
				</View>
			)
		}
	} else {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<Text>Carregando, Aguarde!</Text>
			</View>
		)
	}
}