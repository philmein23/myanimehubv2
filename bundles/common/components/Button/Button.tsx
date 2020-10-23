import {
  ButtonHTMLAttributes,
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  MouseEvent,
  forwardRef,
} from "react";

import styles from "./Button.module.sass";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (e: MouseEvent) => void;
  name: string;
}

type ButtonPropsWithNoRef = ButtonProps & ComponentPropsWithoutRef<"button">;
type ButtonPropsWithRef = ButtonProps & ComponentPropsWithRef<"button">;
type Props = ButtonPropsWithNoRef | ButtonPropsWithRef;

const Button: React.FC<Props> = forwardRef(({ onClick, name }, ref?) => {
  return (
    <button className={styles.button} ref={ref} onClick={(e) => onClick(e)}>
      {name}
    </button>
  );
});

export default Button;
