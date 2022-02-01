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

			<View style={{ flex: 1, justifyContent: 'center' }}>

				<View style={{ backgroundColor: '#d3d3d3', padding: 2, borderRadius: 5, borderWidth: 1, borderColor: '#BDBDBD' }}>
					<View style={{ flexDirection: 'column' }}>
						{
							_.times(size, (r) => {
								return <View key={r} style={{ height: 80, flexDirection: 'row', justifyContent: 'center' }}>
									{
										_.times(size, (c) => {
											return <View style={{ margin: 2, width: 80, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#BDBDBD', borderRadius: 5 }} key={r + c} ><Text style={{ fontSize: 20 }}></Text></View>

										})
									}
								</View>
							})
						}

					</View>

				</View>
			</View>


		</GestureRecognizer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5ECCE',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
