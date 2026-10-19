import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Gemini Healthcare Executive Analysis Endpoint
app.post('/api/gemini/analyze', async (req, res) => {
  try {
    const { prompt, systemContext, recordsSample } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return res.status(200).json({
        fallback: true,
        message: 'No GEMINI_API_KEY detected in environment. Returning local analytics agent synthesis.',
      });
    }

    const ai = new GoogleGenAI({ apiKey });

    const fullPrompt = `You are a Chief Healthcare Analytics Agent advising hospital C-suite executives (CEO, CMO, CNO, COO).
Context: ${systemContext || 'Executive Hospital Feedback Analysis'}
Dataset Summary: ${JSON.stringify(recordsSample || [])}

User Executive Request:
${prompt}

Respond in a clear, authoritative, executive healthcare format with specific data-backed recommendations, risk mitigations, and strategic actions. Keep formatting professional and actionable.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: fullPrompt,
    });

    return res.json({
      success: true,
      analysis: response.text,
    });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    return res.status(500).json({
      error: 'Failed to process AI analysis',
      details: error?.message || 'Unknown error',
    });
  }
});

async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Healthcare Analytics Agent running at http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
