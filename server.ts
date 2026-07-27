import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import Groq from "groq-sdk";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "20mb" }));

// Initialize Groq client
function getAiClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new Groq({ apiKey });
}

// API Routes
app.post("/api/analyze-room", async (req, res) => {
  try {
    const { roomType = "Living Room", style = "Modern", budget = "Medium", imageBase64 } = req.body;

    const ai = getAiClient();
    if (!ai) {
      // Fallback response if no API key
      return res.json({
        spatialOverview: `Our AI has identified a spacious 32m² ${style.toLowerCase()} ${roomType.toLowerCase()} with excellent natural light orientation.`,
        designScore: 8.4,
        scoreLabel: "Optimal",
        percentileRank: "top 15%",
        styleMatch: `88% ${style}`,
        toneMap: "Cool Warm",
        wallColour: { name: "Oyster White", hex: "#E5E7EB", description: "The current shade reflects 72% of natural light." },
        lightingAnalysis: { kelvin: "3200K (Warm)", description: "Exposure is optimal in the NW corner." },
        furnitureAssets: [`Mid-Century ${roomType} Sofa`, `Oak Coffee Table`, "Jute Rug"],
        colourPalette: [
          { name: "Midnight Slate", role: "Accent", hex: "#2D3142" },
          { name: "Steel Blue", role: "Secondary", hex: "#4F5D75" },
          { name: "Cool Grey", role: "Transition", hex: "#BFC0C0" },
          { name: "Pure Alpine", role: "Primary", hex: "#FFFFFF" },
          { name: "Muted Ochre", role: "Pop", hex: "#EF8354" }
        ],
        furnitureMatches: [
          { title: "Sørensen Armchair", subtitle: "Matches Sofa Materiality", price: "$849.00", image: "https://via.placeholder.com/150" }
        ],
        decorationGuide: [
          { title: "Organic Vases", subtitle: "Texture Harmony", image: "https://via.placeholder.com/150" }
        ],
        budgetRange: { min: "$1,200", max: "$2,450", tier: budget },
        tips: ["Use sheer curtains.", "Introduce vertical greenery.", "Lower coffee table height."]
      });
    }

    const systemInstruction = `You are Lumina AI, an expert interior design and spatial analysis AI engine. You MUST respond ONLY with a valid JSON object. Do not include markdown formatting or extra text. Use this exact JSON schema:
    {
      "spatialOverview": "string",
      "designScore": 0,
      "scoreLabel": "string",
      "percentileRank": "string",
      "styleMatch": "string",
      "toneMap": "string",
      "wallColour": { "name": "string", "hex": "string", "description": "string" },
      "lightingAnalysis": { "kelvin": "string", "description": "string" },
      "furnitureAssets": ["string"],
      "colourPalette": [{ "name": "string", "role": "string", "hex": "string" }],
      "furnitureMatches": [{ "title": "string", "subtitle": "string", "price": "string", "image": "string" }],
      "decorationGuide": [{ "title": "string", "subtitle": "string", "image": "string" }],
      "budgetRange": { "min": "string", "max": "string", "tier": "string" },
      "tips": ["string", "string", "string"]
    }`;

    let userContent: any[] = [
      { 
        type: "text", 
        text: `Analyze this room for interior redesign. Room Type: ${roomType}, Target Style: ${style}, Budget: ${budget}. Provide all details according to the JSON schema requested.` 
      }
    ];

    if (imageBase64) {
      // Ensure correct formatting for Groq Vision
      const base64Data = imageBase64.includes("data:image") ? imageBase64 : `data:image/jpeg;base64,${imageBase64}`;
      userContent.push({
        type: "image_url",
        image_url: { url: base64Data }
      });
    }

    const chatCompletion = await ai.chat.completions.create({
      model: imageBase64 ? "llama-3.2-11b-vision-preview" : "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: systemInstruction },
        { role: "user", content: userContent }
      ],
      response_format: { type: "json_object" }
    });

    const responseText = chatCompletion.choices[0]?.message?.content || "{}";
    const parsedData = JSON.parse(responseText);
    
    // Fallbacks to ensure app doesn't break if AI misses an image
    if (!parsedData.furnitureMatches || parsedData.furnitureMatches.length === 0) {
      parsedData.furnitureMatches = [{ title: "Sørensen Armchair", subtitle: "Matches Sofa", price: "$849.00", image: "https://via.placeholder.com/150" }];
    }
    if (!parsedData.decorationGuide || parsedData.decorationGuide.length === 0) {
      parsedData.decorationGuide = [{ title: "Organic Vases", subtitle: "Texture Harmony", image: "https://via.placeholder.com/150" }];
    }

    res.json(parsedData);
  } catch (error: any) {
    console.error("Analysis Error:", error);
    res.status(500).json({ error: error.message || "Failed to analyze room design" });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;
    const ai = getAiClient();

    if (!ai) {
      return res.json({
        reply: "For North-facing rooms, you want to lean into warm undertones. Try these three things: Use 'Warm White', add layered lighting, and use mirrors.",
        suggestedImage: "https://via.placeholder.com/300"
      });
    }

    const lastMessage = messages[messages.length - 1]?.text || "Hello";

    const chatCompletion = await ai.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are Lumina AI Interior Design Assistant. Provide warm, concise, professional interior design advice. Suggest specific color codes, lighting fixtures, and spatial layouts." },
        { role: "user", content: lastMessage }
      ]
    });

    res.json({
      reply: chatCompletion.choices[0]?.message?.content || "I'd be glad to help you re-imagine your room! Tell me more about your space.",
      suggestedImage: "https://via.placeholder.com/300"
    });
  } catch (error: any) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate AI response" });
  }
});

// Vite server integration
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Lumina Design server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
