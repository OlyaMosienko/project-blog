import { Link } from 'react-router-dom';
import { Icon } from '../../../../components';
import styled from 'styled-components';

const PostCardContainer = ({
	className,
	id,
	title,
	imageUrl,
	publishedAt,
	commentsCount,
}) => {
	return (
		<div className={className}>
			<Link to={`/post/${id}`}>
				<img src={imageUrl} alt={title} />
				<div className="post-card-footer">
					<h4>{title}</h4>
					<div className="post-card-info">
						<div className="published-at">
							<Icon id="calendar-o" size="18px" />
							{publishedAt}
						</div>
						<div className="comments-count">
							<Icon id="comment-o" size="18px" />
							{commentsCount}
						</div>
					</div>
				</div>
			</Link>
		</div>
	);
};

export const PostCard = styled(PostCardContainer)`
	display: flex;
	flex-direction: column;
	max-width: 280px;
	border: 1px solid #000;

	& img {
		display: block;
		width: 100%;
	}

	& .post-card-footer {
		border-top: 1px solid #000;
		padding: 5px;
		& h4 {
			margin: 0 0 5px;
		}
	}

	& .post-card-info {
		display: flex;
		justify-content: space-between;
	}

	& .published-at,
	& .comments-count {
		display: flex;
		align-items: center;
		gap: 10px;
	}
`;
