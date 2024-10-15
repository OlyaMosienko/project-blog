import { useEffect, useMemo, useState } from 'react';
import { useServerRequest } from '../../hooks';
import { debounce, getLastPageFromLinks } from './utils';
import { PAGINATION_LIMIT } from '../../constants';
import { Pagination, PostCard, Search } from './components';
import styled from 'styled-components';

const MainContainer = ({ className }) => {
	const [posts, setPosts] = useState([]);
	const [page, setPage] = useState(1);
	const [lastPage, setLastPage] = useState(1);
	const [searchPhrase, setSearchPhrase] = useState('');
	const [shouldSearch, setShouldSearch] = useState(false);

	const requestServer = useServerRequest();

	useEffect(() => {
		requestServer('fetchPosts', searchPhrase, page, PAGINATION_LIMIT).then(
			({ res: { posts, links } }) => {
				setPosts(posts);
				setLastPage(getLastPageFromLinks(links));
			},
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [requestServer, page, shouldSearch]);

	const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

	const onSearch = ({ target }) => {
		setSearchPhrase(target.value);
		startDelayedSearch(!shouldSearch);
	};

	return (
		<div className={className}>
			<div>
				<Search searchPhrase={searchPhrase} onChange={onSearch} />
				{posts.length > 0 ? (
					<div className="post-list">
						{posts.map(
							({ id, title, imageUrl, publishedAt, commentsCount }) => (
								<PostCard
									key={id}
									id={id}
									title={title}
									imageUrl={imageUrl}
									publishedAt={publishedAt}
									commentsCount={commentsCount}
								/>
							),
						)}
					</div>
				) : (
					<div className="no-posts-found">Статьи не найдены</div>
				)}
			</div>
			{lastPage > 1 && posts.length > 0 && (
				<Pagination page={page} lastPage={lastPage} setPage={setPage} />
			)}
		</div>
	);
};

export const Main = styled(MainContainer)`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: calc(100vh - 280px);

	& .post-list {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 40px;
		padding: 40px;
	}

	& .no-posts-found {
		font-size: 18px;
		font-weight: 500;
		text-align: center;
		margin-top: 40px;
	}
`;
