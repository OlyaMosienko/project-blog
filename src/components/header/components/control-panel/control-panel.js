import { Link, useNavigate } from 'react-router-dom';
import { Icon } from '../../../../components';
import styled from 'styled-components';

const RightAligned = styled.div`
	display: flex;
	justify-content: flex-end;
	gap: 15px;
`;

const StyledLink = styled(Link)`
	font-size: 18px;
	background-color: #eee;
	border: 1px solid #000;
	padding: 5px 15px;
`;

const StyledButton = styled.div`
	cursor: pointer;
`;

const ControlPanelContainer = ({ className }) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<RightAligned>
				<StyledLink to="/login">Войти</StyledLink>
			</RightAligned>
			<RightAligned>
				<StyledButton onClick={() => navigate(-1)}>
					<Icon id="backward" />
				</StyledButton>
				<Link to="post">
					<Icon id="file-text-o" />
				</Link>
				<Link to="users">
					<Icon id="users" />
				</Link>
			</RightAligned>
		</div>
	);
};

export const ControlPanel = styled(ControlPanelContainer)`
	display: flex;
	flex-direction: column;
	gap: 10px;
`;
