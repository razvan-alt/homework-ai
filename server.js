import express from "express";
import OpenAI from "openai";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 3000);

app.use(express.json({ limit: "15mb" }));
app.use(express.static(__dirname));

app.post("/api/solve-image", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OPENAI_API_KEY is not set on the server." });
    }
    const { image, question, language, style, detail, instructions } = req.body || {};
    if (typeof image !== "string" || !/^data:image\/(png|jpe?g|webp|gif);base64,/i.test(image)) {
      return res.status(400).json({ error: "Upload a supported image (PNG, JPG, WEBP, or GIF)." });
    }
    if (image.length > 12_000_000) {
      return res.status(413).json({ error: "Image is too large. Try a smaller photo." });
    }

    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    const prompt = [
      "You are a careful school tutor. Read the exercise from the attached image.",
      "If the image is blurry or the text is ambiguous, say what you cannot read and ask for a clearer image rather than guessing.",
      "Solve the exercise accurately and explain the steps. Check the final answer.",
      `Answer language: ${language || "Română"}.`,
      `Style: ${style || "Prietenos și relaxat"}.`,
      `Explanation preference: ${detail || "Pas cu pas"}.`,
      instructions ? `Student preferences: ${instructions}` : "",
      `Student's request: ${question || "Read and solve the exercise in the image."}`
    ].filter(Boolean).join("\n");

    const result = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [{
        role: "user",
        content: [
          { type: "input_text", text: prompt },
          { type: "input_image", image_url: image, detail: "high" }
        ]
      }]
    });
    const answer = (result.output_text || "").trim();
    if (!answer) return res.status(502).json({ error: "The AI returned an empty answer. Try again." });
    res.json({ answer });
  } catch (error) {
    console.error("Image solve error:", error?.message || error);
    res.status(500).json({ error: "Image solving failed. Check the API key, account access, and server logs." });
  }
});

app.listen(port, () => {
  console.log(`Homework AI running at http://localhost:${port}`);
});
