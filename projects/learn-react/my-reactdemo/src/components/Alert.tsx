import { ReactNode } from "react";
import { useState } from "react";

interface Props {
    children: ReactNode;
    dismissible?: boolean;
}

const Alert = ({ children, dismissible=false }: Props) => {
    const [alertVisible, setAlertVisible] = useState(true);
  
  if (dismissible) 
    if (alertVisible)   
        return (
            <div className="alert alert-warning alert-dismissible fade show" role="alert" >
                {children}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlertVisible(false)}></button>
            </div>
        );
    else 
        return (
            <div className="alert alert-warning alert-dismissible fade" role="alert" >
                {children}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close" onClick={() => setAlertVisible(true)}></button>
            </div>
        );
  else
    return (
        <div className="alert alert-primary">{children}</div> 
    )
}

export default Alert