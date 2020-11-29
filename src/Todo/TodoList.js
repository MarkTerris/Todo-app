import React from 'react' 
import { ListGroup } from 'react-bootstrap'

export function TodoList(props) {
    const lang = props.lang
    function handleItemSelected(id) {
        props.onSelectItem(id)
    }

    if (props.todos.length > 0) {
        if (props.action) {
            console.log(props.todos)
            return (
                <>
                {props.todos.map((item, id) => (
                    <>
                        <ListGroup.Item 
                            {...props} 
                            onClick={() => handleItemSelected(id)} 
                            key={id} 
                            className={item.done ? "done-item" : ""}
                        >
                            <span>            
                                <strong>{id + 1}. </strong>
                                {item.label}
                            </span>
                        </ListGroup.Item>
                    </>
                ))}
                </>
            )
        } else {
            return (
                <>
                    {props.todos.map((item, id) => (
                        <ListGroup.Item 
                            {...props} 
                            key={id+1} 
                            className={item.done ? "done-item" : ""}
                        >
                            <span>            
                                <strong>{id + 1}. </strong>
                                {item.label}
                            </span>
                        </ListGroup.Item>
                    ))}
                </>
            )}
    } else {
        return (
            <ListGroup.Item className="justify-content-center">
                <span style={{'color': '#a0a6ab'}}>{ (lang === "eng") ? 'No tasks. Create new! ' : 'Задач нет. Создайте новую! ' } </span>
            </ListGroup.Item>
        )
    }

}