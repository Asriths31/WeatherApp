import React, { useEffect } from 'react'
import { ReactDOM } from 'react'
import  './components/App.css'
import Temperature from './components/celsius'
import Fahrenheit from './components/fahrenheit'
import ForecastinCel from './components/forecastincel'
import ForecastinFar from './components/forecastinfarhe'


function App(){
  const[cityname,setCityname]=React.useState("london")
  const[count,setCount]=React.useState(0)
  const[data,setData]=React.useState([])
  const[toggle,setToggle]=React.useState(true)
  const[name,setName]=React.useState("London")
  const[renderforecast,setRenderforecast]=React.useState(0)
  
 
  useEffect(()=>{
    let apikey="1333d8b525feeb9eb98c5b4c51a88bb5"
   try{ fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&&appid=${apikey}&units=metric&cnt=40`)
    .then(response=>response.json())
    .then(data=>{
      if(data.cod==="404"){
      alert("City Not Found")
      }
     else{
      if(data.cod==="400"){
        alert("Nothing to Geocode")
      }
      else{
        setData(data.list)
        setName(data.city.name)
         setRenderforecast(1)
     }
     }
      
    })
    .catch()}
    catch(error){
 }
  } ,[count])
  const on=require('./images/switch-on.png')
  const off=require('./images/switch-off.png')
  const sub_btn=require('./images/submit-btn.png')
  
   return(
    <>
    <h1 className='heading'>WEATHER FORECAST</h1>
    <div className='container'>
       <div className='curr-wea'>
        <div className='input'>
          
        <input className='city-name'  onChange={(e)=>setCityname(e.target.value)}  placeholder='Enter The City Name'></input>
        <button className='submit-btn' onClick={()=>{setCount(e=>e+1) }} ><img src={sub_btn}></img></button>
         <div className='switch' onClick={(e)=>setToggle(!toggle)}>
           {toggle?<div>
                    <img src={on} alt='toggle on'></img>
                    <span className='left'>°C</span>
                    </div> :
           <div>
           <img src={off} alt='toggle on'></img>
           <span className='right'>°F</span>
           </div>
           }
         </div>
         </div>
        <div>
          {toggle?<Temperature cityname={cityname} count={count} name={name}/>:<Fahrenheit cityname={cityname} count={count} name={name} />}
         </div>
         </div>
        {toggle?
        (renderforecast? 
        <div className='forecast'>
         <ForecastinCel date={data[8].dt_txt} temp={data[8].main.feels_like} weather={data[8].weather[0].description} icon={data[8].weather[0].icon}/>
         <ForecastinCel date={data[16].dt_txt} temp={data[16].main.feels_like} weather={data[16].weather[0].description} icon={data[16].weather[0].icon}/>
          <ForecastinCel date={data[24].dt_txt} temp={data[24].main.feels_like} weather={data[24].weather[0].description} icon={data[24].weather[0].icon}/>
          <ForecastinCel date={data[32].dt_txt} temp={data[32].main.feels_like} weather={data[32].weather[0].description} icon={data[32].weather[0].icon}/>
          <ForecastinCel date={data[39].dt_txt} temp={data[39].main.feels_like} weather={data[39].weather[0].description} icon={data[39].weather[0].icon}/>
         </div>:
         <span> </span>):renderforecast?
         (<div className='forecast'>
         <ForecastinFar date={data[8].dt_txt} temp={data[8].main.feels_like} weather={data[8].weather[0].description} icon={data[8].weather[0].icon}/>
         <ForecastinFar date={data[16].dt_txt} temp={data[16].main.feels_like} weather={data[16].weather[0].description} icon={data[16].weather[0].icon}/>
          <ForecastinFar date={data[24].dt_txt} temp={data[24].main.feels_like} weather={data[24].weather[0].description} icon={data[24].weather[0].icon}/>
          <ForecastinFar date={data[32].dt_txt} temp={data[32].main.feels_like} weather={data[32].weather[0].description} icon={data[32].weather[0].icon}/>
          <ForecastinFar date={data[39].dt_txt} temp={data[39].main.feels_like} weather={data[39].weather[0].description} icon={data[39].weather[0].icon}/>
         </div>):<span></span>
          }
          </div>
          </>
  )
}
export default App