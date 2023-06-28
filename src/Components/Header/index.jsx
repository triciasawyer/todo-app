import { Header } from '@mantine/core';
import './header.scss'

function HeaderItems(props) {
  
  return (
    <Header className="header">
      <h1 data-testid="header-h1">To Do List: {props.incomplete} items pending</h1>
    </Header>
  );
}

export default HeaderItems;