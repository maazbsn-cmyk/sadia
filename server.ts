import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "20mb" }));

// Initialize Google GenAI lazy / safe
function getAiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
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
        wallColour: {
          name: "Oyster White",
          hex: "#E5E7EB",
          description: "The current shade reflects 72% of natural light, maximizing spatial perception but lacking focal warmth."
        },
        lightingAnalysis: {
          kelvin: "3200K (Warm)",
          description: "Exposure is optimal in the NW corner. Recommend adding a floor lamp to the SE corner to balance shadows."
        },
        furnitureAssets: [`Mid-Century ${roomType} Sofa`, `Oak Coffee Table`, "Jute Rug"],
        colourPalette: [
          { name: "Midnight Slate", role: "Accent / Trim", hex: "#2D3142" },
          { name: "Steel Blue", role: "Secondary", hex: "#4F5D75" },
          { name: "Cool Grey", role: "Transition", hex: "#BFC0C0" },
          { name: "Pure Alpine", role: "Primary Wall", hex: "#FFFFFF" },
          { name: "Muted Ochre", role: "Pop Accent", hex: "#EF8354" }
        ],
        furnitureMatches: [
          {
            title: "Sørensen Armchair",
            subtitle: "Matches Sofa Materiality",
            price: "$849.00",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcaOcakxtUovcugqoHXDExl65J0IXq6Po9-rgjCrYxTN4HnEoBzfc3H2NklOWiP_n2BkAObAJ1XhPwqXlzRw4Tzgr9rvWcPBen4HU9NMUSJvllFm9Kvj3fmdgPx3UdfRWmpFIBRtD7WtTXTA-u4nvlshQBF2eTkfeV-OG1os_ht-v6c4P-7lxiibKE-Oc4zAOP8AAgzOt_JERa0eyXG0mi29AdGHJCrAdqFewFDpT-EKbZyNzmni389H2vHNCIUY8gC61JQNB_HG3T"
          },
          {
            title: "Eclipse Floor Lamp",
            subtitle: "Ideal for Corner Lighting",
            price: "$320.00",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWV3McZvDFk1ibblcKcjbVsBcgY5GlFUp_9MAidOzD-HteEG4JNQkGCvPOxyenjhBCaJjsstCxUgLUUiyFZMs9iyRM94HOUGEpCCm0YT6FBgl__LVOzxwCUTMyudhkMf1Svn98MYEf5FgNQhvLXQT3QcN7KA3j_7ampSHoILAr9Tl7Br6LCBzRW-ggq9AIZr8-f0KdKG6M-5nluW8Mcrw1INpePR3pkJDAJQG1zJvsAjW2Mr3AheV8v8-3UWkR1RHUbrSKY5SPKTSx"
          }
        ],
        decorationGuide: [
          {
            title: "Organic Vases",
            subtitle: "Texture Harmony",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQULADc9H1sVkk7gLSXOSDifcMZQkhKabt-Afu925SS1weN4m8OyFTMawm46DeF6CTIO-IzFOaMl3NaNbACy3bTpuJhKpYjnaErE_ku0RvilxRXzEYicla2EqIHrLTiqUHjP9_Nh9k9UsHBsfnC7KXsEY_6ofd2uvxwxDoWEJhdu03blz3h-l4TqjtcV64kUCgMWtx5vsvf96ThF3Tlgcqv_3htoweFRw95Pw2GuA-EustiFMZrXZMXCjyAwjY8TYJBBin24e0HJee"
          },
          {
            title: "Abstract Canvas",
            subtitle: "Focal Point",
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvWO4ocqzZzRfFmAa9bub-W7fI-MROJXWMzyqEh7M8Qyqgg1d_uK1F0Saj1EAIbrRCUPe8VEBNdsi1JmzuQj53DXWQzqCPvGPJqacjVC0jmsWn1kb-EgVPsqlmHW3afDY3E2r8Dxjwz0IVU_wP6GFUCqwnCOpfKVpSsYtTlruEj1PSrVCT32icnDbI0pFiEqEbUvUkiNgNatMDUwqc-qoQYHPSmz4IPPfGQ0XQ3x7GID3GSIwsKazsC4y5Slw_rNksutNK6dbq7p-o"
          }
        ],
        budgetRange: {
          min: "$1,200",
          max: "$2,450",
          tier: budget
        },
        tips: [
          "Use sheer curtains to soften harsh morning light.",
          "Introduce vertical greenery like a Fiddle Leaf Fig to lead the eye upwards.",
          "The coffee table should be 2-4 inches lower than the sofa seat height."
        ]
      });
    }

    const contentsParts: any[] = [];
    if (imageBase64) {
      const base64Data = imageBase64.replace(/^data:image\/\w+;base64,/, "");
      contentsParts.push({
        inlineData: {
          data: base64Data,
          mimeType: "image/jpeg"
        }
      });
    }

    contentsParts.push({
      text: `Analyze this room for interior redesign. Room Type: ${roomType}, Target Style: ${style}, Budget: ${budget}. Provide a complete spatial overview, design score out of 10, wall color detection, lighting analysis, furniture detected, a 5-color palette recommendation, matching furniture recommendations, decoration items, budget range estimation, and 3 actionable design tips.`
    });

    const promptResponse = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: { parts: contentsParts },
      config: {
        systemInstruction: "You are Lumina AI, an expert interior design and spatial analysis AI engine.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            spatialOverview: { type: Type.STRING },
            designScore: { type: Type.NUMBER },
            scoreLabel: { type: Type.STRING },
            percentileRank: { type: Type.STRING },
            styleMatch: { type: Type.STRING },
            toneMap: { type: Type.STRING },
            wallColour: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                hex: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            },
            lightingAnalysis: {
              type: Type.OBJECT,
              properties: {
                kelvin: { type: Type.STRING },
                description: { type: Type.STRING }
              }
            },
            furnitureAssets: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            colourPalette: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  role: { type: Type.STRING },
                  hex: { type: Type.STRING }
                }
              }
            },
            furnitureMatches: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  subtitle: { type: Type.STRING },
                  price: { type: Type.STRING },
                  image: { type: Type.STRING }
                }
              }
            },
            decorationGuide: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  subtitle: { type: Type.STRING },
                  image: { type: Type.STRING }
                }
              }
            },
            budgetRange: {
              type: Type.OBJECT,
              properties: {
                min: { type: Type.STRING },
                max: { type: Type.STRING },
                tier: { type: Type.STRING }
              }
            },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          }
        }
      }
    });

    const parsedData = JSON.parse(promptResponse.text || "{}");
    
    // Provide default fallback values if any missing
    if (!parsedData.furnitureMatches || parsedData.furnitureMatches.length === 0) {
      parsedData.furnitureMatches = [
        {
          title: "Sørensen Armchair",
          subtitle: "Matches Sofa Materiality",
          price: "$849.00",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCcaOcakxtUovcugqoHXDExl65J0IXq6Po9-rgjCrYxTN4HnEoBzfc3H2NklOWiP_n2BkAObAJ1XhPwqXlzRw4Tzgr9rvWcPBen4HU9NMUSJvllFm9Kvj3fmdgPx3UdfRWmpFIBRtD7WtTXTA-u4nvlshQBF2eTkfeV-OG1os_ht-v6c4P-7lxiibKE-Oc4zAOP8AAgzOt_JERa0eyXG0mi29AdGHJCrAdqFewFDpT-EKbZyNzmni389H2vHNCIUY8gC61JQNB_HG3T"
        },
        {
          title: "Eclipse Floor Lamp",
          subtitle: "Ideal for Corner Lighting",
          price: "$320.00",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDWV3McZvDFk1ibblcKcjbVsBcgY5GlFUp_9MAidOzD-HteEG4JNQkGCvPOxyenjhBCaJjsstCxUgLUUiyFZMs9iyRM94HOUGEpCCm0YT6FBgl__LVOzxwCUTMyudhkMf1Svn98MYEf5FgNQhvLXQT3QcN7KA3j_7ampSHoILAr9Tl7Br6LCBzRW-ggq9AIZr8-f0KdKG6M-5nluW8Mcrw1INpePR3pkJDAJQG1zJvsAjW2Mr3AheV8v8-3UWkR1RHUbrSKY5SPKTSx"
        }
      ];
    }

    if (!parsedData.decorationGuide || parsedData.decorationGuide.length === 0) {
      parsedData.decorationGuide = [
        {
          title: "Organic Vases",
          subtitle: "Texture Harmony",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDQULADc9H1sVkk7gLSXOSDifcMZQkhKabt-Afu925SS1weN4m8OyFTMawm46DeF6CTIO-IzFOaMl3NaNbACy3bTpuJhKpYjnaErE_ku0RvilxRXzEYicla2EqIHrLTiqUHjP9_Nh9k9UsHBsfnC7KXsEY_6ofd2uvxwxDoWEJhdu03blz3h-l4TqjtcV64kUCgMWtx5vsvf96ThF3Tlgcqv_3htoweFRw95Pw2GuA-EustiFMZrXZMXCjyAwjY8TYJBBin24e0HJee"
        },
        {
          title: "Abstract Canvas",
          subtitle: "Focal Point",
          image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAvWO4ocqzZzRfFmAa9bub-W7fI-MROJXWMzyqEh7M8Qyqgg1d_uK1F0Saj1EAIbrRCUPe8VEBNdsi1JmzuQj53DXWQzqCPvGPJqacjVC0jmsWn1kb-EgVPsqlmHW3afDY3E2r8Dxjwz0IVU_wP6GFUCqwnCOpfKVpSsYtTlruEj1PSrVCT32icnDbI0pFiEqEbUvUkiNgNatMDUwqc-qoQYHPSmz4IPPfGQ0XQ3x7GID3GSIwsKazsC4y5Slw_rNksutNK6dbq7p-o"
        }
      ];
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
        reply: "For North-facing rooms, you want to lean into warm undertones to counteract the cool natural light. Try these three things:\n- Use 'Warm White' or 'Terracotta' accents.\n- Add layered lighting (floor lamps + sconces).\n- Mirror placement to bounce what light you do have.",
        suggestedImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsKYfW7yyadQF8jcA9RIj6t2FYwajiOg6y66gn5AusdSR9L3aOtdMLCm9-JUyPShd4ygH_cAeFaA8s5UZJYAS1-dQ5POm1xyuSkElYgrhMd-p9R0d3S_k8SxS31sNSD42us_E3cnAGA12852-GK-HwgokeXoxnbEMY_hRYoefN6WVyyqU6njkmYHAXvTHHlV5t-aITyXba9azIHQPJmImiVoZAWIBHt8IPaVFHMcG75OUvI8gwYVSFDtKzzfajHy4O8CxARlKE0lzK"
      });
    }

    const lastMessage = messages[messages.length - 1]?.text || "Hello";

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: lastMessage,
      config: {
        systemInstruction: "You are Lumina AI Interior Design Assistant. Provide warm, concise, professional interior design advice. Suggest specific color codes, lighting fixtures, and spatial layouts."
      }
    });

    res.json({
      reply: response.text || "I'd be glad to help you re-imagine your room! Tell me more about your space and preferred style.",
      suggestedImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAsKYfW7yyadQF8jcA9RIj6t2FYwajiOg6y66gn5AusdSR9L3aOtdMLCm9-JUyPShd4ygH_cAeFaA8s5UZJYAS1-dQ5POm1xyuSkElYgrhMd-p9R0d3S_k8SxS31sNSD42us_E3cnAGA12852-GK-HwgokeXoxnbEMY_hRYoefN6WVyyqU6njkmYHAXvTHHlV5t-aITyXba9azIHQPJmImiVoZAWIBHt8IPaVFHMcG75OUvI8gwYVSFDtKzzfajHy4O8CxARlKE0lzK"
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
