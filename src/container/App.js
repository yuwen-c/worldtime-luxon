import React from 'react';
import Searchbox from '../component/Searchbox';
import {splitedTimezone} from '../component/Alltimezone';
import ErrorBoundary from '../component/ErrorBoundary';
import { DateTime } from "luxon";
import TimezoneList from '../component/TimezoneList';
import { DragDropContext } from 'react-beautiful-dnd';
import Footer from '../component/Footer';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      searchbox: '',
      completeCity: [], // auto complete options
      timezoneStrList: [DateTime.local().zoneName, ],
      local: DateTime.local().zoneName
    }
  }

  // when page loading, do fetch function every second 
  componentDidMount(){
    this.dateID = setInterval(()=> {this.setState({local: DateTime.local().zoneName})}, 1000)
  }

  // clear interval
  componentWillUnmount(){
    clearInterval(this.dateID);
  }

// setState of searchbox and do compare
  onInputChange = (event) => { 
    this.setState({
      searchbox: event.target.value,
    }) 
    this.compareCity(splitedTimezone, event.target.value.toLowerCase())
  }

// use compare result (completeCity) to refresh our timezoneStrList
  onPlusButton = () => {
    const { completeCity  } = this.state;
    if(completeCity.length !== 0){ // [["Africa", "Tripoli"], ["Antarctica", "Troll"]]
      this.getTimezoneStr(completeCity[0]); // only add the first compare result
      this.setState({
        searchbox: "",
        completeCity: []
      });
    }
    else{
      //console.log("there is no matched city")
    }
  }

  // use subtract button to remove tz
  onSubButton = (tz) => {
    const i = this.state.timezoneStrList.indexOf(tz);
    this.setState(prevState => {
      let newTzList = prevState.timezoneStrList.slice();
      newTzList.splice(i, 1);
      return {timezoneStrList: newTzList};
    })
  }

  // move city up 1 step
  onUpButton = (tz) => {
    const i = this.state.timezoneStrList.indexOf(tz);
    this.setState(prevState => {
      let newTzList = prevState.timezoneStrList.slice();
      const tzTemp = newTzList[i];
      newTzList[i] = newTzList[i-1];
      newTzList[i-1] = tzTemp;
      return({timezoneStrList: newTzList}) 
    })
  }

// compare input value with [["Africa", "Abidjan"], ...], and refresh our auto complete options
  compareCity = (tzArr, inputValue) => {
    if(inputValue.length !== 0){
      let inputArr = inputValue.split(''); // change inputValue str -> array
      inputArr.forEach((item, index) => {
        tzArr = tzArr.filter((tz) => {
          if (tz[tz.length-1].length >= inputArr.length){
            return tz[tz.length-1][index].toLowerCase() === item
          }
        })
      })
      this.setState({completeCity: tzArr})
    }
    else{
      this.setState({completeCity: []})
    }

  }

//  convert compare result: ["Africa", "Abidjan"] to "Africa/Abidjan" and setState timezoneStrList
  getTimezoneStr = (tz) => {
    let tzStr = '';
    tz.forEach(item => tzStr = tzStr + item + "/"); // Africa/Tripoli/
    this.setState(prevState => {
      let newList = prevState.timezoneStrList.slice();
      if(!this.state.timezoneStrList.includes(tzStr.slice(0, -1))){ // not allow to repeat timezone 
        newList.push(tzStr.slice(0, -1)); // get ride of the latest "/"
      }
      return {timezoneStrList: newList}
    })
  }  

  onSelectTz = (event) => {
    console.log("select", event.target.id);
    this.setState({
      searchbox: event.target.id,
    })
    this.compareCity(splitedTimezone, event.target.id.toLowerCase())
  }

  // unused
  // if input loses focus, clear completeCity. 
  // => have to do comparsion again to make plus button works
  // => have to add a flag to prevent invalid warning
  onInputBlur = () => {   
    this.setState({completeCity: []})
  }

  // an given array, with a known index (startIndex) of element, change to a new position (endIndex)
  reorder = (array, startIndex, endIndex) => {
    let orderedArray = array.slice();
    const [dragged] = orderedArray.splice(startIndex, 1)
    orderedArray.splice(endIndex, 0, dragged);
    return orderedArray;
  }

  onDragEnd = (result) => {
    if(!result.destination){ 
      return
    }
    const newOrder = this.reorder(this.state.timezoneStrList, result.source.index, result.destination.index);
    this.setState({timezoneStrList: newOrder})
  }

  render(){
    const {timezoneStrList, completeCity, searchbox, local} = this.state;

// if has not get any timezone data, show "loading"
    if(timezoneStrList.length === 0){
      return(<h2 className='tc pa6'>loading...</h2>)
    }
    else{
      let errorMes = completeCity.length === 0 && searchbox.length !==0 ? "Invalid timezone." : null;

      return(
        <div className="relative vh-100"> 
          <ErrorBoundary>
            <Searchbox 
            completeCity={completeCity} 
            onInputChange={this.onInputChange}
            errorMes={errorMes}
            searchboxValue={searchbox}
            onPlusButton={this.onPlusButton}
            onSelectTz={this.onSelectTz}
            // onInputBlur={() => {setTimeout(this.onInputBlur, 50)}}
            />
          </ErrorBoundary>
          <ErrorBoundary>
            <DragDropContext
              onDragEnd={this.onDragEnd}>
              <TimezoneList
                timezoneStrList={timezoneStrList}
                onSubButton={this.onSubButton}
                onUpButton={this.onUpButton}
                local={local}
              />
            </DragDropContext>
          </ErrorBoundary>
          <Footer/>
        </div>
      )
    }
  }
}


export default App;
