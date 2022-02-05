import React from 'react'
import { Alert, Animated, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import GestureRecognizer from 'react-native-swipe-gestures'
import _ from 'lodash'

export default function App() {
	const size = 4
	const min = 0
	const max = size - 1
	let merged = []
	let isMoved = false

	const getBlankData = () => {
		let grid = new Array(size)
		_.range(size).map(i => grid[i] = new Array(size))
		return grid
	}

	const storeHighScore = async (score) => {
		try {
			await AsyncStorage.setItem('@highScore', score.toString())
		} catch (error) {
			console.log('Error storing high score')
		}
	}

	const getHighScore = async () => {
		try {
			const val = await AsyncStorage.getItem('@highScore')
			return val ? parseInt(val) : 0
		} catch (error) {
			console.log('Error fetching high score')
		}
	}

	const [gridData, setGridData] = React.useState(getBlankData())
	const [score, setScore] = React.useState(0)
	const [highScore, setHighScore] = React.useState(0)

	const newGame = () => {
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
		setScore(0)
	}

	React.useEffect(() => {
		newGame()
		getHighScore().then(v => setHighScore(v))
	}, [])

	React.useEffect(() => {
		//Update high score
		if (score >= highScore) {
			setHighScore(score)
		}

	}, [score, highScore])

	const getColor = (num) => {
		let color = '#ffffff'
		switch (num) {
			case 2: color = '#F6CECE'; break;
			case 4: color = '#F5D0A9'; break;
			case 8: color = '#F5ECCE'; break;
			case 16: color = '#D4E6F1'; break;
			case 32: color = '#D0F5A9'; break;
			case 64: color = '#A9F5A9'; break;
			case 128: color = '#A9F5D0'; break;
			case 256: color = '#A9D0F5'; break;
			case 512: color = '#F6CEF5'; break;
			case 1024: color = '#CECEF6'; break;
			case 2048: color = '#CEF6F5'; break;
			default: color = '#ffffff';
		}
		return color
	}

	const getRandomCell = () => {
		var x = _.random(0, size - 1)
		var y = _.random(0, size - 1)
		return { 'x': x, 'y': y }
	}

	const onSwipeUp = (state) => {
		isMoved = false
		merged = []
		_.range(size).map(c => _.range(size).map(r => {
			if (gridData[r][c]) {
				moveUp(r, c);
			}
		}))
		setGridData(_.assign([], gridData))
		if (isMoved) return update()
	}

	const moveUp = (r, c) => {
		if (r != min) {
			_.each(_.rangeRight(r), i => {
				if (gridData[i][c]) {
					if (gridData[i][c] === gridData[i + 1][c]) {
						const cell = { 'x': i, 'y': c }
						if (!_.some(merged, cell)) {
							merged.push(cell)
							gridData[i][c] = gridData[i + 1][c] * 2
							gridData[i + 1][c] = undefined
							isMoved = true
							setScore(score + gridData[i][c])
						}
					}
					return false
				} else {
					gridData[i][c] = gridData[i + 1][c]
					gridData[i + 1][c] = undefined
					isMoved = true
				}
			})
		}
	}

	const onSwipeDown = (state) => {
		isMoved = false
		merged = []
		_.range(size).map(c => _.rangeRight(size).map(r => {
			if (gridData[r][c]) {
				moveDown(r, c);
			}
		}))
		setGridData(_.assign([], gridData))
		if (isMoved) return update()
	}

	const moveDown = (r, c) => {
		if (r != max) {
			_.each(_.range(r + 1, size), i => {
				if (gridData[i][c]) {
					if (gridData[i][c] === gridData[i - 1][c]) {
						const cell = { 'x': i, 'y': c }
						if (!_.some(merged, cell)) {
							merged.push(cell)
							gridData[i][c] = gridData[i - 1][c] * 2
							gridData[i - 1][c] = undefined
							isMoved = true
							setScore(score + gridData[i][c])
						}
					}
					return false
				} else {
					gridData[i][c] = gridData[i - 1][c]
					gridData[i - 1][c] = undefined
					isMoved = true
				}
			})
		}
	}

	const onSwipeLeft = (state) => {
		isMoved = false
		merged = []
		_.range(size).map(r => _.range(size).map(c => {
			if (gridData[r][c]) {
				moveLeft(r, c);
			}
		}))
		setGridData(_.assign([], gridData))
		if (isMoved) return update()
	}

	const moveLeft = (r, c) => {
		if (c != min) {
			_.each(_.rangeRight(c), i => {
				if (gridData[r][i]) {
					if (gridData[r][i] === gridData[r][i + 1]) {
						const cell = { 'x': r, 'y': i }
						if (!_.some(merged, cell)) {
							merged.push(cell)
							gridData[r][i] = gridData[r][i + 1] * 2
							gridData[r][i + 1] = undefined
							isMoved = true
							setScore(score + gridData[r][i])
						}
					}
					return false
				} else {
					gridData[r][i] = gridData[r][i + 1]
					gridData[r][i + 1] = undefined
					isMoved = true
				}
			})
		}
	}

	const onSwipeRight = (state) => {
		isMoved = false
		merged = []
		_.range(size).map(r => _.rangeRight(size).map(c => {
			if (gridData[r][c]) {
				moveRight(r, c);
			}
		}))
		setGridData(_.assign([], gridData))
		if (isMoved) return update()
	}

	const moveRight = (r, c) => {
		if (c != max) {
			_.each(_.range(c + 1, size), i => {
				if (gridData[r][i]) {
					if (gridData[r][i] === gridData[r][i - 1]) {
						const cell = { 'x': r, 'y': i }
						if (!_.some(merged, cell)) {
							merged.push(cell)
							gridData[r][i] = gridData[r][i - 1] * 2
							gridData[r][i - 1] = undefined
							isMoved = true
							setScore(score + gridData[r][i])
						}
					}
					return false
				} else {
					gridData[r][i] = gridData[r][i - 1]
					gridData[r][i - 1] = undefined
					isMoved = true
				}
			})
		}
	}

	const update = () => {
		// Add new cell
		let emptyCells = []
		_.range(size).map(r => _.range(size).map(c => {
			if (!gridData[r][c]) {
				emptyCells.push({ 'x': r, 'y': c })
			}
		}))
		const emptyCell = _.sample(emptyCells)
		gridData[emptyCell.x][emptyCell.y] = _.sample([2, 2, 2, 2, 4])
		setGridData(_.assign([], gridData))

		//Check if no move space available
		let allFilled = true
		_.each(gridData, row => {
			_.each(row, cell => {
				if (!cell) {
					allFilled = false
					return false
				}
			})
		})
		if (allFilled) {
			return checkGameOver()
		}
	}

	const checkGameOver = () => {
		let isOver = true;

		_.each(_.range(size), c => {
			_.each(_.range(size - 1), r => {
				if (gridData[r][c] === gridData[r + 1][c]) {
					isOver = false
					return false
				}
			})
		})

		_.each(_.range(size), r => {
			_.each(_.range(size - 1), c => {
				if (gridData[r][c] === gridData[r][c + 1]) {
					isOver = false
					return false
				}
			})
		})

		if (isOver) {
			if (score >= highScore) {
				storeHighScore(score)
				return Alert.alert('Game over!', 'High Score:' + score, [{ text: 'NEW GAME', onPress: () => newGame() }, { text: 'CANCLE', onPress: () => false }])
			} else {
				return Alert.alert('Game over!', 'Score:' + score, [{ text: 'NEW GAME', onPress: () => newGame() }, { text: 'CANCLE', onPress: () => false }])
			}
		}
	}

	return (
		<GestureRecognizer style={styles.container}
			onSwipeUp={(state) => onSwipeUp(state)}
			onSwipeDown={(state) => onSwipeDown(state)}
			onSwipeLeft={(state) => onSwipeLeft(state)}
			onSwipeRight={(state) => onSwipeRight(state)}
		>
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 40 }}>

					<View style={{ alignSelf: 'flex-start', padding: 0 }}>
						<TouchableOpacity onPress={() => newGame()}>
							<Text style={{ padding: 10, borderWidth: 1, borderColor: '#BDBDBD', borderRadius: 5, backgroundColor: '#d3d3d3' }}>
								<Text style={{ fontSize: 15, color: '#808080' }}>NEW GAME</Text>
							</Text>
						</TouchableOpacity >
					</View>

					<View style={{ flexDirection: 'column', alignItems: 'center', paddingHorizontal: 20, paddingTop: 5, marginRight: 20, borderWidth: 1, borderColor: '#BDBDBD', borderRadius: 5, backgroundColor: '#d3d3d3' }}>
						<Text style={{ fontSize: 15, color: '#808080' }}>SCORE</Text>
						<Text style={{ fontSize: 25, color: '#808080' }}>{score}</Text>
					</View>
					<View style={{ flexDirection: 'column', alignItems: 'center', padding: 5, borderWidth: 1, borderColor: '#BDBDBD', borderRadius: 5, backgroundColor: '#d3d3d3' }}>
						<Text style={{ fontSize: 15, color: '#808080' }}>HIGH SCORE</Text>
						<Text style={{ fontSize: 25, color: '#808080' }}>{highScore}</Text>
					</View>

				</View>
				<View style={{ backgroundColor: '#d3d3d3', padding: 2, borderRadius: 5, borderWidth: 1, borderColor: '#BDBDBD' }}>
					<Animated.View style={{ flexDirection: 'column' }}>
						{
							_.range(size).map(r =>
								<Animated.View key={r} style={{ flexDirection: 'row', justifyContent: 'center', height: 80 }}>
									{
										_.range(size).map(c =>
											<Animated.View style={{ alignItems: 'center', justifyContent: 'center', margin: 2, width: 80, backgroundColor: getColor(gridData[r][c]), borderWidth: 1, borderColor: '#BDBDBD', borderRadius: 5 }} key={r + '' + c} ><Text style={{ fontSize: 40, color: '#808080' }}>{gridData[r][c]}</Text></Animated.View>
										)
									}
								</Animated.View>
							)
						}
					</Animated.View>
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
