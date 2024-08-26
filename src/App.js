import React, {useState, useEffect} from "react";
import getWeather from "./getWeather";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import AcUnitIcon from '@mui/icons-material/AcUnit';


const App = () =>{
const [city, setCity] = useState("");
const [report, setReport] = useState(null);
const [error, setError] = useState("");
const [more, setMore] = useState(false);
const [close, setClose]= useState(false);

const weatherReport = async (e) => {
  e.preventDefault();

  if (city.length === 0){
    setError("Add a Valid Location or City");
    return;
  } 

  try{
    const response = await getWeather(city);
    setReport(response)
    setError("")
  } 
  catch (err){
    setReport("")
    setError("City not found or Internet Connection Error")
    console.log(err)
  } 
}

useEffect(() => {
  if (close && report) {
    setReport(null);
    setClose(false); 
  }
}, [close, report]);

function weatherAdvice(){
if(report.weather[0].main === "Clear"){
return "The weather wil be most likely clear today. You can put your UMbrella at home."
}
else if(report.weather[0].main === "Clouds"){
  return "It looks like it's gonna be cloudy today!!! Most likely to rain"
}
else if(report.weather[0].main === "Rain"){
  return "Your Umbrella should be with you today. It looks like it gonna be a rainy day"
}else{
  return "Enjoy today's weather!!!"
}
}

function moreWeatherReport(){
  if(more && report && report.main){
    return (<div>
     <p className="weather-temp">Temperture: {report.main.temp}&deg;C</p>
     <p className="weather-pre">Pressue: {report.main.pressure}Pa</p>
     <p className="weather-hum">Humidity: {report.main.humidity}</p>
     <p className="weather-sea">Sea-level: {report.main.sea_level}</p>
     <p className="weather-grn">Ground-level: {report.main.grnd_level}</p>
    </div>)
   }
}
const today= new Date ();

const everyYear = today.getFullYear();


return (<div>
  <aside className="aside">
    <p className="subAside"> GET  WEATHER  DETAILS WITH EASE</p>
    <ThunderstormIcon className="weatherIcon" />
    <div className="asider">
    <p className="sub-aside1"> Use our Powerful</p>
    <AcUnitIcon className="ai-icon"/>
    <br/>
    <span className="sub-aside2">Weather AI</span>
    </div>
    </aside>
  <header className="header">
    <span className="sub-header1"> AUTH </span><br/>
    <span className="sub-header2">WEATHER </span>
    </header>
    
<main className="main">
<Box className="box-form"
      component="form"
      
     autoComplete="on"
  >
   
    <TextField
      onChange={(e) => setCity(e.target.value)} value={city}
      required
      id="outlined-required"
      label= "Enter Your City"
    />
   <button type="submit" className="weather-button" onClick={weatherReport}> Get Weather</button>
  </Box>

  
  {report &&  (<div>
    <Box sx={{ minWidth: 275 }}>

  <Card variant="outlined">
  <React.Fragment>
    <CardContent className="card-content">
    <p className="city-name">NAME OF CITY: {report.name}</p>
    <p className="city-desc">DESCRIPTION: {report.weather[0].description}</p>
    <p className="weather-advice"> WEATHER ADVICE: </p> <p className="weather-opt"> {weatherAdvice()}</p>
    </CardContent>
    <CardActions>
    <div className="lessmore-button">
    <Button onClick={ () =>{ setMore (!more); }}>  
      { more ? "View less " : "View more "}
      </Button>

      <Button onClick={ () =>{ setClose ("true")}}>  
     close
      </Button>
      </div>
    </CardActions>
  </React.Fragment>
</Card>
   </Box>
  
    {moreWeatherReport()}
    
    </div>)}
    {error && 
     <Box sx={{ minWidth: 200 }}>
    <Card variant="outlined">
    <React.Fragment>
      <CardContent>
      <p>{error}</p>
      </CardContent>
      <CardActions>
      
      </CardActions>
    </React.Fragment>
  </Card>
     </Box>
    
    }
    
</main>

<div className="footer">
  <footer className="py-3 my-4 ">
    <div className="justify-content-center border-bottom  pb-3 mb-3 inc">
      <p className="nav-item"> &copy; {everyYear}</p>
      <p className="nav-item">Okunola_Developer all right reserved</p>
    </div>
    <p className="contact"> Contact &#64;</p>
    <p className="text-center text-body-secondary parent-folio">
      <a href="https://okunola-devportfolio.netlify.app/port.html" className="folio-link">OUR PORTFOLIO</a>
      </p>
  </footer>
</div>
</div>)
}

export default App;