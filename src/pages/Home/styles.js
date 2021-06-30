import { StyleSheet, Dimensions } from 'react-native'

const numColumns = 3;

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

export default styles;