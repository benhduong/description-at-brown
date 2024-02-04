import {
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Button,
  Link,
  Collapse,
  Heading,
  Flex,
  Grid,
  Box,
  Center,
  CircularProgressLabel,
  CircularProgress,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState, useRef, useEffect} from "react";
import { Card, CardHeader, CardBody, CardFooter, ScaleFade} from '@chakra-ui/react'
import { useBoolean } from '@chakra-ui/react'
import { CloseIcon, AddIcon, WarningIcon } from '@chakra-ui/icons'

function Home() {

  const [searchQuery, setSearchQuery] = useState("");

  const [classList, setClassList] = useState([]); // list of classes found
  const [recOutput, setRecOutput] = useState(""); // recommendation text

  const [showLoaded, setShowLoaded] = useState(false); // progress bar

  const [show, setShow] = React.useState(false); // toggles
  const handleToggle = () => setShow(!show);

  const [height, setHeight] = useState(0) // height of collapse
  const collapseRef = useRef(null)

  const [history, setHistory] = useState([])

  const inputBoxRef = useRef(null);

  useEffect(() => {
    console.log(collapseRef.current.clientHeight)
    setHeight(collapseRef.current.clientHeight)
  })

  const cache = useRef({});

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    if (event != null) {
      event.preventDefault();
    }

    setRecOutput("")
    setClassList([])

    // if someone searches then the progress bar is turned on
    setShowLoaded(true)

    // if there is a new search then mimize rec text
    setShow(false)

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
      
      if (res.match(/[A-Z]{3,4} \d{4}[a-zA-Z]?/g) != null) {
        let classList = res.match(/[A-Z]{3,4} \d{4}[a-zA-Z]?/g).map(function(v){return v.trim()})
        setClassList([...new Set(classList)])
        let newHistory = history.concat([searchText])
        setHistory([...new Set(newHistory)])
      } else {
        setClassList([])
      }

      setShowLoaded(false)

      return
    }

    fetch('https://wtg9us-ip-68-9-197-24.tunnelmole.net/rag-mongo/invoke', requestOptions)
    .then(response => response.json())
       .then(data => {

        cache.current[searchText] = data.output 
        
        // once data is found update UI with rec text and list of classes
        setRecOutput(data.output)

        if ((data.output).match(/[A-Z]{3,4} \d{4}[a-zA-Z]?/g) != null) {
          let classList = (data.output).match(/[A-Z]{3,4} \d{4}[a-zA-Z]?/g).map(function(v){return v.trim()})
          setClassList([...new Set(classList)])

          let newHistory = history.concat([searchText])
          setHistory([...new Set(newHistory)])
        } else {
          setClassList([])
        }

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
  var stringToColor = (string, saturation = 80, lightness = 75) => {
    let hash = 0;
    for (let i = 0; i < string.length; i++) {
  hash = string.charCodeAt(i) + ((hash << 5) - hash);
  hash = hash & hash;
    }
    return `hsl(${(hash % 360)}, ${saturation}%, ${lightness}%)`;
  }

  return (

    <Box>
    <Heading textAlign={"center"} mt={"10%"} size='3xl'>Dabble.</Heading>
    <Heading textAlign={"center"} as={"h6"} size='xs' mt={'1%'}>Helping Students Find Courses with Ease!</Heading>


    <Box mt="8%" mb={"10%"} textAlign={"center"}>

      <InputGroup>
        <InputLeftAddon pointerEvents="none" marginLeft="auto">
          <SearchIcon color="gray.300" />
        </InputLeftAddon>
        <Input ref={inputBoxRef}
          marginRight="auto"
          width="70%"
          background="white"
          placeholder="Search here"
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
      </InputGroup>
      <Box
      mt={"10px"}
      ml={"12%"} 
      mr={"25%"} 
      opacity={"80%"}
      display={"flex"}
      flexDirection={"row"}
      gap={"10px"}
      >

        {history.map((someSearch) => (
        <Flex 
                  fontSize={"12px"}
                  flexDirection={"row"}
                  gap={"10px"}
                  padding={"5px 10px 5px 5px"}
                  borderRadius={"30px 30px 30px 30px"}
                  bg={"green.200"} 
                  key={someSearch}
                  >
                    <Link>
                    <CloseIcon ml={"10px"} mt={"1px"} onClick={() => {
                      let newHistory = history.filter((val) => val != someSearch)
                      setHistory(newHistory)
                    }}></CloseIcon>
                    </Link>
                    <Link>
                    <Text textAlign={"center"} onClick={() => {
                      inputBoxRef.current.value = someSearch
                      setSearchQuery(someSearch)
                      handleSubmit()
                    }}>{someSearch}</Text>
                    </Link>
                  </Flex>
        ))}
      </Box>

      <br></br>
      {showLoaded ? <CircularProgress isIndeterminate color='orange.300'/> : <></>}


          <Grid templateColumns={"10% 55% 25% 10%"} autoFlow="row dense">

    
            <Box gridColumn={2}>
            <ScaleFade initialScale={0.1} in={recOutput != ""}>
              <Collapse startingHeight={305} 
              in={show} ref={collapseRef}>
                <Text whiteSpace={"pre-wrap"}>{recOutput}</Text>
              </Collapse>

              <Button size="sm" onClick={handleToggle} mt="1rem"
               display={((recOutput != "" && classList.length > 1) ? 'block' : 'none')}>
                Show {show ? "Less" : "More"}
              </Button>
              </ScaleFade>
            </Box>

            <Flex gridColumn={3} flexDirection={"column"}>
            {classList.map((className) => (
                    <div key={className}>

                        <ScaleFade initialScale={0.7} in={true}>
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

                        </ScaleFade>
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
