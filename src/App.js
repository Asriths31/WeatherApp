import React, { useEffect } from 'react'
import { ReactDOM } from 'react'
import  './components/App.css'
import Temperature from './components/celsius'
import Fahrenheit from './components/fahrenheit'
import ForecastinCel from './components/forecastincel'
import ForecastinFar from './components/forecastinfarhe'
import backgroundimage from './images/steptodown.com537107.jpg'
import backgroundimage1 from './images/e3d71a6573e3cba3516006e01f77d955.webp'
import dayimage from './images/day.jpg'
import dayimage1 from './images/white-clouds-blue-background.jpg'
function App(){
  const[cityname,setCityname]=React.useState("london")
  const[count,setCount]=React.useState(0)
  const[data,setData]=React.useState([])
  const[toggle,setToggle]=React.useState(true)
  const[name,setName]=React.useState("London")
  const[renderforecast,setRenderforecast]=React.useState(0)
  const[dimensions,setDimensions]=React.useState(window.innerWidth)
  const[time,setTime]=React.useState()
 window.addEventListener('resize',()=>{
       setDimensions(window.innerWidth)
 })
 if(dimensions<430){
  if(Date.parse("01/01/2000 18:00:00")<Date.parse(`01/01/2000 ${time}`) || Date.parse(`01/01/2000 ${time}`)<Date.parse("01/01/2000 06:00:00"))
  document.body.style.background=`url(${backgroundimage1}) no-repeat center /cover`
  else{
    document.body.style.background=`url(${dayimage}) no-repeat center /cover`

  }
 }
 else{
  if(Date.parse("01/01/2000 18:00:00")<Date.parse(`01/01/2000 ${time}`) || Date.parse(`01/01/2000 ${time}`)<Date.parse("01/01/2000 06:00:00"))
    document.body.style.background=`url(${backgroundimage}) no-repeat center /cover`
    else{
      document.body.style.background=`url(${dayimage1}) no-repeat center /cover`
  
    } }
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
        // console.log(data)
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
   <div className='head'> 
       <h1 className='heading'>WEATHER FORECAST</h1>
   </div>
    <div className='container'>
       <div className='background'></div>
       <div className='curr-wea'>
        <div className='input'>
          
        <input className='city-name'  onChange={(e)=>setCityname(e.target.value)}  placeholder='Enter The City Name' onKeyDown={(e)=>e.key==="Enter"&&setCount(prev=>prev+1)} ></input>
        <button className='submit-btn' onClick={()=>{setCount(e=>e+1)}} >
          <img src={sub_btn}></img>
        </button>
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
          {toggle?<Temperature setTime={setTime} cityname={cityname} count={count} name={name}/>:<Fahrenheit cityname={cityname} count={count} name={name} />}
         </div>
         </div>
         <div className='scroll'>
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
           {/* <div className='son'></div> */}
           

      </div>
     
          </>
  )
}
export default App