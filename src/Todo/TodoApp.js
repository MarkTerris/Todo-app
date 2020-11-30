import React, { useState } from 'react'
import { Row, Button, Card, ListGroup, Form} from 'react-bootstrap'

import { TodoList } from './TodoList'

const styles = {
  Card: {
    width: 300,
    marginTop: '1rem'
  }
}

export function TodoApp({ language }) {
    const lang = language
    const [ todos, setTodos ] = useState({ items: [], text: '' })
    const [ isSelectMode, setSelectMode ] = useState(false)
    const [ isItemSelected, setItemSelected ] = useState(false)
    const [ idSelected, setIdSelected ] = useState(null)

    function handleCompleteSelect() {
      setTodos({
        items: todos.items.map((item, index) => {
            if (index === idSelected) {
                item.done = !item.done
            }   
            return item
        }), 
        text: ''
      })
      setItemSelected(false)
    }

    const [ editMode, setEditMode ] = useState(false)
    const [ editText, setEditText ] = useState('')

    function handleEditSelect() {
      setEditMode(true)
    }

    function handleSubmitEditingForm(e) {
      e.preventDefault()
      if (editText.length === 0) {
        return
      }

      setTodos({
        items: todos.items.map((item, index) => {
          if (index === idSelected) {
            item.label = editText
          }
          return item
        }),
        text: ''
      })

      setEditText('')
      setEditMode(false)
      setItemSelected(false)
    }

    function handleChangeEditingInput(e) {
      setEditText(e.target.value)
    }

    function handleRemoveSelect() {
      setTodos((prev) => ({
        items: prev.items.filter((item, index) => index !== idSelected), 
        text: ''
      }))
      setItemSelected(false)
    }

    function handleSelect() {
      setSelectMode(true)
    }

    function handleCancelSelect() {
      setSelectMode(false)
      setItemSelected(false)
    }

    function handleChangeInput(e) {
      setTodos((prev) => ({
          items: [...prev.items],
          text: e.target.value
        }))
    }
  
    function handleSubmitForm(e) {
      e.preventDefault()
      if (todos.text.length === 0) {
        return
      }

      const newItem = {
        text: todos.text,
        done: false
      }

      setTodos((prev) => ({
        items: [
          ...prev.items,
          { label: newItem.text, done: newItem.done } 
        ],
        text: ''
      }));
    }


    function handleTodosChange(id) {
      setItemSelected(true)
      setIdSelected(id)
    }

    function leftItems() {
      let count = 0
      for (let i = 0; i < todos.items.length; i++) {
        if (!todos.items[i].done) {
          count++
        }
      } return count
    }

    return (
      <div style={{'margin': '0 2rem'}}>
        <Row className="justify-content-center" >
          <Card style={styles.Card}>
            <Card.Header>
            {leftItems()} { (lang === "eng") ? 'left' : 'осталось' } 
              { isSelectMode ?
              <> 
                <Button
                  className={(lang === "eng") ? "button-cancel-eng" : "button-cancel-rus"}
                  onClick={handleCancelSelect} 
                  variant="secondary"
                >{ (lang === "eng") ? 'Cancel' : 'Отменить' } </Button>
              </> : 
              <>
                <Button
                  onClick={handleSelect} 
                  className={(lang === "eng") ? "button-cancel-eng" : "button-cancel-rus"}
                >{ (lang === "eng") ? 'Select' : 'Выбрать' } </Button>
              </>
              }
            </Card.Header>
            
            {(isSelectMode && todos.items.length > 0) ? <ListGroup variant="flush" key={1}>
              <ListGroup.Item>
                <Button 
                  key={1} 
                  onClick={handleCompleteSelect} 
                  style={styles.Button} 
                  variant="primary" 
                  block 
                  disabled={!isItemSelected}
                >{ (lang === "eng") ? 'Complete' : 'Отметить выполненным' } </Button>

                <Button 
                  key={2} 
                  onClick={handleEditSelect} 
                  style={styles.Button} 
                  variant="secondary" 
                  block 
                  disabled={!isItemSelected}
                >{ (lang === "eng") ? 'Edit' : 'Изменить' } </Button>

                <Button 
                  key={3} 
                  onClick={handleRemoveSelect} 
                  style={styles.Button} 
                  variant="danger" 
                  block 
                  disabled={!isItemSelected}
                >{ (lang === "eng") ? 'Delete' : 'Удалить' } </Button>
              </ListGroup.Item>
            </ListGroup> : 
            <></>
            }

            <ListGroup variant="flush" key={2}>
              <TodoList
                lang={lang}
                todos={todos.items} 
                action={isSelectMode}
                onSelectItem={handleTodosChange} />
            </ListGroup>
          </Card>
        </Row>

        {(isSelectMode && editMode && todos.items.length > 0) ? 
        <Row className="justify-content-center" >
          <Card style={styles.Card}>
            <Card.Header>{ (lang === "eng") ? 'Editing item' : 'Изменение элемента' } </Card.Header>

            <ListGroup variant="flush">
              <ListGroup.Item>
                <Form onSubmit={handleSubmitEditingForm}>
                    <Form.Control 
                      value={editText} 
                      onChange={handleChangeEditingInput} 
                      type="text" 
                      placeholder={ (lang === "eng") ? 'Type in new task' : 'Введите новую задачу' }
                    />

                    <Button 
                      onClick={() => {
                        setEditMode(false)
                        setEditText('')
                        setItemSelected(false)
                      }} 
                      variant="secondary" 
                      style={{'marginTop': '1rem'}} 
                      block
                    >{ (lang === "eng") ? 'Cancel' : 'Отменить' } </Button>

                    <Button 
                      type="submit" 
                      variant="primary" 
                      style={{'marginTop': '1rem'}} 
                      block
                    >{ (lang === "eng") ? 'Submit' : 'Изменить' } </Button>
                </Form>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Row> :        
        <Row className="justify-content-center" >
          <Card style={styles.Card}>
            <Card.Header>{ (lang === "eng") ? 'Create new task' : 'Создать новую задачу' } </Card.Header>

            <ListGroup variant="flush">
              <ListGroup.Item>
                <Form onSubmit={handleSubmitForm}>
                    <Form.Control 
                      value={todos.text} 
                      onChange={handleChangeInput} 
                      type="text" 
                      placeholder={ (lang === "eng") ? 'New task' : 'Новая задача' }
                    />

                    <Button 
                      type="submit" 
                      variant="primary" 
                      block 
                      style={{'marginTop': '1rem'}}
                    >{ (lang === "eng") ? 'Add' : 'Добавить' } </Button>
                </Form>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Row>}
 
      </div>
    )
}
