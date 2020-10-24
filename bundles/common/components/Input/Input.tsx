import {
  ComponentPropsWithRef,
  ComponentPropsWithoutRef,
  forwardRef,
} from "react";

import { InputHTMLAttributes } from "react";
import styles from "./Input.module.sass";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

type PropsWithoutRef = InputProps & ComponentPropsWithoutRef<"input">;
type PropsWithRef = InputProps & ComponentPropsWithRef<"input">;
type Props = PropsWithoutRef | PropsWithRef;

const Input: React.FC<Props> = forwardRef<HTMLInputElement, Props>(
  ({ ...props }, ref?) => {
    return (
      <>
        <label
          className={styles["screen-reader-text"]}
          htmlFor="search-text"
          id="search-text"
        >
          Search for...
        </label>
        <input className={styles.input} ref={ref} {...props} />
      </>
    );
  }
);

export default Input;
