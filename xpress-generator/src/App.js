import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import StoryGenTestbed from "./components/StoryGenTestbed";
import BankGenTestbed from "./components/BankGenTestbed";

function App() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleChange = (event, newIndex) => {
    setTabIndex(newIndex);
  };

  return (
    <Box sx={{ width: "100%", p: 2 }}>
      <Tabs value={tabIndex} onChange={handleChange} centered>
        <Tab label="StoryGen" />
        <Tab label="BankGen" />
      </Tabs>
      <Box sx={{ mt: 2 }}>
        {tabIndex === 0 && <StoryGenTestbed />}
        {tabIndex === 1 && <BankGenTestbed />}
      </Box>
    </Box>
  );
}

export default App;
