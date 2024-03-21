'use client'
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface Task {
    text: string;
    completed: boolean;
}

export default function Tasks(){
    const [task, setTask] = useState<string>('');
    const [tasks, setTasks] = useState<Task[]>([]);

    const handleTaskAdd = () => {
        if (task.trim() !== '') {
            setTasks([...tasks, { text: task, completed: false }]);
            setTask('');
        }
    };

    const handleTaskToggle = (index: number) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTasks(updatedTasks);
    };

    return(
        <div>
            <h1>Tasks</h1>
            <div>
                {tasks.map((task, index) => (
                    <div key={index} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleTaskToggle(index)}
                        />
                        <span className={task.completed ? 'line-through' : ''}>{task.text}</span>
                    </div>
                ))}
            </div>
            <div className="flex space-x-2">
                <Input
                    placeholder="Type a task"
                    value={task}
                    onChange={(e)=>setTask(e.target.value)}
                />
                <Button onClick={handleTaskAdd}>Add</Button>
            </div>
        </div>
    );
}
