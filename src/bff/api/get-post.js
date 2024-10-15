import { transformPost } from '../transformers';

export const getPost = (postId) =>
	fetch(`http://localhost:3005/posts/${postId}`)
		.then((res) => {
			if (res.ok) return res;

			const error =
				res.status === 404
					? 'Страница с таким адресом не найдена'
					: 'Что-то пошло не так:( Попробуйте еще раз позднее';

			return Promise.reject(error);
		})
		.then((loadedPost) => loadedPost.json())
		.then((loadedPost) => loadedPost && transformPost(loadedPost));
