import {
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Button,
  Collapse,
  Heading,
  Flex,
  Grid,
  Box,
  Center,
  CircularProgressLabel,
  CircularProgress,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import React, { useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  ScaleFade,
} from "@chakra-ui/react";
import { useBoolean } from "@chakra-ui/react";
import ClassModal from "./components/ClassModal";

function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [classList, setClassList] = useState([]); // list of classes found
  const [recOutput, setRecOutput] = useState(""); // recommendation text
  const [showLoaded, setShowLoaded] = useState(false); // progress bar
  const [show, setShow] = useState(false);
  const cache = useRef({});

  const [title, setTitle] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const handleToggle = () => setShow(!show);

  const handleChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setRecOutput("");
    setClassList([]);

    // if someone searches then the progress bar is turned on
    setShowLoaded(true);

    // Default case
    let searchText = searchQuery;
    if (searchQuery == "") {
      searchText = "what are good courses to take";
    }

    // REQUEST TO GET DATA
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: searchText,
        config: {},
      }),
    };

    if (cache.current[searchText] != null) {
      let res = cache.current[searchText];

      setRecOutput(res);
      setClassList(
        res.match(/[A-Z]{3,4} \d{4}[a-zA-Z]?/g).map(function (v) {
          return v.trim();
        })
      );
      setShowLoaded(false);
      return;
    }

    fetch(
      "https://wtg9us-ip-68-9-197-24.tunnelmole.net/rag-mongo/invoke",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        cache.current[searchText] = data.output;

        // once data is found update UI with rec text and list of classes
        setRecOutput(data.output);
        setClassList(
          data.output.match(/[A-Z]{3,4} \d{4}[a-zA-Z]?/g).map(function (v) {
            return v.trim();
          })
        );
        setShowLoaded(false);
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
    return `hsl(${hash % 360}, ${saturation}%, ${lightness}%)`;
  };

  // handles whether or not the progress bar is showing or not
  let loadedVal = "";
  if (showLoaded) {
    loadedVal = <CircularProgress isIndeterminate color="orange.300" />;
  } else {
    loadedVal = "";
  }

  const handleModalClick = (title) => {
    setTitle(title);
    setOpenModal(true);
  };

  return (
    <Box>
      <Heading textAlign={"center"} mt={"10%"} size="3xl">
        Dabble.
      </Heading>
      <Heading textAlign={"center"} as={"h6"} size="xs" mt={"1%"}>
        Helping Students Find Courses with Ease!
      </Heading>

      <Box mt="8%" mb={"10%"} textAlign={"center"}>
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
          <Box gridColumn={2}>
            <ScaleFade initialScale={0.1} in={recOutput != ""}>
              <Collapse startingHeight={310} in={show}>
                <Text whiteSpace={"pre-wrap"}>{recOutput}</Text>
              </Collapse>

              <Button
                size="sm"
                onClick={handleToggle}
                mt="1rem"
                display={recOutput != "" ? "block" : "none"}
              >
                Show {show ? "Less" : "More"}
              </Button>
            </ScaleFade>
          </Box>

          <Flex gridColumn={3} flexDirection={"column"}>
            {classList.map((className) => (
              <div key={className}>
                <ScaleFade initialScale={0.7} in={true}>
                  <ClassModal openModal={openModal} title={title} />
                  <Card ml={"10%"} onClick={() => handleModalClick(className)}>
                    <CardHeader>
                      <Heading size="md">
                        <Text
                          color={stringToColor(className.split(" ")[0])}
                          display={"inline-block"}
                        >
                          {className.split(" ")[0]}
                        </Text>{" "}
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
