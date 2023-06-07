import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
import Button from "./components/Button";
import { Divider, Chip, Box } from "@mui/material";

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

  const handleAlertButtonClick = () => {
    console.log("Button clicked for alert");
  }

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
      <Alert dismissible={false}> 
        Hello - 
        <span>This is an alert</span>
      </Alert>

      <Box
        sx={{
          width: "100%",
          height: 30,
        }}
      />

      <Divider role="presentation">
        <Chip label="Button" />
      </Divider>
      <Button color="secondary" type="default" onButtonClicked={handleButtonClick}>
        Secondary
      </Button>
      <Button color="dark" type="default" onButtonClicked={handleButtonClick}>
        Dark
      </Button>


      <Box
        sx={{
          width: "100%",
          height: 30,
        }}
      />
      
      <Divider role="presentation">
        <Chip label="Button with Alert" />
      </Divider>
      <Button type="alert" onButtonClicked={handleAlertButtonClick}>
        Alert Button
      </Button>
    </div>
  );
}

export default App;
