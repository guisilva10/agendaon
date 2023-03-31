import type { NextPage } from 'next'
import { useState } from 'react'
import emailjs from '@emailjs/browser'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  const [isName, setIsName] = useState('')
  const [isNumber, setIsNumber] = useState('')
  const [todoList, setTodoList] = useState<string[]>([]);
  const [isEmail, setIsEmail ] = useState('')


  
  const sendEmail = () => {

    if(isName === '' || isNumber === ''){
      alert("Preencha todos os campos");
      return;
    }

    const templateParams = {
      email_cliente: isEmail,
      from_name : isName,
      number: isNumber
    }

    emailjs.send("service_9746pmh", "template_tg1we1e", templateParams, "JbwzkJeaee4aM1vNU" )
    .then((response) => {
      console.log("EMAIL ENVIADO", response.status, response.text)
      alert('Email Envido com sucesso')
      setTodoList([...todoList, isName, isNumber, isEmail])
    setIsName('')
    setIsNumber('')
    setIsEmail('')


    }, (err) => {
      console.log("erro:" , err)
    })
  }


  const handleDeletItem = () => {
    setTodoList([])
  }


  return (
    <section>
      <div className={styles.container}>
        <form action="" className={styles.form}>
          <input type="text" name="nome" placeholder='digte seu nome' 
          value={isName} 
          onChange={(e) => setIsName(e.target.value)}/>
          <input type="text" name="nome" placeholder='digte seu email' 
          value={isEmail} 
          onChange={(e) => setIsEmail(e.target.value)}/>
          <input type="number" name="celular" id="" placeholder='digite seu telefone' 
          value={isNumber} 
          onChange={(e) => setIsNumber(e.target.value)}
          />
          <input type="button" value="Agendar" className={styles.btn} onClick={sendEmail} />
          <input type="button" value="Apagar" className={styles.btn} onClick={handleDeletItem} />
        </form>

        <div className={styles.list}>
        <ul>
          <h2 className={styles.h2}>Agendados</h2>
          {
          todoList.map((todo) => 
            <li className={styles.item} key={todo}>{todo}</li>
           )
          }
        </ul>
        </div>
      </div>
    </section>
  )
}

export default Home
