import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '', status: 'pending' });

  // Fetch tasks from the backend
  useEffect(() => {
    axios.get('http://localhost:3000/api/tasks')
      .then((response) => setTasks(response.data))
      .catch((error) => console.error(error));
  }, []);

  // Handle Task Creation
  const createTask = () => {
    axios.post('http://localhost:3000/api/tasks', newTask)
      .then((response) => setTasks([...tasks, response.data]))
      .catch((error) => console.error(error));
  };

  // Handle Task Deletion
  const deleteTask = (taskId) => {
    axios.delete(`http://localhost:3000/api/tasks/${taskId}`)
      .then(() => setTasks(tasks.filter(task => task._id !== taskId)))
      .catch((error) => console.error(error));
  };

  // Handle Task Update
  const updateTask = (taskId, updatedData) => {
    axios.put(`http://localhost:3000/api/tasks/${taskId}`, updatedData)
      .then((response) => {
        setTasks(tasks.map(task => task._id === taskId ? response.data : task));
      })
      .catch((error) => console.error(error));
  };

  // Handle Drag and Drop Reordering
  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const reorderedTasks = Array.from(tasks);
    const [movedTask] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, movedTask);
    setTasks(reorderedTasks);
  };

  return (
    <div>
      <h2>Task Management</h2>
      <input
        type="text"
        value={newTask.title}
        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        placeholder="Task Title"
      />
      <textarea
        value={newTask.description}
        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        placeholder="Task Description"
      />
      <button onClick={createTask}>Create Task</button>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="tasks">
          {(provided) => (
            <ul {...provided.droppableProps} ref={provided.innerRef}>
              {tasks.map((task, index) => (
                <Draggable key={task._id} draggableId={task._id} index={index}>
                  {(provided) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <h3>{task.title}</h3>
                      <p>{task.description}</p>
                      <button onClick={() => deleteTask(task._id)}>Delete</button>
                      <button onClick={() => updateTask(task._id, { status: 'completed' })}>Complete</button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default TaskManagement;
