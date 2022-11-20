import '../App.css';
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Header from '../components/Header';
import { Alert, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { postSignUp } from '../services/requisitions';
import { Navigate } from 'react-router-dom';

function SignUp() {
  const [redirect, setRedirect] =  useState(false)
  const [account, setAccount] = useState({username:'', password:''})
  const [usernameCheck, setUsernameCheck] = useState(false)
  const [passwordCheck, setPasswordCheck] = useState(false)
  const [disabled, setDisabled] = useState<boolean>(true)
  const [error, setError] =  useState(false)
  const [errorMessage, setErrorMessage] =  useState('')
  const [alertMessage, setAlertMessage] = useState('')

  useEffect(() => {
    const passwordREGEX = /(^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$)/
    if (account.username.length >= 3){
      setUsernameCheck(true)
    }
    if (account.username.length < 3){
      setUsernameCheck(false)
    }
    if (account.password.match(passwordREGEX)){
      setPasswordCheck(true)
    }
    if (!account.password.match(passwordREGEX)){
      setPasswordCheck(false)
    }
    if (usernameCheck && passwordCheck) {
      setDisabled(false)
    } else {
      setDisabled(true)
    }
},[account,usernameCheck,passwordCheck])

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
    const res = await postSignUp(account.username, account.password)
    console.log(res)
    if (res.message !== 'ok') {
      console.log(res)
      setError(true)
      setAlertMessage('Cadastro não efetuado')
      setErrorMessage(res.message);
    }else {
      console.log(res)
      localStorage.setItem('user',JSON.stringify(res))
      setRedirect(true)

    }
  }

  if(redirect) {
    return (<Navigate to='/main' replace={true}/>)
  } 

  if(error) {
    return (
      <div className="signup">
        <Header />
        <h1 className='title-signup'>NENHUM documento. NE - NHU - N - ZINHO.</h1>
        <h3 className='subtitle-signup'>Isso é liberdade. Faça parte!</h3>
          <Alert variant='danger' onClose={() => {
                  setError(false)
                  }}
                  dismissible>
                  <Alert.Heading>{alertMessage}</Alert.Heading>
                  <p>
                    { errorMessage }
                  </p>
          </Alert>
        <div className='signup-form'>
          <h4 className='description-signup'>Precisamos só de duas coisas, na verdade TRÊS. Vamos-lá?</h4>
          <div className='signup-input'>
            <p className='step-signup'>1º Escolha um nome de usuário! Qualquer um! com pelo menos três caracteres...</p>
            <FloatingLabel
              controlId="floatingInput"
              label="Username"
              className="mb-3"
            >
              <Form.Control onChange={handleChange} name='username' className="smaller-input"size="sm" type="username" placeholder="Your username" />
            </FloatingLabel>
            <p className='step-signup'>2º Agora prescisamos de uma senha. 8 caracteres, 1 maiúscula e 1 número</p>
            <FloatingLabel controlId="floatingPassword" label="Password">
              <Form.Control onChange={handleChange} name='password' className="smaller-input"size="sm" type="password" placeholder="Password" />
            </FloatingLabel>
          <p className='step-signup'>3º e Ultimo passo é indicar pros migos e sair gastando!!</p>
          </div>
          <Button onClick={handleClick}variant="primary" type="submit" disabled={disabled} >
            Cadastrar
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="signup">
      <Header />
      <h1 className='title-signup'>NENHUM documento. NE - NHU - N - ZINHO.</h1>
      <h3 className='subtitle-signup'>Isso é liberdade. Faça parte!</h3>
      <div className='signup-form'>
        <h4 className='description-signup'>Precisamos só de duas coisas, na verdade TRÊS. Vamos-lá?</h4>
        <div className='signup-input'>
          <p className='step-signup'>1º Escolha um nome de usuário! Qualquer um! com pelo menos três caracteres...</p>
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
            className="mb-3"
          >
            <Form.Control onChange={handleChange} name='username' className="smaller-input"size="sm" type="username" placeholder="Your username" />
          </FloatingLabel>
          <p className='step-signup'>2º Agora prescisamos de uma senha. 8 caracteres, 1 maiúscula e 1 número</p>
          <FloatingLabel controlId="floatingPassword" label="Password">
            <Form.Control onChange={handleChange} name='password' className="smaller-input"size="sm" type="password" placeholder="Password" />
          </FloatingLabel>
        <p className='step-signup'>3º e Ultimo passo é indicar pros migos e sair gastando!!</p>
        </div>
        <Button onClick={handleClick} variant="primary" type="submit" disabled={disabled} >
          Cadastrar
        </Button>
      </div>
    </div>
  );
}

export default SignUp;