export enum Status {
  'active',
  'completed',
}

export default interface IOrders {
  id?: number;
  user_id: number;
  status: Status;
  total_price: number;
}
