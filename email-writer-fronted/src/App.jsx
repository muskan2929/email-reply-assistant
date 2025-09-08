import {
  Box,
  Container,
  TextField,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!emailContent) return;
    setLoading(true);
    setGeneratedReply('');
    try {
      const response = await axios.post(
        'http://localhost:8080/api/email/generate',
        { emailContent, tone },
        { headers: { 'Content-Type': 'application/json' } }
      );
      setGeneratedReply(
        typeof response.data === 'string'
          ? response.data
          : JSON.stringify(response.data)
      );
    } catch (error) {
      console.error('Error generating reply:', error);
      setGeneratedReply('Failed to generate reply. Check console for details.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!generatedReply) return;
    navigator.clipboard.writeText(generatedReply);
  };

  return (
    <div className="app-container">
      {/* Hero Section */}
      <Box className="hero-section">
        <Typography variant="h3" className="hero-title">
          Generate Smart Email Replies with AI
        </Typography>
        <Typography variant="subtitle1" className="hero-subtitle">
          Powered by Advanced AI – Professional, Friendly & Instant
        </Typography>
      </Box>

      {/* Main Card */}
      <Container maxWidth="lg" className="app-card">
        <Typography variant="h4" className="title">
          Try It Now 🚀
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          label="Original Email Content"
          value={emailContent}
          onChange={(e) => setEmailContent(e.target.value)}
          className="input-field"
        />

        <FormControl fullWidth className="input-field">
          <InputLabel>Tone (Optional)</InputLabel>
          <Select
            value={tone}
            label="Tone (Optional)"
            onChange={(e) => setTone(e.target.value)}
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="professional">Professional</MenuItem>
            <MenuItem value="casual">Casual</MenuItem>
            <MenuItem value="friendly">Friendly</MenuItem>
          </Select>
        </FormControl>

        <Button
          variant="contained"
          className="generate-btn"
          onClick={handleSubmit}
          disabled={!emailContent || loading}
        >
          {loading ? <CircularProgress size={24} /> : 'Generate Reply'}
        </Button>

        <TextField
          fullWidth
          multiline
          rows={6}
          variant="outlined"
          value={generatedReply}
          InputProps={{ readOnly: true }}
          className="output-field"
        />

        <Button
          variant="outlined"
          className="copy-btn"
          onClick={handleCopy}
          disabled={!generatedReply}
        >
          Copy to Clipboard
        </Button>
      </Container>

      {/* Footer */}
      <footer className="footer">
        <p>© {new Date().getFullYear()} AI Email Generator | Built with 💙</p>
      </footer>
    </div>
  );
}

export default App;


      