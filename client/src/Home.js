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

  let testStr = "CSCI 1550 HTML 1421 OOGA 7281"
  let testList = testStr.match(/[A-Z]{3,4} \d{4}[a-zA-Z]?/g).map(function(v){return v.trim();})

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
    })
    };
    fetch('https://xpomf8-ip-128-148-207-159.tunnelmole.net/rag-mongo/invoke', requestOptions)
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
