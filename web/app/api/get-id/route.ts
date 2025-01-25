import path from 'path';
import { readFileSync } from 'fs';
import { NextResponse } from 'next/server';
import { homedir } from 'os';

export async function GET() {
  let filePath: string;

  // Detect platform to set file path accordingly
  if (process.platform === "win32") {
    filePath = "C:/Users/hp/bloom.cafe";
  } else if (process.platform === "darwin" || process.platform === "linux") {
    filePath = path.join(homedir(), "bloom.cafe");
  } else if (process.platform === "android") {
    filePath = "/data/data/com.example.app/files/bloom.cafe";
  } else {
    return NextResponse.json({ error: "Unsupported platform" }, { status: 400 });
  }

  try {
    // Read the file and parse the JSON content
    const id = readFileSync(filePath, "utf-8");
    return NextResponse.json(JSON.parse(id));
  } catch {
    // Return error if the file reading fails
    return NextResponse.json({ error: "Unable to read or parse file" }, { status: 500 });
  }
}
