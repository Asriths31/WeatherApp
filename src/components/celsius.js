import React from "react"
import './App.css'
function Temperatue(props){
     
    const[data,Setdata]=React.useState()
    const[date,setDate]=React.useState("sun jan 1 2000")

    let temp_in_cel,min_temp_cel,max_temp_cel,humidity,wind_speed,wind_direction,wea_des,icon
    React.useEffect(()=>{
        let apikey="1333d8b525feeb9eb98c5b4c51a88bb5"
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${props.cityname}&appid=${apikey}&units=metric`)
        .then(response=>response.json())
        .then(data=>{
         Setdata(data)
         const d=(new Date((data.dt+data.timezone)*1000)).toUTCString()

         console.log(data)
         setDate(d.substring(0,16))
         console.log(d.substring(17,22))
         props.setTime(d.substring(17,22))
         
      }
        )
        
    },[props.count])
    try {if(data!=undefined){
         temp_in_cel=data.main.temp
        min_temp_cel=data.main.temp_min
        max_temp_cel=data.main.temp_max
        humidity=data.main.humidity
        wind_speed=data.wind.speed
        wind_direction=data.wind.deg
        wea_des=data.weather[0].description
        icon=data.weather[0].icon
     }}
     catch(error){
        
     }     
     const img=`http://openweathermap.org/img/wn/${icon}.png`
    
     return(
        <>
        <div className="hero">
        <div className="logo">
            <img src={img} alt="weather image"></img>
            </div>           
             <h2>{temp_in_cel}°C</h2> 
            <h4>{wea_des}</h4>  
            <h2 className="heroname">{props.name}</h2>
            <h4>{date}</h4>
         </div>
    <div className="char"> 
        <div>
        <h3>Min Temperature: <span>{min_temp_cel}°C</span></h3>
        </div>
        <div>
        <h3>Max Temperature:<span>{max_temp_cel}°C</span></h3>
        </div>
        <div>
        <h3>Humidity:<span>{humidity}g/Kg</span></h3>
        </div>
        <div>
        <h3>Wind Speed:<span>{wind_speed}m/s</span></h3>
        </div>
        <div>
        <h3>Wind direction:<span>{wind_direction}°</span></h3>
        </div>
     </div>
        </>
     )
} 
export default Temperatue