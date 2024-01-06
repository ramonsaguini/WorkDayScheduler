//! func to check and show in display the current day
$(document).ready(function () {
  function CurrentDayDisplay() {
    let currentDay = dayjs().format("dddd, MMMM D"); //!format of date
    $("#currentDay").text(currentDay);
  }

  //! Create and display time blocks
  function blocksOfTime() {
    let container = $(".container"); //! like a query selector
    let currentHour = dayjs().hour(); //! like api of date

    for (let hour = 6; hour <= 17; hour++) { //! loop to create blocks for each hour of the day starting 6 and finish at 17
      let timeBlock = $("<div>").addClass("row time-block d-flex align-items-center justify-content-center"); //! create div and add class to get style and script
      let hourCol = $("<div>").addClass("col-md-1 p-3 hour ").text(dayjs().hour(hour).format("hA"));//! create div and add class to get style and script
      let eventCol = $("<div>").addClass("col-md-10 description  ");//! create div and add class to get style and script
      let areaOfTextE = $("<textarea>").attr("data-hour", hour);//! create div and add class to get style and script


      if (hour < currentHour) { //! if area of text is less than current hour will add class past to get color style
        areaOfTextE.addClass('past');
      } else if (hour === currentHour) {//! if area of text is equal than current hour will add class present to get color style
        areaOfTextE.addClass('present');
      } else {
        areaOfTextE.addClass('future');//! if area of text is above than current hour will add class future to get color style
      }

      //! Save events and get back old one
      let eventSave = localStorage.getItem("event_" + hour);
      if (eventSave) {
        areaOfTextE.val(eventSave);
      }

      //! Allow user to enter an event on click
      areaOfTextE.on("click", function () {
        $(this).addClass("active");
      });

      //! Save event to local storage when save button is clicked
      let saveBtnCol = $("<div>").addClass("col-md-1 saveBtn d-flex align-items-center justify-content-center"); //!create btn save
      let saveBtn = $("<i>").addClass("fas fa-save").attr("data-hour", hour); //!icon(image)

      saveBtn.on("click", function () { //! func of when i click oon btn to save 
        let hourToSave = $(this).attr("data-hour"); //! attr class data-hour
        let eventToSave = $("textarea[data-hour=" + hourToSave + "]").val();
        localStorage.setItem("event_" + hourToSave, eventToSave); //!saving in the local storage

        //! Remove 'active' class after saving 
        $("textarea[data-hour=" + hourToSave + "]").removeClass("active");
      });

      //!Append all btns, txt areas and hours areas
      saveBtnCol.append(saveBtn);
      timeBlock.append(hourCol, eventCol.append(areaOfTextE), saveBtnCol, clearAllBtn);
      container.append(timeBlock);
    }
  }

  //! keep showing the event saved when refresing page
  function persistEvents() {
    $("textarea").each(function () {
      let hour = $(this).attr("data-hour");
      let eventToSave = $(this).val();
      localStorage.setItem("event_" + hour, eventToSave);
    });

  }

  //! BTN to clear all events
  let clearAllBtn = $("<button>").attr("id", "clearAllBtn").addClass("btn btn-warning").text("Clear All");
  clearAllBtn.on("click", function () {
    clearAllTextareas();
  });

  function clearAllTextareas() {
    $("textarea").val("");
  }

  //! Call Functions
  CurrentDayDisplay();
  blocksOfTime();

  //! keep showing the event saved
  window.addEventListener("beforeunload", persistEvents);
});
