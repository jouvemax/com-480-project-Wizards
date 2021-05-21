import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Center,
  Flex,
  Heading,
} from '@chakra-ui/react';
import BarChart from "./BarChart";
import StackedBarChart from "./StackedBarChart";
import { ColorModeSwitcher } from './ColorModeSwitcher';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid>
          <ColorModeSwitcher justifySelf="flex-end" />
          <Flex direction="column">
            <Center h="100vh" w="100vw" bg="gray.400">
              <Heading>Global Overview </Heading>
              <BarChart />
            </Center>
            <Center h="200vh" w="100vw" bg="orange.400">
              <Heading>Energy </Heading>
              <StackedBarChart />
            </Center>
            <Center h="100vh" w="100vw" bg="red.400">
              <Heading>Industry</Heading>
            </Center>
            <Center h="100vh" w="100vw" bg="green.400">
              <Heading>Agriculture</Heading>
            </Center>
            <Center h="100vh" w="100vw" bg="blue.300">
              <Heading>Transport</Heading>
            </Center>
            <Center h="100vh" w="100vw" bg="purple.300">
              <Heading>My personal Emissions</Heading>
            </Center>
          </Flex>
        </Grid>
      </Box>
    </ChakraProvider>
  );
}

export default App;
