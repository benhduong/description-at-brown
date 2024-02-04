import {
  Input,
  InputGroup,
  InputRightAddon,
  Text,
  Flex,
  Box,
  Center,
  Button,
  SlideFade,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import Search from "./Search";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (searchQuery === "") {
      setShowResults(false);
    } else {
      setShowResults(true);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSubmit(event);
    }
  };

  return (
    <Box mt="10%" textAlign="center">
      <InputGroup onSubmit={handleSubmit}>
        <Input
          type="text"
          id="search"
          value={searchQuery}
          onChange={handleChange}
          placeholder="Enter your search query"
          width="60%"
          marginLeft="auto"
          onKeyDown={handleKeyPress}
          isRequired
        />
        <InputRightAddon
          cursor="pointer"
          marginRight="auto"
          onClick={handleSubmit}
        >
          <SearchIcon color="gray.300" />
        </InputRightAddon>
      </InputGroup>
      {showResults && (
        <SlideFade in={showResults} reverse>
          <Search />
        </SlideFade>
      )}
    </Box>
  );
}

export default Home;
