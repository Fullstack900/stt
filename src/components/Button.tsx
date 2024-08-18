import {
  FunctionComponent,
  PropsWithChildren,
  ButtonHTMLAttributes,
} from "react";
import classNames from "classnames";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  selected?: boolean;
};

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  selected = false, // Default to false if not provided
  ...props
}) => {
  return (
    <button
      type="button"
      className={classNames(
        "px-2 py-1 border border-black",
        {
          "bg-blue-500 text-white": selected, // Apply styles when selected
          "bg-white text-black": !selected, // Apply default styles
        },
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};
