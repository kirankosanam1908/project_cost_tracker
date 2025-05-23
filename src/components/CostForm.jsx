import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  useToast,
  InputGroup,
  InputLeftElement,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from '@chakra-ui/react';
import { MdDescription, MdAttachMoney } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { addOtherCost } from '../store/slices/otherCostsSlice';

const CostForm = () => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(0);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const toast = useToast();

  if (!user) {
    return <Text mt={4} color="red.500">Please log in to add other costs.</Text>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim() || amount <= 0 || isNaN(amount)) {
      toast({
        title: 'Invalid input',
        description: 'Enter a valid description and amount.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await dispatch(
        addOtherCost({
          userId: user.uid,
          description: description.trim(),
          amount: Number(amount),
        })
      );

      setDescription('');
      setAmount(0);

      toast({
        title: 'Cost added',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Could not add cost. Try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      p={6}
      borderWidth={1}
      borderRadius="lg"
      boxShadow="lg"
      mt={4}
      maxW="400px"
      mx="auto"
      bg="white"
    >
      <FormControl mb={5} isRequired>
        <FormLabel>Description</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <MdDescription color="gray.500" />
          </InputLeftElement>
          <Input
            placeholder="e.g. Shipping, Tax"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </InputGroup>
      </FormControl>

      <FormControl mb={5} isRequired>
        <FormLabel>Amount</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <MdAttachMoney color="gray.500" />
          </InputLeftElement>
          <NumberInput
            min={0}
            value={amount}
            onChange={(_, valueAsNumber) =>
              setAmount(isNaN(valueAsNumber) ? 0 : valueAsNumber)
            }
          >
            <NumberInputField placeholder="e.g. 50" pl="2.5rem" />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </InputGroup>
      </FormControl>

      <Button type="submit" colorScheme="teal" width="full">
        Add Cost
      </Button>
    </Box>
  );
};

export default CostForm;
