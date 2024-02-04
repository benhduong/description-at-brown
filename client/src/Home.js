import {
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Heading,
  Flex,
  Grid,
  Box,
  Center,
  CircularProgressLabel,
  CircularProgress
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState, useRef} from "react";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'

function Home() {

  const [searchQuery, setSearchQuery] = useState("");

  const [classList, setClassList] = useState([]); // list of classes found
  const [recOutput, setRecOutput] = useState(""); // recommendation text

  const [showLoaded, setShowLoaded] = useState(false); // progress bar

  const cache = useRef({});

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setRecOutput("")
    setClassList([])

    // if someone searches then the progress bar is turned on
    setShowLoaded(true)

    // Default case
    let searchText = searchQuery
    if (searchQuery == "") {
      searchText = "what are good courses to take"
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

    if (cache.current[searchText] != null) {

      let res = cache.current[searchText]

      setRecOutput(res)
      setClassList(res.match(/[A-Z]{3,4} \d{4}[a-zA-Z]?/g).map(function(v){return v.trim();}))
      setShowLoaded(false)
      return
    }

    fetch('https://fp74qv-ip-128-148-207-159.tunnelmole.net/rag-mongo/invoke', requestOptions)
    .then(response => response.json())
       .then(data => {

        cache.current[searchText] = data.output 
        
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

  // creates a unique color for each course type, MATH, APMA, etc
  // https://stackoverflow.com/questions/3426404/create-a-hexadecimal-colour-based-on-a-string-with-javascript
  var stringToColor = (string, saturation = 100, lightness = 75) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
  hash = string.charCodeAt(i) + ((hash << 5) - hash);
  hash = hash & hash;
    }
    return `hsl(${(hash % 360)}, ${saturation}%, ${lightness}%)`;
  }

  // handles whether or not the progress bar is showing or not
  let loadedVal = ""
  if (showLoaded) {
    loadedVal = <CircularProgress isIndeterminate color='orange.300' />
  } else {
    loadedVal = ""
  }

  return (

    <Box>
    <Heading textAlign={"center"} mt={"10%"} size='3xl'>Dabble.</Heading>
    <Heading textAlign={"center"} as={"h6"} size='xs' mt={'1%'}>Helping Students Find Courses with Ease!</Heading>


    <Box mt="8%" textAlign={"center"}>

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


          <Grid templateColumns={"10% 55% 25% 10%"} autoFlow="row dense">

            <Text gridColumn={2}>{recOutput}</Text>

            <Flex gridColumn={3} flexDirection={"column"}>
            {classList.map((className) => (
                    <div key={className}>
                        <Card ml={"10%"}>
                          <CardHeader>
                            <Heading size='md'>
                              
                              <Text color={stringToColor(className.split(" ")[0])}
                                    display={"inline-block"}>
                                {className.split(" ")[0]}
                              </Text>
                              {" "}
                              {className.split(" ")[1]}
                            
                            </Heading>
                          </CardHeader>
                        </Card>
                        <br></br>
                    </div>
                ))}
            </Flex>
          </Grid>

    </Box>
    </Box>
  );
}

export default Home;
