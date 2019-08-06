import React, { useState, useEffect } from 'react'
import socketIO_Client from 'socket.io-client'

function MessageBoard() {

  const [messages, setMessages] = useState([]); //empty array is the default state
  // const [input, setInput] = useState('');
  const [socket, setSocket] = useState(socketIO_Client("http://localhost:3001"));

  

  useEffect( () => {
    console.log('componentDidMount through useEffect!');
    socket.on('chat-message', msg =>{
      setMessages([...messages, msg]);
    })
  }, [messages]); //empty array as second argument makes this similar to componentDidMount

  
  const handleSubmit = (e) =>{
    e.preventDefault();
    socket.emit('chat-message', document.getElementById('message-input').value);
    // setMessages( [...messages, input]);
    // setInput('');
  }

  return (
    <div id='message-container'>
      <h1>Message Board</h1>
      <ul id='messages'></ul>
      <form>
        <input type='text' id='message-input' ></input>
        <button type='submit' onClick={handleSubmit}>Submit</button>
        {
          messages.map( msg =>(
            <li>{msg}</li>
          ))
        }
      </form>
    </div>
  )
}

export default MessageBoard
