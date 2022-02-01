import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import _ from 'lodash'

export default function App() {

	const size = 4
	//const min = 0
	//const max = size - 1

	const getBlankData = () => {
		let grid = new Array(size)
		_.times(size, (i) => {
			grid[i] = new Array(size)
		})
		return grid
	}

	const [gridData, setGridData] = React.useState(getBlankData())

	React.useEffect(() => {
		console.log('Loading initial data')
		let c1 = getRandomCell()
		let c2 = null
		while (true) {
			c2 = getRandomCell()
			if (!_.isEqual(c1, c2))
				break
		}
		console.log(c1)
		console.log(c2)

		let gridData = getBlankData()
		gridData[c1.x][c1.y] = 2
		gridData[c2.x][c2.y] = 2
		setGridData(gridData)

	}, [])


	const getColor = (num) => {
		let color = "#ffffff"
		switch (num) {
			case 2: color = "#F6CED8"; break;
			case 4: color = "#F7BE81"; break;
			case 8: color = "#F3F781"; break;
			case 16: color = "#BEF781"; break;
			case 32: color = "#81F7D8"; break;
			case 64: color = "#58D3F7"; break;
			case 128: color = "#FA58F4"; break;
			case 256: color = "#A901DB"; break;
			case 512: color = "#01DF3A"; break;
			case 1024: color = "#D7DF01"; break;
			case 2048: color = "#D7DF01"; break;
			default: color = "#ffffff";
		}
		return color
	}

	const getRandomCell = () => {
		var x = _.random(0, size - 1)
		var y = _.random(0, size - 1)
		return { 'x': x, 'y': y }
	}


	//var height = Dimensions.get('window').height
	//var width = Dimensions.get('window').width

	const onSwipeUp = (state) => {
		console.log('onSwipeUp')
	}

	const onSwipeDown = (state) => {
		console.log('onSwipeDown')
	}

	const onSwipeLeft = (state) => {
		console.log('onSwipeLeft')
	}

	const onSwipeRight = (state) => {
		console.log('onSwipeRight')
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
											return <View style={{ margin: 2, width: 80, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: '#BDBDBD', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }} key={r + '' + c} ><Text style={{ fontSize: 40, color: '#808080' }}>{gridData[r][c]}</Text></View>

										})
									}
								</View>
							})
						}

					</View>

				</View>
			</View>

		</GestureRecognizer>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F5ECCE',
		alignItems: 'center',
		justifyContent: 'center',
	},
})
