import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Balance from "./components/Balance";
import Form from "./components/Form";
import Layout from "./components/Layout";
import Transactions from "./components/Transactions/Transactons";
import { fetchTransactions } from "./rtk/features/transaction/transactionSlice";

function App() {
  const dispatch = useDispatch();
  const { transactions } = useSelector((state) => state.transaction);
  useEffect(() => {
    dispatch(fetchTransactions());
  }, []);
  return (
    <Layout>
      <Balance />
      <Form />
      <Transactions />
    </Layout>
  );
}

export default App;
