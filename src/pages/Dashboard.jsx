import React from 'react';
import {
  Box,
  Heading,
  Divider,
  Flex,
  SimpleGrid,
  useToast,
  VStack,
  Container,
  useColorModeValue,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { logout } from '../store/slices/authSlice';

import Header from '../components/Header';
import ItemForm from '../components/ItemForm';
import ItemList from '../components/ItemList';
import CostForm from '../components/CostForm';
import OtherCostList from '../components/OtherCostList';
import TotalCostDisplay from '../components/TotalCostDisplay';

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  const cardBg = useColorModeValue('gray.50', 'gray.700');
  const sectionBg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
      toast({ title: 'Logged out successfully', status: 'info' });
      navigate('/login');
    } catch (error) {
      toast({
        title: 'Logout failed',
        description: error.message,
        status: 'error',
      });
    }
  };

  return (
    <Box bg={cardBg} minH="100vh" py={8}>
      <Container maxW="6xl">
        <Header onLogout={handleLogout} />

        <Heading mb={4} size="lg" textAlign="center">
          Project Cost Tracker
        </Heading>

        <Box
          borderWidth="1px"
          borderRadius="lg"
          p={4}
          bg={sectionBg}
          boxShadow="md"
          mb={6}
        >
          <TotalCostDisplay />
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={10}>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            p={6}
            bg={sectionBg}
            boxShadow="sm"
          >
            <Heading size="md" mb={4}>
              Add Item
            </Heading>
            <ItemForm />
          </Box>

          <Box
            borderWidth="1px"
            borderRadius="lg"
            p={6}
            bg={sectionBg}
            boxShadow="sm"
          >
            <Heading size="md" mb={4}>
              Add Other Cost
            </Heading>
            <CostForm />
          </Box>
        </SimpleGrid>

        <Divider borderColor={borderColor} mb={10} />

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
          <Box
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            bg={sectionBg}
            boxShadow="md"
            maxH="500px"
            overflowY="auto"
          >
            <Heading size="md" mb={4}>
              Item List
            </Heading>
            <ItemList />
          </Box>

          <Box
            borderWidth="1px"
            borderRadius="lg"
            p={4}
            bg={sectionBg}
            boxShadow="md"
            maxH="500px"
            overflowY="auto"
          >
            <Heading size="md" mb={4}>
              Other Costs
            </Heading>
            <OtherCostList />
          </Box>
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Dashboard;
