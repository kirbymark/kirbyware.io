interface Props {
  children: string;
  type?:  "primary" | "secondary" | "success" | "danger" | "warning" | "info" | "light" | "dark" | "link";
  onButtonClicked: () => void;
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

const Button = ({ children, type = "primary", onButtonClicked }: Props) => {
  return (
    <button
      type="button"
    //   className={addedClasses[type]}
      className={"btn btn-" + type}
      onClick={onButtonClicked}
    >
      {children}
    </button>
  );
};

export default Button;