import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const BIRD_SIZE = 20
const GAME_WIDTH = 1000
const GAME_HEIGHT = 750
const GRAVITY = 6
const JUMP_HEIGHT = 100
const OBSTACLE_WIDTH = 40
const OBSTACLE_GAP = 200

export const App = () => {
	const [birdPosition, setBirdPosition] = useState(250)
	const [gameStarted, setGameStarted] = useState(false)
	const [obstacleHeight, setObstacleHeight] = useState(200)
	const [obstacleLeft, setObstacleLeft] = useState(GAME_WIDTH - OBSTACLE_WIDTH)
	const [score, setScore] = useState(0)
	const [showEndMessage, setShowEndMessage] = useState(false)

	const bottomObstacleHeight = GAME_HEIGHT - OBSTACLE_GAP - obstacleHeight

	useEffect(() => {
		let timeId
		if (gameStarted && birdPosition < GAME_HEIGHT - BIRD_SIZE) {
			timeId = setInterval(() => {
				setBirdPosition((birdPosition) => birdPosition + GRAVITY)
			}, 50)
		}

		return () => {
			clearInterval(timeId)
		}
	}, [birdPosition, gameStarted])

	useEffect(() => {
		let obstacleId
		if (gameStarted && obstacleLeft >= -OBSTACLE_WIDTH) {
			obstacleId = setInterval(() => {
				setObstacleLeft((obstacleLeft) => obstacleLeft - 10)
			}, 50)

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
			(birdPosition <= 500) & (birdPosition >= 500 - bottomObstacleHeight)

		if (
			obstacleLeft >= 0 &&
			obstacleLeft <= OBSTACLE_WIDTH &&
			(collideWithTop || collideWithBottom)
		) {
			setGameStarted(false)
			setBirdPosition(250)
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
      setScore(0)
      setBirdPosition(250)
    }
    if (birdPosition < 0) {
			setBirdPosition(0)
		} else {
			setBirdPosition(newBirdPosition)
		}
	}

  const handleNewGame = () => {
    setGameStarted(true)
    setScore(0)
    setShowEndMessage(false)
  }

	return (
		<Div onClick={handleClick}>
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
		</Div>
	)
}

const Bird = styled.div`
	position: absolute;
	background-color: red;
	height: ${(props) => props.size}px;
	width: ${(props) => props.size}px;
	top: ${(props) => props.top}px;
	border-radius: 50%;
`

const Div = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	& span {
		color: white;
		font-size: 24px;
		position: absolute;
	}
`

const GameBox = styled.div`
	height: ${(props) => props.height}px;
	width: ${(props) => props.width}px;
	background-color: blue;
	overflow: hidden;
`

const Obstacle = styled.div`
	position: relative;
	top: ${(props) => props.top}px;
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	left: ${(props) => props.left}px;
	background-color: green;
`

const EndMessage = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: hsla(0, 0%, 0%, 0.75);
	& h1 {
		font-weight: bold;
		color: red;
		font-size: 40px;
	}
	& h3 {
    font-size: 32px;
    font-style: italic;
		color: yellow;
	}
	& button {
		font-weight: 500;
		line-height: 1.75;
		letter-spacing: 0.125rem;
		text-transform: uppercase;
		text-decoration: none;
		color: hsl(0, 0%, 100%);
		background-color: hsl(120, 100%, 30%);
		border: 0.25rem solid hsl(0, 0%, 100%);
		border-radius: 0.75rem;
		margin-top: 2.5rem;
		padding: 0.25rem 1rem;
		transition: all 0.25s ease;
		font-size: 1.5rem;

		&:hover {
			cursor: pointer;
			color: hsl(120, 100%, 30%);
			background-color: hsl(0, 0%, 100%);
			border-color: hsl(120, 100%, 30%);
		}
	}
`
