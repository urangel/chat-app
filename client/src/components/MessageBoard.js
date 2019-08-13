import React, { useState, useEffect } from 'react'
import socketIO_Client from 'socket.io-client'

const name = prompt('What is your screen name?');

const socket = socketIO_Client("http://localhost:3001");

const emitMsg = (input, name) => {
  socket.emit('chat-message', name, input);
}

socket.on('chat-message', (userName, input) =>{
  let p = document.createElement('p');
  let textNode = document.createTextNode(`${userName}: ${input}`);
  p.appendChild(textNode);
  p.classList.add('chat-message');
  let div = document.createElement('div');
  div.classList.add('message-div');
  div.appendChild(p);
  document.getElementById('messages-container').appendChild(p);
  if( userName === name) {
    p.classList.add('own-message');
  } else {
    p.classList.add('other-message');
  }
})

function MessageBoard() {

  const [messages, setMessages] = useState([]); //empty array is the default state
  const [input, setInput] = useState('');
  // const [userName, setUserName] = useState('');
  // const [socket, setSocket] = useState();

  useEffect( () => {
    console.log('componentDidMount through useEffect!');
    // setUserName(prompt('What is your screen name?'));

  }, []); //empty array as second argument makes this similar to componentDidMount


  const handleSubmit = (e) =>{
    e.preventDefault();

    emitMsg(input, name);
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
          
        </div>
      </form>
    </div>
  )
}

export default MessageBoard
