import { GoogleGenAI } from "@google/genai";
import { UserProfile } from "../types";

// Initialize the Gemini client
// Note: In a real production app, this call would likely happen via a backend proxy to protect the key.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateDietAdvice = async (user: UserProfile): Promise<string> => {
  const model = "gemini-2.5-flash";
  
  const prompt = `
    Act as a professional nutritionist and fitness coach.
    My profile is:
    - Name: ${user.name}
    - Age: ${user.age}
    - Gender: ${user.gender}
    - Height: ${user.height} cm
    - Weight: ${user.weight} kg
    - Activity Level: ${user.activityLevel}

    1. Calculate my BMI and classify it (Underweight, Normal, Overweight, Obese).
    2. Estimate my Daily Calorie Maintenance (TDEE).
    3. Provide a specific, bulleted daily meal plan (Breakfast, Lunch, Dinner, Snack) tailored to my goal of maintaining a healthy lifestyle.
    4. Give 3 specific health tips based on my stats.

    Format the output in clear Markdown using headings (###) and bullet points. Keep it encouraging.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text || "Could not generate advice at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Sorry, there was an error connecting to the AI nutritionist. Please ensure your API key is valid.";
  }
};

export const generateForumResponse = async (postContent: string): Promise<string> => {
  const model = "gemini-2.5-flash";
  const prompt = `
    You are a helpful fitness community moderator. 
    A user posted this in the forum: "${postContent}"
    
    Write a short, encouraging, and helpful comment (under 50 words) in response to this post.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text || "Keep up the good work!";
  } catch (error) {
    return "Great post!";
  }
};