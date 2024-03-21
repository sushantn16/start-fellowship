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
        <div className="p-4 bg-white shadow-md rounded-md">
            <h1 className="text-2xl font-semibold mb-4">Tasks</h1>
            <div className="space-y-2">
                {tasks.map((task, index) => (
                    <div key={task.id} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleTaskToggle(task.id)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className={task.completed ? 'line-through text-gray-500' : 'text-gray-800'}>{task.name}</span>
                    </div>
                ))}
            </div>
            <div className="mt-4 flex space-x-2">
                <Input
                    placeholder="Type a task"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    className="flex-1"
                />
                <Button onClick={handleTaskAdd}>
                    Add Task
                </Button>
            </div>
        </div>
    );
}
