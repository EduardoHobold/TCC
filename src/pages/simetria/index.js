// import React, {useState, useEffect} from 'react';
// import { View, Text, FlatList } from 'react-native';

// import getRealm from '../../services/realm';

// const [resultados, setResultados] = useState([]);
// const [loading, setLoading] = useState(true)

// export default function Simetria() {
//     useEffect(() => {
//         async function loadResultados() {
//             const realm = await getRealm();

//             const data = realm.objects('Respostas');
//             setIdResultado(realm.objects('Respostas').length + 1);
//             setResultados(data);
//             console.log(resultados)
//         }
//         setLoading(true);
//         loadResultados();
//         setLoading(false);
//     }, []);
//     if(!loading){
//         return (
//             <View style={{ margin: 8, alignItems: 'center' }}>
//                 <FlatList
//                     data={resultados}
//                     renderItem={
//                         <View>
//                             <Text>{item.nome}</Text>
//                         </View>
//                     }
//                     keyExtractor={(item) => item.id}
//                     numColumns={3}
//                     refreshing={true}
//                 />
//             </View>
//         );
//     } else {
//         return(
//             <View>
//                 <Text>Loading</Text>
//             </View>
//         );
//     }
// }