import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
// import { User } from "@supabase/supabase-js";
export const dynamic = "force-dynamic";

// interface Task {
//     name: string;
//     description: string;
//     min_age: number;
//     max_age: number;
//     gender: string;
//     language: string;
// }

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);
// let user: User | null = null;
// let chatsLeft: number = 0;

// async function isAuthenticated(req: Request) {
//   const token = req.headers.get("Authorization")?.replace("Bearer ", "");
//   if (!token) {
//     return new NextResponse("No token Provied", { status: 401 });
//   }

//   const { data, error } = await supabase.auth.getUser(token);
//   if (error || !data || data.user.role != "authenticated") {
//     console.error("Failed to authenticate user: ", token, "Error: ", error);
//     return new NextResponse("Token not valid", { status: 401 });
//   }

//   return "authenticated";
// }

async function createGroup() {
    const {data, error} = await supabase
        .from('task_group')
        .insert({ name: `Task Group ${Math.floor(Math.random() * 500)}`, description: `Task group description ${Math.floor(Math.random() * 500)}`})
        .select('id')
    if (error) {
        console.error("Error creating task group:", error);
        return new NextResponse('Failed in creating task group', { status: 500 });
    } else {
        console.log("Task group created:", data);
        return data[0].id;
    }
}

export async function POST(req: Request) {
    // await isAuthenticated(req);

    const body = await req.json();

    // Check if it's an array
    if (!Array.isArray(body)) {
        return new NextResponse('Request body should be an array', { status: 400 });
    }

    // Optionally: Validate each item
    for (const item of body) {
        if (!item.name || !item.description) {
            return new NextResponse('Invalid request: Missing name or description in one of the tasks', { status: 400 });
        }
    }

    const id = await createGroup();

    for (let i=0; i<body.length; i++) {
        body[i].task_group = id;
    }

    const { data, error } = await supabase
        .from("tasks")
        .insert(body);

    if (error) {
        console.error("Error creating task:", error);
        NextResponse.json({message: 'Failed in inserting task'}, { status: 500 })
    } else {
        console.log("Task created:", data);
    }
    
    return NextResponse.json({message: 'Inserted Task'}, { status: 200 });
}

