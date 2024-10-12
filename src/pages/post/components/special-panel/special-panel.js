import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon } from '../../../../components';
import { useServerRequest } from '../../../../hooks';
import styled from 'styled-components';
import { CLOSE_MODAL, openModal, removePostAsync } from '../../../../actions';

const SpecialPanelContainer = ({ className, id, publishedAt, editButton }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const navigate = useNavigate();

	const onPostRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить статью?',
				onConfirm: () => {
					dispatch(removePostAsync(requestServer, id)).then(() =>
						navigate('/'),
					);
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	return (
		<div className={className}>
			<div className="published-at">
				{publishedAt && <Icon id="calendar-o" size="18px" />}
				{publishedAt}
			</div>
			<div className="buttons">
				{editButton}
				{publishedAt && (
					<Icon
						isButton={true}
						id="trash-o"
						size="21px"
						onClick={() => onPostRemove(id)}
					/>
				)}
			</div>
		</div>
	);
};

export const SpecialPanel = styled(SpecialPanelContainer)`
	display: flex;
	justify-content: space-between;
	font-size: 18px;
	margin: ${({ margin }) => margin};

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
