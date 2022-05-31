import { useEffect, useState } from "react";
import './App.css';
import { Button, TextField } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

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
            <TextField label="Enter task here" focused onChange={(e) => { setTask(e.target.value); }} style={{display:"inline", margin: 10}}  sx={{
              input: {
                color: "black",
                background: "white"
              }}}/>
          }
          <Button size="large" variant="contained" onClick={handleAddTask} >Add</Button>
        </div>

        <div class="item2">
          <h3>My Todos</h3><hr/>
          {taskList.map((item) => {
            if (!item.completed){
              return (
                <div key={item.id}>
                  <div className="divItem">
                    <input className="checkbox-size" type="checkbox" onChange={() => handleCheckChange(item)} checked={item.completed} />
                    <span>{item.label}</span>
                  </div>                  
                  <div className="button-position1">
                      <Button size="small" variant="contained" onClick={() => handleDeleteTask(item)}><DeleteIcon /></Button>
                  </div>   
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
                  <div className="divItem">
                    <input className="checkbox-size" type="checkbox" onChange={() => handleCheckChange(item)} checked={item.completed} />
                    <span style={{textDecoration:'line-through'}}>{item.label}</span>
                  </div>   
                  <div className="button-position1">
                      <Button size="small" variant="contained" onClick={() => handleDeleteTask(item)}><DeleteIcon /></Button>
                  </div>                         
                </div>
              )
            }           
          })}  
        </div>

      </div>
    </div>
  );
}

export default App;
