import { ReactNode } from "react";
import { useState } from "react";

interface Props {
    children: ReactNode;
    dismissible?: boolean;
    onDismissed: () => void;
}

const Alert = ({ children, dismissible = false, onDismissed }: Props) => {
  const [show, setShow] = useState(true);

  return (
    <div className={"alert alert-primary" + (dismissible ? " alert-dismissible" : "") + " fade" + (show ? " show" : "") }>
      {children}
      {
      dismissible && (<button 
                        type="button" 
                        className="btn-close" 
                        data-bs-dismiss="alert" 
                        onClick={() => {
                          setShow(false);
                          onDismissed();
                        }}

                        aria-label="Close">
                        </button>)
      }

    </div>
  )
}

export default Alert