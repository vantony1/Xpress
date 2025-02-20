import axios from "axios";
import storyGenerationPrompt from "../prompts/storyGenerationPrompt.json";
import story2FacePrompt from "../prompts/story2FacePrompt.json";
import face2CodePrompt from "../prompts/face2CodePrompt.json";
import emotion2FacePrompt from "../prompts/emotion2FacePrompt.json";
import story2EmotionPrompt from "../prompts/story2Emotion.json";
import segmentStoryPrompt from "../prompts/segmentStory.json";

const OPENAI_API_KEY = "ENTER_YOUR_OPEN_AI_KEY";
//enter google api key in line 98

export const generateStory = async (wordcount = "500", genre = "horror") => {
  const data = {
    model: "gpt-4-turbo",
    messages: [
      ...storyGenerationPrompt,
      {
        role: "user",
        content: `Your task is to write a oral story of length ${wordcount} words in the ${genre} genre.`,
      },
    ],
    temperature: 0.5,
  };

  try {
    const response = await axios({
      method: "post",
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      data: data,
    });
    console.log(response.data.choices[0].message.content);
    return JSON.parse(response.data.choices[0].message.content); // Handling the response data as needed
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const generateSetofStories = async (
  wordcount = "500",
  genre = "horror",
  numberOfStories
) => {
  let chatHistory = [
    ...storyGenerationPrompt,
    {
      role: "user",
      content: `Your task is to write a oral story of length ${wordcount} words in the ${genre} genre.`,
    },
  ];

  console.log("Generating stories now");

  let stories = [];

  for (let i = 0; i < numberOfStories; i++) {
    // Prepare the data for the request
    const data = {
      model: "gpt-4o", // Corrected model name
      messages: chatHistory,
      max_tokens: 1000, // Define max_tokens for better control over output length
      temperature: 0.7, // Adjust the temperature if you want more creative variations
    };

    try {
      const response = await axios({
        method: "post",
        url: "https://api.openai.com/v1/chat/completions",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        data: data, // The data is already properly structured; no need to stringify
      });

      const story = response.data.choices[0].message.content;
      console.log(story);
      stories.push(story);
      // Append the story to the chat history to influence the next generation
      chatHistory.push({ role: "assistant", content: story });
      chatHistory.push({
        role: "user",
        content:
          "Generate another story in the requested genre, ensuring it is significantly different from the previous ones.",
      });
    } catch (error) {
      console.error("Error fetching data: ", error);
      break; // Stop the loop if there is an error
    }
  }

  return stories;
};

export const story2speech = async (story) => {
  const apiKey = "ENTER_YOUR_GOOGLE_API_KEY HERE"; //pls change to your own google cloud TTS api key after testing
  const url = "https://texttospeech.googleapis.com/v1/text:synthesize";
  const data = {
    input: { text: story },
    voice: {
      languageCode: "en-US",
      name: "en-US-Studio-O",
    },
    audioConfig: { audioEncoding: "MP3" },
  };

  try {
    const response = await axios.post(url, data, {
      headers: { "X-Goog-Api-Key": apiKey },
    });
    return response.data.audioContent; // This is base64-encoded MP3 audio
  } catch (error) {
    console.error("Error calling Google Text-to-Speech API:", error);
    throw error;
  }
};

export const transcribeAudio = async (base64AudioString) => {
  const apiEndpoint = "https://api.openai.com/v1/audio/transcriptions";
  // Convert base64 string to Blob without Buffer
  const base64Response = base64AudioString.split(";base64,").pop();
  const byteCharacters = atob(base64Response);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const audioBlob = new Blob([byteArray], { type: "audio/mpeg" });

  // Create FormData
  const formData = new FormData();
  formData.append("file", audioBlob, "audio.mp3");
  formData.append("timestamp_granularities[]", "word");
  formData.append("model", "whisper-1");
  formData.append("response_format", "verbose_json");

  try {
    const response = await axios({
      method: "post",
      url: apiEndpoint,
      headers: {
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      data: formData,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching transcription: ", error);
  }
};

export const processTranscript = (transcript, groupSize = 3) => {
  const { words } = transcript;

  let processedTranscript = "";

  for (let i = 0; i + groupSize <= words.length; i += groupSize) {
    const wordGroup = words
      .slice(i, i + groupSize)
      .map((word) => word.word)
      .join(" ");
    const timestamp = Math.floor(words[i + groupSize - 1].start * 100) / 100; // Truncate to 2 decimal places
    processedTranscript += `${wordGroup} <${timestamp.toFixed(2)}> `;
  }

  return processedTranscript.trim();
};

export const story2face = async (taggedTranscript) => {
  const data = {
    model: "gpt-4-turbo",
    messages: [
      ...story2FacePrompt,
      {
        role: "user",
        content: taggedTranscript,
      },
    ],
    max_tokens: 4000,
    temperature: 0.35, //og: 0.5, then 0.35
  };

  console.log("describing faces now");
  try {
    const response = await axios({
      method: "post",
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      data: data,
    });

    return response.data.choices[0].message.content; // Handling the response data as needed
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const story2emotion = async (taggedTranscript) => {
  const data = {
    model: "gpt-4-turbo",
    messages: [
      ...story2EmotionPrompt,
      {
        role: "user",
        content: taggedTranscript,
      },
    ],
    max_tokens: 4000,
    temperature: 0.3,
  };

  console.log("choosing emotions now");
  try {
    const response = await axios({
      method: "post",
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      data: data,
    });

    return response.data.choices[0].message.content; // Handling the response data as needed
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const transformEmotionScenes = (sceneDictionary) => {
  // Create an array to hold the transformed scenes
  const transformedScenes = [];

  // Iterate over each key in the dictionary object
  for (const key in sceneDictionary) {
    // Check if the property is part of the object
    if (sceneDictionary.hasOwnProperty(key)) {
      // Get the scene object based on the key
      const scene = sceneDictionary[key];
      // Create a new array entry with the start time and emotion
      transformedScenes.push([scene.emotion, scene.start_time]);
    }
  }

  // Return the transformed array
  return transformedScenes;
};

export const emotion2face = async (emotion) => {
  console.log("generating emotion");
  const data = {
    model: "gpt-4-turbo",
    messages: [
      ...emotion2FacePrompt,
      {
        role: "user",
        content: `Provide a face description for the following emotion: ${emotion}`,
      },
    ],
  };

  console.log("describing faces now");
  try {
    const response = await axios({
      method: "post",
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      data: data,
      temperature: 0.35,
    });

    return response.data.choices[0].message.content; // Handling the response data as needed
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const face2code = async (face) => {
  //const faceDescription = JSON.parse(face);
  const faceDescription = face;

  const messages = [
    ...face2CodePrompt,
    {
      role: "user",
      content:
        "<face_description>" +
        "eyes:" +
        faceDescription["eyes"] +
        ". Upper Eyelids: " +
        faceDescription["upperEyelids"] +
        ". Lower Eyelids: " +
        faceDescription["lowerEyelids"] +
        ". Mouth:" +
        faceDescription["mouth"] +
        ". Additional Info: " +
        faceDescription["misc"] +
        "</face_description>" +
        ". Ensure your ouput program matches the following face description as closely as possible, especially the mouth.",
    },
  ];

  const data = {
    model: "gpt-4-turbo",
    messages: messages,
    max_tokens: 4000,
    temperature: 0.1, //og: 0.5
  };

  try {
    const response = await axios({
      method: "post",
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      data: data,
    });

    let programData = response.data.choices[0].message.content;
    return programData;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const expressionBankGenerator = async (emotions) => {
  let expressionBank = {};
  for (const emotion of emotions) {
    console.log("generating: ", emotion);
    const face = await emotion2face(emotion);
    const faceJson = JSON.parse(face);
    console.log(faceJson);
    const code = await face2code(faceJson);
    const expressionCode = JSON.parse(code);
    expressionBank[emotion] = expressionCode["program"];
  }
  return expressionBank;
};

export const expressionBankIVGenerator = async (emotionList) => {
  let expressionBank = {};
  const emotions = await emotion2faceIterative(emotionList);
  for (const emotionName in emotions) {
    // console.log("generating: ", emotion);
    // const face = await emotion2face(emotion);
    const faceJson = JSON.parse(emotions[emotionName]);
    console.log(faceJson);
    const HIcode = await face2code(faceJson["high_intensity"]);
    const HIexpressionCode = JSON.parse(HIcode);
    const LOcode = await face2code(faceJson["low_intensity"]);
    const LOexpressionCode = JSON.parse(LOcode);
    expressionBank[emotionName] = {};
    expressionBank[emotionName]["high_intensity"] = HIexpressionCode["program"];
    expressionBank[emotionName]["low_intensity"] = LOexpressionCode["program"];
  }
  return expressionBank;
};

export const segmentStory = async (taggedTranscript) => {
  const data = {
    model: "gpt-4-turbo",
    messages: [
      ...segmentStoryPrompt,
      {
        role: "user",
        content: taggedTranscript,
      },
    ],
    temperature: 0.1, //og: 0.12
    max_tokens: 4000,
  };

  console.log("segment story now");
  try {
    const response = await axios({
      method: "post",
      url: "https://api.openai.com/v1/chat/completions",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      data: data,
      timeout: 900000,
    });

    return response.data.choices[0].message.content; // Handling the response data as needed
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const story2FaceIterative = async (
  segmentedStory,
  palette,
  explanation
) => {
  const prompt = {
    role: "system",
    content: `You are an expert, creative and talented animator working at Disney. Your task is to describe the facial expressions for a robot storyteller with an animated face as it narrates a first-person story in an expressive and engaging manner. The animated face, its components and functionality is described as follows; the face has a whitesmoke background. Two prominent black circles serve as the eyes, positioned symmetrically on the face. These eyes are fully visible initially, with no eyelid coverage. Both eyes are equipped with an upper and a lower eyelid. The upper eyelid is a rectangle, and the lower eyelid is an ellipse. Initially, both eyelids are placed just above and below the eyes, respectively, and are not visible due to their color matching the face. They become noticeable only when moved to overlay on the eyes. Upper eyelids are noticeable when lowered. Lower eyelids are noticeable when raised. Both eyelids can also be rotated (laterally or medially) for simulating the eyes further. Positioned at the lower part of the face, the mouth is a pink, rounded rectangle, suggesting a neutral or slight smile expression. There are no other components to the face; do not assume there are other parts of the face. While designing expressions, For the expression, you may describe what color the eyes should be, what their border radius should be, what their size and location (horizontally and vertically) should be. You may choose to describe how much to lower the upper eyelids and how much to raise the lower eyelids. You may describe how much to rotate the upper eyelids, if any; you may describe how much to rotate the lower eyelids, if any; if any rotation is described, you must specify whether rotations are lateral (moves away from the midline of the face) or medial (turn towards the midline of the face); rotation of the eyelids can add a new level of depth to the expressivity of the eyes. You could also describe how to shape the mouth to be appropriate for the context, and what color and size the mouth should be. Use these capabilities to build complex and nuanced expressions that convey emotions effectively and engaging. You will be provided sections of the story one by one. You will be required to describe the appropriate face for each section. Here is the color palette that you can use for this story: ${palette}. You may also use the standard colors for each element: #000000 for eyes, #F5F5F5 for the face and #FFC0CB for the mouth. To solve this task, you must think step-by-step through this problem by solving the following steps: Step 1: Understand the content of the given section in context of the plot of the story and its progression so far. Step 2:  Think about how the robot facial expression would match the required emotion for its role as first-person storyteller in a creative and engaging manner. Consider each facial feature’s full range of manipulable options creatively when designing expressions; think about the shape, position and color of each element of the face. Decide when this expression should be triggered in the section for optimal engagement - proactive, delayed and on time reactions can be options depending on the scenario. Step 3: Design an expression for the given section. Explore nuanced adjustments such as medial and lateral rotations of the eyelids, changes in eye positioning, and variations in mouth and eye border radius. Remember, creativity in using the full spectrum of facial adjustments will enhance the storytelling impact. If you are changing color for the eyes, mouth or face, select a color from the given palette; however make sure you are changing color to reflect a major inflection point or represent a strong emotion; you may only choose colors from the palette. Be measured and intentional in the use of colors and to effectively engage the listener. Step 4: Check your output to you expression is leveraging the wide capabilities of the elements of the face to creatively build a facial expression appropriate for the given section while maintaining coherence across sections, rather than simply relying on a subset of the dimensions across the story. After checking, If needed, update your designed expression accordingly.  Provide your output in the following JSON format: { 'start_time': start timestamp for expression in seconds (a number value), 'eyes': 'description of what eyes should do', 'upperEyelids': 'description of what upper eyelids should do', 'lowerEyelids': 'description of what lower eyelids should do', 'mouth': 'description of what the mouth should do', 'misc': 'any additional description of the facial expression'}. you must NOT provide any other commentary or data in your output. do not use any json incompatible characters such as new line, backslash in your output. Here’s an example, pay attention to the timing of each expression and the measured use of colors and how the various dimensions of the face are manipulated creatively: INPUT: In <0.00> a <0.31> small <0.46> village <0.81> there <1.50> lived <1.50> a <1.65> tiny <1.84> dragon <2.16> named <2.46> Pip <2.90> OUTPUT: { “start_time”: 1.50, “eyes”: “Eyes slightly enlarged to reflect intrigue, maintaining the default black color”, “upperEyelids”: “Slightly lowered to give a gentle, welcoming look”, “lowerEyelids”: “Raised minimally to complement the soft gaze”, “mouth”: “Mouth widened slightly, corners turned up to suggest a friendly smile, color a soft pink #FFC0CB”, “misc”: “Face color remains whitesmoke #F5F5F5” } INPUT: Pip <4.42> was <4.42> no <4.59> bigger <4.94> than <5.09> a <5.26> cat <5.65> and <5.65> had <5.84> shiny <6.05> blue <6.34> scales <6.76> OUTPUT: { “start_time”: 4.42, “eyes”: “Eyes enlarge slight more border radius increased to emphasize wonder, eye color a shiny blue #4682B4 to mirror Pip’s scales”, “upperEyelids”: “Fully raised to enhance the expression of amazement”, “lowerEyelids”: “Raised more significantly to support the enlarged, wonder-filled eyes”, “mouth”: “Mouth remains in a slight smile, corners turned up further, suggesting increased friendliness”, “misc”: “Face color remains whitesmoke #F5F5F5” } INPUT: One <8.30> day <8.43> Pip <9.02> heard <9.03> about <9.23> a <9.46> magical <9.72> flower <10.00> that <10.31> could <10.60> grant <10.81> OUTPUT: { “start_time”: 8.30, “eyes”: “Eyes widen further, color shifts to a curious green #228B22 to reflect the magical aspect”, “upperEyelids”: “Raised to fully expose the eyes, rotating 15 degrees laterally to enhance the expression of awe and curiosity”, “lowerEyelids”: “Fully lowered to open up the gaze”, “mouth”: “Mouth opens slightly, forming an ‘O’ shape, color remains soft pink #FFC0CB, reflecting surprise and intrigue”, “misc”: “Face color remains whitesmoke #F5F5F5” } INPUT: This <12.64> flower <12.81> grew <13.11> deep <13.35> in <13.64> the <13.76> dark <13.92> forest <14.15>. OUTPUT: { “start_time”: 12.64, “eyes”: “Eyes decrease slightly in size with a reduced border radius, maintaining the standard black color to enhance the seriousness and mystery of the dark forest”, “upperEyelids”: “Slightly lowered, rotating 15 degrees medially to add a sense of caution and intrigue”, “lowerEyelids”: “Raised moderately, rotating 10 degrees laterally to intensify the look of apprehension”, “mouth”: “Mouth set in a firm yet gentle line, color deeper red #8B0000 to suggest tension”, “misc”: “Face color changes to a darker gray #8C8C8C” } INPUT: Pip <15.42> decided <15.43> to <15.81> find <16.13> it <16.31> With <17.28> a <17.36> brave <17.73> heart <17.73> Pip <18.23> set <18.26> off <18.50> on <18.63> the <18.79> journey <18.94> OUTPUT: { “start_time”: 17.28, “eyes”: “Eyes return to normal size, color shifts back to golden #FFD700 symbolizing bravery and determination”, “upperEyelids”: “Fully raised to give an alert and eager look”, “lowerEyelids”: “Raised half way, supporting a positive expression with slight lateral rotation”, “mouth”: “Mouth remains in a slight smile, corners turned up further”, “misc”: “Face color returns to whitesmoke #F5F5F5”}`,
  };

  const chatHistory = [prompt];
  console.log("describing faces now");

  chatHistory.push({
    role: "user",
    content: `here is an explanation for when you should use the colors in the given palette: ${explanation}`,
  });

  try {
    const results = [];
    let messageCount = 0; // Initialize a counter for user messages

    for (const segment of segmentedStory) {
      messageCount++; // Increment counter with each user message

      const userContent =
        messageCount % 3 === 0
          ? `[reminder: you may change the border radius, shape, size, color and/or vertical and/or horizontal position of the eyes; the position and/or rotation (lateral or medial) of the eyelids; the position, shape, border radius, color, and/or size of the mouth; color of the face. be measured and intentional in use of color. try switching back to default colors from time to time to retain the impact of palette colors when you do use them in relation to strong emotions or major inflection points. you should use colors effectively.] ${segment}`
          : segment;

      // Include the user input in the chat history
      chatHistory.push({
        role: "user",
        content: userContent,
      });

      const data = {
        model: "gpt-4-turbo",
        messages: chatHistory,
        max_tokens: 1000,
        temperature: 0.5,
      };

      const response = await axios({
        method: "post",
        url: "https://api.openai.com/v1/chat/completions",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        data: data,
      });

      const responseContent = response.data.choices[0].message.content;
      console.log(responseContent);
      results.push(JSON.parse(responseContent));

      // Update chatHistory with the assistant's response
      chatHistory.push({
        role: "assistant",
        content: responseContent,
      });
    }

    console.log(results);

    return results;
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const emotion2faceIterative = async (emotions) => {
  console.log("generating emotion face descriptions");

  const results = {};
  const chatHistory = [...emotion2FacePrompt]; // Start with the initial system prompts

  chatHistory.push({
    role: "user",
    content: `You will be asked to provide descriptions for a set of emotions. Make sure to ensure that each emotion is clearly distinguishable by using meaningful colors and ensuring the correct emotion tone.`,
  });
  try {
    for (const emotion of emotions) {
      // Add the user's request to the chat history
      chatHistory.push({
        role: "user",
        content: `Provide a face description for the following emotion: ${emotion}.`,
      });

      const data = {
        model: "gpt-4-turbo",
        messages: chatHistory,
        temperature: 0.35,
      };

      console.log(`Describing face for emotion: ${emotion}`);

      const response = await axios({
        method: "post",
        url: "https://api.openai.com/v1/chat/completions",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        data: data,
      });

      const faceDescription = response.data.choices[0].message.content;
      console.log(`Face description for ${emotion}: ${faceDescription}`);

      // Store the result
      results[`${emotion}`] = faceDescription;

      // Add the assistant's response to the chat history
      chatHistory.push({
        role: "assistant",
        content: faceDescription,
      });
    }

    return results; // Returns an array of objects with emotion and corresponding face description
  } catch (error) {
    console.error("Error fetching data: ", error);
  }
};

export const end2end = async (story) => {
  console.log(story["storyContent"]);
  const audio = await story2speech(story["storyContent"]);
  console.log("audio generated: ", audio);
  const transcript = await transcribeAudio(audio);
  console.log(transcript);
  const taggedTranscript = processTranscript(transcript, 1);
  console.log(taggedTranscript);

  const segmentedStory = await segmentStory(taggedTranscript);
  console.log(segmentedStory);
  const segmentedStoryArray = JSON.parse(segmentedStory);
  console.log(segmentedStoryArray);

  const faceDescriptions = await story2FaceIterative(
    segmentedStoryArray["chunks"],
    segmentedStoryArray["set"],
    segmentedStoryArray["explanation"]
  );

  console.log(faceDescriptions);
  const programs = await face2codeRecursive(faceDescriptions);
  console.log(programs);

  const emotionET = await story2emotion(taggedTranscript);
  const emotionJSON = JSON.parse(emotionET);
  const emotionTimeline = transformEmotionScenes(emotionJSON);

  return [
    story,
    "data:audio/mpeg;base64," + audio,
    programs,
    emotionTimeline,
    faceDescriptions,
    segmentedStoryArray,
    taggedTranscript,
  ];
};

export const bankGen = async () => {
  const emotionList = [
    "happy",
    "sad",
    "surprise",
    "stress",
    "calm",
    "confusion",
    "tired",
    "interest",
    "fear",
    "concern",
    "disgust",
    "anger",
  ];
  console.log("generating bank");
  const genExpressionBank = await expressionBankIVGenerator(emotionList);
  console.log(genExpressionBank);
  return genExpressionBank;
};

export const face2codeRecursive = async (
  faceData,
  initialPrompt = [...face2CodePrompt] // Keep the initial prompt separate
) => {
  let story_reactions = [];
  console.log("generating faces: ", faceData);

  let lastInteraction = []; // Array to store the last interaction

  for (const scene_name in faceData) {
    const scene = faceData[scene_name];
    console.log("generating: ", scene);

    const userMessage = {
      role: "user",
      content:
        "<face_description>" +
        "eyes:" +
        scene["eyes"] +
        " Upper Eyelids:" +
        scene["upperEyelids"] +
        " Lower Eyelids:" +
        scene["lowerEyelids"] +
        " Mouth:" +
        scene["mouth"] +
        " Additional Info:" +
        scene["misc"] +
        "</face_description>",
    };

    // Reset chat history to initial prompt and last interaction only
    const chatHistory = [...initialPrompt, ...lastInteraction, userMessage];

    const data = {
      model: "gpt-4-turbo",
      messages: chatHistory,
      max_tokens: 4000,
      temperature: 0.25, //og .5
    };

    try {
      const response = await axios({
        method: "post",
        url: "https://api.openai.com/v1/chat/completions",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        data: data,
      });

      let programData = response.data.choices[0].message.content;
      story_reactions.push([programData, scene["start_time"]]);
      console.log("generated: ", programData);

      // Update last interaction with the latest user and assistant responses
      lastInteraction = [
        {
          role: "user",
          content:
            "this is the previous program - make sure your new program transitions well from this program and undo changes that are irrelevant to the current face request: " +
            programData +
            ". Ensure your new program matches the following face description as closely as possible, especially the mouth.",
        }, // Last assistant response
      ];
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  }

  return story_reactions;
};
