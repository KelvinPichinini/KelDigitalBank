export default interface User {
id:number;
accountId:number;
message?:string;
token:string;
username:string;
account: {
  id:number;
  balance:string;
}
}