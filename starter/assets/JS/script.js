$(document).ready(function () {
  function dateAndTime() {
    var currentDateTime = dayjs().format("YYYY, D MMMM  HH:mm");
    $("#currentDay").text(currentDateTime);
  }

  dateAndTime();
});