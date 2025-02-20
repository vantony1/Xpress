import React, { useState } from "react";
import { generateStory, end2end } from "./StoryGenerator";
import {
  Button,
  TextField,
  Box,
  Container,
  Typography,
  CircularProgress,
} from "@mui/material";
import Experiment from "./Experiment";
import StoryLibrary from "./StoryLibrary";

function StoryGenTestbed() {
  const [wordCount, setWordCount] = useState("100");
  const [genre, setGenre] = useState("Fantasy");
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [end2endLoading, setEnd2EndLoading] = useState(false);
  const [finalStory, setFinalStory] = useState(null);
  const [showExperiment, setShowExperiment] = useState(false);

  const handleGenerateStory = async () => {
    setLoading(true);
    const generatedStory = await generateStory(wordCount, genre);
    if (generatedStory) {
      setStory(generatedStory);
    }
    setLoading(false);
  };

  const handleEnd2End = async () => {
    if (!story) return;
    setEnd2EndLoading(true);
    const processedStory = await end2end(story);
    if (processedStory) {
      setFinalStory(processedStory);
    }
    setEnd2EndLoading(false);
  };

  const handleSaveStory = () => {
    if (!finalStory) return;
    const jsonContent = JSON.stringify(finalStory, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `story_${Date.now()}.json`;
    link.click();
  };

  return (
    <Container
      maxWidth="sm"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <StoryLibrary />
      <Typography variant="h4" gutterBottom>
        Story Generator
      </Typography>
      <Box display="flex" flexDirection="column" gap={2} width="100%">
        <TextField
          label="Word Count"
          type="text"
          value={wordCount}
          onChange={(e) => setWordCount(e.target.value)}
          fullWidth
        />
        <TextField
          label="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateStory}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Generate Story"}
        </Button>
        {story && (
          <>
            <Typography variant="h5" style={{ marginTop: "20px" }}>
              {story.storyTitle}
            </Typography>
            <Typography variant="body1" style={{ whiteSpace: "pre-line" }}>
              {story.storyContent}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleEnd2End}
              disabled={end2endLoading}
            >
              {end2endLoading ? <CircularProgress size={24} /> : "Run End2End"}
            </Button>
          </>
        )}
        {finalStory && (
          <>
            <Button
              variant="contained"
              color="success"
              onClick={handleSaveStory}
            >
              Save Story
            </Button>
            <Button
              variant="contained"
              color="info"
              onClick={() => setShowExperiment(true)}
            >
              Run Experiment
            </Button>
          </>
        )}
        {showExperiment && finalStory && (
          <Experiment
            mode="dynamic"
            storyData={finalStory}
            currentExpressionBank={{}}
            onCompletion={() => setShowExperiment(false)}
          />
        )}
      </Box>
    </Container>
  );
}

export default StoryGenTestbed;
