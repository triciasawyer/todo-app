import { createStyles, Navbar, Text } from "@mantine/core";
// import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.blue[7],
    height: '100%',
    color: theme.colors.gray[0],
    fontSize: theme.fontSizes.md,
    padding: theme.spacing.md,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-between'
  }
}));


function Header() {
  const { classes } = useStyles();
  return (
    <header data-testid="header">
      <Navbar data-testid="navbar" className={classes.navbar}>
        {/* <Link to="/">Home</Link>
    <Link to="/settings">Settings</Link> */}
        <Text>Home</Text>
        <Text>Settings</Text>
      </Navbar>
    </header>
  )
}

export default Header;