import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  InputLeftElement,
  InputGroup,
  useToast,
  Text,
  FormErrorMessage,
  Stack,
  Icon,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../store/slices/itemsSlice';
import { MdLabel, MdAttachMoney } from 'react-icons/md';

const ItemForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const toast = useToast();

  const [name, setName] = useState('');
  const [cost, setCost] = useState(1);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!user) {
    return <Text mt={4} color="red.500">Please log in to add items.</Text>;
  }

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (isNaN(cost) || cost <= 0) newErrors.cost = 'Enter a valid cost greater than 0';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const result = await dispatch(
        addItem({
          userId: user.uid,
          name: name.trim(),
          cost: parseFloat(cost),
        })
      );

      if (result.meta.requestStatus === 'rejected') {
        throw new Error(result.payload || 'Failed to add item.');
      }

      setName('');
      setCost(1);
      toast({ title: 'Item added successfully', status: 'success', duration: 3000, isClosable: true });
    } catch (err) {
      toast({ title: 'Error', description: err.message, status: 'error', duration: 3000, isClosable: true });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box
      as="form"
      onSubmit={handleSubmit}
      p={4}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="md"
      mt={4}
      maxW="400px"
      mx="auto"
      bg="white"
    >
      <Stack spacing={4}>
        <FormControl isInvalid={!!errors.name} isRequired>
          <FormLabel>Item Name</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={MdLabel} color="gray.400" />
            </InputLeftElement>
            <Input
              placeholder="e.g. Wood, Tools"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          </InputGroup>
          {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
        </FormControl>

        <FormControl isInvalid={!!errors.cost} isRequired>
          <FormLabel>Cost</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={MdAttachMoney} color="gray.400" />
            </InputLeftElement>
            <NumberInput
              min={1}
              value={cost}
              onChange={(_, num) => setCost(isNaN(num) ? 1 : num)}
              precision={2}
            >
              <NumberInputField placeholder="e.g. 100" />
            </NumberInput>
          </InputGroup>
          {errors.cost && <FormErrorMessage>{errors.cost}</FormErrorMessage>}
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          width="full"
          isLoading={isSubmitting}
          loadingText="Saving"
        >
          Add Item
        </Button>
      </Stack>
    </Box>
  );
};

export default ItemForm;
