import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { createClient } from "@/lib/supabase/server";

const allowedStatuses = [
  "Applied",
  "In Review",
  "Interview",
  "Offer",
  "Rejected",
];

export async function POST(request: Request) {
  // Verify the authenticated user
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  const formData = await request.formData();

  const company = String(formData.get("company") ?? "").trim();
  const position = String(formData.get("position") ?? "").trim();
  const location = String(formData.get("location") ?? "").trim();
  const appliedAt = String(formData.get("applied_at") ?? "").trim();
  const status = String(formData.get("status") ?? "").trim();
  const url = String(formData.get("url") ?? "").trim();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!company || !position || !appliedAt) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 },
    );
  }

  if (!allowedStatuses.includes(status)) {
    return NextResponse.json(
      { error: "Invalid status" },
      { status: 400 },
    );
  }

  const { error } = await supabaseAdmin.from("applications").insert({
    company,
    position,
    location: location || null,
    applied_at: appliedAt,
    status,
    url: url || null,
    notes: notes || null,
  });

  if (error) {
    console.error("Failed to add application:", error);

    return NextResponse.json(
      { error: "Failed to add application" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}