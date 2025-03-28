import Link from "next/link";
import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <Link href={props.link} className={classes.btn}>
      {props.children}
    </Link>
  );
};

export default Button;
