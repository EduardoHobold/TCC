import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
		flex: 1,
        alignItems: 'center'
	},	
    item: {
		backgroundColor: '#3070d9',
		flex: 1,
		margin: 5,
		borderRadius: 5,
        padding: 10
	},
    itemText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold'
	},
    title: {
		color: '#fff',
		fontSize: 24,
		fontWeight: 'bold'
	},
    button: {
        backgroundColor: '#3070d9',
        // height: 'auto',
        width: '100%',
        padding: 10,
        borderRadius: 5
    }
});

export default styles;