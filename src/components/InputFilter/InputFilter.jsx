export const InputFilter = ({ value, setValue }) => {
  return (
    <p className="control has-icons-left has-icons-right">
      <input
        data-cy="SearchField"
        type="text"
        className="input"
        placeholder="Search"
        value={value}
        onChange={event => {
          setValue(event.target.value);
        }}
      />

      <span className="icon is-left">
        <i className="fas fa-search" aria-hidden="true" />
      </span>

      {value.length !== 0 && (
        <span className="icon is-right">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="ClearButton"
            type="button"
            className="delete"
            onClick={() => setValue('')}
          />
        </span>
      )}
    </p>
  );
};
