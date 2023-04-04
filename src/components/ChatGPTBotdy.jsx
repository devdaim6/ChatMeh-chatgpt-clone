import React, { useState } from "react";
import SendIcon from "@mui/icons-material/Send";
import Svg from "./Svg";
import Answer from "./Answer";
function ChatGPTBody() {
  const [chatLog, setChatLog] = useState([]);
  const [answer, setAnswer] = useState("");
  const [loader, setLoader] = useState(false);
  const [question, setQuestion] = useState("");
  const [chatAns, setChatAns] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!question) return;
    setChatLog((prevLog) => [...prevLog, { message: question, isUser: true }]);
    setChatAns((prevAns) => [...prevAns, { message: answer, isUser: false }]);
    setQuestion("");

    setLoader(true);
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "632a1d3569mshf3161e9d8d7f486p1c0d34jsne6615e4c4573",
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
  };

  return (
    <div
      style={{
        backgroundColor: "#222",
        color: "#fff",
        fontFamily: "sans-serif",
        minHeight: "100vh",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1 style={{ margin: "0 0 16px" }}>Chat with ChatMeh</h1>
      <div
        style={{
          color: "white",
          backgroundColor: " rgba(64,65,79,1)",
          padding: "16px",
          width: "100%",
          maxWidth: "100%",
          height: "80vh",
          borderRadius: "4px",
        }}
      >
        <span className="row">
          {chatLog.map((chatItem, index) => (
            <div
              key={index}
              style={{
                marginBottom: "8px",
                textAlign: chatItem.isUser ? "right" : "left",
              }}
            >
              <span
                style={{
                  padding: "3px 6px",
                  backgroundColor: chatItem.isUser ? "#333" : "#0d6efd",
                  color: chatItem.isUser ? "#fff" : "#333",
                  borderRadius: "4px",
                }}
              >
                {chatItem.message}
              </span>
            </div>
          ))}
        </span>
        <span className="row">
          {chatAns.map((chatItem, index) => (
            <div
              key={index}
              style={{
                marginBottom: "8px",
                textAlign: chatItem.isUser ? "right" : "left",
              }}
            >
              {chatItem.message}
            </div>
          ))}
        </span>

        {loader ? <Svg /> : <Answer text={answer} delay="20" />}
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
          id="chatGPTQuestion"
        />
        <SendIcon
          id="sendButton"
          onClick={handleSearch}
          // style={{}}
        />
      </form>
    </div>
  );
}

export default ChatGPTBody;
