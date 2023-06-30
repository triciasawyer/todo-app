import { createStyles, Navbar } from "@mantine/core";
import { Link } from 'react-router-dom';

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor: theme.colors.blue[7],
    height: '100%',
    color: theme.colors.gray[0],
    fontSize: theme.fontSizes.md,
    padding: theme.spacing.md,
    display: 'flex',
    flexFlow: 'row wrap',
    gap: '10px',
    boxSizing: 'border-box',
  },
}));


function Header() {
  const { classes } = useStyles();

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };

  return (
    <>
      <Navbar data-testid="navbar" className={classes.navbar}>
      <span className={classes.link}>
        <Link to="/" style={linkStyle}>Home</Link>
        </span>
        <span className={classes.link}>
        <Link to="/settings" style={linkStyle}>Settings</Link>
        </span>
      </Navbar>
    </>
  )
}

export default Header;