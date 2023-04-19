import moment from "moment"
function PrefixInteger(num, n) {
  return (Array(n).join(0) + num).slice(-n);
}
export default function compute(target, format) {
  var endTime = moment(target);
  var startTime = moment(moment().format(format));
  var day = endTime.diff(startTime, 'days');
  var hours = endTime.diff(startTime, 'hours');
  var minutes = endTime.diff(startTime, 'minutes');
  var seconds = endTime.diff(startTime, 'seconds');
  var secondsCount = seconds;
  hours = hours > 24 ? hours % (day * 24) : hours;

  minutes = minutes > 60 ? (minutes % (hours * 60 + day * 24 * 60)) : minutes;

  seconds = seconds > 60 ? (seconds % (minutes * 60 + hours * 60 * 60 + day * 24 * 60 *
    60)) : seconds;
  return {
    secondsCount,
    dayLeft: day,
    hoursLeft: PrefixInteger(hours, 2),
    minutesLeft: PrefixInteger(minutes, 2),
    secondsLeft: PrefixInteger(seconds, 2)
  }
}
