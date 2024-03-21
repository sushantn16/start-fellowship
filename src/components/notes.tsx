'use client'
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface NotesProps {
    startupId: number;
}

export default function Notes({ startupId }: NotesProps) {
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState<string[]>([]);

    const handleNoteSend = async () => {
        if (note.trim() !== '') {
            await createNote(note, startupId);
            setNotes([...notes, note]);
            setNote('');
        }
    };

    useEffect(() => {
        const fetchNotes = async () => {
            const notesData = await getNotes(startupId);
            setNotes(notesData);
        };

        fetchNotes();
    }, [startupId]);

    return (
        <div>
            <h1>Notes</h1>
            <div>
                {notes.map((note, index) => (
                    <div key={index}>{note}</div>
                ))}
            </div>
            <div className="flex space-x-2">
                <Input
                    placeholder="Type a note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
                <Button onClick={handleNoteSend}>Save Note</Button>
            </div>
        </div>
    );
}

export async function createNote(content: string, startupId: number) {
    const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            content: content,
            startupId: startupId
        })
    });

    if (!response.ok) {
        throw new Error('Failed to create note');
    }

    const data = await response.json();
    return data;
}

export async function getNotes(startupId: number) {
    const response = await fetch('/api/notes?id=' + startupId, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch notes');
    }

    const data = await response.json();
    return data;
}
