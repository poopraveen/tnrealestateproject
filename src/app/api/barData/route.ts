import { NextResponse } from "next/server";

// Sample Project Data
const barData =[
  { name: "July", SM1: 4, SM2: 3, SM3: 3 },
  { name: "Aug", SM1: 6, SM2: 5, SM3: 5 },
  { name: "Sep", SM1: 8, SM2: 3, SM3: 4 },
  { name: "Today", SM1: 10, SM2: 7, SM3: 7 },
]

export async function GET() {
  return NextResponse.json(barData);
}
