import React from 'react';
import Searchbox from '../component/Searchbox';
// import Timezone from '../component/Timezone';
import {splitedTimezone} from '../component/Alltimezone';
import ErrorBoundary from '../component/ErrorBoundary';
import { DateTime } from "luxon";
import TimezoneNow from '../component/TimezoneNow';
import TimezoneList from '../component/TimezoneList';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      searchbox: '',
      timezoneData: [], // data from fetch worldtime API
      tzStr : Intl.DateTimeFormat().resolvedOptions().timeZone, 
      // default 是local tz, 之後要設為搜尋的
      now: DateTime.local(),
      completeCity: [], // auto complete options
      timezoneStrList: ["America/New_York", "Europe/Madrid"] // [ 'new_york', 'madrid']
    }
  }

  // when page loading, do fetch function every second 
  componentDidMount(){
    // this.dateID = setInterval(()=> {this.setState({now: DateTime.local()})}, 1000)
    // this.timerID = setInterval(this.fetchTimezone, 1000);
  }

  // clear interval
  componentWillUnmount(){
    // clearInterval(this.dateID);
    // clearInterval(this.timerID);
  }

// setState of searchbox and do compare
  onInputChange = (event) => {   
//inputFunc = (event) => {  //use onChange to detect any changes
    this.compareCity(splitedTimezone, event.target.value.toLowerCase())
    this.setState({
      searchbox: event.target.value.toLowerCase(),
    }) 
  }

  onButtonClick = () => {
    const { completeCity } = this.state;
    // const filteredCity = this.compareCity(splitedTimezone,event.target.value.toLowerCase());
    if(completeCity){ // [["Africa", "Tripoli"], ["Antarctica", "Troll"]]
      // call getTimezoneStr function
      this.getTimezoneStr(completeCity[0]); // 只用第一個去抓字串
      // 不fetch, 而是用luxon
      //this.fetchTimezone(this.state.tzStr);  
    }
    else{
      console.log("there is no matched city")
    }
  }

// compare input value with [["Africa", "Abidjan"], ["Africa", "Accra"], ...]
  compareCity = (tzArr, inputValue) => {
    for(let i in inputValue){
    // if length of input value > city name => error. => use try catch
      try{
        tzArr = tzArr.filter(item => {
          // only compare with the last city name, don't compare with "Africa"
          return item[item.length-1][i].toLowerCase() === inputValue[i]
        })
        this.setState({completeCity: tzArr});
      }
      catch(error){
        console.log("error", error);
      }
    }
    return tzArr; // [["Africa", "Tripoli"], ["Antarctica", "Troll"]]
  }

//  convert ["Africa", "Abidjan"] to "Africa/Abidjan"
  getTimezoneStr = (timezoneArr) => {
    let fetchStr = '';
    timezoneArr.forEach(item => fetchStr = fetchStr + item + "/");
    this.setState({tzStr: fetchStr.slice(0, -1)}); // Africa/Tripoli/ 要去掉"/"
    console.log("fetch", fetchStr)
    return fetchStr.slice(0, -1);
  }  

  // now do not use world time API
// get the state of tzStr and fetch
  fetchTimezone = (str) =>{
    // fetch("https://worldtimeapi.org/api/timezone/"+ this.state.tzStr)
    fetch(`https://worldtimeapi.org/api/timezone/${str}`)
    .then(response => response.json())
    .then(result => this.setState({timezoneData: result}))
  }


  render(){
// if has not get any timezone data, show "loading"
    // if(this.state.timezoneData.length === 0){
    //   return(<h2 className='tc pa6'>loading...</h2>)
    // }
    // else{
  // if input is invalid, show error message in <p> of searchbox.
  // condition: w/o compare anything && input is not empty
      let errorMes;
      if(this.state.completeCity.length === 0 && this.state.searchbox.length !==0){
        errorMes = 'invalid timezone'
      }
      else{
        errorMes = '';
      }
      return(
        <div> 
          <ErrorBoundary>
            <Searchbox 
            completeCity={this.state.completeCity} 
            onInputChange={this.onInputChange}
            errorMes={errorMes}
            />
            <input
            type="submit"
            onClick={this.onButtonClick}
            ></input>
          </ErrorBoundary>
          <ErrorBoundary>
            {/* <Timezone timezone={this.state.timezoneData}/> */}
            {/* <TimezoneNow
              now={this.state.now}
            /> */}
            <TimezoneList
              now={this.state.now}
              timezoneStrList={this.state.timezoneStrList}
            />
          </ErrorBoundary>
        </div>
      )
    }
  }
// }


export default App;
