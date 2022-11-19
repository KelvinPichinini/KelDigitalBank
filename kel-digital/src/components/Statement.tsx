import React, { useState } from 'react'
import FloatingLabel from 'react-bootstrap/esm/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import Transaction from './Transaction';

export default function Statement () {
  const [filter, setFilter] = useState('');
  const [initialDate, setInitialDate] = useState(new Date(1900))
  const [finalDate, setFinalDate] = useState(new Date())
  const handleClick = (filterType:string) => {
    setFilter(filterType)

  }
  const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const date = value.split('-')
    const newDate = new Date(parseInt(date[0]),parseInt(date[1]) -1 ,parseInt(date[2]),0,0,0,0)
    setInitialDate(newDate)

  }
  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const date = value.split('-')
    const newDate = new Date(parseInt(date[0]),parseInt(date[1]) -1 ,parseInt(date[2]),23,59,59)
    setFinalDate(newDate)
    
  }

    return (
      <div>
        <div className='separator'></div>
        <div className='statement'>
          <h1 className='title-statement'>EXTRATO</h1> 
          <div className='filters'>
              <Button onClick={() => {handleClick('all')}} name="all" variant="secondary" type="submit">
                TUDO
              </Button>
              <Button onClick={() => {handleClick('sent')}} name="sent" variant="secondary" type="submit">
                ENVIADO
              </Button> 
              <Button onClick={() => {handleClick('received')}} name="received" variant="secondary" type="submit">
                RECEBIDO
              </Button>
              <FloatingLabel
                controlId="floatingInput"
                label="Data inicial"
                className="mb-3"
              >            
                <Form.Control onChange={handleStartDate} type="date" name='initialDate'/>
              </FloatingLabel>
              <FloatingLabel
                controlId="floatingInput"
                label="Data final"
                className="mb-3"
              >            
                <Form.Control onChange={handleEndDate} type="date" name='finalDate'/>
              </FloatingLabel>

          </div>
        </div>
        <div className='separator'></div>    
        <Transaction filter={filter} initialDate={initialDate} finalDate={finalDate}/>

      </div>
    )
}