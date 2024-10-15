import { useLayoutEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Icon, Input } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { sanitizeContent } from './utils';
import { useServerRequest } from '../../../../hooks';
import { savePostAsync } from '../../../../actions';
import styled from 'styled-components';
import { PROP_TYPE } from '../../../../constants';

const PostFormContainer = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
	const [titleValue, setTitleValue] = useState(title);
	const contentRef = useRef(null);

	useLayoutEffect(() => {
		setImageUrlValue(title);
		setTitleValue(title);
	}, [imageUrl, title]);

	const dispatch = useDispatch();
	const requestServer = useServerRequest();

	const navigate = useNavigate();

	const onSave = () => {
		const newContent = sanitizeContent(contentRef.current.innerHTML);

		dispatch(
			savePostAsync(requestServer, {
				id,
				imageUrl: imageUrlValue,
				title: titleValue,
				content: newContent,
			}),
		).then(({ id }) => navigate(`/post/${id}`));
	};

	return (
		<div className={className}>
			<Input
				onChange={({ target }) => setImageUrlValue(target.value)}
				value={imageUrlValue}
				placeholder="Изображение..."
			/>
			<Input
				onChange={({ target }) => setTitleValue(target.value)}
				value={titleValue}
				placeholder="Заголовок..."
			/>
			<SpecialPanel
				margin="20px 0"
				id={id}
				publishedAt={publishedAt}
				editButton={
					<Icon isButton={true} id="floppy-o" size="21px" onClick={onSave} />
				}
			/>
			<div
				ref={contentRef}
				contentEditable={true}
				suppressContentEditableWarning={true}
				className="post-text"
			>
				{content}
			</div>
		</div>
	);
};

export const PostForm = styled(PostFormContainer)`
	& img {
		float: left;
		margin: 0 30px 10px 0;
	}

	& input + input {
		margin-top: 10px;
	}

	& .post-text {
		font-size: 18px;
		white-space: pre-line;
		min-height: 80px;
		border: 1px solid #000;
	}
`;

PostForm.propTypes = {
	post: PROP_TYPE.POST.isRequired,
};
