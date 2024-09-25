'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Loader2 } from 'lucide-react'

type Message = {
  id: number
  text: string
  sender: 'user' | 'bot'
}

type Theme = 'default' | 'blue' | 'green' | 'pink' | 'sunset' | 'retro' | 'pastel'

const themes: Record<Theme, string> = {
  default: 'bg-gray-100',
  blue: 'bg-blue-100',
  green: 'bg-green-100',
  pink: 'bg-pink-100',
  sunset: 'bg-orange-100',
  retro: 'bg-yellow-100',
  pastel: 'bg-purple-100'
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [theme, setTheme] = useState<Theme>('default')
  const chatBoxRef = useRef<HTMLDivElement>(null)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      if (chatBoxRef.current) {
        setScrollY(chatBoxRef.current.scrollTop)
      }
    }

    chatBoxRef.current?.addEventListener('scroll', handleScroll)
    return () => chatBoxRef.current?.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSend = () => {
    if (inputText.trim()) {
      const newMessage: Message = { id: Date.now(), text: inputText, sender: 'user' }
      setMessages([...messages, newMessage])
      setInputText('')
      setIsTyping(true)
      
      // Simulate bot response
      setTimeout(() => {
        const botMessage: Message = { id: Date.now(), text: 'This is a bot response.', sender: 'bot' }
        setMessages(prev => [...prev, botMessage])
        setIsTyping(false)
      }, 2000)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend()
    }
  }

  return (
    <div className={`h-screen flex flex-col ${themes[theme]}`}>
      <div className="flex-1 overflow-hidden relative">
        <div 
          ref={chatBoxRef}
          className="h-full overflow-y-auto p-4 space-y-4"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba')",
            backgroundAttachment: 'fixed',
            backgroundPosition: `center ${scrollY * 0.5}px`, // Parallax effect
            backgroundSize: 'cover'
          }}
        >
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="bg-gray-200 rounded-lg p-3 flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Bot is typing...</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
      <div className="p-4 bg-white">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <AnimatePresence>
            {inputText && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onClick={handleSend}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Send className="w-5 h-5" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="p-4 bg-gray-200">
        <div className="flex justify-center space-x-2">
          {(Object.keys(themes) as Theme[]).map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`w-8 h-8 rounded-full ${themes[t]} ${
                theme === t ? 'ring-2 ring-offset-2 ring-blue-500' : ''
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}