import { useEffect, useState } from 'react';
import styled from 'styled-components';

const FooterContainer = ({ className }) => {
	const [city, setCity] = useState('');
	const [temperature, setTemperature] = useState('');
	const [weather, setWeather] = useState('');

	useEffect(() => {
		fetch(
			'https://api.openweathermap.org/data/2.5/weather?q=Moscow&units=metric&lang=ru&appid=6356be1f522d6744d72292e1f744b976',
		)
			.then((res) => res.json())
			.then(({ name, main, weather }) => {
				setCity(name);
				setTemperature(Math.round(main.temp));
				setWeather(weather[0].description);
			});
	}, []);

	return (
		<footer className={className}>
			<div>
				<div>Блог веб-разработчика</div>
				<div>web@developer.ru</div>
			</div>
			<div>
				<div>
					{city},{' '}
					{new Date().toLocaleString('ru', { day: 'numeric', month: 'long' })}
				</div>
				<div>
					{temperature}&deg;, {weather}
				</div>
			</div>
		</footer>
	);
};

export const Footer = styled(FooterContainer)`
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-weight: bold;
	width: 1000px;
	height: 120px;
	background-color: #fff;
	padding: 20px 40px;
	box-shadow: 0 2px 18px #000;
`;
