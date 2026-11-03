import { NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import path from "node:path";

export async function GET() {
  const filePath = path.join(process.cwd(), "public", "Mauricio_Resume.pdf");
  const data = await readFile(filePath);
  const body = new Uint8Array(data).slice().buffer as ArrayBuffer;
  return new NextResponse(body, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="John-Mauricio-Resume.pdf"',
    },
  });
}
