import { TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import React, { useEffect, useState } from 'react';

const ListDisplay = () => {
    const [task, setTask] = useState(() => {
        return window.localStorage.getItem('task') || ''
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
          completed: false,
          important: false
        }]);
        setTask("");
    }
    
    function handleCheckChange(item, option){        
        let newTaskList = taskList.map((taskItem) => {
          if (taskItem.id === item.id) {
            if (option){
              return({
                id: taskItem.id,
                label: taskItem.label,
                completed: !taskItem.completed,
                important: taskItem.important
              });
            }else{
              return({
                id: taskItem.id,
                label: taskItem.label,
                completed: taskItem.completed,
                important: !taskItem.important
              });
            }            
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
    
    function populateList(item){
      return (
        <div key={item.id}>
          <div className="divItem">
            <input className="checkbox-size" type="checkbox" onChange={() => handleCheckChange(item, true)} checked={item.completed} /> 
            {(item.completed)? (<span style={{textDecoration:'line-through'}}>{item.label}</span>):(<span>{item.label}</span>)} 
          </div>                  
          <div className="button-position1">
            <Button size="small" variant="contained" onClick={() => handleCheckChange(item, false)}>
              {(item.important)?(<StarIcon />):(<StarBorderOutlinedIcon />)}
            </Button>
            <Button style={{marginLeft:10}} size="small" variant="contained" onClick={() => handleDeleteTask(item)}><DeleteIcon /></Button>
          </div>  
        </div>
      );
    }
    
    return (
        <div className="App">
          <div class="grid-container">
            <div class="item1">
            <h3>REACT</h3>
              {  
                <TextField
                color="secondary"
                label="Enter task here" 
                value={task}
                onChange={(e) => { setTask(e.target.value); }} style={{display:"inline", paddingTop:15}}  
                sx={{
                  input: {
                    color: "black",
                    background: "white",
                  }}}/>
              }
              <Button size="large" variant="contained" onClick={handleAddTask} >Add</Button>
            </div>
    
            <div class="item2">
              <h3>My Todos</h3><hr/>
              {taskList.map((item) => {
                if (!item.completed && item.important){
                  return populateList(item);
                }           
              })}  
              {taskList.map((item) => {
                if (!item.completed && !item.important){
                  return populateList(item);
                }           
              })}  
            </div>
    
            <div class="item3">
              <h3>Completed</h3><hr/>
              {taskList.map((item) => {
                if (item.completed && item.important){
                  return populateList(item);
                }           
              })}  
              {taskList.map((item) => {
                if (item.completed && !item.important){
                  return populateList(item);
                }           
              })}  
            </div>
    
          </div>
        </div>
    );
}

export default ListDisplay