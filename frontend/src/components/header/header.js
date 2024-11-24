import { ControlPanel, Logo } from './components';
import styled from 'styled-components';

const Description = styled.div`
	font-style: italic;
`;

const HeaderContainer = ({ className }) => (
	<header className={className}>
		<Logo />
		<Description>
			Веб-технологии
			<br />
			Написание кода
			<br />
			Разбор ошибок
		</Description>
		<ControlPanel />
	</header>
);

export const Header = styled(HeaderContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 1000px;
	height: 120px;
	background-color: #fff;
	padding: 20px 40px;
	box-shadow: 0 -2px 18px #000;
	position: fixed;
	top: 0;
	z-index: 10;
`;
