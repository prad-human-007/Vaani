'use client'

import { ClipboardList, User, LogOut, LayoutDashboard } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

export function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();

    const navigation = [
        { name: 'Dashboard', href: '/tester/dashboard', icon: LayoutDashboard },
        { name: 'Tasks', href: '/tester/tasks', icon: ClipboardList },
        { name: 'Profile', href: '/tester/profile', icon: User }
        // Add more items here in the future if needed
    ];

    return (
        // Ensure this div takes full height and uses flex column layout
        // Added a background color assuming the parent might be white/light
        <div className="h-full flex flex-col bg-black text-white p-4">
            {/* Logo area - Prevent shrinking */}
            <div className="flex items-center h-12 mb-4 flex-shrink-0">
                <span className="text-xl font-bold text-white">TaskEvaluator</span>
            </div>

            {/* Navigation - Allow vertical scrolling ONLY if content overflows */}
            {/* Removed flex-1/flex-grow, let it take natural height */}
            {/* Added mb-4 for spacing below nav before the logout is pushed down */}
            <nav className="space-y-1 overflow-y-auto mb-4">
                {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <button
                            key={item.name}
                            onClick={() => router.push(item.href)}
                            className={`
                                w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-md
                                transition-all duration-200 group
                                ${isActive
                                    ? 'bg-blue-900/50 text-blue-400 border-l-2 border-blue-500'
                                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                                }
                            `}
                        >
                            <item.icon
                                className={`mr-3 h-5 w-5 flex-shrink-0 ${
                                    isActive ? 'text-blue-400' : 'text-gray-400 group-hover:text-gray-300'
                                }`}
                                aria-hidden="true"
                            />
                            {item.name}
                        </button>
                    );
                })}
            </nav>

            {/* Logout at bottom */}
            {/* Use mt-auto to push this element to the bottom of the flex container */}
            {/* Added pt-4 for spacing above logout after the border */}
            {/* Added flex-shrink-0 to prevent shrinking */}
            <div className="mt-auto pt-4 border-t border-gray-800 flex-shrink-0">
                <button
                    onClick={() => router.push('/logout')} // Ensure '/logout' is your actual logout route
                    className="w-full flex items-center px-3 py-2.5 text-sm font-medium rounded-md text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors duration-200 group"
                >
                    <LogOut className="mr-3 h-5 w-5 flex-shrink-0 text-red-400 group-hover:text-red-300" aria-hidden="true" />
                    Log out
                </button>
            </div>
        </div>
    );
}