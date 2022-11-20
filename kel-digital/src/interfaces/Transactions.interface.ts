export default interface TransactionI {
  id?:number;
  value?:string;
  creditedAccountId?:number;
  debitedAccountId?:number;
  createdAt?:string;
  type?:string;
  otherUsername?:number | string;
}

 export default interface TransactionsI {
    transactions?:TransactionI[];
    message:string
}
