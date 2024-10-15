import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '../../../../components';
import { Comment } from './components';
import { useServerRequest } from '../../../../hooks';
import { selectUserId, selectUserRole } from '../../../../selectors';
import { addCommentAsync } from '../../../../actions';
import { ROLE } from '../../../../constants';
import styled from 'styled-components';

const CommentsContainer = ({ className, comments, postId }) => {
	const [newComment, setNewComment] = useState('');
	const userId = useSelector(selectUserId);
	const userRole = useSelector(selectUserRole);
	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const onNewCommentAdd = (userId, postId, content) => {
		dispatch(addCommentAsync(requestServer, userId, postId, content));
		setNewComment('');
	};

	const isGuest = userRole === ROLE.GUEST;

	return (
		<div className={className}>
			{!isGuest && (
				<div className="new-comment">
					<textarea
						name="comment"
						value={newComment}
						placeholder="Комментарий..."
						onChange={({ target }) => setNewComment(target.value)}
					></textarea>
					<Icon
						isButton={true}
						id="paper-plane-o"
						size="21px"
						onClick={() => onNewCommentAdd(userId, postId, newComment)}
					/>
				</div>
			)}
			<div className="comments">
				{comments.map(({ id, author, content, publishedAt }) => (
					<Comment
						key={id}
						postId={postId}
						id={id}
						author={author}
						content={content}
						publishedAt={publishedAt}
					/>
				))}
			</div>
		</div>
	);
};

export const Comments = styled(CommentsContainer)`
	display: flex;
	flex-direction: column;
	width: 580px;
	margin: 20px auto;

	& .new-comment {
		display: flex;
		gap: 10px;
		& textarea {
			font-size: 18px;
			width: 550px;
			height: 120px;
			resize: none;
			padding: 10px;
		}
	}
`;
