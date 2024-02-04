import {
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
  Flex,
  Box,
  Center,
  SlideFade,
  Card,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const data = [1, 2, 3, 4, 5, 6];

function Search() {
  return (
    <Box mt="20%" textAlign={"center"}>
      {data && data.map((course, key) => <Card key={key}>{course}</Card>)}
    </Box>
  );
}

export default Search;
