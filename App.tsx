import { StatusBar } from 'expo-status-bar';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import _ from 'lodash';
import GestureRecognizer from 'react-native-swipe-gestures';

export default function App() {

	const size = 4;

	var height = Dimensions.get('window').height;
	var width = Dimensions.get('window').width;

	const onSwipeUp = (state) => {
		console.log('onSwipeUp');
	}

	const onSwipeDown = (state) => {
		console.log('onSwipeDown');
	}

	const onSwipeLeft = (state) => {
		console.log('onSwipeLeft');
	}

	const onSwipeRight = (state) => {
		console.log('onSwipeRight');
	}


	return (
		<GestureRecognizer style={styles.container}
			onSwipeUp={(state) => onSwipeUp(state)}
			onSwipeDown={(state) => onSwipeDown(state)}
			onSwipeLeft={(state) => onSwipeLeft(state)}
			onSwipeRight={(state) => onSwipeRight(state)}
		>

			<View style={{ backgroundColor: '#BDBDBD', flex: 1, width: '100%',  justifyContent: 'center' }}>

				<View style={{   flexDirection: 'column' }}>
					{
						_.times(size, (r) => {
							return <View key={r} style={{ flexDirection: 'row', justifyContent: 'center'}}>
								{
									_.times(size, (c) => {


										return <View style={{ margin: 2, padding: 20, backgroundColor: '#FFFFFF', borderWidth: 1 }} key={r + c} ><Text style={{fontSize: 20, fontWeight: "bold"}}>10</Text></View>


									})
								}
							</View>
						})
					}

				</View>

			</View>


		</GestureRecognizer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
