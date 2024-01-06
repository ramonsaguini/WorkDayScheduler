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
      let timeBlock = $("<div>").addClass("row time-block"); //! create div and add class to get style from BootStrap and time block
      let hourCol = $("<div>").addClass("col-md-1 hour").text(dayjs().hour(hour).format("hA"));
      let eventCol = $("<div>").addClass("col-md-10 description ");
      let areaOfTextE = $("<textarea>").attr("data-hour", hour);

      //! Color-code time blocks
      if (hour < currentHour) {
        areaOfTextE.addClass('past');
      } else if (hour === currentHour) {
        areaOfTextE.addClass('present');
      } else {
        areaOfTextE.addClass('future');
      }

      //! Retrieve and display saved events
      let eventSave = localStorage.getItem("event_" + hour);
      if (eventSave) {
        areaOfTextE.val(eventSave);
      }

      //! Allow user to enter an event on click
      areaOfTextE.on("click", function () {
        $(this).addClass("active");
      });

      // Save event to local storage when save button is clicked
      let saveBtnCol = $("<div>").addClass("col-md-1 saveBtn");
      let saveBtn = $("<i>").addClass("fas fa-save").attr("data-hour", hour);

      saveBtn.on("click", function () {
        let hourToSave = $(this).attr("data-hour");
        let eventToSave = $("textarea[data-hour=" + hourToSave + "]").val();
        localStorage.setItem("event_" + hourToSave, eventToSave);

        // Remove 'active' class after saving
        $("textarea[data-hour=" + hourToSave + "]").removeClass("active");
      });

      saveBtnCol.append(saveBtn);
      timeBlock.append(hourCol, eventCol.append(areaOfTextE), saveBtnCol);
      container.append(timeBlock);
    }
  }

  // Persist events between page refreshes
  function persistEvents() {
    $("textarea").each(function () {
      let hour = $(this).attr("data-hour");
      let eventToSave = $(this).val();
      localStorage.setItem("event_" + hour, eventToSave);
    });
  }

  // Display current day and create time blocks
  CurrentDayDisplay();
  blocksOfTime();

  // Persist events when the page is unloaded (refreshed)
  window.addEventListener("beforeunload", persistEvents);
});
