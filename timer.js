///stopwatch buttons///
const strt = document.querySelector(".stopwatch__btns__strt-stop");
strt.addEventListener("click", startstoptimer);

const reset = document.querySelector(".stopwatch__btns__reset");
reset.addEventListener("click", resetTimer);

const lapSave = document.querySelector(".stopwatch__btns__lap");
lapSave.addEventListener("click", saveLocalLap);


const viewHistory = document.querySelector(".stopwatch__history");
viewHistory.addEventListener("click", historyMenu);

///stopwatch buttons///
const clearSaved = document.querySelector(".history__btns__clear");
clearSaved.addEventListener("click", clear);

const closeHistory = document.querySelector(".history__btns__close");
closeHistory.addEventListener("click", closeMenu);

/// History buttons ///

// Variables //

/// Stopwatch///
let mil = 0;
let sec = 0;
let min = 0;
let lap;
let timer;
let count = 0;

let miliSecs = document.querySelector(".stopwatch__clock__mils");
let seconds = document.querySelector(".stopwatch__clock__secs");
let miniutes = document.querySelector(".stopwatch__clock__mins");
const localLap = document.querySelector('.stopwatch__lap-time');
/// Stopwatch///

/// History///
const history = document.querySelector(".history");
const lapHistory = document.querySelector(".history__laps");
/// History///

/// Local Storage ///
let itemsArray = localStorage.getItem("items")
  ? JSON.parse(localStorage.getItem("items"))
  : [];
localStorage.setItem("items", JSON.stringify(itemsArray));
const data = JSON.parse(localStorage.getItem("items"));
/// Local Storage ///

// Variables //

/// Functions ///

/// Display ///
function display() {
  if (mil >= 99) {
    mil = 0;
    sec += 1;
    if (sec >= 60) {
      sec = 0;
      min += 1;
      if (min >= 9) {
        miniutes.innerHTML = min;
      }
    }
  } else mil += 1;
  miliSecs.innerHTML = mil;
  if (sec <= 9) {
    seconds.innerHTML = "0 " + sec;
  } else {
    seconds.innerHTML = sec;
  }
  timer = setTimeout("display()", 10);
}
/// Start ///
function starttimer() {
    if (timer > 0) {
      return;
    }
    display();
}
/// Stop ///
function stoptimer() {
  clearTimeout(timer);
  timer = 0;
}
/// start- stop ///
function startstoptimer() {
  if (timer > 0) {
    strt.classList.remove("active");
    strt.innerHTML = "Start";
    clearTimeout(timer);
    timer = 0;
  } else {
    strt.classList.add("active");
    strt.innerHTML = "Stop";
    display();
  }
}

/// reset ///
function resetTimer() {
  count = 0;
  strt.classList.remove("active");
  strt.innerHTML = "Start";
  localLap.innerHTML = "";
  stoptimer();
  mil = 0;
  sec = 0;
  min = 0;
  miniutes.innerHTML = "00";
  miliSecs.innerHTML = "00";
  seconds.innerHTML = "00";
}
/// clear ///
function clear() {
  if (lapHistory.hasChildNodes()) {
    localStorage.clear();
    lapHistory.innerHTML = "";
    itemArray = [];
  }
}

/// creating lists ///
const liMaker = (text,loc) => {
    const number = document.createElement("span");
    const li = document.createElement("li");
    number.textContent = "Lap : " + count++;
    li.textContent = text;
    li.appendChild(number);
    loc.appendChild(li);
};

function saveLocalLap() {
  if (timer > 0) {
    lap = `${min} : ${sec}. ${mil}`;
    liMaker(lap,localLap);
    itemsArray.push(lap);
    localStorage.setItem("items", JSON.stringify(itemsArray));
    lap = "";
  }
}

function historyMenu() {
    history.querySelector("h1").innerHTML = "";
  history.classList.add("slide");
  data.forEach(item => {
    liMaker(item,lapHistory);
  });
}
function closeMenu() {
  history.classList.remove("slide");
}
