'use client'
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { createTask, updateTask, getTasks } from "@/services/task.service";

interface Task {
    id: number;
    name: string;
    completed: boolean;
}

interface TasksProps {
    startupId: number;
}

export default function Tasks({ startupId }: TasksProps) {
    const [task, setTask] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([]);

    const handleTaskAdd = async () => {
        if (task.trim() !== '') {
                const newTask = await createTask(task, startupId);
                setTasks([...tasks, newTask]);
                setTask('');
        }
    };

    const handleTaskToggle = async (id: number) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return { ...task, completed: !task.completed };
            }
            return task;
        });
        setTasks(updatedTasks);
            await updateTask(id);
    };

    useEffect(() => {
        // Fetch tasks when component mounts
        const fetchTasks = async () => {
                const tasksData = await getTasks(startupId);
                setTasks(tasksData);
        };

        fetchTasks();
    }, [startupId]);
    return (
        <div>
            <h1>Tasks</h1>
            <div>
                {tasks.map((task, index) => (
                    <div key={task.id} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleTaskToggle(task.id)}
                        />
                        <span className={task.completed ? 'line-through' : ''}>{task.name}</span>
                    </div>
                ))}
            </div>
            <div className="flex space-x-2">
                <Input
                    placeholder="Type a task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                />
                <Button onClick={handleTaskAdd}>Add</Button>
            </div>
        </div>
    )
}
