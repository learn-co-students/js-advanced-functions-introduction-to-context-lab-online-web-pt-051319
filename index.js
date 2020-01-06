function createEmployeeRecord(record) {
  return {
    firstName: record[0],
    familyName: record[1],
    title: record[2],
    payPerHour: record[3],
    timeInEvents: [],
    timeOutEvents: []
  };
}

function createEmployeeRecords(records) {
  return records.map(record => createEmployeeRecord(record));
}

function createTimeInEvent(employee, timestamp) {
  let time = {
    date: timestamp.split(" ")[0],
    hour: parseInt(timestamp.split(" ")[1]),
    type: "TimeIn"
  };
  employee.timeInEvents.push(time);
  return employee;
}

function createTimeOutEvent(employee, timestamp) {
  let time = {
    date: timestamp.split(" ")[0],
    hour: parseInt(timestamp.split(" ")[1]),
    type: "TimeOut"
  };
  employee.timeOutEvents.push(time);
  return employee;
}

function hoursWorkedOnDate(employee, date) {
  let timeIn = employee.timeInEvents.find(i => i.date === date).hour;
  let timeOut = employee.timeOutEvents.find(i => i.date === date).hour;
  return (timeOut - timeIn) / 100;
}

function wagesEarnedOnDate(employee, date) {
  let hour = hoursWorkedOnDate(employee, date);
  return hour * employee.payPerHour;
}

function allWagesFor(employee) {
  let dates = employee.timeInEvents.map(i => i.date);
  let total = 0;
  for (var i = 0; i < dates.length; i++) {
    total += wagesEarnedOnDate(employee, dates[i]);
  }
  return total;
}

function calculatePayroll(employees) {
  return employees.reduce(function(total, employee) {
    return total + allWagesFor(employee);
  }, 0);
}

function findEmployeeByFirstName(employees, firstName) {
  return employees.find(e => e.firstName === firstName);
}
