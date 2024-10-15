import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';
import styled from 'styled-components';

const LargeText = styled.div`
	font-size: 48px;
	font-weight: 600;
	line-height: 1;
`;

const SmallText = styled.div`
	font-size: 18px;
	font-weight: 600;
`;

const LogoContainer = ({ className }) => (
	<Link className={className} to="/">
		<Icon isButton={true} id="code" size="70px" />
		<div>
			<LargeText>Блог</LargeText>
			<SmallText>веб-разработчика</SmallText>
		</div>
	</Link>
);

export const Logo = styled(LogoContainer)`
	display: flex;
	align-items: center;
	gap: 10px;
`;
