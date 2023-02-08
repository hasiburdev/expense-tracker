import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeTransaction,
  createTransaction,
  editInActive,
} from "../rtk/features/transaction/transactionSlice";

const Form = () => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [editMode, setEditMode] = useState(false);
  const { isLoading, isError, editing } = useSelector(
    (state) => state.transaction
  );

  const dispatch = useDispatch();

  const reset = () => {
    setName("");
    setType("");
    setAmount("");
  };
  const handleCancelEdit = () => {
    dispatch(editInActive());
    setEditMode(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createTransaction({
        name,
        type,
        amount: Number(amount),
      })
    );
    reset();
  };
  const handleUpdate = (e) => {
    e.preventDefault();
    dispatch(
      changeTransaction({ id: editing.id, data: { name, type, amount } })
    );
    reset();
    setEditMode(false);
  };

  useEffect(() => {
    const { id, name, type, amount } = editing || {};
    if (id) {
      setEditMode(true);
      setName(name);
      setType(type);
      setAmount(amount);
    } else {
      reset();
    }
  }, [editing]);

  return (
    <div className="form">
      <h3>Add new transaction</h3>

      <form onSubmit={editMode ? handleUpdate : handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="transaction_name"
            placeholder="My Salary"
          />
        </div>
        <div className="form-group radio">
          <label>Type</label>
          <div className="radio_group">
            <input
              type="radio"
              required
              value="income"
              name="transaction_type"
              checked={type === "income"}
              onChange={() => setType("income")}
            />
            <label>Income</label>
          </div>
          <div className="radio_group">
            <input
              type="radio"
              value="expense"
              name="transaction_type"
              placeholder="Expense"
              checked={type === "expense"}
              onChange={() => setType("expense")}
            />
            <label>Expense</label>
          </div>
        </div>
        <div className="form-group">
          <label>Amount</label>
          <input
            required
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            placeholder="300"
            name="transaction_amount"
          />
        </div>
        <button disabled={isLoading} className="btn">
          {editMode ? "Update Transaction" : "Add Transaction"}
        </button>
        {!isLoading && isError && (
          <p className="error">Oops! An error occured!</p>
        )}
      </form>
      {editMode && (
        <button className="btn cancel_edit" onClick={handleCancelEdit}>
          Cancel Edit
        </button>
      )}
    </div>
  );
};

export default Form;
