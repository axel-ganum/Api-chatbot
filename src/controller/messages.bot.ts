import dotenv from 'dotenv';
dotenv.config();
import fetch from 'node-fetch';
type ApiResponse = {
       generated_text: string;
}


const API_URL = "https://api-inference.huggingface.co/models/bigscience/bloom-560m";




const API_KEY = process.env.FACE_APY;

export const generateResponse  = async (prompt: any) => {
       try{
       const response = await fetch(API_URL, {
              method: "POST",
              headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${API_KEY}`    
              },
              body: JSON.stringify({inputs: prompt, parameters:{max_length: 100, temperature:0.7}}),
       });

       if (!response.ok) {
              const erroraData = await response.json();
               const errorData = erroraData as { error: string };
               throw new Error(errorData.error || "Erro desconocido en la API");
        }

        const data: ApiResponse = await response.json() as ApiResponse;
        console.log("Respuesta generada:", data);
        
        return data.generated_text || "No se puede generar una respuesta.";
       }catch(error) {
       console.error("Error al generar respuesta:", error)
         return "Hubo un problema al generar la respuesta.";
       }
}
 
