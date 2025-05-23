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
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: 'Missing fields',
        description: 'Please enter both email and password.',
        status: 'warning',
      });
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: 'Login successful!', status: 'success' });
      navigate('/dashboard');
    } catch (err) {
      toast({
        title: 'Login failed.',
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
        Log In
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
          onClick={handleLogin}
          isLoading={loading}
          width="full"
        >
          Log In
        </Button>
        <Text fontSize="sm">
          Don't have an account?{' '}
          <Link color="teal.500" as={RouterLink} to="/signup">
            Sign Up
          </Link>
        </Text>
      </VStack>
    </Box>
  );
};

export default Login;
