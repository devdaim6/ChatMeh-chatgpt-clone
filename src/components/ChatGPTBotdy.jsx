import React, { useState, useEffect } from "react";
import SendIcon from "@mui/icons-material/Send";
import Svg from "./Svg";
import "./card.css";
import {
  WbSunnyOutlined,
  BoltOutlined,
  WarningAmberOutlined,
} from "@mui/icons-material";
import Footer from "./Footer";
import Typed from "typing-ind";

function ChatGPTBody() {
  const [chatLog, setChatLog] = useState([]);
  const [answer, setAnswer] = useState("");
  const [loader, setLoader] = useState(false);
  const [question, setQuestion] = useState("");
  const [enter, setEnter] = useState(false);
  const [bodyText, setBodyText] = useState(true);
  const [repeat, setRepeat] = useState(true);

  useEffect(() => {
    if (!repeat)
      setInterval(() => {
        setRepeat(repeat);
      }, 100);
  }, [repeat]);

  useEffect(() => {
    if (enter === true)
      setChatLog((prevLog) => [...prevLog, { message: answer, isUser: false }]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answer]);

  function handleClick1() {
    setQuestion("Explain quantum computing in simple terms");
    handleSearch();
  }
  function handleClick2() {
    setQuestion("How do i make JavaScript HTTP request?");
    handleSearch();
  }
  function handleClick3() {
    setQuestion("Got any creative ideas for a 10 year old's birthday?");
    handleSearch();
  }

  const handleSearch = async (event) => {
    try {
      if (!question) return;

      setChatLog((prevLog) => [
        ...prevLog,
        { message: question, isUser: true },
      ]);
      setBodyText(false);
      setQuestion("");

      setLoader(true);
      const apiUrl = "https://api.openai.com/v1/chat/completions";
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
      };

      const data = {
        model: "gpt-3.5-turbo",

        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: question },
        ],
      };
      console.log("solution");
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const result = await response.json();
      if (result) console.log(result.choices[0].message.content);

      setLoader(false);
      setAnswer(result.choices[0].message.content);
      setEnter(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        style={{
          backgroundColor: "rgba(52, 53, 65, 1)",
          color: "#fff",
          lineHeight: "2",
          width: "100%",
          height: "90vh",
          fontFamily: "sans-serif",
          minHeight: "75vh",
          padding: "16px",
          display: "flex",
          borderRadius: "4px",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1 style={{ margin: "0 0 10px" }}>
          {" "}
          <Typed
            type={"Chat with ChatMeh "}
            delay={10}
            duration={100}
            cursor={"blinking-text-cursor"}
          />
        </h1>
        <span>
          {repeat ? (
            <Typed
              type={[
                "I am ",
                "an AI Bot",
                "here to help you!",
                "here to make your life easier!",
                "an AI Bot",
                "here to help you!",
                "here to make your life easier!",
                "an AI Bot",
                "here to help you!",
                "here to make your life easier!",
                "an AI Bot",
                "here to help you!",
                "here to make your life easier!",
                "an AI Bot",
                "here to help you!",
                "here to make your life easier!",
                "an AI Bot",
                "here to help you!",
                "here to make your life easier!",
                "an AI Bot",
                "here to help you!",
                "here to make your life easier!",
              ]}
              delay={10}
              backspace={[
                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18,
                19, 20, 21,
              ]}
              duration={100}
              cursor={"blinking-text-cursor"}
            />
          ) : null}
        </span>

        {/* body  */}

        {bodyText && (
          <div className="container">
            <div class="features">
              <div className="col-4 d-flex justify-content-center">
                {" "}
                <WbSunnyOutlined />
              </div>
              <div className="col-4 d-flex justify-content-center">
                {" "}
                <BoltOutlined />
              </div>
              <div className="col-4 d-flex justify-content-center">
                {" "}
                <WarningAmberOutlined />
              </div>
              <div className="col-4 d-flex justify-content-center">
                Examples
              </div>
              <div className="col-4 d-flex justify-content-center">
                Capabilities
              </div>
              <div className="col-4 d-flex justify-content-center">
                Limitations
              </div>
              <div
                className="feature"
                style={{
                  background: "rgba(204, 205, 217, 0.14)",
                  fontSize: "16px",
                  color: "white",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              >
                <p id="p1" onMouseDown={handleClick1} onMouseUp={handleClick1}>
                  "Explain quantum computing in simple terms" →
                </p>
              </div>

              <div
                className="feature"
                style={{
                  background: "rgba(204, 205, 217, 0.14)",
                  fontSize: "16px",
                  color: "white",
                  borderRadius: 10,
                }}
              >
                <p>Remembers what user said earlier in the conversation</p>
              </div>

              <div
                className="feature"
                style={{
                  background: "rgba(204, 205, 217, 0.14)",
                  fontSize: "16px",
                  color: "white",
                  borderRadius: 10,
                }}
              >
                <p>May occasionally generate incorrect information</p>
              </div>
            </div>
            <div class="features">
              <div
                className="feature"
                style={{
                  background: "rgba(204, 205, 217, 0.14)",
                  fontSize: "16px",
                  color: "white",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              >
                <p id="p1" onMouseDown={handleClick2} onMouseUp={handleClick2}>
                  "How do i make JavaScript HTTP request?" →
                </p>
              </div>

              <div
                className="feature"
                style={{
                  background: "rgba(204, 205, 217, 0.14)",
                  fontSize: "16px",
                  color: "white",
                  borderRadius: 10,
                }}
              >
                <p>Allows user to provide follow-up corrections</p>
              </div>

              <div
                className="feature"
                style={{
                  background: "rgba(204, 205, 217, 0.14)",
                  fontSize: "16px",
                  color: "white",
                  borderRadius: 10,
                }}
              >
                <p>
                  May occasionally produce harmful instructions or biased
                  content
                </p>
              </div>
            </div>
            <div class="features">
              <div
                className="feature"
                style={{
                  background: "rgba(204, 205, 217, 0.14)",
                  fontSize: "16px",
                  color: "white",
                  borderRadius: 10,
                  cursor: "pointer",
                }}
              >
                <p id="p1" onMouseDown={handleClick3} onMouseUp={handleClick3}>
                  "Got any creative ideas for a 10 year old's birthday?" →
                </p>
              </div>

              <div
                className="feature"
                style={{
                  background: "rgba(204, 205, 217, 0.14)",
                  fontSize: "16px",
                  color: "white",
                  borderRadius: 10,
                }}
              >
                <p>Trained to decline inappropriate requests</p>
              </div>

              <div
                className="feature"
                style={{
                  background: "rgba(204, 205, 217, 0.14)",
                  fontSize: "16px",
                  color: "white",
                  borderRadius: 10,
                }}
              >
                <p>Limited knowledge of world and events after 2021</p>
              </div>
            </div>
          </div>
        )}

        {loader ? (
          <Svg />
        ) : (
          chatLog.map((chatItem, index) => (
            <div
              className="container"
              key={index}
              style={{
                marginBottom: "8px",
                textAlign: chatItem.isUser ? "right" : "left",
              }}
            >
              <span
                style={{
                  padding: "4px 8px",
                  margin: "5px",
                  backgroundColor: chatItem.isUser
                    ? "#fff"
                    : "rgba(64,65,79,1)",
                  color: chatItem.isUser ? "#333" : "#fff",
                  borderRadius: "4px",
                }}
              >
                <Typed
                  type={chatItem.message}
                  duration={40}
                  cursor={"blinking-text-cursor"}
                />
              </span>
            </div>
          ))
        )}

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
            onKeyDown={(event) => {
              if (event.code === "Enter") {
                event.preventDefault();
                handleSearch();
              }
            }}
          />

          <SendIcon id="sendButton" onClick={handleSearch} />
        </form>
        <Footer />
      </div>
    </>
  );
}

export default ChatGPTBody;
