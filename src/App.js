import { Paper, Divider, Button, List, Tabs, Tab } from "@mui/material";
import React, { useReducer } from "react";
import { AddField } from "./components/AddField";
import { Item } from "./components/Item";

function reducer(state, action) {
  if (action.type === "ADD_TASK") {
    return {
      ...state,
      tasks: [
        ...state.tasks,
        {
          id: (state.tasks[state.tasks.length - 1]?.id??0) + 1,
          text: action.payload.text,
          completed: action.payload.checked,
        }
      ],
    }
  }

  if (action.type === "REMOVE_TASK"){
    return {
      ...state,
      tasks: state.tasks.filter(obj => obj.id !== action.payload),
    }
  }

  if (action.type === "TOGGLE_COMPLETED"){
    return {
      ...state,
      tasks : state.tasks.map((obj) => {
        if(obj.id === action.payload){
          return{
            ...obj,
            completed: !obj.completed,
          };
        }
        return obj;
      }),
    }
  }

  if (action.type === "COMPLETE_ALL"){
    return {
      ...state,
      tasks: state.tasks.map(obj => ({
        ...obj,
        completed: true,
      })),
    }
  }

  if (action.type === "CLEAR"){
    return {
      ...state,
      tasks:  [],
    }
  }

  if (action.type === "SET_FILTER"){
    return {
      ...state,
      filterBy: action.payload,
    };
  }

  return state;
}

const filterIndex = {
  'all': 0,
  'active': 1,
  'completed': 2,
};

function App() {
  const [state, dispatch] = useReducer(reducer, {
    filterBy: 'all',
    tasks: [
    {
      id: 1,
      text: "новая задача",
      completed: false
    },
    {
      id: 2,
      text: "еще задача",
      completed: true
    }
  ]});

  const addTask = (text, checked) => {
    dispatch({
      type: "ADD_TASK",
      payload: {
        text,
        checked,
      },
    });
  };

  const removeTask = (id) =>{
   if(window.confirm('Удалить задачу?')) {
      dispatch({
        type: 'REMOVE_TASK',
        payload: id,
      })
    }
  }

  const toggleComplete = (id) =>{
    dispatch({
      type: 'TOGGLE_COMPLETED',
      payload: id,
    })
  }

  const completeAll = () =>{
    dispatch({
      type: 'COMPLETE_ALL',
    })
  }

  const clearAll = () =>{
    if(window.confirm('Удалить все задачи?')) {
      dispatch({
        type: 'CLEAR',
      })
    }
  }

  const setFilter = (_, newIndex) =>{
    const status = Object.keys(filterIndex)[newIndex];
    dispatch({
      type: 'SET_FILTER',
      payload: status,
    });
  }

  return (
      <div className="App">
        <Paper className="wrapper">
          <Paper className="header" elevation={0}>
            <h4>Список задач</h4>
          </Paper>
          <AddField onAdd={addTask} />
          <Divider />
          <Tabs onChange={setFilter}  value={filterIndex[state.filterBy]}>
            <Tab label="Все" />
            <Tab label="Активные" />
            <Tab label="Не активные" />
          </Tabs>
          <Divider />
          <List>
            {state.tasks.filter((obj) => {
              if(state.filterBy === 'all'){
                return true;
              }
              if(state.filterBy === 'completed'){
                return obj.completed;
              }
              if(state.filterBy === 'active'){
                return !obj.completed;
              }
            }).map((obj) => (
                <Item key={obj.id}  text={obj.text} completed={obj.completed} onClickRemove={() => removeTask(obj.id)} onClickCheckbox={() => toggleComplete(obj.id)}/>
            ))}
          </List>
          <Divider />
          <div className="check-buttons">
            <Button className="check-button" onClick={completeAll}>Отметить всё</Button>
            <Button className="check-button" onClick={clearAll}>Очистить</Button>
          </div>
        </Paper>
      </div>
  );
}
export default App;
