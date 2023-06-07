interface Props {
    label: string;
    type: string
}

const addedClasses: {[key: string]: string} = {

    primary: "btn btn-primary",
    secondary: "btn btn-secondary",
    success: "btn btn-success",
    danger: "btn btn-danger",
    warning: "btn btn-warning",
    info: "btn btn-info",
    light: "btn btn-light",
    dark: "btn btn-dark",
    link: "btn btn-link",
}

const Button = ({ label, type }: Props) => {
  return (
    <button type="button" className={addedClasses[type]}>{label}</button>
  )
}

export default Button