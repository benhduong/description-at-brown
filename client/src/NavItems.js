import { Link, HStack, Text, Box } from "@chakra-ui/react";
import { Link as NavLink } from "react-router-dom";
import { PiBookOpenBold } from "react-icons/pi";

function NavItems() {
  return (
    <>
      <HStack m={6}>
        <Link as={NavLink} to="/">
          <Box fontSize={"3xl"}>
            <PiBookOpenBold />
          </Box>
        </Link>

        <Link as={NavLink} to="/about" ml={"auto"}>
          <Box>
            <Text>About</Text>
          </Box>
        </Link>
      </HStack>
    </>
  );
}

export default NavItems;
