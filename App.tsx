import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import GestureRecognizer from 'react-native-swipe-gestures';

export default function App() {

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
			<Text>Open up App.tsx to start working on your app!</Text>
			<StatusBar style="auto" />
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
