import React, { useState, useEffect } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Heading,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Text
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteOtherCost, fetchOtherCosts } from '../store/slices/otherCostsSlice';

const OtherCostList = () => {
  const dispatch = useDispatch();
  const otherCosts = useSelector((state) => state.otherCosts.list) || [];
  const user = useSelector((state) => state.auth.user);

  const [sortOrder, setSortOrder] = useState('default');
  const [minAmount, setMinAmount] = useState(0);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchOtherCosts(user.uid));
    }
  }, [dispatch, user?.uid]);

  const handleDelete = (id) => {
    dispatch(deleteOtherCost({ userId: user.uid, costId: id }));
  };

  const filteredAndSortedCosts = [...otherCosts]
    .filter((cost) => cost.amount >= minAmount)
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.amount - b.amount;
      if (sortOrder === 'desc') return b.amount - a.amount;
      return 0;
    });

  return (
    <Box>
      <Heading size="md" mb={4}>
        Other Costs
      </Heading>

      <Flex mb={4} gap={4} flexWrap="wrap">
        <Select width="200px" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="default">Sort by</option>
          <option value="asc">Amount: Low to High</option>
          <option value="desc">Amount: High to Low</option>
        </Select>

        <NumberInput
          width="200px"
          min={0}
          defaultValue={0}
          onChange={(valueString) => setMinAmount(Number(valueString))}
        >
          <NumberInputField placeholder="Min amount filter" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>

      {filteredAndSortedCosts.length === 0 ? (
        <Text>No other costs found.</Text>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Description</Th>
              <Th>Amount</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredAndSortedCosts.map((cost) => (
              <Tr key={cost.id}>
                <Td>{cost.description}</Td>
                <Td>₹{cost.amount}</Td>
                <Td>
                  <IconButton
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(cost.id)}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Box>
  );
};

export default OtherCostList;
