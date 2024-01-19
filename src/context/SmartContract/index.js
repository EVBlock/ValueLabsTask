import React, { useEffect, useState } from "react";
import { ethers } from 'ethers';
import ToDo from '../../artifacts/contracts/ToDo.sol/ToDo.json';
export const SmartContractContext = React.createContext();

export const SmartContractProvider = ({ children }) => {
    const [walletFound, setWalletFound] = useState(false);
    const [account, setAccount] = useState("");
    const [contract, setContract] = useState(null);
    const [todoList, setTodoList] = useState([]);
    const initConnection = async () => {
        if (typeof window.ethereum !== "undefined") {
            setWalletFound(true);
            const account = await window.ethereum.request({ method: "eth_requestAccounts" });
            console.log('Value of account is', account)
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const newSigner = provider.getSigner();
            setAccount(account[0]);
            setContract(
                new ethers.Contract(
                    "0x9Cb579A3aF29EEaA19C6c8fFFFa9bc36C0Fc561F",
                    ToDo.abi,
                    newSigner
                )
            );
        } else {
            console.log("Please install Metamask.")
        }
    }
    const getToDoList = async () => {
        const _todoList = await contract?.getTasks();
        setTodoList(_todoList);
    }
    useEffect(() => {
        initConnection();
        getToDoList();
    }, [account]);

    const saveTodo = async ({Name, description, deadline, author, isCompleted }) => {
        try {
        const _todo = await contract?.createTask(Name, description);
        const data = await _todo.wait();
        const _todoList = await contract.getTasks()
        setTodoList(_todoList);
        return true;
        } catch (error) {
           alert('something went wrong...', error) 
           return false;
        }
      }
      const updateToDo = async (index) => {
        try {
        const _todo = await contract?.markTaskCompleted(index);
        const data = await _todo.wait();
        const _todoList = await contract.getTasks()
        setTodoList(_todoList);
        return true;
        } catch (error) {
            alert('something went wrong...', error) 
            return false;
        }
      }

      const assignToTask = async (index, author) => {
        try {
        const _todo = await contract?.assignTask(index-1, author);
        const data = await _todo.wait();
        const _todoList = await contract.getTasks()
        setTodoList(_todoList);
        return true;
        } catch (error) {
            alert('something went wrong...', error) 
            return false;
        }
      }

      const markInProgress = async (index) => {
        try {
        const _todo = await contract?.markTaskAsInProgress(index);
        const data = await _todo.wait();
        const _todoList = await contract.getTasks()
        setTodoList(_todoList);
        return true;
        } catch (error) {
            alert('something went wrong...', error) 
            return false;
        }
      }
    return (
        <SmartContractContext.Provider value={{ walletFound, account, contract, initConnection, saveTodo, updateToDo, assignToTask,markInProgress ,todoList}}>
            {children}
        </SmartContractContext.Provider>
    )
}