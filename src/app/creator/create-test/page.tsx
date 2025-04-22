'use client';
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@supabase/supabase-js";
import { set } from "zod";

export default function TestPage() {  
    const router = useRouter();
    
    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const supabase = createClient();
        supabase.auth.getSession().then(({ data: {session } , error }) => {
            if (error || !session?.user) {
            router.replace("/sign-in"); 
            } else {
            setUser(session.user)
            setToken(session.access_token)
            setIsAuthenticated(true)
            }
        });

    }, []);
    
    async function createTest() {
        if (!taskName || !taskDescription) {
            alert("Please fill in all fields");
            return;
        }
        const response = await fetch('/api/create-task', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name: taskName,
                description: taskDescription
            })
        })
        setTaskName("");
        setTaskDescription("");
    }

    return (
        <div>
            <h1>Test Page</h1>
            <p>This is a test page.</p>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createTest();
                }}
            >
                <div>
                    <label htmlFor="taskName">Task Name</label>
                    <Input
                        id="taskName"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        placeholder="Enter task name"
                    />
                </div>
                <div>
                    <label htmlFor="taskDescription">Task Description</label>
                    <Input
                        id="taskDescription"
                        value={taskDescription}
                        onChange={(e) => setTaskDescription(e.target.value)}
                        placeholder="Enter task description"
                    />
                </div>
                <Button type="submit">Create Task</Button>
            </form>
        </div>
    );
}