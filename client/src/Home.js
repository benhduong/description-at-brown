import {
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Flex,
  Box,
  Center,
  CircularProgressLabel,
  CircularProgress
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState } from "react";

function Home() {

  const [searchQuery, setSearchQuery] = useState("");

  const [classList, setClassList] = useState([]); // list of classes found
  const [recOutput, setRecOutput] = useState(""); // recommendation text

  const [showLoaded, setShowLoaded] = useState(false); // progress bar

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // if someone searches then the progress bar is turned on
    setShowLoaded(true)

    // Default case
    let searchText = searchQuery
    if (searchQuery == "") {
      searchQuery = "what are good courses to take"
    }

    // REQUEST TO GET DATA
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(
        {
        "input": searchText,
        "config": {}
    })
    };
    fetch('https://xpomf8-ip-128-148-207-159.tunnelmole.net/rag-mongo/invoke', requestOptions)
    .then(response => response.json())
       .then(data => {
        
        // once data is found update UI with rec text and list of classes
        setRecOutput(data.output)
        setClassList((data.output).match(/[A-Z]{3,4} \d{4}[a-zA-Z]?/g).map(function(v){return v.trim();}))
        setShowLoaded(false)
       });
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  // handles whether or not the progress bar is showing or not
  let loadedVal = ""
  if (showLoaded) {
    loadedVal = <CircularProgress isIndeterminate color='orange.300' />
  } else {
    loadedVal = ""
  }

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


      <br></br>
      {loadedVal}
      <Text>{recOutput}</Text>
      <br></br>
      <Text>{classList}</Text>


    </Box>
  );
}

export default Home;
