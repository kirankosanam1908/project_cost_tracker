// src/store/slices/itemsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../../firebase/firebase';

// Fetch items
export const fetchItems = createAsyncThunk(
  'items/fetchItems',
  async (userId, { rejectWithValue }) => {
    try {
      if (!userId) throw new Error('Missing userId');
      const snapshot = await getDocs(collection(db, 'users', userId, 'items'));
      return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add item
export const addItem = createAsyncThunk(
  'items/addItem',
  async ({ userId, name, cost }, { rejectWithValue }) => {
    try {
      if (!userId || !name || typeof cost !== 'number' || isNaN(cost)) {
        throw new Error('Invalid input data');
      }
      const docRef = await addDoc(collection(db, 'users', userId, 'items'), {
        name,
        cost
      });
      return { id: docRef.id, name, cost };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


// Delete item
export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async ({ userId, itemId }, { rejectWithValue }) => {
    try {
      if (!userId || !itemId) throw new Error('Missing userId or itemId');
      await deleteDoc(doc(db, 'users', userId, 'items', itemId));
      return itemId;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Update item
export const updateItem = createAsyncThunk(
  'items/updateItem',
  async ({ userId, itemId, name, cost }, { rejectWithValue }) => {
    try {
      if (!userId || !itemId || !name || typeof cost !== 'number') {
        throw new Error('Invalid update data');
      }
      await updateDoc(doc(db, 'users', userId, 'items', itemId), {
        name,
        cost
      });
      return { id: itemId, name, cost };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const itemsSlice = createSlice({
  name: 'items',
  initialState: {
    list: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(addItem.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.list = state.list.filter((item) => item.id !== action.payload);
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.list.findIndex((item) => item.id === action.payload.id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.error = action.payload;
      });
  }
});

export default itemsSlice.reducer;
