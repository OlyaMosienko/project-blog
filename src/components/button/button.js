import styled from 'styled-components';

const ButtonContainer = ({ children, className, width, ...props }) => (
	<button className={className} {...props}>
		{children}
	</button>
);

export const Button = styled(ButtonContainer)`
	font-size: 18px;
	background-color: #eee;
	border: 1px solid #000;
	padding: 5px 15px;
	width: ${({ width = '100%' }) => width};
	cursor: pointer;

	&:disabled {
		cursor: default;
	}
`;
