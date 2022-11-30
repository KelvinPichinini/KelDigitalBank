import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import TransactionI from '../interfaces/Transactions.interface';
import TransactionsI from '../interfaces/Transactions.interface';
import { getAllTransactions, getUserByAccountId } from '../services/requisitions';

type TransactionProps = {
  filter: string;
  initialDate: Date;
  finalDate: Date;
  update:boolean
};

export default function Transaction({filter, initialDate, finalDate, update}: TransactionProps) {
  const [transactions, setTransactions] = useState<TransactionsI>()
  const [filteredT, setFilteredT] = useState<TransactionI[]>()
  const [redirect, setRedirect] = useState(false)
  const [userId, setUserId] = useState<number>()
  const [consolidatedTrans, setConsolidatedTrans] = useState<TransactionI[]>()

  

  

  useEffect( () => {
    if(!localStorage.getItem('user')){
      setRedirect(true)
    } else {
      const getTransactions = async () => {
        const result = await getAllTransactions();
        if( result?.message !== 'ok') {
          setRedirect(true)
        } else {
          setTransactions(result)
        }
      }
      getTransactions()
      const id = parseInt(JSON.parse(localStorage.getItem('user') as string).id)
      setUserId(id)
      const filterTransactions = async () => {
        if(filter === '' || filter === 'all'){
          const newTransactions:TransactionI[] = []
          if(transactions?.transactions)
          for (const element of transactions?.transactions) {
            const createdDate = new Date(element.createdAt as string);
            if( createdDate >= initialDate && createdDate<=finalDate){
              if(element.debitedAccountId === userId){
                element.type = 'Debito';
                const res = await getUserByAccountId(element.creditedAccountId as number)
                element.otherUsername = res.data
              } else {
                element.type = 'Credito'
                const res = await getUserByAccountId(element.debitedAccountId as number)
                element.otherUsername = res.data
              }
              newTransactions.push(element)
            }
          }
          setFilteredT(newTransactions)
          setConsolidatedTrans(newTransactions)
        }
        if(filter === 'sent'){
          const newTransactions:TransactionI[]= []
          if(consolidatedTrans)
          for (const element of consolidatedTrans) {
            const createdDate = new Date(element.createdAt as string);
            if( createdDate >= initialDate && createdDate<=finalDate && element.debitedAccountId === userId){
              newTransactions.push(element)
            }
          }
          setFilteredT(newTransactions)
        }
        if(filter === 'received'){
          const newTransactions:TransactionI[]= []
          if(consolidatedTrans)
          for (const element of consolidatedTrans) {
            const createdDate = new Date(element.createdAt as string);
            if( createdDate >= initialDate && createdDate<=finalDate && element.creditedAccountId === userId){
              newTransactions.push(element)
            }
          }
          setFilteredT(newTransactions)
        }
      }
      filterTransactions()
    }

  }, [filter,finalDate,initialDate,update ])

  if(redirect) {
    return (<Navigate to='/' replace={true}/>)
  }
    return (
      <div className='transaction'>
        <Table className='table'>
          <thead>
            <tr>
              <th>+/-</th>
              <th>Valor</th>
              <th>Dest./Remet.</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {filteredT?.map((item, i)=>(
              <tr key={item.id? item.id + 0 : i}>
                <td key={item.id? item.id + 1 : i}>{item.type}</td>
                <td key={item.id? item.id + 2 : i} className={item.type}>{item.value}</td>
                <td key={item.id? item.id + 3 : i}>{item.otherUsername}</td>
                <td key={item.id? item.id + 4 : i}>{new Date(item.createdAt as string).toLocaleDateString('pt-br')}</td>
              </tr >
            ))}
          </tbody>
        </Table>    
      </div>
    )
}