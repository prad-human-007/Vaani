import { NextResponse } from "next/server";
import { createClient, User } from "@supabase/supabase-js";
export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(supabaseUrl!, supabaseKey!);
let user: User | null = null;
let chatsLeft: number = 0;

async function isAuthenticated(req: Request) {
  const token = req.headers.get("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return new NextResponse("No token Provied", { status: 401 });
  }

  const { data, error } = await supabase.auth.getUser(token);
  if (error || !data || data.user.role != "authenticated") {
    console.error("Failed to authenticate user: ", token, "Error: ", error);
    return new NextResponse("Token not valid", { status: 401 });
  }

  return "authenticated";
}

export async function POST(req: Request) {
  const payload = await req.json();
  console.log(payload, "🚀🚀🚀🚀");

  if (!Array.isArray(payload) || payload.length === 0) {
    return new NextResponse("Invalid request: Expected an array", {
      status: 400,
    });
  }

  const valid = payload.every((item) => item.name && item.description);
  if (!valid) {
    return new NextResponse("Invalid request: Missing fields in some items", {
      status: 400,
    });
  }

  const { data, error } = await supabase.from("tasks").insert(payload); // 👈 Insert the whole array

  if (error) {
    console.error("Error creating tasks:", error);
    return new NextResponse("Error creating tasks", { status: 500 });
  }

  console.log("Tasks created:", data);
  return NextResponse.json({ message: "Inserted Tasks" }, { status: 200 });
}
