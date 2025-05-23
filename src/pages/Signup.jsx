import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  Heading,
  VStack,
  useToast,
  Text,
  Link,
} from '@chakra-ui/react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email || !password) {
      toast({
        title: 'Missing fields',
        description: 'Please fill in both email and password.',
        status: 'warning',
      });
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast({
        title: 'Signup successful!',
        status: 'success',
      });
      navigate('/dashboard');
    } catch (err) {
      toast({
        title: 'Error signing up',
        description: err.message,
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={20}
      p={6}
      borderWidth={1}
      borderRadius="md"
      boxShadow="lg"
    >
      <Heading mb={6} textAlign="center">
        Sign Up
      </Heading>
      <VStack spacing={4}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          colorScheme="teal"
          onClick={handleSignup}
          isLoading={loading}
          width="full"
        >
          Sign Up
        </Button>
        <Text fontSize="sm">
          Already have an account?{' '}
          <Link color="teal.500" as={RouterLink} to="/login">
            Log In
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default Signup;
