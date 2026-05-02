import { supabase } from "@/lib/supabase";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("id")
      .limit(1)
      .single();

    if (error) {
      console.error("Cron error:", error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

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
