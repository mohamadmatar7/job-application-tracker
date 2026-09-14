import { NextResponse } from "next/server";

import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  const { error } = await supabase
    .from("applications")
    .select("id")
    .limit(1);

  if (error) {
    return NextResponse.json(
      { ok: false },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}