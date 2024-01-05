$(document).ready(function () {
  function dateAndTime() {
    var currentDateTime = dayjs().format("YYYY, D MMMM  HH:mm");
    $("#currentDay").text(currentDateTime);
  }

  dateAndTime();
});

function createTimeBlock() {
  var container = $("#timeblock"); //!will be create in for Loop

  var currentHour = dayjs().hour();

  for (var hour = 8; hour <= 17; hour++) {
    var timeBlock = $("<div>").addClass("row time-block"); //!create block Hour
    var hourCol = $("<div>").addClass("col-md-1 hour").text(dayjs().hour(hour).format("hA")); //! collunm to show the hour
    var eventCol = $("<div>").addClass("col-md-10 description"); //!col description
    var eventTextarea = $("<textarea>").attr("data-hour", hour);//! insert data / hour

    if (hour < currentHour) { //! if hour is < current hour, add class past in the text Area event
      eventTextarea.addClass('past'); //! if hour is equal current hour, add class present in the text Area event
    } else if (hour === currentHour) {
      eventTextarea.addClass('present')
    } else {
      eventTextarea.addClass('future'); //! if hour is > the current hour, add class future in the text Area event
    }

  }
}