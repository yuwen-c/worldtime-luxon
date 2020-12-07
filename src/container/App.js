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
    console.log("changeFunc")
//inputFunc = (event) => {  //use onChange to detect any changes
    const filteredCity = this.compareCity(splitedTimezone, event.target.value.toLowerCase());
    this.setState({
      Searchbox: event.target.value.toLowerCase(),
      completeCity: filteredCity
    }) 
  }

  // onClick = () => {
  //   console.log("click",this.state.Searchbox)
  //   // call compare function
  //   // send event.target.value as the second parameter, cause this.state.searchBox has a delay
  //   // const filteredCity = this.compareCity(splitedTimezone,event.target.value.toLowerCase());
  //   const filteredCity = this.compareCity(splitedTimezone,this.state.Searchbox)
  //   // if only get one city after filter, fetch directly without press enter
  //   if(filteredCity.length === 1){
  //     // call getTimezoneStr function
  //     this.getTimezoneStr(filteredCity);
  //     this.fetchTimezone();  
  //   }
  // }

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
    clearInterval(this.timerID);
  }

// compare input value with [["Africa", "Abidjan"], ["Africa", "Accra"], ...]
  compareCity = (tzArr, inputValue) => {
    console.log("compare")
    for(let i in inputValue){
    // if length of input value > city name => error. => use try catch
      try{
        tzArr = tzArr.filter(item => {
          // only compare with the last city name, don't compare with "Africa"
          return item[item.length-1][i].toLowerCase() === inputValue[i]
        })
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
// =========== Autocomplete part: ============
// compare the searchbox value and Alltimezone(splitedTimezone), get completeCity, then show the result in Option
    // lst time(1st letter): compare with all city list (splitedTimezone)
    // 2nd time(2nd letter): compare with the result of 1st filter.
    let completeCity = [];
    // when input nothing, do not show options
    if(this.state.Searchbox.length!==0){
      console.log("if not 0")
      // call compare function
      completeCity = this.compareCity(splitedTimezone,this.state.Searchbox)
    }

// =========== Main Page: ============
// if has not get any timezone data, show "loading"
    // if(this.state.Timezone.length === 0){
    //   return(<h2 className='tc pa6'>loading...</h2>)
    // }
    // else{
  // if input is invalid, show error message in <p> of searchbox.
  // condition: w/o compare anything && input is not empty
      let errorMes;
      if(completeCity.length === 0 && this.state.Searchbox.length !==0){
        errorMes = 'invalid timezone'
      }
      else{
        errorMes = '';
      }
      return(
        <div> 
          <ErrorBoundary>
            <Searchbox 
            completeCity={completeCity} 
            changeFun={this.changeFunc}
            keydownFunc={this.keydownFunc}
            errorMes={errorMes}
            />
            <input
            type="submit"
            onClick={this.onClick}
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
