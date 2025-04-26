'use client'

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface Task {
  id: string;
  name: string;
  description: string;
  payment: number;
}

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const hardcodedTasks: Task[] = [
      { id: '1', name: 'Task One', description: 'Complete the survey.', payment: 5 },
      { id: '2', name: 'Task Two', description: 'Watch a short video.', payment: 3 },
      { id: '3', name: 'Task Three', description: 'Answer questions about a product.', payment: 7 },
      { id: '4', name: 'Task Four', description: 'Participate in a quick poll.', payment: 4 },
    ];
    setTasks(hardcodedTasks);
  }, []);

  return (
    <div>
        <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-white">Available Tasks</h1>
        <Badge className="bg-blue-900 text-blue-300">
          {tasks.length} tasks available
        </Badge>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Choose a task to start earning. Click on the task name for more details.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
    
    {tasks.length === 0 && (
        <div className="col-span-1 md:col-span-2 xl:col-span-3 flex items-center justify-center h-full">
        <p className="text-gray-400 text-lg">No tasks available.</p>
        </div>
    )}
  {tasks.map((task) => (
    <a
      key={task.id}
      href={`/evaluator/task/${task.id}`}
      className="block transition hover:translate-y-[-2px]"
    >
      <Card className="h-full hover:shadow-md transition-all duration-200 bg-gray-900 border border-gray-800 overflow-hidden">
        <div className="h-1 bg-blue-500 w-full"></div>
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <h2 className="text-lg font-medium text-white">{task.name}</h2>
            <Badge className="bg-green-900 text-green-300">
              ${task.payment.toFixed(2)}
            </Badge>
          </div>
          <p className="text-gray-400 text-sm line-clamp-2">{task.description}</p>
          <div className="mt-4 text-xs text-blue-400 flex items-center">
            Start task
            <svg
              className="w-3.5 h-3.5 ml-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </Card>
    </a>
  ))}
</div>
    </div>
  );
}
