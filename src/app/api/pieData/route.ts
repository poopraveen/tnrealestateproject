import { NextResponse } from "next/server";

// Sample Project Data
const pieData = [
  { name: "Category A", value: 30, color: "#FF6384" },
  { name: "Category B", value: 50, color: "#36A2EB" },
  { name: "Category C", value: 20, color: "#FFCE56" },
];

export async function GET() {
  return NextResponse.json(pieData);
}