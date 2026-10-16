import { supabase, PROJECTS_BUCKET } from "@/lib/supabase";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const { data, error } = await supabase.storage
      .from(PROJECTS_BUCKET)
      .list("", { limit: 1 });

    if (error) {
      console.error(`[cron/keep-alive] ${new Date().toISOString()} - FAILED:`, error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    console.log(`[cron/keep-alive] ${new Date().toISOString()} - OK, items found=${data?.length ?? 0}`);

    return NextResponse.json(
      { success: true, message: "Supabase kept alive" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Cron exception:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
