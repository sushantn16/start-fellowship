'use client'
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getNotes, createNote } from "@/services/notes.service";

interface NotesProps {
    startupId: number;
}

export default function Notes({ startupId }: NotesProps) {
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState([]);

    const fetchNotes = async () => {
        const notesData = await getNotes(startupId);
        setNotes(notesData);
    };

    const handleNoteSend = async () => {
        await createNote(note, startupId);
        setNote(''); 
        fetchNotes();
    };



    useEffect(() => {

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
