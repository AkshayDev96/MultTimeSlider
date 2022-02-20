import React, { useEffect, useState } from 'react'
import { Slider, Rail, Handles, Tracks, Ticks } from "react-compound-slider";
import { Handle, Track, Tick } from "./components"; // example render components - source below

const sliderStyle = {
    position: "relative",
    width: "100%",
    marginTop: 100
  };
  
  const railStyle = {
    position: "absolute",
    width: "100%",
    height: 8,
    borderRadius: 4,
    cursor: "pointer",
    backgroundColor: "rgb(100,100,100)"
  };

  function splitArrayIntoChunksOfLen(arr, len) {
    var chunks = [], i = 0, n = arr.length;
    while (i < n) {
      chunks.push(arr.slice(i, i += len));
    }
    return chunks;
  }

const RangeSlider = () => {
    const domain = [0, 24];

    const [values,setValues] = useState([8, 12,14,16])

    const checkValue = (a,b)=>{
        let f = false
        const twoPairs = splitArrayIntoChunksOfLen(values,2)
        twoPairs.forEach((v,i)=>{
            if(a===v[0] && b===v[1]){
              f = true
            }
        })
        return f
      }

    useEffect(()=>{

    },[])

  return (
     <div style={{ margin: "10%", height: 120, width: "80%" }}>
        <Slider
          mode={2}
          step={1}
          domain={domain}
          rootStyle={sliderStyle}
          onUpdate={this.onUpdate}
          onChange={(e)=>console.log("change",e)}
          values={values}
        >
          <Rail>
            {({ getRailProps }) => (
              <div style={railStyle} {...getRailProps()} />
            )}
          </Rail>
          <Handles>
            {({ handles, getHandleProps }) => (
              <div className="slider-handles">
                {handles.map((handle) => (
                  <Handle
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks left={false} right={false}>
            {({ tracks, getTrackProps }) => {
              console.log("tracks",tracks)
              return (
              <div className="">
                {tracks.map(({ id, source, target },i) => {
                  console.log("index",i)
                  return (
                    checkValue(source.value,target.value)?<Track
                    key={id}
                    source={source}
                    target={target}
                    getTrackProps={getTrackProps}
                  />:null
                )
                })}
              </div>
            )
            }}
          </Tracks>
          <Ticks count={10}>
            {({ ticks }) => (
              <div className="slider-ticks">
                {ticks.map((tick) => (
                  <Tick key={tick.id} tick={tick} count={ticks.length} />
                ))}
              </div>
            )}
          </Ticks>
        </Slider>
      </div>
  )
}

export default RangeSlider