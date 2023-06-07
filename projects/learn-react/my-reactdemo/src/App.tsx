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
      <Button type="secondary" onButtonClicked={handleButtonClick}>
        Primary
      </Button>
      <Button onButtonClicked={handleButtonClick}>
        Default Button
      </Button>
      <Button type="link" onButtonClicked={handleButtonClick}>
        Link
      </Button>
      <Button type="dark" onButtonClicked={handleButtonClick}>
        Dark
      </Button>

    </div>
  );
}

export default App;
