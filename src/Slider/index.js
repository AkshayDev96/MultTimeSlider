import React, { useEffect } from 'react'
import './slider.css'

const Index = () => {

  const [slideValue,setSlideValue] = React.useState({
    rangeRight:1,
    rangeLeft:0
  })
  const [dynamicTack,setDynamicTack] = React.useState({
    marginLeft:10,
    width:10
  })

  useEffect(()=>{
    console.log("slideValue",slideValue)
  },[slideValue])

  const handleSlider = (e)=>{
    if([e.target.name]=='rangeRight'){
       if(parseInt(e.target.value)>parseInt(slideValue?.rangeLeft)){
        setSlideValue((s)=>({...s,[e.target.name]:e.target.value}))
        setDynamicTack((s)=>({
          ...s,width:`${parseInt(e.target.value)}%`
        }))
       }
    }else{
      if(parseInt(e.target.value)<parseInt(slideValue?.rangeRight)){
        setSlideValue((s)=>({...s,[e.target.name]:e.target.value}))
        setDynamicTack((s)=>({
          ...s,marginLeft:parseInt(e.target.value)+4,width:`${parseInt(dynamicTack.width)-parseInt(e.target.value)}%`
        }))
       }
    }
    
  }

  return (
    <div>
      <div className="slidecontainer">
        <input type="range" min="0" value={slideValue?.rangeRight} max="100" onChange={handleSlider} className="slider" name="rangeRight" />
        <input type="range" min="0" max="100" value={slideValue?.rangeLeft} onChange={handleSlider} className="slider" name="rangeLeft" />
        <div className="bg-track">
            <div className="range-btw" style={dynamicTack}></div>
        </div>
      </div>
    </div>
  )
}

export default Index