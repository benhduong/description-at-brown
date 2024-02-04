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
import React, { useState } from "react";

function Home() {

  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // You can perform actions with the searchQuery, such as sending it to a server or updating the UI.
    // For simplicity, we're just displaying an alert in this example.
    //alert(`Searching for: ${searchQuery}`);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
        "input": "what are good courses to take",
        "config": {}
    }),
      mode: 'no-cors'
    };
    fetch('https://7487-2620-6e-6000-3100-3d4a-1581-4dd3-4984.ngrok-free.app/rag-mongo/invoke', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data));

  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <Box mt="20%" textAlign={"center"}>
      <Text>Search for classes below!</Text>
      <InputGroup>
        <InputLeftAddon pointerEvents="none" marginLeft="auto">
          <SearchIcon color="gray.300" />
        </InputLeftAddon>
        <Input
          marginRight="auto"
          width="70%"
          background="white"
          placeholder="Search here"
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      </InputGroup>
    </Box>
  );
}

export default Home;
