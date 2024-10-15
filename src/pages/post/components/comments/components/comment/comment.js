import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../../../components';
import { CLOSE_MODAL, openModal, removeCommentAsync } from '../../../../../../actions';
import { useServerRequest } from '../../../../../../hooks';
import { ROLE } from '../../../../../../constants';
import { selectUserRole } from '../../../../../../selectors';
import styled from 'styled-components';

const CommentContainer = ({ className, postId, id, author, content, publishedAt }) => {
	const dispatch = useDispatch();
	const requestServer = useServerRequest();
	const userRole = useSelector(selectUserRole);

	const onCommentRemove = (id) => {
		dispatch(
			openModal({
				text: 'Удалить комментарий?',
				onConfirm: () => {
					dispatch(removeCommentAsync(requestServer, postId, id));
					dispatch(CLOSE_MODAL);
				},
				onCancel: () => dispatch(CLOSE_MODAL),
			}),
		);
	};

	const isAdminOrModerator = [ROLE.ADMIN, ROLE.MODERATOR].includes(userRole);

	return (
		<div className={className}>
			<div className="comment">
				<div className="information-panel">
					<div className="author">
						<Icon id="user-circle-o" size="18px" />
						{author}
					</div>
					<div className="published-at">
						<Icon id="calendar-o" size="18px" />
						{publishedAt}
					</div>
				</div>
				<div className="comment-text">{content}</div>
			</div>
			{isAdminOrModerator && (
				<Icon
					isButton={true}
					id="trash-o"
					size="21px"
					onClick={() => onCommentRemove(id)}
				/>
			)}
		</div>
	);
};

export const Comment = styled(CommentContainer)`
	display: flex;
	gap: 10px;
	margin-top: 10px;

	& .comment {
		display: flex;
		flex-direction: column;
		width: 550px;
		padding: 5px 10px;
		border: 1px solid black;
	}

	& .information-panel {
		display: flex;
		justify-content: space-between;
	}

	& .author,
	& .published-at {
		display: flex;
		gap: 10px;
	}
`;

Comment.propTypes = {
	postId: PropTypes.string.isRequired,
	id: PropTypes.number.isRequired,
	author: PropTypes.string.isRequired,
	content: PropTypes.string.isRequired,
	publishedAt: PropTypes.string.isRequired,
};
