// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "hardhat/console.sol";
contract ToDo {
    enum TaskStatus { Unassigned, Assigned, InProgress, Completed}
    event TaskStatusUpdate(uint256 taskId, TaskStatus status, address taskmodifier);
    
    struct Task {
        uint256 id;
        string name;
        string description;
        address assignedTo;
        TaskStatus status;
    }

    Task[] public tasks;
    address public owner;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can perform this action");
        _;
    }

    function createTask(string memory _name, string memory _description) public onlyOwner {
        uint256 taskId = tasks.length + 1;
        tasks.push(Task(taskId, _name, _description, address(0), TaskStatus.Unassigned));
        emit TaskStatusUpdate(taskId,TaskStatus.Unassigned,msg.sender);
    }

    function assignTask(uint256 _taskId, address _account) public onlyOwner {
        require(tasks[_taskId].status == TaskStatus.Unassigned,"Only Unassigned Task Can be Assigned");
        tasks[_taskId].assignedTo = _account;
        tasks[_taskId].status = TaskStatus.Assigned;
        emit TaskStatusUpdate(_taskId,TaskStatus.Assigned,msg.sender);
    }

    function markTaskAsInProgress(uint256 _taskId) public {
        require(tasks[_taskId].assignedTo == msg.sender, "Only assigned user can mark task in progress");
        require(tasks[_taskId].status != TaskStatus.Completed, "Completed Task cannot be mark as in progress");
        tasks[_taskId].status = TaskStatus.InProgress;
        emit TaskStatusUpdate(_taskId,TaskStatus.InProgress,msg.sender);
    }

    function markTaskCompleted(uint256 _taskId) public {
        require(
            tasks[_taskId].assignedTo == msg.sender || msg.sender == owner,
            "Only assigned user or owner can mark task completed"
        );
        tasks[_taskId].status = TaskStatus.Completed;
        emit TaskStatusUpdate(_taskId,TaskStatus.Completed,msg.sender);
    }

    function getTasks() public view returns (Task[] memory) {
        return tasks;
    }

    function getTaskStatus(uint256 _taskId) public view returns (TaskStatus) {
        return tasks[_taskId].status;
    }

}