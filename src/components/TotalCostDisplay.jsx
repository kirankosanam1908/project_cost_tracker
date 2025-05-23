import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Text } from '@chakra-ui/react';

const TotalCostDisplay = () => {
  const items = useSelector((state) => state.items.list);
  const otherCosts = useSelector((state) => state.otherCosts.list);

  const totalItemsCost = items.reduce((sum, item) => sum + item.cost, 0);
  const totalOtherCost = otherCosts.reduce((sum, cost) => sum + cost.amount, 0);
  const total = totalItemsCost + totalOtherCost;

  return (
    <Box mt={6} p={4} border="1px" borderColor="gray.200" borderRadius="md">
      <Text fontSize="lg" fontWeight="bold">Total Project Cost: ${total}</Text>
    </Box>
  );
};

export default TotalCostDisplay;
