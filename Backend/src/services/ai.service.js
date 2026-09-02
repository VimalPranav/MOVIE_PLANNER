import { GoogleGenAI, Type } from "@google/genai";

const genai = new GoogleGenAI({
    apiKey: process.env.GENAI_API_KEY,
});

const genres = [
  { id: "28", name: "Action" },
  { id: "12", name: "Adventure" },
  { id: "16", name: "Animation" },
  { id: "35", name: "Comedy" },
  { id: "80", name: "Crime" },
  { id: "99", name: "Documentary" },
  { id: "18", name: "Drama" },
  { id: "10751", name: "Family" },
  { id: "14", name: "Fantasy" },
  { id: "36", name: "History" },
  { id: "27", name: "Horror" },
  { id: "10402", name: "Music" },
  { id: "9648", name: "Mystery" },
  { id: "10749", name: "Romance" },
  { id: "878", name: "Science Fiction" },
  { id: "53", name: "Thriller" },
  { id: "10752", name: "War" },
  { id: "37", name: "Western" },
];

export const parseMoviePrompt = async (prompt) => {
    const response = await genai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      systemInstruction: `
You are a movie search filter parser.

Convert the user's natural language movie request
into structured search filters.

Available TMDB genre IDs:

${JSON.stringify(genres)}

Rules:

1. Return only information explicitly requested by the user.
2. If the user specifies a genre, return its TMDB genre ID as an integer.
3. If the user specifies a minimum rating such as "3+", return minRating.
4. If the user specifies a maximum rating, return maxRating.
5. If no genre is specified, genre must be null.
6. If no rating is specified, minRating and maxRating must be null.
7. Do not recommend movies yourself.
8. Do not invent filters.
`,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          genre: { type: Type.INTEGER, nullable: true },
          minRating: { type: Type.NUMBER, nullable: true },
          maxRating: { type: Type.NUMBER, nullable: true },
          minYear: { type: Type.INTEGER, nullable: true },
          maxYear: { type: Type.INTEGER, nullable: true },
        },
        required: ["genre", "minRating", "maxRating"],
      },
    },
  });
    return JSON.parse(response.text);
};