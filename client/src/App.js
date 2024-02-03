import { Input, InputGroup, InputLeftAddon, Text } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function App() {
  return (
    <>
      <Text>Search for classes below!</Text>
      <InputGroup>
        <InputLeftAddon pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftAddon>
        <Input
          width="70%"
          background="white"
          justifyContent="center"
          placeholder="Search here"
        />
      </InputGroup>
    </>
  );
}

export default App;
