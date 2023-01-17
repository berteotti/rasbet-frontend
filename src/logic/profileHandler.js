import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../api/api";
import { queryClient } from "../query";


//mutates user info
export const useMutateUser = (userId, email, username, firstName, lastName) => {
  return useMutation(
    () =>
      updateUser({
        id: userId,
        email,
        username,
        first_name: firstName,
        last_name: lastName,
      }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["user"], data);
      },
    }
  );
};

//updates the user info
export const useUpdateUser = (user, walletBalance) => {
  const [username, setUsername] = useState(user?.username);
  const [firstName, setFirstName] = useState(user?.first_name);
  const [lastName, setLastnName] = useState(user?.last_name);
  const [email, setEmail] = useState(user?.email);
  const [amount, setAmount] = useState(walletBalance);
  const [defAmount, setSum] = useState(0);

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleFirstNameChange = (event) => setFirstName(event.target.value);
  const handleLastNameChange = (event) => setLastnName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const incrementAmount = (event) => setAmount(event.target.value);
  const handleSum = () => setSum(Number(defAmount) + Number(amount));
  const handleWallet = (balance) => setSum(balance);
  const handleDec = () => {
    if (Number(defAmount) === 0) {
      window.alert("Não possui dinheiro na conta.");
    } else if (Number(amount) > Number(defAmount)) {
      window.alert("Quantia excede o valor que está na conta.");
    } else setSum(Number(defAmount) - Number(amount));
  };

  return {
    username,
    firstName,
    lastName,
    email,
    amount,
    defAmount,
    handleUsernameChange,
    handleFirstNameChange,
    handleLastNameChange,
    handleEmailChange,
    incrementAmount,
    handleSum,
    handleDec,
    handleWallet,
    setAmount,
  };
};
