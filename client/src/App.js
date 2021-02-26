import React from "react";
import './App.css';
import './Todo.css';
import  {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form, InputGroup, FormControl} from "react-bootstrap";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

   useEffect(() => {
    const json = localStorage.getItem("todos");
    const loadedTodos = JSON.parse(json);
    if (loadedTodos) {
      setTodos(loadedTodos);
    }
  }, []);


    useEffect(() => {
    const json = JSON.stringify(todos);
    localStorage.setItem("todos", json);
  }, [todos]);

  function handleSubmit(e) {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo,
      completed: false,
    };
    setTodos([...todos].concat(newTodo));
    setTodo("");
  }

  function deleteTodo(id) {
    let updatedTodos = [...todos].filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    let updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    setTodos(updatedTodos);
  }

  function submitEdits(id) {
    const updatedTodos = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updatedTodos);
    setTodoEditing(null);
  }

  return (
      <div className="App">
        <header className="App-header">
          <div id="todo-list">
            <h1>Todo List</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Control
                  type="text"
                  onChange={(e) => setTodo(e.target.value)}
                  value={todo} />
              <Button variant="success"  className="addtodo" type="submit">Add Todo</Button>
            </Form>
            {todos.map((todo) => (
                <div key={todo.id} className="todo">
                  <InputGroup className="mb-3">
                    <InputGroup.Prepend>
                      <InputGroup.Checkbox aria-label="Checkbox for following text input"
                                           id="completed"
                                           checked={todo.completed}
                                           onChange={() => toggleComplete(todo.id)} />
                    </InputGroup.Prepend>
                    {todo.id === todoEditing ? (
                        <FormControl aria-label="Text input with checkbox"
                                     onChange={(e) => setEditingText(e.target.value)}/>
                    ) : (
                        <div>{todo.text}</div>
                    )}

                    <div className="todo-actions">
                      {todo.id === todoEditing ? (
                          <Button variant="success" onClick={() => submitEdits(todo.id)}>Submit Edits</Button>
                      ) : (
                          <Button onClick={() => setTodoEditing(todo.id)}>Edit</Button>
                      )}

                      <Button variant="danger" onClick={() => deleteTodo(todo.id)}>Delete</Button>
                    </div>
                  </InputGroup>
                </div>
            ))}
          </div>
        </header>
      </div>
  );
}


export default App;