import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import '../App.css';
import Header from '../components/Header';
import Statement from '../components/Statement';
import TransferFunds from '../components/TransferFunds';
import { getUserInfo } from '../services/requisitions';


function Main() {
  const [redirect, setRedirect] =  useState(false)
  
  useEffect( () => {
    if(!localStorage.getItem('user')){
      setRedirect(true)
    } else {
      const getUser = async () => {
        const result = await getUserInfo();
        if( result.message !== 'ok') {
          setRedirect(true)
        }
      }
      getUser();
    }
  }, [])

  
  if(redirect) {
      return (<Navigate to='/' replace={true}/>)
  }
  return (
    <div className="main">
      <Header />
      <TransferFunds />
      <Statement />
    </div>
  );
}

export default Main;