import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createMessage, getMessages } from "../services/message.service";
import { getUser } from "@/services/auth.service";

interface MessagesProps {
    startupId: number;
}

export default function Messages({ startupId }: MessagesProps) {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<any>([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userResponse = await getUser();
            setUser(userResponse.user);
        };

        fetchUser();
    }, []);

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
        <div className="p-4 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-semibold mb-4">Messages</h1>
            <div className="space-y-4">
                {messages.map((msg: any, index: any) => (
                    <div key={index} className={`bg-gray-${user && user?.id === msg.userId ? '100' : '200'} p-4 rounded-md`}>
                        <p className="text-gray-800">{msg.content}</p>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex items-center space-x-2">
                <Input
                    placeholder="Type a message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex-1"
                />
                <Button onClick={handleMessageSend} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">
                    Send
                </Button>
            </div>
        </div>
    );
}
