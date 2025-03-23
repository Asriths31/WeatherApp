

function ForecastinFar(props){
    const img=`http://openweathermap.org/img/wn/${props.icon}.png`
    const weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    const d=new Date(props.date)
    const only_date=d.toString().substr(4,11)
    let day=weekday[d.getDay()]

   function conversion(val){
    return (val*9/5)+32
   }
   const temperature=conversion(props.temp).toFixed(2)
  return(
    <div className="block">
    <div>
    <h2 className="day">{day}</h2>
    <h4 className="date">{only_date}</h4>
    </div>
    <div className="display">
    <img src={img}></img>   
    <h2>{temperature}°F</h2>
    

    <h4>{props.weather}</h4>
    </div>
    
   </div>
    
  )
}
export default ForecastinFar