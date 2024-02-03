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

function Home() {
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
        />
      </InputGroup>
    </Box>
  );
}

export default Home;
