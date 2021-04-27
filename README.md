# Worldtime - Find out what time is it in any timezone. ⏱

### [readme in Mandarin](https://github.com/yuwen-c/worldtime-luxon/blob/master/README_Mandarin.md)
### [see live](https://yuwen-worldtime-luxon.netlify.app/)


## How to use 🔍
- Open this App and it'll show your timezone and time.
- That's say you're looking for time of Seoul.
- Type s. e..., select Seoul, send.

<div align="center">
  <img src="example/worldtime-luxon_seoul.jpeg" alt="worldtime-luxon dropdown" width="300px" />
  <br>
</div>

- Seoul timezone is now on your screen.
- Try "up" and "delete" button in the right up side of each timezone.
- Try dragging up and down by mouse or touching on mobile.

<div align="center">
  <img src="example/worldtime-luxon_drag1.jpeg" alt="worldtime-luxon dropdown" width="300px" />
  <br>
</div>


## evolution of this project 🧬
- I had a on-line spanish class, my teacher and I tried to find out a time which works for her (living in germany) and for me(living in Taiwan).
- Also, I wanted to practice connecting an API, so I made an [original one](https://yuwen-c.github.io/worldtime/)
- After that, I tried to show multiple timezones on the screen and turned out it had a serious delay on my app due to it's API.
- I needed an alternative, and indeed there were some: moment.js, luxon.js or even Javascript Date object.
- Out of curiosity, I studied about time and timezone and found out the meaning of existency of these libraries:
> get the present time somewhere is easy, get "a certain past time" somewhere is not!!
- Basically because it's so complicated and require a team with developers, historians to maintain the time database.
- Finally I choose Luxon.js to build my project, it works like a charm.
- To make this project more handy, I added the drag-and-drop function to it, and it became what it looks like now. 🙋


<div align="center">
  <img src="example/worldtime-luxon_screenshot.png" alt="worldtime-luxon screenshot" width="600px" />
  <br>
</div>



## Features
✨ Frond-end website using **React.js**.
－Similar to Javascript syntax.
－The whole app combines small components which are independent and reusable.
✨ Getting world time through [Luxon](https://moment.github.io/luxon/)\
－Better than ```moment.js``` and is still keep supported.
✨ **Drag and drop** function using ```react-beautiful-dnd```
－Works well for a grid system instead of dragging freely.
✨ Front-end website deploying to **Netlify**.
－Perfect for frond-end website, response immediately without waiting to be awakened.
－Synchronizing with github commits.
✨ Css style using Tachyons.
－Lightweight and easy to use.
✨ **Modern UI** for both mobile and desktop


## Details
### Get local time constantly
- When Worldtime is opened, local time will show on the screen and update constantly.

<div align="center">
  <img src="example/worldtime_localtime_200percent_20pad.png" alt="get local time" width="400px" />
  <br>
</div>

- Get local time with luxon in state.
- Update time every second in ```ComponentDidMount```.
- Remove timer with ```ComponentWillUnMount```.


### Find time in...
- Screen and state change when user is searching certain timezone:

<div align="center">
  <img src="example/worldtime_search_200percent_20pad.png" alt="search time" width="400px" />
  <br>
</div>

- When user types in name of the timezone, the matching suggestions will show up.
- After submitting, the timezone and local time will appear together on the screen, and will be updated in real time.



### button:
- Simple, intuitive button icon with svg.





====

## With this App you can...

- Open this App and it'll show your timezone and time.
- Find out a specific timezone by entering a city name.
- A drop down menu with corresponding cities will show when you're typing.


<div align="center">
  <img src="example/worldtime-luxon_seoul.jpeg" alt="worldtime-luxon dropdown" width="300px" />
  <br>
</div>

- Put multiply timezones on your screen at one time.
- Moving up or delete a timezone with clicking "up" button and "x" button.
- Dragging a timezone with mouse or by touching the mobile.
