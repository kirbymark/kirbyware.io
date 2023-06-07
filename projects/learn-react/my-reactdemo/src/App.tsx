import ListGroup from "./components/ListGroup";
import Alert from "./components/Alert";
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

  return (
    <div>
      <ListGroup
        items={items}
        heading="Cities"
        onSelectItem={handleSelectItem}
      />
      <Box
        sx={{
          width: "100%",
          backgroundColor: "grey",
          height: 100,
        }}
      />
      <Divider>
        <Chip label="CHIP" />
      </Divider>
      <Alert>
        <span>This is an alert</span>
      </Alert>
    </div>
  );
}

export default App;
