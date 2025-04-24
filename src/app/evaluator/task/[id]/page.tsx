'use client'
import { createClient } from "@/utils/supabase/client";
import { useEffect } from "react";

export default function TestPage() {    
    const supabase = createClient();
    const age = 30;
    const language = "english";
    const gender = 'male'


    useEffect(() => {

        async function fetchTasks() {
            const { data, error } = await supabase
                .from("tasks")
                .select('*')
                .eq('language', language)
                .eq('gender', gender)
                .gte('min_age', age)
                .lte('max_age', age);

            if (error) {
                console.error("Error fetching tasks:", error);
            }
            else {
                console.log("Tasks fetched:", data);
            }
        }
        fetchTasks();
    })

    return (
        <div>
            <h1>Test Page</h1>
            <p>This is a test page.</p>
        </div>
    );
}