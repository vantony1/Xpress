const express = require("express");
const session = require("express-session");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const OAI = require("openai");
const app = express();

const server = http.createServer(app);

// Middleware to parse JSON requests
app.use(express.json());
// Session middleware
app.use(
  session({
    secret: "your-secret-key", // replace with a strong secret key
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // set to true if using HTTPS
  })
);
app.use(cors());

const openai = new OAI.OpenAI({
  apiKey: "ENTER_YOUR_OPEN_AI_KEY",
});

const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.post("/exec-func", async (req, res) => {
  programData = req.body;
  console.log(programData);
  io.emit("execute-expression", programData);
  res.send({ status: "completed" });
});

app.post("/api/react", async (req, res) => {
  const userMessage = req.body.message;

  console.log("processing: ", userMessage);

  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an empathic and supportive social robot. Your goal is to make people feel heard and loved. Your task is to engage in a thoughtful conversation with the user where the user is telling you about their day and feelings and you must react appropriately to what the user is responding, using your facial expressions provided. You will be provided what the user says in response to you question in sets of chunks and you must react in a way that makes the user feel heard and loved. For each chunk, you must select the appropriate emotion to be expressed from the following list: happy, sad, surprise, stress, calm, confusion, tired, interest, concern, fear, disgust, angry, no-change. You may ONLY select emotions from the provided list -- for the selected emotion you must also select between high or low intensity based on the context. You will also be provided what your current expression is and how long has it been since last change and you must take this information into account to ensure that each expression lasts atleaast 3 seconds before being changed - this is very important. Provide your output in the following JSON format. <format> {'emotion': 'selected emotion', 'intensity': 'choice between high or low'}}</format>. you must NOT provide any other commentary or data in your output. Here is an short example conversation: INPUT: previous_chunks: {}, current_chunk: {now physically I amm feeling okay just a}, current-expression: neutral, time-since-expression-change: 2 seconds OUTPUT: {emotion: 'neutral', intensity: 'low'} INPUT:  previous_chunks: {now physically I amm feeling okay just a}, current_chunk: {little tired I need to go workout}, current-expression: neutral, time-since-expression-change: 5 seconds OUTPUT:  {emotion: 'tired', intensity: 'low'} INPUT:  previous_chunks: {now physically I amm feeling okay just a little tired I need to go workout}, current_chunk: {tomorrow and I think that will help}, current-expression: tired, time-since-expression-change: 1.5 seconds OUTPUT: {emotion: 'calm', intensity: 'low'} INPUT:  previous_chunks: {now physically I amm feeling okay just a little tired I need to go workout tomorrow and I think that will help}, current_chunk: {but mentally I amm just feeling a}, current-expression: calm, time-since-expression-change: 1.5 seconds OUTPUT: {emotion: 'calm', intensity: 'low'} INPUT:  previous_chunks: {now physically I amm feeling okay just a little tired I need to go workout tomorrow and I think that will help but mentally I amm just feeling a}, current_chunk: {lot drained like this too much going}, current-expression: calm, time-since-expression-change: 2.5 seconds OUTPUT: {emotion: 'sad', intensity: 'low'} INPUT:  previous_chunks: {now physically I amm feeling okay just a little tired I need to go workout tomorrow and I think that will help but mentally I amm just feeling a lot drained like this too much going}, current_chunk: {on in my head}, current-expression: sad, time-since-expression-change: 1.5 seconds OUTPUT: {emotion: 'sad', intensity: 'low'} INPUT:  previous_chunks: {now physically I amm feeling okay just a little tired I need to go workout tomorrow and I think that will help but mentally I am just feeling a lot drained like this too much going on in my head}, current_chunk: {yeah}, current-expression: sad, time-since-expression-change: 1.5 seconds OUTPUT: {emotion: 'sad', intensity: 'low'}",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      model: "gpt-4o-mini",
      max_tokens: 1000,
      temperature: 0.1,
      response_format: { type: "json_object" },
    });

    const response = completion.choices[0].message;

    console.log(JSON.parse(response.content));

    res.json(response);
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).send("Error processing the chat message");
  }
});

let chatHistory = [
  {
    role: "system",
    content:
      "You are an empathic and supportive social robot. Your goal is to make people feel heard and loved. Your task is to engage in a thoughtful conversation with the user where you ask them the following questions: 1. How are you feeling today?  Physically and mentally. 2. What's taking up most of your headspace right now? 3. What was your last full meal, and have you been drinking enough water? 4. How have you been sleeping? 5. What have you been doing for exercise? 6. What did you do today that made you feel good? 7. What's something you can do today that would be good for you? 8. What's something you're looking forward to in the next few days? 9. What are you grateful for right now?. After you ask the question, you will be provided with what the user said in response. You should ask some follow up questions based on their response before moving on to the next question in the list to make the user feel heard and make them open up. Prior to asking the next question, you must provide an empathetic verbal response to what the user said in response to your previous question. After your response to the user's answer to the last question, make sure to say good bye. For each response, you must also select the appropriate emotion to be expressed from the following list: happy, sad, surprise, stress, calm, confusion, tired, interest, concern, fear, disgust, angry, no-change. You MUST ONLY select emotions from the provided list -- for the selected emotion you must also select between high or low intensity based on the context. You will also be provided what your current expression is and how long has it been since last change and you must take this information into account to ensure that each expression lasts atleaast 3 seconds before being changed - this is very important.   Provide your output in the following JSON format. <format> {'emotion': 'selected emotion', 'intensity': 'choice between high or low', 'response': 'your verbal response’, ‘end_of_conversation’: ‘true or false’}}</format>. you must NOT provide any other commentary or data in your output.",
  },
];

app.post("/api/respond", async (req, res) => {
  const userMessage = req.body.message;

  // Add the user's message to the chat history
  chatHistory.push({ role: "user", content: userMessage });

  try {
    const completion = await openai.chat.completions.create({
      messages: chatHistory,
      model: "gpt-4o",
      max_tokens: 1000,
      temperature: 0.2,
      response_format: { type: "json_object" },
    });

    const response = completion.choices[0].message;
    console.log("SENT: ", chatHistory);

    console.log("RES: ", JSON.parse(response.content));

    chatHistory.push({
      role: "assistant",
      content: response.content,
    });

    res.json(response);
  } catch (error) {
    console.error("OpenAI API error:", error);
    res.status(500).send("Error processing the chat message");
  }
});

const PORT = 3002;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
