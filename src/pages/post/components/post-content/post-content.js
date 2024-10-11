import { H2, Icon } from '../../../../components';
import styled from 'styled-components';

const PostContentContainer = ({
	className,
	post: { title, imageUrl, content, publishedAt },
}) => {
	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<div className="special-panel">
				<div className="published-at">
					<Icon id="calendar-o" size="18px" />
					{publishedAt}
				</div>
				<div className="buttons">
					<Icon id="pencil-square-o" size="21px" />
					<Icon id="trash-o" size="21px" />
				</div>
			</div>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentContainer)`
	& img {
		float: left;
		margin: 0 30px 10px 0;
	}

	& .special-panel {
		display: flex;
		justify-content: space-between;
		font-size: 18px;
		margin: -20px 0 20px;
	}

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

	& .post-text {
		font-size: 18px;
	}
`;
