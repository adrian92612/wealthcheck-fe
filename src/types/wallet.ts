export type Wallet = {
  id: number;
  name: string;
  balance: number;
  createdAt: string;
  updatedAt: string;
};

export type WalletFormData = {
  name: string;
  balance: number;
};
