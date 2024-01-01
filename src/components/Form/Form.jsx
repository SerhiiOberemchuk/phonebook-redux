import { useDispatch, useSelector } from 'react-redux';
import { addName, addNumber } from 'store/action';

export const FormAddContacts = ({ handleAddContact }) => {
  const name = useSelector(state => state.form.name);
  const number = useSelector(state => state.form.number);

  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      dispatch(addName(value));
    } else if (name === 'number') {
      dispatch(addNumber(value));
    }
  };
  const handleSubmit = e => {
    e.preventDefault();
    handleAddContact();
  };

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          name="name"
          id="name"
          onChange={e => handleChange(e)}
          value={name}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="number" className="form-label">
          Number
        </label>
        <input
          type="tel"
          className="form-control"
          name="number"
          id="number"
          value={number}
          onChange={e => handleChange(e)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Add contact
      </button>
    </form>
  );
};
