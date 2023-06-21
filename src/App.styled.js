import styled from 'styled-components'

const Bird = styled.div`
	position: absolute;
	background-color: red;
	height: ${(props) => props.size}px;
	width: ${(props) => props.size}px;
	top: ${(props) => props.top}px;
  left: 10%;
	border-radius: 50%;
`

const PageContainer = styled.div`
  position: relative;
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
  position: relative;
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
	justify-content: flex-start;
	align-items: center;
	background-color: hsla(0, 0%, 0%, 0.75);
	& h1 {
    padding-top: 5rem;
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

export { Bird, PageContainer, GameBox, Obstacle, EndMessage }
