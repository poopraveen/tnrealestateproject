import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await fetch("https://real-pro-service.onrender.com/api/projects");

    if (!response.ok) {
      throw new Error(`Failed to fetch projects: ${response.statusText}`);
    }

    const data = await response.json();

    // Modify the status of each project to "Completed"
    const updatedData = data.map((project: any) => ({
      ...project,
      status: "Completed",
    }));

    return NextResponse.json(updatedData, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
