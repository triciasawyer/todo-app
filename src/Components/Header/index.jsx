// import React from 'react';
// import { Header } from '@mantine/core';
// // import './header.scss'
// function HeaderComponent() {
  
//   return (
//     <Header height={60} p="xs">
//     Home
//     </Header >

//   )
// }

// export default HeaderComponent;

import { createStyles, Navbar, Text } from "@mantine/core";

const useStyles = createStyles((theme)=> ({
  navbar: {
    backgroundColor: theme.colors.blue[7],
    height: '100%',
    color: theme.colors.gray[0],
    fontSize: theme.fontSizes.md,
    padding: theme.spacing.md,
  }
}));


function Header() {
  const { classes } = useStyles();
  return (
    <header data-testid="header">
      <Navbar data-testid="navbar" className={classes.navbar}>
        <Text>Home</Text>
      </Navbar>
    </header>
  )
}


export default Header;