import styled from 'styled-components';
import { Icon } from '../../../../components';

const SpecialPanelContainer = ({ className, publishedAt, editButton }) => {
	return (
		<div className={className}>
			<div className="published-at">
				<Icon id="calendar-o" size="18px" />
				{publishedAt}
			</div>
			<div className="buttons">
				{editButton}
				<Icon id="trash-o" size="21px" />
			</div>
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	font-size: 18px;
	margin: ${(margin) => margin};

	& .published-at {
		display: flex;
		align-items: baseline;
		gap: 8px;
	}

	& .buttons {
		display: flex;
		align-items: center;
		gap: 10px;
	}
`;
