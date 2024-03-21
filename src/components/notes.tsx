import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { getNotes, createNote } from "@/services/notes.service";

interface Note {
    id: number;
    content: string;
    createdAt: string; // Update this according to your data type
    updatedAt: string; // Update this according to your data type
    startupId: number;
}

interface NotesProps {
    startupId: number;
}

export default function Notes({ startupId }: NotesProps) {
    const [note, setNote] = useState('');
    const [notes, setNotes] = useState<Note[]>([]);

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
        <div className="p-4 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-semibold mb-4">Notes</h1>
            <div className="space-y-4">
                {notes.map((note, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-md">
                        <p className="text-gray-800">{note.content}</p>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex items-center space-x-2">
                <Input
                    placeholder="Type a note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    className="flex-1"
                />
                <Button onClick={handleNoteSend}>
                    Save Note
                </Button>
            </div>
        </div>
    );
}
