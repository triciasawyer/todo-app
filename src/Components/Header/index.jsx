import { Header } from '@mantine/core';

function HeaderItems(props) {
  
  return (
    <Header data-testid="header">
      <h1 data-testid="header-h1">To Do List: {props.incomplete} items pending</h1>
    </Header>
  );
}

export default HeaderItems;