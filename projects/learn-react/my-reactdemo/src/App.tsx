import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import { Divider, Chip, Box } from "@mui/material";
import { useState } from "react";

function App() {
  let items = [
    "New York",
    "Tokyo",
    "San Francisco",
    "Gaborone",
    "Johannesburg",
  ];

  const handleSelectItem = (item: string) => {
    console.log(item);
  };

  const handleButtonClick = () => {
    console.log("Button clicked");
  }

  const handleButton2Click = () => {
    console.log("Button2 clicked");
    setShowAlert((prevState) => !prevState);
  }
  
  const handleAlertDismissed = () => {
    console.log("Alert dismissed");
    setShowAlert((prevState) => !prevState);
  }

  const [showAlert, setShowAlert] = useState(false);

  return (
    <div>


      <Box
        sx={{
          width: "100%",
          height: 30,
        }}
      />
      <Divider role="presentation">
        <Chip label="List Group" />
      </Divider>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />


      <Box
        sx={{
          width: "100%",
          height: 30,
        }}
      />


      <Divider role="presentation">
        <Chip label="Alert" />
      </Divider>
      <Alert> 
        Hello - 
        <span>This is an alert</span>
      </Alert>

      <Divider role="presentation">
        <Chip label="Button" />
      </Divider>
      <Button onButtonClicked={handleButtonClick}>
        Default is Primary
      </Button>
      <Button type="secondary" ButtonClicked={handleButtonClick}>
        Secondary Button
      </Button>
      <Button type="link" onButtonClicked={handleButtonClick}>
        Link Button
      </Button>
      <Button type="dark" onButtonClicked={handleButtonClick}>
        Dark Button
      </Button>

      
      <Box
        sx={{
          width: "100%",
          height: 30,
        }}
      />


      <Divider role="presentation">
        <Chip label="Button and Alert" />
      </Divider>

      {showAlert && (<Alert dismissible={true} onDismissed={handleAlertDismissed}>my alert</Alert>)}
      <Button type="primary" onButtonClicked={handleButton2Click}>
        Primary
      </Button>


    </div>
  );
}

export default App;
