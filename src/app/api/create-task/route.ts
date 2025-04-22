import { NextResponse } from "next/server";
import { createClient, User } from '@supabase/supabase-js';
export const dynamic = 'force-dynamic';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);
let user: User | null  = null;
let chatsLeft: number = 0;

async function isAuthenticated(req: Request) {
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return new NextResponse('No token Provied', { status: 401 });
    }
  
    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data || data.user.role != 'authenticated') {
      console.error('Failed to authenticate user: ', token, "Error: ", error);  
      return new NextResponse('Token not valid', { status: 401 });
    }

    return 'authenticated';
}

export async function POST(req: Request) {

    await isAuthenticated(req);

    const { name, description } = await req.json();
    if (!name || !description) {
        return new NextResponse('Invalid request', { status: 400 });
    }

    const { data, error } = await supabase
        .from("tasks")
        .insert({ name, description });

    if (error) {
        console.error("Error creating task:", error);
    } else {
        console.log("Task created:", data);
    }
    

    return NextResponse.json({message: 'Inserted Task'}, { status: 200 });
}