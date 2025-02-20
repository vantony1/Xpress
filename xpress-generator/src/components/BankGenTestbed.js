import React, { useState, useEffect } from "react";
import { bankGen } from "./StoryGenerator";
import axios from "axios";
import {
  Button,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  Container,
  Box,
} from "@mui/material";

function BankGenTestbed() {
  const [generatedBank, setGeneratedBank] = useState(null);
  const [bankList, setBankList] = useState([]);
  const [selectedBank, setSelectedBank] = useState(null);

  useEffect(() => {
    loadBankList();
  }, []);

  const handleGenerateBank = async () => {
    try {
      const bank = await bankGen();
      setGeneratedBank(bank);
      await saveBank(bank);
      loadBankList();
    } catch (error) {
      console.error("Error generating bank:", error);
    }
  };

  const saveBank = async (bank) => {
    try {
      const bankName = `emotion_bank_${Date.now()}`;
      await axios.post("http://localhost:3002/api/saveBank", {
        bankName,
        bank,
      });
      console.log("Bank saved successfully");
    } catch (error) {
      console.error("Error saving bank:", error);
    }
  };

  const loadBankList = async () => {
    try {
      const response = await axios.get("http://localhost:3002/api/loadBank");
      setBankList(response.data);
    } catch (error) {
      console.error("Error loading bank list:", error);
    }
  };

  const loadBank = async (bankName) => {
    try {
      const response = await axios.get(
        `http://localhost:3002/api/loadBank/${bankName}`
      );
      setGeneratedBank(response.data);
      setSelectedBank(bankName);
      console.log("Bank loaded successfully");
    } catch (error) {
      console.error("Error loading bank:", error);
    }
  };

  const handleEmotionClick = async (emotion, intensity) => {
    if (!generatedBank || !generatedBank[emotion]) return;

    const program = generatedBank[emotion][intensity];
    try {
      await axios.post("http://localhost:3001/exec-func", { program });
      console.log(`Executed ${emotion} with ${intensity} intensity`);
    } catch (error) {
      console.error("Error executing emotion:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box textAlign="center" mt={4}>
        <Typography variant="h4" gutterBottom>
          Generate and Test Emotion Bank
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateBank}
        >
          Generate Bank
        </Button>
      </Box>
      <Box mt={4}>
        <Typography variant="h5">Bank Library</Typography>
        <List>
          {bankList.map((bankName) => (
            <ListItem key={bankName}>
              <Button variant="outlined" onClick={() => loadBank(bankName)}>
                {bankName}
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
      {generatedBank && (
        <Box mt={4}>
          <Typography variant="h5">Emotion Controls</Typography>
          {Object.keys(generatedBank).map((emotion) => (
            <Card key={emotion} sx={{ mt: 2, p: 2 }}>
              <CardContent>
                <Typography variant="h6">{emotion}</Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEmotionClick(emotion, "high_intensity")}
                  sx={{ mr: 1 }}
                >
                  High Intensity
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleEmotionClick(emotion, "low_intensity")}
                >
                  Low Intensity
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}

export default BankGenTestbed;
