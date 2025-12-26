
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const generateMemoryEnhancement = async (title: string, description: string, imageBase64?: string) => {
  try {
    const prompt = `
      You are a poetic soul who helps people cherish their memories. 
      Given the following memory details:
      Title: "${title}"
      Description: "${description}"
      
      Please provide a "Memory Reflection". This should be a short, beautiful, and nostalgic paragraph (2-3 sentences) that captures the emotion of this moment. 
      If an image is provided, incorporate visual cues into the reflection.
      Response should be in Indonesian.
    `;

    const contents: any[] = [{ text: prompt }];
    
    if (imageBase64) {
      contents.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64.split(',')[1] // Remove prefix
        }
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: { parts: contents }
    });

    return response.text || "Kenangan indah yang patut diabadikan.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Momen berharga yang akan selalu diingat.";
  }
};

export const suggestCategory = async (description: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Berdasarkan deskripsi memori ini: "${description}", pilih satu kategori yang paling cocok dari daftar ini: Travel, Family, Love, Milestone, Nature, General. Berikan hanya satu kata saja sebagai jawaban.`,
    });
    return response.text.trim();
  } catch {
    return 'General';
  }
};
