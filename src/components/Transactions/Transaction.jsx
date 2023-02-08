import editImage from "../../assets/images/edit.svg";
import deleteImage from "../../assets/images/delete.svg";
import { useDispatch } from "react-redux";
import { editActive } from "../../rtk/features/transaction/transactionSlice";
import { deleteTransaction } from "../../rtk/features/transaction/transactionAPI";

const Transaction = ({ transaction = {} }) => {
  const { name, amount, type, id } = transaction;
  const dispatch = useDispatch();
  const handleEdit = () => {
    dispatch(editActive({ name, amount, type, id }));
  };
  const handleDelete = () => {
    dispatch(deleteTransaction(id));
  };
  return (
    <li className={`transaction ${type}`}>
      <p>{name}</p>
      <div className="right">
        <p>৳ {amount}</p>
        <button onClick={handleEdit} className="link">
          <img className="icon" src={editImage} alt="edit" />
        </button>
        <button onClick={handleDelete} className="link">
          <img className="icon" src={deleteImage} alt="delete" />
        </button>
      </div>
    </li>
  );
};
export default Transaction;
