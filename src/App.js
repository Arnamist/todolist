import { useEffect, useState } from "react";
import './App.css';

function App() {
  const [task, setTask] = useState(() => {
    return window.localStorage.getItem('task') || 'Empty'
  });
  const [taskList, setTaskList] = useState(() => {
    return JSON.parse(window.localStorage.getItem('taskList')) || []
  });

  useEffect(() => {
    window.localStorage.setItem('task', task);
    window.localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [task, taskList]);

  function handleAddTask(){
    setTaskList([...taskList, {
      id: Date.now() + Math.random(),
      label: task,  
      completed: false
    }]);
  }

  function handleCheckChange(item){
    console.log(item);
    
    let newTaskList = taskList.map((taskItem) => {
      if (taskItem.id === item.id) {
        return({
          id: taskItem.id,
          label: taskItem.label,
          completed: !taskItem.completed
        })
      }else{
        return (taskItem);
      }
    })
    setTaskList(newTaskList);
  }

  function handleDeleteTask(item){
    let newTask = taskList.filter((taskItem) => taskItem.id !== item.id);
    setTaskList(newTask);
  }


  return (
    <div className="App">
      <h1>Todo List</h1>
      <br/><hr/><br/>
      <div class="grid-container">
        <div class="item1">
          {  
            <input type="text" value={task} placeholder="Enter task here" onChange={(e) => {
              setTask(e.target.value);
            }} />
          }
          <button className="btn" onClick={handleAddTask} >Add</button>
        </div>

        <div class="item2">
          <h3>My Todos</h3><hr/>
          {taskList.map((item) => {
            if (!item.completed){
              return (
                <div key={item.id}>
                  <input type="checkbox" onChange={() => handleCheckChange(item)} checked={item.completed} />
                  <span style={{textDecoration:'none', padding:'0 10px'}}>{item.label}</span>
                  <button onClick={() => handleDeleteTask(item)}>Delete</button>
                </div>
              )
            }           
          })}  
        </div>
        <div class="item3">
          <h3>Completed</h3><hr/>
          {taskList.map((item) => {
            if (item.completed){
              return (
                <div key={item.id}>
                  <input type="checkbox" onChange={() => handleCheckChange(item)} checked={item.completed} />
                  <span style={{textDecoration:'line-through', padding:'0 10px'}}>{item.label}</span>
                  <button onClick={() => handleDeleteTask(item)}>Delete</button>
                </div>
              )
            }           
          })}  
        </div>
      </div>
     

      <br/><hr/><br/>
      <h3>Total Task Details</h3>
      {JSON.stringify(taskList)}
      <br/><br/><hr/>
    </div>
  );
}

export default App;
