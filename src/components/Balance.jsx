import { useSelector } from "react-redux";
import { numberWithCommas } from "../utils/numberWithCommas";

const Balance = () => {
  const { transactions } = useSelector((state) => state.transaction);

  const calculateBalance = () =>
    transactions.reduce((acc, val) => (acc += val.amount), 0);
  return (
    <div className="top_card">
      <p>Your Current Balance</p>
      <h3>
        <span>৳ </span>
        {transactions?.length > 0 ? (
          <span>{numberWithCommas(calculateBalance())}</span>
        ) : (
          <span>0</span>
        )}
      </h3>
    </div>
  );
};

export default Balance;
