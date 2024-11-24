import { useSelector } from 'react-redux';
import {
	selectModalIsOpen,
	selectModalOnCancel,
	selectModalOnConfirm,
	selectModalText,
} from '../../selectors';
import { Button } from '../button/button';
import styled from 'styled-components';

const ModalContainer = ({ className }) => {
	const isOpen = useSelector(selectModalIsOpen);
	const text = useSelector(selectModalText);
	const onConfirm = useSelector(selectModalOnConfirm);
	const onCancel = useSelector(selectModalOnCancel);

	if (!isOpen) return null;

	return (
		<div className={className}>
			<div className="overlay"></div>
			<div className="box">
				<h3>{text}</h3>
				<div className="buttons">
					<Button width="120px" onClick={onConfirm}>
						Да
					</Button>
					<Button width="120px" onClick={onCancel}>
						Отмена
					</Button>
				</div>
			</div>
		</div>
	);
};

export const Modal = styled(ModalContainer)`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	z-index: 20;
	left: 0;
	top: 0;
	bottom: 0;
	right: 0;

	& .overlay {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 20;
		background-color: rgba(0, 0, 0, 0.7);
	}

	& .box {
		text-align: center;
		background: #fff;
		border: 3px solid #000;
		padding: 0 20px 20px;
		width: 400px;
		position: relative;
		z-index: 30;
	}

	& .buttons {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 10px;
	}
`;
