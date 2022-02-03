import React from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import GestureRecognizer from 'react-native-swipe-gestures'
import _ from 'lodash'

export default function App() {

	const size = 4
	const min = 0
	const max = size - 1

	const getBlankData = () => {
		let grid = new Array(size)
		_.range(size).map(i => grid[i] = new Array(size))
		return grid
	}

	const [gridData, setGridData] = React.useState(getBlankData())

	React.useEffect(() => {
		let c1 = getRandomCell()
		let c2 = null
		while (true) {
			c2 = getRandomCell()
			if (!_.isEqual(c1, c2))
				break
		}
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

	const onSwipeUp = (state) => {
		_.range(size).map(c => _.range(size).map(r => {
			if (gridData[r][c]) {
				moveUp(r, c);
			}

		}))
		setGridData(_.assign([], gridData))
		update()
	}

	const moveUp = (r, c) => {
		if (r != min) {
			_.rangeRight(r).map(i => {
				if (gridData[i][c]) {
					if (gridData[i][c] === gridData[i + 1][c]) {
						gridData[i][c] = gridData[i + 1][c] * 2
						gridData[i + 1][c] = undefined
					}
				} else {
					gridData[i][c] = gridData[i + 1][c]
					gridData[i + 1][c] = undefined

				}
			})
		}
	}

	const onSwipeDown = (state) => {
		_.range(size).map(c => _.rangeRight(size).map(r => {
			if (gridData[r][c]) {
				moveDown(r, c);
			}

		}))
		setGridData(_.assign([], gridData))
		update()
	}


	const moveDown = (r, c) => {
		if (r != max) {
			_.range(r + 1, size).map(i => {
				if (gridData[i][c]) {
					if (gridData[i][c] === gridData[i - 1][c]) {
						gridData[i][c] = gridData[i - 1][c] * 2
						gridData[i - 1][c] = undefined
					}
				} else {
					gridData[i][c] = gridData[i - 1][c]
					gridData[i - 1][c] = undefined

				}
			})
		}
	}

	const onSwipeLeft = (state) => {
		_.range(size).map(r => _.range(size).map(c => {
			if (gridData[r][c]) {
				moveLeft(r, c);
			}
		}))
		setGridData(_.assign([], gridData))
		update()
	}



	const moveLeft = (r, c) => {
		if (c != min) {
			_.rangeRight(c).map(i => {
				if (gridData[r][i]) {
					if (gridData[r][i] === gridData[r][i + 1]) {
						gridData[r][i] = gridData[r][i + 1] * 2
						gridData[r][i + 1] = undefined
					}

				} else {
					gridData[r][i] = gridData[r][i + 1]
					gridData[r][i + 1] = undefined

				}
			})
		}
	}

	const onSwipeRight = (state) => {
		_.range(size).map(r => _.rangeRight(size).map(c => {
			if (gridData[r][c]) {
				moveRight(r, c);
			}

		}))
		setGridData(_.assign([], gridData))
		update()
	}

	const moveRight = (r, c) => {
		if (c != max) {
			_.range(c + 1, size).map(i => {
				if (gridData[r][i]) {
					if (gridData[r][i] === gridData[r][i - 1]) {
						gridData[r][i] = gridData[r][i - 1] * 2
						gridData[r][i - 1] = undefined
					}
				} else {
					gridData[r][i] = gridData[r][i - 1]
					gridData[r][i - 1] = undefined
				}
			})
		}
	}

	const update = () => {
		let emptyCells = []
		_.range(size).map(r => _.range(size).map(c => {
			if (!gridData[r][c]) {
				emptyCells.push({ 'x': r, 'y': c })
			}
		}))
		const emptyCell = _.sample(emptyCells)
		gridData[emptyCell.x][emptyCell.y] = 2
		setGridData(_.assign([], gridData))
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
							_.range(size).map(r =>
								<View key={r} style={{ height: 80, flexDirection: 'row', justifyContent: 'center' }}>
									{
										_.range(size).map(c =>
											<View style={{ margin: 2, width: 80, backgroundColor: getColor(gridData[r][c]), borderWidth: 1, borderColor: '#BDBDBD', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }} key={r + '' + c} ><Text style={{ fontSize: 40, color: '#808080' }}>{gridData[r][c]}</Text></View>
										)
									}
								</View>
							)
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
