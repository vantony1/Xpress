import React, { useState, useEffect } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import StoryPlayer from "./StoryPlayer";

function StoryLibrary() {
  const [stories, setStories] = useState([]);
  const [activeStory, setActiveStory] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadStories = async () => {
      try {
        // Fetch the list of story filenames
        const response = await fetch("http://localhost:3002/api/stories");

        if (!response.ok)
          throw new Error(`HTTP error! Status: ${response.status}`);

        const filenames = await response.json(); // Expecting an array of filenames

        // Fetch each story's JSON data using the new /api/story/:filename endpoint
        const storyPromises = filenames.map(async (filename) => {
          const storyResponse = await fetch(
            `http://localhost:3002/api/story/${filename}`
          );
          if (!storyResponse.ok) throw new Error(`Failed to load ${filename}`);

          //   const test = await storyResponse.json();

          //   console.log(test);
          return storyResponse.json();
        });

        const loadedStories = await Promise.all(storyPromises);
        setStories(loadedStories);
      } catch (error) {
        console.error("Error loading stories:", error);
      }
    };

    loadStories();
  }, []);

  const handlePlayStory = (story) => {
    setLoading(true);
    setActiveStory(story);
  };

  const handleStoryCompletion = () => {
    setLoading(false);
    setActiveStory(null);
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
      <Typography variant="h4" gutterBottom>
        Story Library
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        width="100%"
        alignItems="center"
      >
        {stories.map((story, index) => (
          <Button
            key={index}
            variant="contained"
            color="primary"
            onClick={() => handlePlayStory(story)}
            disabled={loading}
          >
            {story[0].storyTitle}
          </Button>
        ))}
      </Box>
      {activeStory && (
        <StoryPlayer
          mode="dynamic"
          storyData={activeStory}
          currentExpressionBank={{}}
          onCompletion={handleStoryCompletion}
        />
      )}
    </Container>
  );
}

export default StoryLibrary;
