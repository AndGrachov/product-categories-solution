import { User } from '../User/User';

export const UsersList = ({ users, activeUser, setUser }) =>
  users.map(user => (
    <User key={user.id} user={user} activeUser={activeUser} setUser={setUser} />
  ));
