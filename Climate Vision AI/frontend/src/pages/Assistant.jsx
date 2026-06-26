import { useState, useRef, useEffect } from 'react'
import { sendChat } from '../api/client'

const suggestedPrompts = [
  "What's causing the recent acceleration in global warming?",
  'How does PM2.5 pollution affect human health?',
  'Explain the link between climate change and flooding.',
  'What is the current state of the Paris Agreement?',
]

export default function Assistant() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [sessionId, setSessionId] = useState(null)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  async function handleSend(text = input) {
    if (!text.trim() || loading) return
    const userMsg = { role: 'user', content: text }
    setMessages((prev) => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const res = await sendChat(text, sessionId)
      setSessionId(res.session_id)
      setMessages((prev) => [...prev, { role: 'assistant', content: res.response }])
    } catch {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Sorry, something went wrong.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="page-container max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Climate Expert</h1>
        <h2 className="text-xl text-dark-300">Ask me anything about our climate</h2>
        <p className="text-sm text-dark-500 mt-1">I'm trained on climate science from IPCC, NASA, NOAA and WMO.</p>
      </div>

      {/* Suggested prompts */}
      {messages.length === 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {suggestedPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="card-hover text-left text-sm text-dark-300 hover:text-white"
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      {/* Chat messages */}
      <div className="space-y-4 mb-6 max-h-[50vh] overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-xl px-4 py-3 text-sm ${
                msg.role === 'user'
                  ? 'bg-primary-600 text-white'
                  : 'bg-dark-800 text-dark-200 border border-dark-700'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-dark-800 border border-dark-700 rounded-xl px-4 py-3 text-sm text-dark-400">
              Thinking...
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          handleSend()
        }}
        className="flex gap-3"
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about climate change, CO₂, sea level, Paris Agreement..."
          className="input-field flex-1"
          disabled={loading}
        />
        <button type="submit" disabled={loading || !input.trim()} className="btn-primary">
          Send
        </button>
      </form>
    </div>
  )
}
