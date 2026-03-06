export interface Holding {
  id: string;
  ticker: string;
  quantity: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateHoldingInput {
  ticker: string;
  quantity: number;
}
