import { NextResponse } from "next/server";
import OpenAI from "openai";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const openai = new OpenAI({
    apiKey: process.env.OPEN_AI_KEY,
  });
    const messages = await openai.beta.threads.messages.list(new URL(request.url).searchParams.get("threadId"),);
    if (messages.data.length > 1) {
      return new NextResponse(
        JSON.stringify({ result: messages.data[0].content[0].text.value }),
        { status: 200, headers: { 'content-type': 'application/json' } }
      );
    }
    new NextResponse(
      JSON.stringify({ success: false, message: 'failed' }),
      { status: 401, headers: { 'content-type': 'application/json' } }
    );
}
