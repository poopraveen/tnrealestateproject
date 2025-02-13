import { NextResponse } from "next/server";

const leads = [
  { id: 1, name: "John Smith", date: "2023-10-01", status: "new" },
  { id: 2, name: "Emily Johnson", date: "2023-10-02", status: "pending" },
  { id: 3, name: "Michael Brown", date: "2023-10-03", status: "finished" },
  { id: 4, name: "Sophia Davis", date: "2023-10-04", status: "new" },
];

// GET Leads
export async function GET() {
  return NextResponse.json(leads);
}

// POST New Lead
export async function POST(req: Request) {
  const newLead = await req.json();
  newLead.id = leads.length + 1;
  leads.push(newLead);
  return NextResponse.json(newLead, { status: 201 });
}
