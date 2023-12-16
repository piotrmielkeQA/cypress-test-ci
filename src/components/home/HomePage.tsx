import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Roles, RootState } from '../../types';
import { _delete, getAll } from '../../_actions/user.actions';
import { useAppDispatch } from '../../_helpers/store';
import UserTable from './UserTable';

function HomePage() {
    const users = useSelector((state: RootState) => state.users);
    const user = useSelector((state: RootState) => state.authentication.user);
    const isAdmin = user.roles.includes(Roles.ROLE_ADMIN)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getAll());
    }, []);

    return (
        <div className="col-lg-8 offset-lg-2">
            <h1>Hi {user.firstName}!</h1>
            <p>You're logged in! Congratulations :)</p>
            <h3>All registered users:</h3>
            {users.loading && <em>Loading users...</em>}
            {users.error && <span className="text-danger">ERROR: {users.error}</span>}
            {users.items && <UserTable users={users.items} isAdmin={isAdmin} />}
            <p>
                <Link id="logout" to="/login" onClick={() => true}>Logout</Link>
            </p>
        </div>
    );
}

export { HomePage };