import axios from "axios";
import { create } from "zustand";
import { CategoryState, TransactionState } from "./interface";

export async function Fetcher(path: string) {
  try {
    const response = await axios.get(`http://localhost:4000/${path}`, {
      headers: {
        "access-token": localStorage.getItem("accessToken"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    throw error;
  }
}

export async function Mutator(path: string, postData: any) {
  try {
    const response = await axios.post(
      `http://localhost:4000/${path}`,
      postData,
      {
        headers: {
          "access-token": localStorage.getItem("accessToken"),
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Failed to post data:", error);
    throw error;
  }
}

export async function Deleter(path: string) {
  try {
    const response = await axios.delete(`http://localhost:4000/${path}`, {
      headers: {
        "access-token": localStorage.getItem("accessToken"),
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to delete data:", error);
    throw error;
  }
}

const createStore = <T extends object>(init: (set: any) => T): (() => T) => {
  return create<T>(init);
};

export const useTransactions = createStore<TransactionState>((set) => ({
  transactions: null,
  isLoading: false,
  error: null,
  loadTransactions: async () => {
    set({ isLoading: false, error: null });
    try {
      const response = await Fetcher("transactions");
      set({ transactions: response, isLoading: false });
    } catch (error) {
      console.error("Failed to load transactions:", error);
      set({
        isLoading: false,
        error: "Failed to load transactions. Please try again later.",
      });
    }
  },
}));

export const useCategories = createStore<CategoryState>((set) => ({
  categories: null,
  isLoading: false,
  error: null,
  loadCategories: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await Fetcher("categories");
      set({ categories: response, isLoading: false });
    } catch (error) {
      console.error("Failed to load categories:", error);
      set({
        isLoading: false,
        error: "Failed to load categories. Please try again later.",
      });
    }
  },
}));
