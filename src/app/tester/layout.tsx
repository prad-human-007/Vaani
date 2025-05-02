import { createClient } from "@/utils/supabase/server";
import { UserDropdown } from "@/components/home/user-dropdown";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { SidebarSheet } from "@/components/dashboard/SidebarSheet";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function DashboardLayout({children}: {children: React.ReactNode;}) {
    const supabase = await createClient();
    const { data: { user} } = await supabase.auth.getUser();
    
    if(!user) {
        redirect("/sign-in");
    }

    return (
        <div className="flex flex-col min-h-screen bg-black">
            {/* Main Content Area with Sidebar - Full Height */}
            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar - Full Height, Fixed Width */}
                <div className="hidden md:block w-64 bg-gray-900 border-r border-gray-800">
                    <Sidebar />
                </div>
                
                {/* Mobile Sidebar Sheet - visible only on mobile */}
                <div className="md:hidden">
                    <SidebarSheet />
                </div>
                
                {/* Main Content Area - Full Height, Scrollable */}
                <main className="flex-1 overflow-y-auto bg-black">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}