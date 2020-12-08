import React from 'react';
import Searchbox from '../component/Searchbox';
// import Timezone from '../component/Timezone';
import {splitedTimezone} from '../component/Alltimezone';
import ErrorBoundary from '../component/ErrorBoundary';
import { DateTime } from "luxon";
import TimezoneLuxon from '../component/TimezoneLuxon';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      Searchbox:'',
      Timezone:[],
      // TzStr : user local timezone
      TzStr : Intl.DateTimeFormat().resolvedOptions().timeZone,
      now: DateTime.local(),
      completeCity:[]
    }
  }

// listen to the input change, setState of Searchbox and change to lower case 
  changeFunc = (event) => {   
    // console.log("event", event.target.value) 
//inputFunc = (event) => {  //use onChange to detect any changes
    // const filteredCity = this.compareCity(splitedTimezone, event.target.value.toLowerCase());
    // console.log("filter", filteredCity)
    this.compareCity(splitedTimezone, event.target.value.toLowerCase())
    this.setState({
      Searchbox: event.target.value.toLowerCase(),
      // completeCity: filteredCity
    }) 
    console.log("change")
  }

  onButtonClick = () => {
    console.log("click")
    // send event.target.value as the second parameter, cause this.state.searchBox has a delay
    // const filteredCity = this.compareCity(splitedTimezone,event.target.value.toLowerCase());
    const filteredCity = this.compareCity(splitedTimezone,this.state.Searchbox)
    console.log("filter", filteredCity)
    // if only get one city after filter, fetch directly without press enter
    if(filteredCity.length === 1){
      // call getTimezoneStr function
      this.getTimezoneStr(filteredCity);
      this.fetchTimezone();  
    }
  }

//when press "enter", set State of searchbox, find the city, send fetch
  // keydownFunc = (event) => {
  //   if(event.keyCode === 13){
  //     // call compare function, filter input cityname with timezone
  //     const filteredCity = this.compareCity(splitedTimezone, this.state.Searchbox)
  //     // if input is valid, send the fetch string with the first element of filteredCity
  //     if(filteredCity.length!==0){
  //     // call getTimezoneStr function
  //       this.getTimezoneStr(filteredCity);
  //       this.fetchTimezone();
  //       // clean the input box
  //       event.target.value = '';
  //     }
  //   }
  // }

// when page loading, do fetch function every second 
  componentDidMount(){
    this.dateID = setInterval(()=> {this.setState({now: DateTime.local()})}, 1000)
    // this.timerID = setInterval(this.fetchTimezone, 1000);
  }

// clear interval
  componentWillUnmount(){
    clearInterval(this.dateID);
    // clearInterval(this.timerID);
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
        console.log("compare", tzArr)
      }
      catch(error){
        console.log("error", error);
      }
    }
    return tzArr;
  }

//  convert ["Africa", "Abidjan"] to "Africa/Abidjan"
  getTimezoneStr = (timezoneArr) => {
    let fetchStr = '';
    timezoneArr[0].forEach(item => fetchStr = fetchStr + item + "/");
    this.setState({TzStr: fetchStr.slice(0, -1)});
    return fetchStr.slice(0, -1);
  }  

// get the state of TzStr and fetch
  fetchTimezone = () =>{
    fetch("https://worldtimeapi.org/api/timezone/"+ this.state.TzStr)
    .then(response => response.json())
    .then(result => this.setState({Timezone: result}))
  }


  render(){
// if has not get any timezone data, show "loading"
    // if(this.state.Timezone.length === 0){
    //   return(<h2 className='tc pa6'>loading...</h2>)
    // }
    // else{
  // if input is invalid, show error message in <p> of searchbox.
  // condition: w/o compare anything && input is not empty
      let errorMes;
      if(this.state.completeCity.length === 0 && this.state.Searchbox.length !==0){
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
            changeFun={this.changeFunc}
            keydownFunc={this.keydownFunc}
            errorMes={errorMes}
            />
            <input
            type="submit"
            onClick={this.onButtonClick}
            ></input>
          </ErrorBoundary>
          <ErrorBoundary>
            {/* <Timezone timezone={this.state.Timezone}/> */}
            <TimezoneLuxon
              now={this.state.now}
            />
          </ErrorBoundary>
        </div>
      )
    }
  }
// }


export default App;
