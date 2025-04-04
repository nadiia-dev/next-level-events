import Link from "next/link";
import classes from "./Button.module.css";

const Button = (props) => {
  if (props.link) {
    return (
      <Link href={props.link} className={classes.btn}>
        {props.children}
      </Link>
    );
  } else {
    return (
      <button onClick={props.onClick} className={classes.btn}>
        {props.children}
      </button>
    );
  }
};

export default Button;
