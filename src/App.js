import React, { useState } from 'react'
import { Container, Row, Button } from 'react-bootstrap'

import { TodoApp } from './Todo/TodoApp'

export default function App() {
  const [ lang, setLang ] = useState('eng')
  const [ islangSet, setIsLangSet ] = useState(false)

  function appLangBlock() {
    if (islangSet) {
      if (lang === 'eng') {
        return <TodoApp language={lang}/>
      } else if (lang === 'rus') {
        return <TodoApp language={lang}/>
      }
    }
  }

  return (
    <Container>
      <Row className="justify-content-center">
        <h3>{ (lang === "eng") ? 'Task manager' : 'Менеджер задач' } </h3>
      </Row>

      <hr style={{'width': '300px'}}/>

      <Row className="justify-content-center" style={{'marginTop': '2rem'}}>
        <h5>{ (lang === "eng") ? 'Set App language' : 'Выбрать язык' }</h5>
      </Row>

      <Row className="justify-content-center">
        <Button 
          onClick={() => {
            setLang('eng')
            setIsLangSet(true)}}
          style={{'marginRight': '1rem'}}
        >
          English
        </Button>
        <Button onClick={() => {
          setLang('rus')
          setIsLangSet(true)
        }}>
          Русский
        </Button>
      </Row>

      <hr style={{'width': '300px'}}/>

      <Row className="justify-content-center" style={{'marginTop': '1rem'}}>
        {appLangBlock()}
      </Row>
    </Container>

  )
}