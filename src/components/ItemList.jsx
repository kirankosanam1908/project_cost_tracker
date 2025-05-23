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
import { deleteItem, fetchItems } from '../store/slices/itemsSlice';

const ItemList = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.items.list) || [];
  const user = useSelector((state) => state.auth.user);

  const [sortOrder, setSortOrder] = useState('default');
  const [minCost, setMinCost] = useState(0);

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchItems(user.uid));
    }
  }, [dispatch, user?.uid]);

  const handleDelete = (id) => {
    dispatch(deleteItem({ userId: user.uid, itemId: id }));
  };

  const filteredAndSortedItems = [...items]
    .filter((item) => item.cost >= minCost)
    .sort((a, b) => {
      if (sortOrder === 'asc') return a.cost - b.cost;
      if (sortOrder === 'desc') return b.cost - a.cost;
      return 0;
    });

  return (
    <Box>
      <Heading size="md" mb={4}>
        Items
      </Heading>

      <Flex mb={4} gap={4} flexWrap="wrap">
        <Select width="200px" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="default">Sort by</option>
          <option value="asc">Cost: Low to High</option>
          <option value="desc">Cost: High to Low</option>
        </Select>

        <NumberInput
          width="200px"
          min={0}
          defaultValue={0}
          onChange={(valueString) => setMinCost(Number(valueString))}
        >
          <NumberInputField placeholder="Min cost filter" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Flex>

      {filteredAndSortedItems.length === 0 ? (
        <Text>No items found.</Text>
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Cost</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {filteredAndSortedItems.map((item) => (
              <Tr key={item.id}>
                <Td>{item.name}</Td>
                <Td>₹{item.cost}</Td>
                <Td>
                  <IconButton
                    icon={<DeleteIcon />}
                    size="sm"
                    colorScheme="red"
                    onClick={() => handleDelete(item.id)}
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

export default ItemList;
