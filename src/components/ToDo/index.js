import React, { useContext } from 'react'

import { FaPencilAlt } from 'react-icons/fa';
import { BsFillXCircleFill, BsCheckCircleFill } from 'react-icons/bs'
import { SmartContractContext } from '../../context/SmartContract';
import CompleteTask from '../CompleteTask';
import AssignTask from '../AssignTask';
import MarkInProgress from '../MarkInProgress';
import NoData from './NoData';
const todoKeys = ['id', 'name', 'description', 'status', 'assignedTo'];
export default function RenderToDoList() {
    const [showModal, setShowModal] = React.useState(false);
    const [changeTask, setChangeTask] = React.useState();
    const [selectedIndex, setSelectedIndex] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState({});
    const {todoList} = useContext(SmartContractContext);
    console.log('To list at line 16', todoList)
    const convertData = async (data) => {
        const obj = {};
        todoKeys.forEach(key=>{
            obj[key] = data[key]
        });
        return obj;
    }
    const openModal = async (editedToDo, index) => {
        console.log('Calling openModel with values', editedToDo)
        const data = await convertData(editedToDo)
        console.log('Value of selected data is', data.status)
        setSelectedItem(data);
        setSelectedIndex(index)
        if(data.status === 0) {
            setChangeTask(1)
        }
        if(data.status === 1) {
            setChangeTask(2)
        }
        if(data.status === 2) {
            setChangeTask(3)
        }
        if(data.status === 3){
            setChangeTask(4)
        }
        setShowModal(!showModal);
        console.log('Value of change Task is', changeTask)
    }
    return (
        <>
            {(todoList && todoList.length) ? (<div className='flex justify-center bg-white-900'>
                <div className="relative overflow-x-auto w-full maxHeightForTable">
                    <table className="w-full text-sm text-left text-gray-500 text-gray-400">
                        <thead className="text-xs uppercase bg-white-700 text-gray-400">
                            <tr>
                            <th scope="col" className="sticky top-0 px-6 py-3 bg-gray-700 text-gray-400">
                                    Task Id
                                </th>
                                <th scope="col" className="sticky top-0 px-6 py-3 bg-gray-700 text-gray-400">
                                    Task
                                </th>
                                <th scope="col" className="sticky top-0 px-6 py-3 bg-gray-700 text-gray-400">
                                    Status
                                </th>
                                <th scope="col" className="sticky top-0 px-6 py-3 bg-gray-700 text-gray-400">
                                    Author
                                </th>
                                <th scope="col" className="sticky top-0 px-6 py-3 bg-gray-700 text-gray-400">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {todoList.map((item, index) => (
                                <tr key={index} className="border-b bg-gray-800 border-gray-700">
                                    <td scope="row" className="px-6 py-4">
                                        <div className='text-base font-medium text-gray-300 whitespace-nowrap'>{(item.id).toString()}</div>
                                    </td>
                                    <td scope="row" className="px-6 py-4">
                                        <div className='text-base font-medium text-gray-300 whitespace-nowrap'>{item.name}</div>
                                        <div className='text-xs font-light text-gray-300 whitespace-nowrap'>{item.description}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.status === 0 && 'Unassigned'}
                                        {item.status === 1 && 'Assigned'}
                                        {item.status === 2 && 'InProgress'}
                                        {item.status === 3 && 'Completed'} 
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.status == 3 ?
                                            <BsCheckCircleFill className='bg-green-800 hover:bg-green-500 text-green-500 hover:text-green-200 rounded-full' size={32} /> :
                                            <BsFillXCircleFill className='bg-red-900 hover:bg-red-500 text-red-400 hover:text-red-300 rounded-full' size={32} />}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className='flex items-center'>
                                            <div className='bg-slate-600 hover:bg-slate-500 text-grey-500 hover:text-gray-200 p-2 rounded-full cursor-pointer' onClick={() => openModal(item, index)}><FaPencilAlt size={18} /></div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>) :
                <NoData />}
            {showModal && changeTask === 1? (
                <>
                    <AssignTask todoItem={selectedItem} isEdit={true} index={selectedIndex}  closeModal={() => setShowModal(!showModal)} />
                </>
            ) : null}
            {showModal && changeTask === 2? (
                <>
                    <MarkInProgress todoItem={selectedItem} isEdit={true} index={selectedIndex}  closeModal={() => setShowModal(!showModal)} />
                </>
            ) : null}
            {showModal && changeTask === 3? (
                <>
                    <CompleteTask todoItem={selectedItem} isEdit={true} index={selectedIndex}  closeModal={() => setShowModal(!showModal)} />
                </>
            ) : null}
        </>
    )
}
