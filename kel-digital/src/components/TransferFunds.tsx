import { useEffect, useState } from 'react';
import { Alert, Button } from 'react-bootstrap';
import CurrencyInput from 'react-currency-input-field';
import User from '../interfaces/user.interface';
import { getUserInfo, postTransfer } from '../services/requisitions';

export default function TransferFunds() {
  const [redirect, setRedirect] =  useState(false)
  const [user, setUser] = useState<User>()
  const [transfer, setTransfer] = useState({username:'', value:''})
  const [error, setError] =  useState(false)
  const [errorMessage, setErrorMessage] =  useState('')
  const [success, setSuccess] =  useState(false)
  const [toastType, setToastType] = useState('')
  const [alertMessage, setAlertMessage] = useState('')
  
  useEffect( () => {
    const getUser = async () => {
      const result = await getUserInfo();
      if( result.message !== 'ok') {
        setRedirect(true)
      } else {
        setUser(result)
      }
    }
    getUser()
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTransfer((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    });
  }

  const handleClick = async () => {
    const token = JSON.parse(localStorage.getItem('user') as string).token
    const username = transfer.username
    console.log(username)
    const value = transfer.value
    const res = await postTransfer(username, value, token)
    console.log(res)
    if( res.message !== 'ok' ) {
      setError(true)
      setAlertMessage('Transação não efetuada')
      setToastType('danger')
      setErrorMessage(res.message);
    } else {
      setError(false)
      setSuccess(true)
      setToastType('success')
      setAlertMessage('Transação efetuada com sucesso')
      setErrorMessage('');
      setTransfer({username:'', value:''});
      const result = await getUserInfo();
      if( result.message !== 'ok') {
        setRedirect(true)
      } else {
        setUser(result)
      }
            
      
    }
  }
    if(error || success) {
      return (
        <div className='transfer'>
          <h1 className='transfer-title'>Transferir</h1> 
              <input value={transfer.username} onChange={handleChange} name='username' className="transfer-input" type="username" placeholder="Usuário" />
              <Alert variant={toastType} onClose={() => {
                setError(false)
                setSuccess(false)
                }}
                dismissible>
                <Alert.Heading>{alertMessage}</Alert.Heading>
                <p>
                  { errorMessage }
                </p>
              </Alert>
              <CurrencyInput
                onChange={handleChange}
                className='transfer-input'
                prefix=''
                groupSeparator=','
                decimalSeparator='.'
                id="input-example"
                name="value"
                placeholder="Digite o valor"
                decimalsLimit={2}
                onValueChange={(value, name) => console.log(value, name)}
              /> 
              <Button onClick={handleClick} variant="secondary" type="button">
                enviar
              </Button>
              <h4 className='balance'>Saldo: R${user?.account.balance}</h4>    
        </div>
      )
    }

    return (
      <div className='transfer'>
        <h1 className='transfer-title'>Transferir</h1> 
              <input value={transfer.username} onChange={handleChange} name='username' className="transfer-input" type="username" placeholder="Usuário" />

            <CurrencyInput
              onChange={handleChange}
              className='transfer-input'
              prefix=''
              groupSeparator=','
              decimalSeparator='.'
              id="input-example"
              name="value"
              placeholder="Digite o valor"
              decimalsLimit={2}
              onValueChange={(value, name) => console.log(value, name)}
            /> 
            <Button onClick={handleClick} variant="secondary" type="button">
              enviar
            </Button>
            <h4 className='balance'>Saldo: R${user?.account.balance}</h4>    
      </div>
    )
}