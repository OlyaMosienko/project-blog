import { request } from '../utils';
import { setPostData } from './set-post-data';

export const savePostAsync = (id, newPostData) => (dispatch) => {
	const savePost = id
		? request(`/posts/${id}`, 'PATCH', newPostData)
		: request('/posts', 'POST', newPostData);

	return savePost.then((updatedPost) => {
		dispatch(setPostData(updatedPost.data));

		return updatedPost.data;
	});
};
