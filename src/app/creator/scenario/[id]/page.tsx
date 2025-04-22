'use client'

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function TestPage() {

  const [taskName, setTaskName] = useState("");
  const supabase = createClient();

  async function createTask() {
    const { data, error } = await supabase
      .from("tasks")
      .insert({ name: `Task Name ${Math.floor(Math.random() * 500)}`, description: `Task description ${Math.floor(Math.random() * 500)}`, status: "pending" });

    if (error) {
      console.error("Error creating task:", error);
    } else {
      console.log("Task created:", data);
    }
  }


  return (
    <div>
      <h1>Test Page</h1>
      <p>This is a test page.</p>
      <Input
        type="text"
        placeholder="Task Name"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
      />
      <Button onClick={createTask}>Create Task</Button>
    </div>
  );
}