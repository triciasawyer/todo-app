import { createStyles, Group, Navbar } from "@mantine/core";
import { Link } from 'react-router-dom';
import Login from "../Login";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.blue[7],
    height: '100%',
    padding: theme.spacing.md,
    display: 'flex',
    flexFlow: 'row wrap',
    gap: '10px',
    boxSizing: 'border-box',
  },
  link: {
    color: theme.colors.gray[0],
    fontSize: theme.fontSizes.md,
  }
}));

function Header() {
  const { classes } = useStyles();

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };

  return (
    <>
    <header>
      <Navbar data-testid="navbar" className={classes.navbar}>
      <Group position='apart'>
      <Group>
        <Link to="/" style={linkStyle}>Home</Link>
        <Link to="/settings" style={linkStyle}>Settings</Link>
        </Group>
        <Login />
        </Group>
      </Navbar>
      </header>
    </>
  )
}

export default Header;