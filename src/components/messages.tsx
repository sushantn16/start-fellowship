'use client'
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createMessage, getMessages } from "../services/message.service";

interface MessagesProps {
    startupId: number;
}

export default function Messages({ startupId }: MessagesProps) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any>([]);

    useEffect(() => {
        fetchMessages();
    }, [startupId]);

    const fetchMessages = async () => {
            const messages = await getMessages(startupId);
            setMessages(messages);
    };

    const handleMessageSend = async () => {
        if (message.trim() !== '') {
                await createMessage(message, startupId);
                setMessage('');
                fetchMessages();
        }
    };

    return (
        <div>
            <h1>Messages</h1>
            <div>
                {messages.map((msg:any, index:any) => (
                    <div key={index}>
                        <p>{msg.content}</p>

                    </div>
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
