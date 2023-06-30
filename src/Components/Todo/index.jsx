import React, { useEffect, useState } from 'react';
import useForm from '../../Hooks/form';
import Auth from '../Auth';

import { v4 as uuid } from 'uuid';
import List from '../List';
import { Card, Grid } from '@mantine/core';

const Todo = () => {

  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  function addItem(item) {
    item.id = uuid();
    item.complete = false;
    console.log(item);
    setList([...list, item]);
  }

  function deleteItem(id) {
    const items = list.filter(item => item.id !== id);
    setList(items);
  }

  function toggleComplete(id) {

    const items = list.map(item => {
      if (item.id === id) {
        item.complete = !item.complete;
      }
      return item;
    });

    setList(items);

  }

  useEffect(() => {
    let incompleteCount = list.filter(item => !item.complete).length;
    setIncomplete(incompleteCount);
    document.title = `To Do List: ${incomplete}`;
    // linter will want 'incomplete' added to dependency array unnecessarily. 
    // disable code used to avoid linter warning 
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  }, [list]);


  return (
    <>
      <h1 data-testid="todo-h1">To Do List: {incomplete} items pending</h1>
      <Grid style={{ width: '80%', margin: 'auto' }}>
        <Grid.Col xs={12} sm={4}>

          {/* leave the form code inside of the Todo Component */}
          <Auth capabilities='create'>
            <Card withBorder>
              <form data-testid="form" onSubmit={handleSubmit}>

                <h2 data-testid="todo-h2">Add To Do Item</h2>

                <label data-testid="todo-label1">
                  <span>To Do Item</span>
                  <input onChange={handleChange} name="text" type="text" placeholder="Item Details" />
                </label>

                <label data-testid="todo-label2">
                  <span>Assigned To</span>
                  <input onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
                </label>

                <label data-testid="todo-label3">
                  <span>Difficulty</span>
                  <input onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
                </label>

                <label data-testid="todo-label-button">
                  <button type="submit">Add Item</button>
                </label>
              </form>
            </Card>
          </Auth>
        </Grid.Col>
        <Grid.Col xs={12} sm={4}>
          <List
            toggleComplete={toggleComplete}
            deleteItem={deleteItem}
            list={list} />
        </Grid.Col>

      </Grid>
    </>
  );
};

export default Todo;
