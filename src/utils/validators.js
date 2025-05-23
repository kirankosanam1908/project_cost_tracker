import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export const addItem = async (userId, item) => {
  await addDoc(collection(db, "users", userId, "items"), item);
};

export const addOtherCost = async (userId, cost) => {
  await addDoc(collection(db, "users", userId, "otherCosts"), cost);
};

export const updateItem = async (userId, itemId, updatedItem) => {
  const itemRef = doc(db, "users", userId, "items", itemId);
  await updateDoc(itemRef, updatedItem);
};

export const deleteItem = async (userId, itemId) => {
  const itemRef = doc(db, "users", userId, "items", itemId);
  await deleteDoc(itemRef);
};

export const updateOtherCost = async (userId, costId, updatedCost) => {
  const costRef = doc(db, "users", userId, "otherCosts", costId);
  await updateDoc(costRef, updatedCost);
};

export const deleteOtherCost = async (userId, costId) => {
  const costRef = doc(db, "users", userId, "otherCosts", costId);
  await deleteDoc(costRef);
};
