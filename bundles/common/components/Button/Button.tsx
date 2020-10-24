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
      <svg
        className={styles["icon-search"]}
        width="20px"
        height="20px"
        viewBox="0 0 100 100"
      >
        <path d="M80.65 66.78a33.55 33.55 0 01-47.44-47.44 33.55 33.55 0 1147.44 47.44zm6.73-54.16a43.06 43.06 0 00-65.32 55.71L2 88.39A6.8 6.8 0 0011.61 98l20.06-20.06a43.06 43.06 0 0055.71-65.32z"></path>
      </svg>
    </button>
  );
});

export default Button;
