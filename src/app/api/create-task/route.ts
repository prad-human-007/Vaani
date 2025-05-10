import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      company_id,
      name,
      description,
      min_age,
      max_age,
      sector,
      language,
      comment,
      pool_size
    } = body;

    // 1. Create task_group
    const { data: taskGroupData, error: taskGroupError } = await supabase
      .from('task_group')
      .insert([
        {
          company_id,
          name,
          description,
          min_age,
          max_age,
          sector,
          language,
          comment,
          pool_size,
        },
      ])
      .select()
      .single();

    if (taskGroupError || !taskGroupData) {
      return NextResponse.json({ error: taskGroupError?.message }, { status: 500 });
    }

    const task_group_id = taskGroupData.id;

    // 2. Find eligible testers
    const { data: eligibleTesters, error: testerError } = await supabase
      .from('tester')
      .select('id')
      

    if (testerError) {
      return NextResponse.json({ error: testerError.message }, { status: 500 });
    }

    if (!eligibleTesters || eligibleTesters.length === 0) {
      return NextResponse.json({ message: 'No eligible testers found' }, { status: 404 });
    }

    // 3. Insert tasks
    const tasksToInsert = eligibleTesters.map(tester => ({
      task_group_id,
      tester_id: tester.id,
      status: 'pending'
    }));

    const { data: insertedTasks, error: taskInsertError } = await supabase
      .from('tasks')
      .insert(tasksToInsert)
      .select(); // Return task IDs

    if (taskInsertError) {
      return NextResponse.json({ error: taskInsertError.message }, { status: 500 });
    }

    return NextResponse.json({
      message: 'Task group created and testers assigned',
      task_group: taskGroupData,
      tasks: insertedTasks // includes task.id
    }, { status: 201 });

  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 });
  }
}
