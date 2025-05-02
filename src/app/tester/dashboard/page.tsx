'use client'
import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Task {
    id: string;
    name: string;
    description: string;
    payment: number;
}

export default function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [completedTasks, setCompletedTasks] = useState<number>(0);
    const [totalEarnings, setTotalEarnings] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            setError(null);

            try {
                // Hardcoded tasks
                const hardcodedTasks: Task[] = [
                    { id: '1', name: 'Task One', description: 'Complete the survey.', payment: 5 },
                    { id: '2', name: 'Task Two', description: 'Watch a short video.', payment: 3 },
                    { id: '3', name: 'Task Three', description: 'Answer questions about a product.', payment: 7 },
                    { id: '4', name: 'Task Four', description: 'Answer questions about a product.', payment: 7 },
                ];

                setTasks(hardcodedTasks);

                // Hardcoded completed tasks
                const completedData = [
                    { payment: 5 },
                    { payment: 3 },
                ];

                setCompletedTasks(completedData.length);

                // Calculate total earnings
                const earnings = completedData.reduce((sum, task) => sum + (task.payment || 0), 0);
                setTotalEarnings(earnings);

            } catch (err) {
                console.error("Error fetching data:", err);
                setError("Failed to load tasks. Please try again later.");
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2 text-white">Available Tasks</h1>
                <p className="text-gray-400">Complete tasks that match your profile and earn rewards.</p>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <Card className="p-5 bg-[#303030] border border-gray-800">
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">TASKS COMPLETED</h3>
                    <p className="text-3xl font-bold mt-1 text-blue-400">{completedTasks}</p>
                </Card>
                <Card className="p-5 bg-[#303030] border border-gray-800">
                    <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">TOTAL EARNINGS</h3>
                    <p className="text-3xl font-bold mt-1 text-green-400">${totalEarnings.toFixed(2)}</p>
                </Card>
            </div>

            {/* Loading state */}
            {loading && (
                <div className="flex justify-center items-center py-12">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
                    <span className="ml-2 text-gray-400">Loading tasks...</span>
                </div>
            )}

            {/* Error state */}
            {error && (
                <div className="bg-gray-900 border border-red-800 rounded-lg p-4 mb-6">
                    <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-red-400 mt-0.5" />
                        <div className="ml-3">
                            <p className="text-red-400">{error}</p>
                            <button 
                                className="mt-2 px-3 py-1.5 bg-red-900 hover:bg-red-800 text-white text-sm rounded-md"
                                onClick={() => window.location.reload()}
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* No tasks state */}
            {!loading && !error && tasks.length === 0 && (
                <div className="bg-gray-900 border border-gray-800 rounded-lg p-6 text-center">
                    <p className="text-gray-300">No tasks available for your profile at the moment.</p>
                    <p className="mt-2 text-gray-400">Check back later for new opportunities.</p>
                </div>
            )}

            {/* Tasks list */}
            {!loading && !error && tasks.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {tasks.map((task) => (
                        <a key={task.id} href={`/tester/task/${task.id}`} className="block transition hover:translate-y-[-2px]">
                            <Card className="h-full hover:shadow-md transition-all duration-200 bg-[#303030] border border-gray-800 overflow-hidden">
                                {/* Colored top strip */}
                                <div className="h-1 bg-blue-500 w-full"></div>

                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-3">
                                        <h2 className="text-lg font-medium text-white">{task.name}</h2>
                                        <Badge className="bg-green-900 text-green-300">
                                            ${task.payment?.toFixed(2)}
                                        </Badge>
                                    </div>
                                    <p className="text-gray-400 text-sm line-clamp-2">{task.description}</p>
                                    <div className="mt-4 text-xs text-blue-400 flex items-center">
                                        Start task
                                        <svg className="w-3.5 h-3.5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                </div>
                            </Card>
                        </a>
                    ))}
                </div>
            )}
        </div>
    );
}
