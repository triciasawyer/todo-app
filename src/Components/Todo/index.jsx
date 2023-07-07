import React, { useEffect, useState } from 'react';
import useForm from '../../Hooks/form';
import Auth from '../Auth';
// import { v4 as uuid } from 'uuid';
import List from '../List';
import { Card, Grid, createStyles } from '@mantine/core';
import axios from 'axios';

const useStyles = createStyles((theme) => ({
  h1: {
    backgroundColor: theme.colors.gray[8],
    width: '80%',
    color: theme.colors.gray[0],
    fontSize: theme.fontSizes.lg,
    margin: 'auto',
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
  }
  // labels: {
  //   display: 'flex',
  //   padding: '10px',
  // },
  // placeholder: {
  //   marginLeft: '5px'
  // }
}));


const Todo = () => {
  const { classes } = useStyles();
  const [defaultValues] = useState({
    difficulty: 4,
  });
  const [list, setList] = useState([]);
  const [incomplete, setIncomplete] = useState([]);
  const { handleChange, handleSubmit } = useForm(addItem, defaultValues);

  async function addItem(item) {
try {
    item.complete = false;
    const config = {
      baseURL: 'https://api-js401.herokuapp.com/api/v1/todo',
      method: 'post',
      data: item
    };
    let response = await axios(config);
    // console.log('item', response.data);
    setList([...list, response.data]);
  } catch(error) {
    console.error('Error adding item:', error);
  }
}



  async function deleteItem(id) {
    await axios.delete(`https://api-js401.herokuapp.com/api/v1/todo/${id}`);
    const items = list.filter(item => item._id !== id);
    setList(items);
  }


  async function toggleComplete(itemToUpdate) {

    itemToUpdate.complete = !itemToUpdate.complete;
    let config = {
      baseURL: `https://api-js401.herokuapp.com/api/v1/todo/${itemToUpdate._id}`,
      method: 'put',
      data: itemToUpdate
    }
    await axios(config);

    let response = await axios.get(`https://api-js401.herokuapp.com/api/v1/todo`);
    let items = response.data.results;
    // const items = list.map(item => {
    //   if (item._id === updatedItem._id) {
    //     item.complete = !item.complete;
    //   }
    //   return item;
    // });

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

  useEffect(() => {
    // initial get request for the todos
    (async () => {
      let response = await axios.get('https://api-js401.herokuapp.com/api/v1/todo');
      setList(response.data.results);
    })()
  }, []);


  return (
    <>
      <h1 data-testid="todo-h1" className={classes.h1}>To Do List: {incomplete} items pending</h1>
      <Grid style={{ width: '80%', margin: 'auto' }}>
        <Grid.Col xs={12} sm={4}>

          {/* leave the form code inside of the Todo Component */}
          <Auth capability="create">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
              <form data-testid="form" onSubmit={handleSubmit}>

                <h2 data-testid="todo-h2">Add To Do Item </h2>

                <label data-testid="todo-label1" className={classes.labels}>
                  <span>To Do Item</span>
                  <input className={classes.placeholder} onChange={handleChange} name="text" type="text" placeholder="Item Details" />
                </label>

                <label data-testid="todo-label2" className={classes.labels}>
                  <span>Assigned To </span>
                  <input className={classes.placeholder} onChange={handleChange} name="assignee" type="text" placeholder="Assignee Name" />
                </label>

                <label data-testid="todo-label3" className={classes.labels}>
                  <span>Difficulty</span>
                  <input className={classes.placeholder} onChange={handleChange} defaultValue={defaultValues.difficulty} type="range" min={1} max={5} name="difficulty" />
                </label>

                <label data-testid="todo-label-button">
                  <button type="submit">Add Item</button>
                </label>
              </form>
            </Card>
          </Auth>
        </Grid.Col>
        <Grid.Col xs={12} sm={4}>
          <Card shadow="sm" padding="lg" radius="md" withBorder >
            <List
              toggleComplete={toggleComplete}
              deleteItem={deleteItem}
              list={list} />
          </Card>
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Todo;
