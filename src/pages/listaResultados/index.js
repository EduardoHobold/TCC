import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, SafeAreaView, Button } from 'react-native';

import getRealm from '../../services/realm';

export default function ListaResultados() {

	const [resultados, setResultados] = useState([]);
	const [loading, setLoading] = useState(true);

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

	const teste = () => {
		loadResultados();
		console.log('Cons', resultados);
	}

	if (!loading) {
		if (resultados[0] !== undefined) {
			return (
				<View style={{ flex: 1, alignItems: 'center' }}>
					<View>
						<Text style={{fontSize: 16, fontWeight: 'bold'}}>Resultados das Atividades</Text>
						<Button title='Buscar Dados' onPress={teste} />
					</View>
					<SafeAreaView>
						<FlatList
							data={resultados}
							renderItem={({ item }) =>
								<View>
									<Text>{item.id}</Text>
									<Text>{item.nome}</Text>
								</View>
							}
							keyExtractor={(item) => item.id}
						/>
					</SafeAreaView>
				</View>

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