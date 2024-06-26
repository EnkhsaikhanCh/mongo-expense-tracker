export interface TransactionType {
  id: string;
  category_name: string;
  amount: string;
  date: string;
}

export interface TransactionState {
  transactions: TransactionType[] | null;
  loadTransactions: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export interface Category {
  id: string;
  name: string;
}

export interface CategoryState {
  categories: Category[] | null;
  loadCategories: () => Promise<void>;
  isLoading: boolean;
  error: string | null;
}

export interface ApiResponseError {
  response?: {
    data?: {
      message?: string;
    };
  };
}

export type ModalHeaderProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};
