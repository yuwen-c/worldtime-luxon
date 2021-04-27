# Worldtime - Find out what time is it in any timezone. ⏱

### [readme in Mandarin](https://github.com/yuwen-c/worldtime-luxon/blob/master/README_Mandarin.md)
### [see live](yuwen-worldtime-luxon.netlify.app/)


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
✨ Frond-end website using React.js.
－Similar to Javascript syntax.
－The whole app combines small components which are independent and reusable.
✨ Getting world time through [Luxon](https://moment.github.io/luxon/)\
－Better than ```moment.js``` and is still keep supported.
✨ Drag and drop function using ```react-beautiful-dnd```
－Works well for a grid system instead of dragging freely.
✨ Front-end website deploying to Netlify.
－Perfect for frond-end website, response immediately without waiting to be awakened.
－Synchronizing with github commits.
✨ Css style using Tachyons.
－Lightweight and easy to use.
✨ Modern UI for both mobile and desktop


## Details
### 主要function:
- App class裡面的state分別有：搜尋列的值(string)、符合的建議時區名稱的(array)、要顯示於畫面的時區列表(array)、當地時區(時間)。
其中當地時間是利用luxon的DateTime.local來抓取。畫面時區列表的array中，預設第一個元素是當地時區。
- 利用componentDidMount，設setInterval來每間隔一秒，就重設一次當地時區，達到每秒更新時間的目的。用componentWillUnmount將這個setInterval刪除。
- 當使用者在搜尋列輸入英文字，會重設搜尋列的state，並執行比對，將全世界時區(資料內建在裡面)與搜尋字串比對，並將結果顯示於下拉選單。如果將搜尋字串刪除，或是不再將焦點放在搜尋列上(onBlur)，建議選單會消失。
- 如果搜尋列有文字，但沒有相符的比對結果，顯示：Invalid timezone
- 當使用者選定時區，按下加號按鈕，該時區會被加入時區列表的array中，並與當地時間並列於畫面上。要調整時區上下位置，點選「向上」的按鈕，會將該時區在時區列表中往前調一個位置。如果刪除，則會將此時區拿掉。
- 拖曳功能，是設定「拖拉動作完成時」，會更改時區列表的元素順序。

### Luxon.js:
- 每個時區的方格裡有：時區名稱、時間(時分秒、上午下午)、星期幾、日期(月日年)
- 引入```DateTime```，利用```setLocale('en-us')```設定英文的March, 24, 2021的日期格式，以及用```toLocaleString(DateTime.DATETIME_SHORT_WITH_SECONDS)```取得精確到秒的時間。
- 用字串的slice方法取得需要的資訊，顯示在畫面上。

### Drag and drop 拖放功能:
- 要使用```react-beautiful-dnd```，要先界定3個範圍及物件：
1. 可操作的最大拖曳的範圍，即搜尋列下方的畫面部分。
2. 可「放下」的範圍，也就是在哪邊放開，是有效的。
3. 可拖拉的物件。
- 最大拖曳範圍：在這邊，要定義「產生新排序」的功能，及拖曳動作結束時，要更新時區列表的state。
- 可「放下」的範圍：在這邊使用預設的provided導入props，並且在DOM上面指定ref。
- 可拖拉的物件：每個可拖曳的物件都必須設定id及index，以及在DOM上設定ref，還有用provided導入props。另外也可以用snapshot設定拖拉時的特效。

### button:
- 利用svg圖檔做出符合直覺的圖示。





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
