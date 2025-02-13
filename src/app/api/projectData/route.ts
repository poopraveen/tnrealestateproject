import { NextResponse } from "next/server";

// Sample Project Data
const projectData = [
  { id: 1, name: "Project A", status: "In Progress" },
  { id: 2, name: "Project B", status: "Completed" },
];

export async function GET() {
  return NextResponse.json(projectData);
}
