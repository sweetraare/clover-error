const format = require("date-fns/format");
const addDays = require("date-fns/addDays");
const differenceInCalendarDays = require("date-fns/differenceInCalendarDays");
const distanceInWords = require("date-fns/formatDistance");
const compareAsc = require("date-fns/compareAsc");
const isWithinInterval = require("date-fns/isWithinInterval");
const getDay = require("date-fns/getDay");
const isToday = require("date-fns/isToday");
const subDays = require("date-fns/subDays");

exports.timeToString = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

exports.formatDate = (date) => {
  return format(new Date(date), "yyyy-MM-dd");
};

exports.formatVisualDate = (date) => {
  return format(new Date(date).setUTCHours(24, 0, 0, 0), "MM/dd/yyyy");
};

exports.formatDateToMyCard = (date) => {
  const newDate = date ? new Date(date) : new Date();
  return format(newDate, "MM/yyyy");
};

exports.formatDateHour = (date) => {
  return format(new Date(date), "MM/dd/yyyy 'at' HH:mm");
};

exports.addDaysToDate = (date, days) => {
  return addDays(new Date(date), days);
};

exports.getDaysToDate = (dateStart, dateEnd) => {
  dateStart = new Date(dateStart).setUTCHours(24, 0, 0, 0);
  return differenceInCalendarDays(dateStart, new Date(dateEnd));
};

exports.getTimeUntilNowInWords = (date) => {
  return distanceInWords(new Date(date), new Date(), { addSuffix: true });
};

exports.compareDateGreaterThan = (startDate, endDate) => {
  const compareValue = compareAsc(new Date(startDate), new Date(endDate));
  return compareValue === -1 || compareValue === 0;
};

exports.dateBetween = (startDate, endDate, compareDate) => {
  startDate = new Date(startDate).setUTCHours(0, 0, 0, 0);
  endDate = new Date(endDate).setUTCHours(0, 0, 0, 0);
  compareDate = new Date(compareDate).setUTCHours(0, 0, 0, 0);
  return isWithinInterval(compareDate, {
    start: startDate,
    end: endDate,
  });
};

exports.getDayOfWeek = (date) => {
  const dayNum = getDay(new Date(date));
  switch (dayNum) {
    case 0:
      return "MON";
    case 1:
      return "TUE";
    case 2:
      return "WED";
    case 3:
      return "THU";
    case 4:
      return "FRI";
    case 5:
      return "SAT";
    case 6:
      return "SUN";
  }
};

exports.dateIsToday = (date) => {
  return isToday(new Date(date).setUTCHours(24, 0, 0, 0));
};

//https://stackoverflow.com/questions/17362240/how-to-check-time-range-in-javascript
exports.timeInRange = (time1, time2, time3, time4) => {
  // time of first timespan
  const x = new Date(`01/01/2001 ${time1}:00`).getTime();
  const y = new Date(`01/01/2001 ${time2}:00`).getTime();

  // time of second timespan
  const a = new Date(`01/01/2001 ${time3}:00`).getTime();
  const b = new Date(`01/01/2001 ${time4}:00`).getTime() - 1;

  return Math.min(x, y) <= Math.max(a, b) && Math.max(x, y) >= Math.min(a, b);
};

exports.removeDaysToDate = (date, days) => {
  return subDays(new Date(date).setUTCHours(24, 0, 0, 0), days);
};
