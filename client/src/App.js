import {
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Flex,
  Box,
  Center,
  Button,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // You can perform actions with the searchQuery, such as sending it to a server or updating the UI.
    // For simplicity, we're just displaying an alert in this example.
    alert(`Searching for: ${searchQuery}`);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <Box mt="20%" textAlign="center">
      <Text>DAB: Search for classes below!</Text>
      <InputGroup onSubmit={handleSubmit}>
        <InputLeftAddon pointerEvents="none" marginLeft="auto">
          <SearchIcon color="gray.300" />
        </InputLeftAddon>
        <Input
          type="text"
          id="search"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Enter your search query"
          width="60%"
          marginRight="auto"
          onKeyDown={handleKeyPress}
          isRequired
        />
      </InputGroup>
      <Button colorScheme="blue" type="submit" onClick={handleSubmit}>
        Submit
      </Button>
    </Box>
  );
}

export default App;
