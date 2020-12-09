import React from 'react';
import Searchbox from '../component/Searchbox';
// import Timezone from '../component/Timezone';
import {splitedTimezone} from '../component/Alltimezone';
import ErrorBoundary from '../component/ErrorBoundary';
import { DateTime } from "luxon";
// import TimezoneNow from '../component/TimezoneNow';
import TimezoneList from '../component/TimezoneList';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      searchbox: '',
      completeCity: [], // auto complete options
      // timezoneData: [], // data from fetch worldtime API
      // localTzStr : Intl.DateTimeFormat().resolvedOptions().timeZone,  // get local time
      now: DateTime.local(),
      timezoneStrList: [] // ["America/New_York", "Europe/Madrid"]
    }
  }

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

// setState of searchbox and do compare
  onInputChange = (event) => {   
//inputFunc = (event) => {  //use onChange to detect any changes
    this.compareCity(splitedTimezone, event.target.value.toLowerCase())
    this.setState({
      searchbox: event.target.value.toLowerCase(),
    }) 
  }

// use compare result (completeCity) to refresh our timezoneStrList
  onButtonClick = () => {
    const { completeCity } = this.state;
    if(completeCity){ // [["Africa", "Tripoli"], ["Antarctica", "Troll"]]
      this.getTimezoneStr(completeCity[0]); // only add the first compare result
    }
    else{
      console.log("there is no matched city")
    }
  }

// compare input value with [["Africa", "Abidjan"], ...], and refresh our auto complete options
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
  }

//  convert compare result: ["Africa", "Abidjan"] to "Africa/Abidjan" and setState timezoneStrList
  getTimezoneStr = (tz) => {
    let tzStr = '';
    tz.forEach(item => tzStr = tzStr + item + "/");
    this.setState(prevState => {
      let newList = prevState.timezoneStrList.slice();
      newList.push(tzStr.slice(0, -1)); // Africa/Tripoli/ 要去掉"/"
      return {timezoneStrList: newList}
    })
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
            <TimezoneList
              now={this.state.now}
              timezoneStrList={this.state.timezoneStrList}
            />
            {this.state.timezoneStrList}
          </ErrorBoundary>
        </div>
      )
    }
  }
// }


export default App;
