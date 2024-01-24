import { NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
  });

  const thread = await openai.beta.threads.create();
  await openai.beta.threads.messages.create(thread.id, {
    content: new URL(request.url).searchParams.get("content"),
    role: "user",
  });
  await openai.beta.threads.runs.create(thread.id, { assistant_id: "asst_dLBrzLObqq5X5yNc3R9uEJg9" });

  return new NextResponse(
    JSON.stringify({ threadId: thread.id }),
    { status: 200, headers: { 'content-type': 'application/json' } }
  );

}
