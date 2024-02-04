import { Text, Container, Box, Heading } from "@chakra-ui/react";

function About() {
  return (
    <Container mt="20%" textAlign={"center"}>
      <Heading>About</Heading>
      <Text m="5">Created by Avi, Ben, India, and Kazen at H@B2024</Text>
      <Box mt="15">
        <Text m="5">
          Navigating the Courses@Brown website can be a challenge for any Brown
          student. Our goal is to assist students during the course search
          process with our user-friendly website.
        </Text>
        <Text m="5">
          Dabble is a platform where we connect students with classes. We
          envision a site where students can ask about recommended courses, find
          classes that fit their concentration, and explore interesting classes.
          Out of the 2000 courses offered every semester, students can only pick
          a handful of them to take.
        </Text>
        <Text m="5">
          Our website uses Generative AI and Retrieval-Augmented Generation to
          provide personalized course recommendations for users.
        </Text>
      </Box>
    </Container>
  );
}

export default About;
