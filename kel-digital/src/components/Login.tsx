import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Navigate } from "react-router-dom"
import { getUserInfo } from '../services/requisitions';

export default function Login() {
  const [ account, setAccount] = useState({username:'', password:''})
  const [ error, setError] = useState('')
  const [ redirect, setRedirect] = useState(false)

  useEffect(() => {
    if (localStorage.getItem('user')){
      const checkUser = async () => {
        const userLoggedIn = await getUserInfo()
        if (userLoggedIn.message === 'ok'){
          setRedirect(true)
        }
      }
      checkUser()
    }
    
},[])
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    });
  }

  const handleClick = async () => {
    const username = account.username;
    const password = account.password;
    try {
      const res = await axios.post('http://localhost:3001/login',{username:username, password:password})
      localStorage.setItem('user',JSON.stringify(res.data))
      setRedirect(true)
    } catch (error) {
      if(axios.isAxiosError(error)) {
        setError(error.response?.data.message)
      }
    }
  }

  if(redirect) {
    return (<Navigate to='/main' replace={true}/>)
  } 
    return (
      <div>
        <Form className='login-form'>
          <Form.Group className='login-input'>
            <FloatingLabel
              controlId="floatingInput"
              label="Username"
              className="mb-3"
            >
              <Form.Control onChange={handleChange} name="username" className="smaller-input"size="sm" type="username" placeholder="Your username" />
            </FloatingLabel>

            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control onChange={handleChange} name="password" className="smaller-input"size="sm" type="password" placeholder="Password" />
            </FloatingLabel>
            <Button 
              variant="primary"
              type="button"
              onClick={handleClick}
            >
              Entrar
            </Button>
          </Form.Group>
          <p className='login-error'>{error}</p>
          <Form.Text className="not-a-member" >
             <a className= "sign-up-text" href="signup">Ainda não é cliente? Abra sua conta sem NENHUMA documentação</a>
          </Form.Text>
        </Form>
      </div>
    )
}
