import React, { useState, useEffect } from 'react'
import socketIO_Client from 'socket.io-client'

function MessageBoard() {

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect( () => {
    console.log('componentDidMount through useEffect!');
  })

  const handleSubmit = (e) =>{
    e.preventDefault();
    setMessages( [...messages, input]);
    setInput('');
  }

  return (
    <div id='message-container'>
      <h1>Message Board</h1>
      <ul id='messages'></ul>
      <form>
        <input type='text' id='message-input' value={input} onChange={ e => setInput(e.target.value)}></input>
        <button type='submit' onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default MessageBoard
