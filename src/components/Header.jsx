import React from 'react';
import { Flex, Box, Button, Text } from '@chakra-ui/react';

const Header = ({ onLogout }) => {
  return (
    <Flex justify="space-between" align="center" mb={6}>
      <Box>
        <Text fontSize="xl" fontWeight="bold">💼 Project Cost Tracker</Text>
      </Box>
      <Button colorScheme="red" onClick={onLogout}>Logout</Button>
    </Flex>
  );
};

export default Header;
