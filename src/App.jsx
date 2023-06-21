import React, { useEffect, useState } from 'react'

import {
	Bird,
	PageContainer,
	GameBox,
	Obstacle,
	EndMessage,
} from './App.styled.js'

const BIRD_SIZE = 25
const GAME_WIDTH = 400
const GAME_HEIGHT = 700
const GRAVITY = 8
const JUMP_HEIGHT = 90
const OBSTACLE_WIDTH = 50
const OBSTACLE_GAP = 250
const SCORE = 0

export const App = () => {
	const [birdPosition, setBirdPosition] = useState(375)
	const [gameStarted, setGameStarted] = useState(false)
	const [obstacleHeight, setObstacleHeight] = useState(175)
	const [obstacleLeft, setObstacleLeft] = useState(GAME_WIDTH - OBSTACLE_WIDTH)
	const [score, setScore] = useState(SCORE)
	const [showEndMessage, setShowEndMessage] = useState(false)

	const bottomObstacleHeight = GAME_HEIGHT - OBSTACLE_GAP - obstacleHeight

	useEffect(() => {
		let timeId
		if (gameStarted && birdPosition < GAME_HEIGHT - BIRD_SIZE) {
			timeId = setInterval(() => {
				setBirdPosition((birdPosition) => birdPosition + GRAVITY)
			}, 25)
		}

		return () => {
			clearInterval(timeId)
		}
	}, [birdPosition, gameStarted])

	useEffect(() => {
		let obstacleId
		if (gameStarted && obstacleLeft >= -OBSTACLE_WIDTH) {
			obstacleId = setInterval(() => {
				setObstacleLeft((obstacleLeft) => obstacleLeft - 7)
			}, 25)

			return () => {
				clearInterval(obstacleId)
			}
		} else {
			setObstacleLeft(GAME_WIDTH - OBSTACLE_WIDTH)
			setObstacleHeight(
				Math.floor(Math.random() * (GAME_HEIGHT - OBSTACLE_GAP))
			)
		}
		setScore((score) => score + 1)
	}, [obstacleLeft, gameStarted])

	useEffect(() => {
		const collideWithTop = (birdPosition >= 0) & (birdPosition < obstacleHeight)
		const collideWithBottom =
			(birdPosition <= GAME_HEIGHT) & (birdPosition >= GAME_HEIGHT - bottomObstacleHeight)

		if (
			obstacleLeft >= 0 &&
			obstacleLeft <= OBSTACLE_WIDTH &&
			(collideWithTop || collideWithBottom)
		) {
			setGameStarted(false)
			setBirdPosition(375)
			setShowEndMessage(true)
		}
	}, [birdPosition, obstacleHeight, bottomObstacleHeight, obstacleLeft])

	const handleClick = () => {
		let newBirdPosition = birdPosition - JUMP_HEIGHT
		if (showEndMessage) {
			return
		}
		if (!gameStarted) {
			setGameStarted(true)
			setScore(SCORE)
			setBirdPosition(375)
		}
		if (birdPosition < 0) {
			setBirdPosition(0)
		} else {
			setBirdPosition(newBirdPosition)
		}
	}

	const handleNewGame = () => {
		setGameStarted(true)
		setScore(SCORE)
		setShowEndMessage(false)
	}

	return (
		<PageContainer onClick={handleClick}>
			<GameBox
				width={GAME_WIDTH}
				height={GAME_HEIGHT}>
				<Obstacle
					top={0}
					width={OBSTACLE_WIDTH}
					height={obstacleHeight}
					left={obstacleLeft}
				/>
				<Obstacle
					top={GAME_HEIGHT - (obstacleHeight + bottomObstacleHeight)}
					width={OBSTACLE_WIDTH}
					height={bottomObstacleHeight}
					left={obstacleLeft}
				/>
				<Bird
					size={BIRD_SIZE}
					top={birdPosition}
				/>
			</GameBox>
			<span>Score: {score}</span>

			{showEndMessage && (
				<EndMessage>
					<h1>GAME OVER</h1>
					<h3>Your score was {score}</h3>
					<button onClick={handleNewGame}>Play Again</button>
				</EndMessage>
			)}
		</PageContainer>
	)
}
