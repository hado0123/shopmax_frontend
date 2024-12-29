import React, { useState, useEffect } from 'react'
import { io } from 'socket.io-client'

// 서버 주소
const socket = io('http://localhost:8000')

function Chat() {
   const [messages, setMessages] = useState([])
   const [input, setInput] = useState('')

   useEffect(() => {
      // 서버에서 메시지 수신
      socket.on('chat message', (msg) => {
         setMessages((prevMessages) => [...prevMessages, msg])
      })

      // 컴포넌트 언마운트 시 이벤트 제거
      return () => {
         socket.off('chat message')
      }
   }, [])

   const sendMessage = () => {
      if (!input.trim()) return

      // 서버로 메시지 전송
      socket.emit('chat message', input)
      setInput('') // 입력 초기화
   }

   return (
      <div style={{ width: 400, margin: '0 auto', border: '1px solid #ccc', padding: 20 }}>
         <h2>채팅</h2>
         <div
            style={{
               height: 300,
               overflowY: 'auto',
               border: '1px solid #ccc',
               padding: 10,
               marginBottom: 10,
            }}
         >
            {messages.map((msg, index) => (
               <div key={index} style={{ margin: '5px 0' }}>
                  {msg}
               </div>
            ))}
         </div>
         <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="메시지를 입력하세요" style={{ width: 'calc(100% - 60px)', marginRight: 10 }} />
         <button onClick={sendMessage}>전송</button>
      </div>
   )
}

export default Chat
