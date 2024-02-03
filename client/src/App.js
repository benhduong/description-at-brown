import {
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Flex,
  Box,
  Center,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

function App() {
  return (
    <Box mt="20%" background="grey">
      <Text>DAB: Search for classes below!</Text>
      <InputGroup>
        <InputLeftAddon pointerEvents="none" marginLeft="auto">
          <SearchIcon color="gray.300" />
        </InputLeftAddon>
        <Input
          marginRight="auto"
          width="70%"
          background="white"
          placeholder="Search here"
        />
      </InputGroup>
    </Box>
  );
}

export default App;
