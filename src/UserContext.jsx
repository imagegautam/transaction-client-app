import { createContext, useContext, useEffect, useState } from "react";
import { fetchTrans } from "./helpers/axiosHelper";
import { toast } from "react-toastify";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvder = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [transactions, setTransactions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    userStr && setLoggedInUser(JSON.parse(userStr));
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      calculateChartData();
    }
  }, [transactions]);

  const getUserTransactions = async () => {
    const { status, message, trans } = await fetchTrans();

    if (status === "error") {
      toast.error(message);
    } else {
      console.log("Transactions:", trans);  // Log transactions
      setTransactions(trans);
    }
  };

  const calculateChartData = () => {
    const income = transactions.reduce((acc, item) => {
      return item.type.toLowerCase() === "income" ? acc + item.amount : acc;
    }, 0);

    const expenses = transactions.reduce((acc, item) => {
      return item.type.toLowerCase() === "expenses" ? acc + item.amount : acc;
    }, 0);

    console.log("Income:", income, "Expenses:", expenses);  // Log calculated values

    setChartData([income, expenses]);
  };

  return (
    <UserContext.Provider
      value={{
        loggedInUser,
        setLoggedInUser,
        transactions,
        setTransactions,
        getUserTransactions,
        showForm,
        setShowForm,
        chartData,
        setChartData,
        calculateChartData
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
