import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase-admin";
import { createClient } from "@/lib/supabase/server";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

const allowedStatuses = [
  "Applied",
  "In Review",
  "Interview",
  "Offer",
  "Rejected",
];

async function getAuthenticatedUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

export async function PATCH(
  request: Request,
  { params }: Context,
) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  const { id } = await params;
  const applicationId = Number(id);

  if (!Number.isInteger(applicationId)) {
    return NextResponse.json(
      { error: "Invalid application ID" },
      { status: 400 },
    );
  }

  const body = await request.json();

  const company = String(body.company ?? "").trim();
  const position = String(body.position ?? "").trim();
  const location = String(body.location ?? "").trim();
  const appliedAt = String(body.applied_at ?? "").trim();
  const status = String(body.status ?? "").trim();
  const url = String(body.url ?? "").trim();
  const notes = String(body.notes ?? "").trim();

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

  const { error } = await supabaseAdmin
    .from("applications")
    .update({
      company,
      position,
      location: location || null,
      applied_at: appliedAt,
      status,
      url: url || null,
      notes: notes || null,
    })
    .eq("id", applicationId);

  if (error) {
    console.error("Failed to update application:", error);

    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(
  _request: Request,
  { params }: Context,
) {
  const user = await getAuthenticatedUser();

  if (!user) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 },
    );
  }

  const { id } = await params;
  const applicationId = Number(id);

  if (!Number.isInteger(applicationId)) {
    return NextResponse.json(
      { error: "Invalid application ID" },
      { status: 400 },
    );
  }

  const { error } = await supabaseAdmin
    .from("applications")
    .delete()
    .eq("id", applicationId);

  if (error) {
    console.error("Failed to delete application:", error);

    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}