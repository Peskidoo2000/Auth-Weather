

import HttpClient from './HttpClient';

const appid = "e6edede5d3e8c303e31beba759114df1";

const getWeather = async (q) => {
  try {
   const response = await HttpClient.get("/weather", {
      params: {
        q:q,
                appid:appid,
                unit:"metrics"      }
    });
    return response.data;
  }
  
        
    
  
  
  
  
  
  catch (error) {
    console.error("Failed to fetch weather data", error);
    throw error;
  }
};

export default getWeather;


