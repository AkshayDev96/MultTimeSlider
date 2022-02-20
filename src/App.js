
import TimeRangeSlider from './TimeRangeSlider'

const App = () => {
  return (
    <div style={{ padding: 100 }}>
      <TimeRangeSlider onChange={(e)=>console.log("A",e)}/>
      <TimeRangeSlider onChange={(e)=>console.log("B",e)}/>
      <TimeRangeSlider onChange={(e)=>console.log("C",e)}/>
      <TimeRangeSlider onChange={(e)=>console.log("D",e)}/>
    </div>
  )
}; 

export default App;
