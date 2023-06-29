import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  footer: {
    testAlign: 'right',
    width: '80%',
    margin: 'auto',
    // marginTop: '50px',
  }
}));

function Footer() {
  const { classes } = useStyles();

  return (
    <footer
      data-testid="footer"
      className={classes.footer}>
      &copy;2023 Tricia Sawyer
    </footer>
  )
}

export default Footer;
