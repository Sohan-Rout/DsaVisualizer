"use client";
import { useEffect, useState, useRef, useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import ChatInput from "@/app/tutor/ChatInput";

export default function AITutorPage({ darkMode }) {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const messagesEndRef = useRef(null);

  const [user, setUser] = useState(null);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [isTyping, setIsTyping] = useState(false);

  // Scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  // Auth check - memoized to prevent unnecessary re-renders
  const getUser = useCallback(async () => {
    const { data } = await supabase.auth.getUser();
    if (!data?.user) {
      router.push("/login");
    } else {
      setUser(data.user);
    }
  }, [supabase, router]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  // Load user's chat history
  const loadChats = useCallback(async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from("chats")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: true });

    if (data.length === 0) {
      const welcome = {
        message:
          "Welcome to your DSA journey! 🎓\n\nI'm your AI tutor here to help you master Data Structures & Algorithms. Try asking:\n\n```python\ndef binary_search(arr, target):\n    left, right = 0, len(arr) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if arr[mid] == target:\n            return mid\n        elif arr[mid] < target:\n            left = mid + 1\n        else:\n            right = mid - 1\n    return -1\n```\n\nOr ask about time complexity, algorithms, or coding problems.",
        response: "",
        from: "system",
        created_at: new Date().toISOString()
      };
      setChats([welcome]);
    } else {
      setChats(data);
    }
  }, [user, supabase]);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  // Memoize the formatDateSeparator function
  const formatDateSeparator = useCallback((dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffInDays === 1) {
      return `Yesterday at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else if (diffInDays < 7) {
      return date.toLocaleDateString([], { weekday: 'long', hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { year: 'numeric', month: 'short', day: 'numeric' });
    }
  }, []);

  // Memoize the shouldShowDateSeparator function
  const shouldShowDateSeparator = useCallback((currentIndex) => {
    if (currentIndex === 0) return true;
    
    const currentMsg = chats[currentIndex];
    const prevMsg = chats[currentIndex - 1];
    
    if (!currentMsg?.created_at || !prevMsg?.created_at) return false;
    
    const currentDate = new Date(currentMsg.created_at);
    const prevDate = new Date(prevMsg.created_at);
    
    return (currentDate - prevDate) > (5 * 60 * 1000);
  }, [chats]);

  const handleSend = async () => {
    if (!message.trim() || loading) return;
    const input = message.trim();
    setMessage("");
    setLoading(true);
    setIsTyping(true);

    // Add user message with proper structure
    const userMessage = {
      message: input,
      response: null,
      from: "user",
      created_at: new Date().toISOString()
    };
    setChats((prev) => [...prev, userMessage]);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        body: JSON.stringify({ prompt: input }),
      });

      if (!res.ok) throw new Error("Network response was not ok");

      const { response } = await res.json();

      // Store to Supabase
      await supabase.from("chats").insert([
        {
          user_id: user.id,
          message: input,
          response,
          created_at: new Date().toISOString()
        },
      ]);

      // Update the chat with the response
      setChats((prev) =>
        prev.map((chat, i) =>
          i === prev.length - 1
            ? { ...chat, response, from: "assistant" }
            : chat
        )
      );
    } catch (error) {
      console.error("Error:", error);
      setChats((prev) =>
        prev.map((chat, i) =>
          i === prev.length - 1
            ? {
                ...chat,
                response:
                  "Sorry, I encountered an error. Please try again later.",
                from: "assistant",
              }
            : chat
        )
      );
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  // Memoize the formatMessage function
  const formatMessage = useCallback((text) => {
    if (!text) return null;

    const codeBlockRegex = /```(\w+)?\n([\s\S]+?)\n```/g;
    const parts = [];
    let lastIndex = 0;
    let match;
    let counter = 0;

    while ((match = codeBlockRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(
          <p key={`text-${counter++}`} className="mb-4">
            {text.substring(lastIndex, match.index)}
          </p>
        );
      }

      const language = match[1] || "javascript";
      const code = match[2];

      parts.push(
        <div
          key={`code-${counter++}`}
          className="relative my-4 rounded-lg overflow-hidden"
        >
          <div className="flex items-center justify-between px-4 py-2 dark:bg-gray-800 bg-gray-200 text-xs">
            <span className="font-mono">{language}</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(code);
                setCopiedIndex(counter);
                setTimeout(() => setCopiedIndex(null), 2000);
              }}
              className="flex items-center space-x-1 hover:opacity-80"
            >
              {copiedIndex === counter ? (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          <SyntaxHighlighter
            language={language}
            style={oneDark}
            customStyle={{
              margin: 0,
              padding: "1rem",
              fontSize: "0.875rem",
              backgroundColor: "#292c33",
              borderRadius: "0 0 0.5rem 0.5rem",
            }}
            showLineNumbers
          >
            {code}
          </SyntaxHighlighter>
        </div>
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(
        <p key={`text-${counter++}`} className="mb-4 last:mb-0">
          {text.substring(lastIndex)}
        </p>
      );
    }

    return parts;
  }, [copiedIndex]);

  // Optimized input handler
  const handleInputChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);

  return (
    <div className="flex flex-col min-h-screen transition-colors duration-300 bg-gradient-to-b from-blue-50 to-blue-100 dark:bg-gradient-to-b dark:from-zinc-900 dark:to-black">
      <main className="flex-1 mt-12 pt-12 overflow-hidden p-2 sm:p-4 max-w-4xl w-full mx-auto">
        <div className="h-full flex flex-col">
          <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-0 sm:pr-2 scroll-smooth">
            {chats.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-gray-300 dark:text-blue-900/50">
                <div className="p-4 sm:p-6 rounded-2xl shadow-inner border text-center max-w-md w-full dark:bg-gray-800/50 dark:border-gray-700 bg-white/50 border-white">
                  <svg
                    className="w-10 h-10 sm:w-12 sm:h-12 mb-4 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    />
                  </svg>
                  <h2 className="text-base sm:text-lg font-medium mb-2 dark:text-white text-blue-800">
                    Ask your DSA questions
                  </h2>
                  <p className="text-xs sm:text-sm dark:text-gray-400 text-blue-700/80">
                    Get expert explanations for algorithms, data structures, and
                    coding problems. Start by asking about time complexity,
                    sorting algorithms, or any DSA concept.
                  </p>
                </div>
              </div>
            ) : (
              <>
                {chats.slice(-10).flatMap((chat, i) => {
                  const bubbles = [];

                  if (shouldShowDateSeparator(i)) {
                    bubbles.push(
                      <div key={`date-${i}`} className="flex justify-center">
                        <div className="text-xs px-3 py-1 rounded-full bg-blue-100/50 dark:bg-gray-700 text-blue-600 dark:text-gray-400">
                          {formatDateSeparator(chat.created_at)}
                        </div>
                      </div>
                    );
                  }

                  bubbles.push(
                    <div key={`user-${i}`} className="flex justify-end">
                      <div className="max-w-[90vw] sm:max-w-[85%] rounded-2xl p-3 sm:p-4 shadow-md bg-gradient-to-r from-blue-600 to-blue-700 dark:from-blue-700 dark:to-blue-800">
                        <div className="font-medium mb-1 text-xs sm:text-sm text-blue-100 dark:text-blue-200">
                          You
                        </div>
                        <div className="whitespace-pre-wrap text-white break-words">
                          {chat.message}
                        </div>
                      </div>
                    </div>
                  );

                  if (chat.response) {
                    bubbles.push(
                      <div key={`ai-${i}`} className="flex justify-start">
                        <div className="max-w-[90vw] sm:max-w-[85%] rounded-2xl p-3 sm:p-4 border shadow-sm bg-white border-blue-200/50 dark:bg-gray-800 dark:border-gray-700">
                          <div className="font-medium mb-1 text-xs sm:text-sm text-blue-600 dark:text-blue-400">
                            DSA Tutor
                          </div>
                          <div className="text-gray-800 dark:text-gray-200 break-words">
                            {formatMessage(chat.response)}
                          </div>
                          <div className="mt-2 pt-2 border-t text-xs border-blue-100/30 text-blue-400 dark:border-gray-700 dark:text-gray-500">
                            <svg
                              className="w-3 h-3 inline mr-1"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              />
                            </svg>
                            AI-generated educational content
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return bubbles;
                })}
                {/* Typing indicator */}
                {isTyping && (
                  <div key="typing-indicator" className="flex justify-start">
                    <div className="max-w-[90vw] sm:max-w-[85%] rounded-2xl p-3 sm:p-4 border shadow-sm bg-white border-blue-200/50 dark:bg-gray-800 dark:border-gray-700">
                      <div className="font-medium mb-1 text-xs sm:text-sm text-blue-600 dark:text-blue-400">
                        DSA Tutor
                      </div>
                      <div className="flex space-x-2 items-center">
                        <div className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></div>
                        <div
                          className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                        <span className="text-xs text-gray-500 ml-2">
                          Generating response...
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </>
            )}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput
            message={message}
            setMessage={setMessage}
            handleSend={handleSend}
            loading={loading}
          />
        </div>
      </main>
    </div>
  );
}