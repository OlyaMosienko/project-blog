import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectUserRole } from '../../selectors';
import { H2, PrivateContent } from '../../components';
import { TableRow, UserRow } from './components';
import { ROLE } from '../../constants';
import { checkAccess, request } from '../../utils';
import styled from 'styled-components';

const UsersContainer = ({ className }) => {
	const [users, setUsers] = useState([]);
	const [roles, setRoles] = useState([]);
	const [errorMessage, setErrorMessage] = useState(null);
	const [shouldUpdateUsersList, setShouldUpdateUsersList] = useState(false);
	const userRole = useSelector(selectUserRole);

	useEffect(() => {
		if (!checkAccess([ROLE.ADMIN], userRole)) return;

		Promise.all([request('/users'), request('/users/roles')]).then(
			([usersRes, rolesRes]) => {
				if (usersRes.error || rolesRes.error) {
					setErrorMessage(usersRes.error || rolesRes.error);
					return;
				}

				setRoles(rolesRes.data);
				setUsers(usersRes.data);
			},
		);
	}, [shouldUpdateUsersList, userRole]);

	const onUserRemove = (userId) => {
		if (!checkAccess([ROLE.ADMIN], userRole)) return;

		request(`/users/${userId}`, 'DELETE').then(() => {
			setShouldUpdateUsersList(!shouldUpdateUsersList);
		});
	};

	return (
		<div className={className}>
			<PrivateContent access={[ROLE.ADMIN]} serverError={errorMessage}>
				<H2>Пользователи</H2>
				<div>
					<TableRow>
						<div className="login-column">Логин</div>
						<div className="registed-at-column">Дата регистрации</div>
						<div className="role-column">Роль</div>
					</TableRow>
					{users.map(({ id, login, registeredAt, roleId }) => (
						<UserRow
							key={id}
							id={id}
							login={login}
							registedAt={registeredAt}
							roleId={roleId}
							roles={roles.filter(
								({ id: roleId }) => roleId !== ROLE.GUEST,
							)}
							onUserRemove={() => onUserRemove(id)}
						/>
					))}
				</div>
			</PrivateContent>
		</div>
	);
};

export const Users = styled(UsersContainer)`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 570px;
	margin: 0 auto;
	font-size: 18px;
`;
