'use client'
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Notes() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    const handleMessageSend = () => {
        if (message.trim() !== '') {
            setMessages([...messages, message]);
            setMessage('');
        }
    };

    return (
        <div>
            <h1>Messages</h1>
            <div>
                {messages.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <div className="flex space-x-2">
                <Input
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <Button onClick={handleMessageSend}>Send</Button>
            </div>
        </div>
    )
}
