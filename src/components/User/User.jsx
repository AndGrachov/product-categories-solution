import cn from 'classnames';

export const User = ({ user, activeUser, setUser }) => (
  <a
    data-cy="FilterAllUsers"
    href="#/"
    className={cn({ 'is-active': user.id === activeUser })}
    onClick={() => setUser(user.id)}
  >
    {user.name}
  </a>
);
