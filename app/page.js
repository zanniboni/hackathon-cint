"use client";

import OpenAI from "openai";
import { useState } from "react";

export default function Home() {
  const openai = new OpenAI({
    apiKey: "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",
    dangerouslyAllowBrowser: true,
  });
  const [threadId, setThreadId] = useState();
  const [message1, setMessage1] = useState();
  const [message2, setMessage2] = useState();
  const [message3, setMessage3] = useState();
  const [loading, setLoading] = useState();
  const [bodyResult, setBodyResult] = useState(null);

  const refreshPage = () => {
    window.location.reload(false);
  };

  const intervalId = setInterval(() => {
    if (threadId && !bodyResult) {
      setTimeout(() => {
        setMessage1(true);
      }, 2000);
      setTimeout(() => {
        setMessage2(true);
      }, 7000);
      setTimeout(() => {
        setMessage3(true);
      }, 8000);
      retrieveMessages();
    }
  }, 5000);

  const retrieveMessages = async () => {
    if (!bodyResult) {
      const messages = await openai.beta.threads.messages.list(threadId);
      console.log(bodyResult);
      if (messages.data.length > 1) {
        setLoading(false);
        setBodyResult(messages.data[0].content[0].text.value);
        clearInterval(intervalId);
      }
    }
  };

  async function onSubmit(event) {
    event.preventDefault();

    const thread = await openai.beta.threads.create();
    await openai.beta.threads.messages.create(thread.id, {
      content: event.target.story.value,
      role: "user",
    });
    await openai.beta.threads.runs.create(thread.id, { assistant_id: "asst_dLBrzLObqq5X5yNc3R9uEJg9" });
    setThreadId(thread.id);
    setLoading(true);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <div class="w-1/3 flex justify-center p-10">
        <img src={"/hackathon.png"}></img>
      </div>
      <form className="w-1/2 bg-gray-50 p-10 rounded-xl" onSubmit={(event) => onSubmit(event)}>
        {threadId ? (
          <>
            <div class="flex p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50" role="alert">
              <svg class="flex-shrink-0 inline w-4 h-4 me-3 mt-[2px]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span class="sr-only">Info</span>
              <div>
                <span class="font-medium">In a few moments your diagram will be generated.</span>
                <ul class="mt-1.5 list-disc list-inside">
                  {message1 ? <li>Grab a popcorn, watch a Tik Tok, i don't care 😑</li> : ""}
                  {message2 ? <li>Wait a little more, i'll get a coffee ☕</li> : ""}
                  {message3 ? <li>Building the best diagram you will ever see 😎</li> : ""}
                </ul>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        <div className="mb-4 w-full">
          <label className="block text-black font-medium mb-2" htmlFor="name">
            Insert story description
          </label>
          <textarea
            className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
            id="story"
            type="text"
            name="story"
            placeholder="Something..."
          />
        </div>
        {!threadId ? (
          <div className="w-full flex justify-evenly">
            <button className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Generate
            </button>
          </div>
        ) : (
          ""
        )}
        {threadId && !loading ? (
          <div className="w-full flex justify-evenly">
            <button className="bg-red-500 hover:bg-red-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" onClick={() => refreshPage()}>
              Try again
            </button>
          </div>
        ) : (
          ""
        )}
        {loading ? (
          <div role="status" class="w-full flex justify-center">
            <svg aria-hidden="true" class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          ""
        )}
      </form>
      <div class="w-1/2 bg-white mt-2 rounded-xl min-h-28 p-5">
        <textarea
          className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-indigo-500"
          id="story"
          type="text"
          name="story"
          placeholder="Result..."
          value={bodyResult ? bodyResult : ""}
        />
      </div>
    </main>
  );
}
