'use client'
import { Card } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

interface Test {
    id: string
    name: string;
    description: string;
}

export default function TestPage() {    
    const supabase = createClient();
    const [tasks, setTasks] = useState<Test[]>([]);
    const age = 30;
    const language = "english";
    const gender = 'male'


    useEffect(() => {

        async function fetchTasks() {
            const { data, error } = await supabase
                .from("tasks")
                .select('id, name, description')
                .eq('status', 'pending')
                .in('language', [language, 'all'])
                .in('gender', [gender, 'all'])
                .lte('min_age', age)
                .gte('max_age', age);

            if (error) {
                console.error("Error fetching tasks:", error);
            }
            else {
                setTasks(data);
                console.log("Tasks fetched:", data);
            }
        }
        fetchTasks();
    }, [])

    return (
        <div>
            <h1>Test Page</h1>
            <p>This is a test page.</p>
            {tasks.map((task) => {
                return (
                    <div key={task.id} className="flex flex-col gap-2">
                        <Card className="p-3">
                            <h2>Task Name: {task.name}</h2>
                            <p>Task Desc: {task.description}</p>
                        </Card>
                        
                    </div>
                )
            })}
            
        </div>
    );
}