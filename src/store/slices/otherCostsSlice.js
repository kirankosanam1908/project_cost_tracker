import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebase';

export const fetchOtherCosts = createAsyncThunk('costs/fetchOtherCosts', async (userId) => {
  const snapshot = await getDocs(collection(db, 'users', userId, 'otherCosts'));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
});

export const addOtherCost = createAsyncThunk('costs/addOtherCost', async ({ userId, description, amount }) => {
  const docRef = await addDoc(collection(db, 'users', userId, 'otherCosts'), { description, amount });
  return { id: docRef.id, description, amount };
});

export const deleteOtherCost = createAsyncThunk('costs/deleteOtherCost', async ({ userId, costId }) => {
  await deleteDoc(doc(db, 'users', userId, 'otherCosts', costId));
  return costId;
});

export const updateOtherCost = createAsyncThunk('costs/updateOtherCost', async ({ userId, costId, description, amount }) => {
  await updateDoc(doc(db, 'users', userId, 'otherCosts', costId), { description, amount });
  return { id: costId, description, amount };
});

const otherCostsSlice = createSlice({
  name: 'otherCosts',
  initialState: { list: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOtherCosts.fulfilled, (state, action) => {
        state.list = action.payload;
      })
      .addCase(addOtherCost.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(deleteOtherCost.fulfilled, (state, action) => {
        state.list = state.list.filter(cost => cost.id !== action.payload);
      })
      .addCase(updateOtherCost.fulfilled, (state, action) => {
        const idx = state.list.findIndex(cost => cost.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      });
  }
});

export default otherCostsSlice.reducer;
