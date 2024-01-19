import React, { useContext } from 'react';
import { AiFillCloseCircle } from 'react-icons/ai';
import { SmartContractContext } from '../../context/SmartContract';
export default function Modal({ todoItem, closeModal, isEdit, index }) {
	const { account, saveTodo, updateToDo } = useContext(SmartContractContext);
	console.log(todoItem)
	console.log('Value at line 7 =>>>>>>>>>')
	const getInitialState = (edit, todoObj) => {
		if (edit) {
			todoObj['author'] = account;
			return todoObj;
		}
		return {
			Owner: account,
			Name: 'Your title',
			description: 'Your description'
		}
	}
	const [todo, setTodo] = React.useState(getInitialState(isEdit, todoItem));

	const onChangeSetValue = (field, value) => {
		setTodo((todo) => ({
			...todo,
			[field]: value
		}))
	}
	const actionOnTodo = async () => {
		console.log("todo: => ", todo)
		if (isEdit) {
			console.log('Inside isEdit =>>>>>>>>>>>>>>')
			const res = await updateToDo(index, todo);
			if (res)
				closeModal(false);
		} else {
			const res = await saveTodo(todo);
			console.log('Inside saveTodo =>>>>>>>>>>>>>>',res)
			if (res)
				closeModal(false);
		}
	}
	return (
		<div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-overlay">
			<div className="relative my-2 w-3/4 lg:w-1/3">
				<div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-indigo-900 outline-none focus:outline-none">
					<div className="flex items-center justify-between p-3 border-b border-solid border-gray-300 rounded-t">
						<h5 className="text-xl font-semibold text-white">Task Detail</h5>
						<button
							className="bg-transparent border-0 text-white float-right"
							onClick={() => closeModal(false)}
						>
							<AiFillCloseCircle size={24} />
						</button>
					</div>
					<div className="relative p-3 flex-auto">
						<form className="w-full">
							<label className="block text-white text-sm font-medium my-3">
								Owner
							</label>
							<input type="text"  className="shadow appearance-none border rounded w-full py-2 px-1  text-grey-900 bg-white" value={todo?.Owner} />
							<label className="block text-white text-sm font-medium my-3">
								Name
							</label>
							<input type="text" className="shadow appearance-none border rounded w-full py-2 px-1  text-grey-900" onChange={e => onChangeSetValue('Name', e.target.value)} value={todo?.Name} />
							<label className="block text-white text-sm font-medium my-3">
								Description
							</label>
							<textarea className="shadow appearance-none border rounded w-full py-2 px-1 text-grey-900" onChange={e => onChangeSetValue('description', e.target.value)} value={todo?.description} />
							</form>
					</div>
					<div className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">
						<button
							className="text-red-500 background-transparent font-medium uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
							type="button"
							onClick={() => closeModal(false)}
						>
							Close
						</button>
						<button
							className="text-white bg-indigo-500 rounded-full font-medium uppercase text-sm px-6 py-1 shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
							type="button"
							onClick={() => actionOnTodo()}
						>
							Create Task
						</button>
					</div>
				</div>
			</div>
		</div>
	)
}
