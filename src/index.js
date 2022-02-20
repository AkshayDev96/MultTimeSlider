import React, { Component } from "react";
import { render } from "react-dom";
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

const domain = [0, 24];
// const defaultValues = [8, 12,14,16];



class App extends Component {

  state = {arr:[8, 12],tracks:[]}

  
checkValue = (a,b)=>{
  let f = false
  const twoPairs = splitArrayIntoChunksOfLen(this.state.arr,2)
  twoPairs.forEach((v,i)=>{
      if(a===v[0] && b===v[1]){
        f = true
      }
  })
  return f
}

 removeSlide =(removeEl)=>{
   console.log("GetTrackProps")
   const val = removeEl.value
   const twoPairs = splitArrayIntoChunksOfLen(this.state.arr,2)
    console.log("twoPairs",twoPairs)
    let newArr = twoPairs.filter((v)=>!v.includes(val)).flat()

    if(newArr.length!=0){
      this.setState((s)=>({...s,arr:newArr}))
    }
 }

 addSlide=(addEl)=>{
  const val = addEl.value
  console.log("Add",val)
   let nextLeft =0
   let nextRight =0
  const twoPairs = splitArrayIntoChunksOfLen(this.state.arr,2)
  console.log("twoPairs",twoPairs)
  twoPairs.forEach((v)=>{
    if(v[0]===val){
      nextRight = val-1 
      nextLeft = val-2
    }else if(v[1]===val){
      nextLeft = val+1
      nextRight = val+2
    }
  })
  let newArr = twoPairs.filter((v)=>(v.includes(nextRight)||v.includes(nextLeft))).flat()
  console.log('nextLeft, nextRight',nextLeft,nextRight)
  console.log('newArr',newArr)
  if(newArr.length===0 && nextLeft > 0 && nextRight > 0 && nextLeft <= 23 && nextRight <= 24){
    let a = [...this.state.arr,nextLeft,nextRight].sort((a, b) => a - b)
    console.log("a",a)
    this.setState((s)=>({...s,arr:a}))
  }
 }

  render() {
    return (
      <div style={{ marginLeft: "10%",marginRight: "10%", height: 120, width: "80%" }}>
        <Slider
          mode={2}
          step={1}
          domain={domain}
          rootStyle={sliderStyle}
          onUpdate={(e)=>this.setState((s)=>({...s,arr:e}))}
          onChange={(e)=>this.setState((s)=>({...s,arr:e}))}
          onSlideEnd={(e)=>console.log('slideEnd',e)}
          values={this.state.arr}
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
                    addSlide={()=>this.addSlide(handle)}
                    removeSlide={()=>this.removeSlide(handle)}
                    key={handle.id}
                    handle={handle}
                    domain={domain}
                    getHandleProps={getHandleProps}
                  />
                ))}
              </div>
            )}
          </Handles>
          <Tracks onChange={(e)=>{console.log("Tracks")}} left={false} right={false}>
            {({ tracks, getTrackProps }) => {
              console.log("tracks",tracks)
              return (
              <div className="">
                {tracks.map(({ id, source, target },i) => {
                  console.log("index",i)
                  return (
                    this.checkValue(source.value,target.value)?<Track
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
          <Ticks count={24}>
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
    );
  }
}

const Index = ()=>{
  return (
   <div>
      <App />
      <App />
   </div>
  )
}

render(<Index/>, document.getElementById("root"));
