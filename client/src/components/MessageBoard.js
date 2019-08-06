import React, { useState, useEffect } from 'react'
import socketIO_Client from 'socket.io-client'

const socket = socketIO_Client("http://localhost:3001");

const emitMsg = (input) => {
  socket.emit('chat-message', input);
}

socket.on('chat-message', msg =>{
  let li = document.createElement('li');
  let textNode = document.createTextNode(msg);
  li.appendChild(textNode);
  document.getElementById('messages-container').appendChild(li);
})

function MessageBoard() {

  const [messages, setMessages] = useState([]); //empty array is the default state
  const [input, setInput] = useState('');
  // const [socket, setSocket] = useState();

  useEffect( () => {
    console.log('componentDidMount through useEffect!');
    // setSocket();
  }, []); //empty array as second argument makes this similar to componentDidMount


  const handleSubmit = (e) =>{
    e.preventDefault();

    emitMsg(input);
    setMessages( [...messages, input.value]);
    setInput('');
  }

  return (
    <div id='message-container'>
      <h1>Message Board</h1>
      <form>
        <input 
          type='text' 
          id='message-input' 
          value={input} 
          onChange={ e => setInput(e.target.value) }>
        </input>
        <button onClick={handleSubmit}>Submit</button>
        <div id='messages-container'>
          <ul id='messages'></ul>
        </div>
      </form>
    </div>
  )
}

export default MessageBoard
