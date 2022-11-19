import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import logo from '../logo.svg'

export default function Header () {
  const [className, setClassName] = useState(' hidden')
  const [uname, setUname] = useState('')
  const location = useLocation();

  useEffect( () => {
      if(location.pathname === '/main') {
        if(localStorage.getItem('user')) {
          const username = JSON.parse(localStorage.getItem('user') as string).username
          setUname(username)
          setClassName('')
        }
      }
  }, [location.pathname])
  

  const handleClick = () => {
    localStorage.removeItem('user');
  }

    return (
      <div className='App-header'>
        <a href="/"><img src={logo} className="App-logo" alt="logo" /></a>
        <h2 className={'header-greating'+className}>Olá, {uname} como podemos te ajudar hoje?</h2> 
        <Button className={'logout-btn'+className} onClick={handleClick} variant="secondary" type="button">
              Sair
            </Button>      
      </div>
    )
}
