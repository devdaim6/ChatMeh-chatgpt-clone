import React, { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import Svg from "./Svg";
import Answer from "./Answer";
function ChatGPTBody() {
  const [chatLog, setChatLog] = useState([]);
  const [answer, setAnswer] = useState("");
  const [loader, setLoader] = useState(true);
  const [question, setQuestion] = useState("");

  useEffect(() => {
    setChatLog((prevAns) => [...prevAns, { message: answer, isUser: false }]);
  }, [answer]);
  const handleSearch = async (event) => {
    try {
      event.preventDefault();

      if (!question) return;
      setChatLog((prevLog) => [
        ...prevLog,
        { message: question, isUser: true },
      ]);
      setQuestion("");
      setLoader(true);
      const options = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "632a1d3569mshf3161e9d8d7f486p1c0d34jsne6615e4c4573",
          "X-RapidAPI-Host": "openai80.p.rapidapi.com",
        },
        body: `{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"${question}"}]}`,
      };

      const res = await fetch(
        "https://openai80.p.rapidapi.com/chat/completions",
        options
      );
      const resJson = await res.json();
      setLoader(false);
      setAnswer(resJson.choices[0].message.content);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#222",
        color: "#fff",
        fontFamily: "sans-serif",
        minHeight: "75vh",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: "0 0 10px" }}>Chat with ChatMeh</h1>
      <div
        style={{
          color: "white",
          backgroundColor: " rgba(64,65,79,1)",
          padding: "10px",
          width: "100%",
          maxWidth: "100%",
          height: "75vh",
          lineHeight: "2",
          borderRadius: "4px",
        }}
      >
        {loader ? (
          <Svg />
        ) : (
          chatLog.map((chatItem, index) => (
            <div
              key={index}
              style={{
                marginBottom: "8px",
                textAlign: chatItem.isUser ? "right" : "left",
              }}
            >
              <span
                style={{
                  padding: "4px 8px",
                  margin: "3px",
                  backgroundColor: chatItem.isUser
                    ? "#fff"
                    : "rgba(64,65,79,1)",
                  color: chatItem.isUser ? "#333" : "#fff",
                  borderRadius: "4px",
                }}
              >
                <Answer text={chatItem.message} />
              </span>
            </div>
          ))
        )}
      </div>

      <form className="chatForm ">
        <input
          type="text"
          onChange={(e) => {
            setQuestion(e.target.value);
          }}
          value={question}
          placeholder="Send a Message ..."
          style={{
            padding: ".7rem",
            outline: "none",
            backgroundColor: " rgba(64,65,79,1)",
            position: "relative",
            bottom: "12px",
            border: "0",
          }}
          onKeyDown={(e) => {
            if (e.target.value === "Enter") {
              handleSearch();
            }
          }}
          id="chatGPTQuestion"
        />
        <SendIcon id="sendButton" onClick={handleSearch} />
      </form>
    </div>
  );
}

export default ChatGPTBody;
