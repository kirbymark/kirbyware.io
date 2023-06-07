import { useState } from "react";
import Alert from "./Alert";

interface Props {
  children: string;
  color?:  "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link";
  onButtonClicked: () => void;
  type?: "alert" | "default";
}

const addedClasses: { [key: string]: string } = {
  primary: "btn btn-primary",
  secondary: "btn btn-secondary",
  success: "btn btn-success",
  danger: "btn btn-danger",
  warning: "btn btn-warning",
  info: "btn btn-info",
  light: "btn btn-light",
  dark: "btn btn-dark",
  link: "btn btn-link",
};

function Button ({ children, color = "primary", type = "default", onButtonClicked }: Props) {
  const [alertVisible, setAlertVisible] = useState(false);

  if (type === "alert")
  return (
    <>
        {(alertVisible && <Alert dismissible={true}>Alert pop-up from Button</Alert>)}
        <button
        type="button"
        //   className={addedClasses[type]}
        className={"btn btn-" + color}
        onClick={() => {
            setAlertVisible(true);
            onButtonClicked();
        }}
        >
        {children}
        </button>
    </>
  )
  else
  return (
    <button
      type="button"
    //   className={addedClasses[type]}
      className={"btn btn-" + color}
      onClick={onButtonClicked}
    >
      {children}
    </button>
  );
};

export default Button;
