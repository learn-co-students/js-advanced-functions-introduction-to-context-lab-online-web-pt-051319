// Your code here
function createEmployeeRecord(employeesArr) {
  let employee = {
    firstName: employeesArr[0],
    familyName: employeesArr[1],
    title: employeesArr[2],
    payPerHour: employeesArr[3],
    timeInEvents: [],
    timeOutEvents: []
  };
  return employee;
}

function createEmployeeRecords(employeesArr) {
  let employees = employeesArr.map(employee => createEmployeeRecord(employee));
  return employees;
}

function createTimeInEvent(employeeRecord, dateTime) {
  //timestamps = 2018-01-01 23:00

  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(dateTime.split(" ")[1]),
    date: dateTime.split(" ")[0]
  });

  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTime) {
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(dateTime.split(" ")[1]),
    date: dateTime.split(" ")[0]
  });
  return employeeRecord;
}


function hoursWorkedOnDate(employee, date) { 
  const timeInEvent = employee.timeInEvents.find(event => event.date === date)
  const timeOutEvent = employee.timeOutEvents.find(event => event.date === date)
  return (timeOutEvent.hour - timeInEvent.hour)/100
}


function wagesEarnedOnDate(employee, date) {
  return hoursWorkedOnDate(employee, date) * employee.payPerHour;
}

function allWagesFor(employee) {
  let datesWorked = employee.timeInEvents.map(event => event.date);
  let wagesEarned = datesWorked.map(date => wagesEarnedOnDate(employee, date));

  return wagesEarned.reduce((e, memo) => e + memo, 0);
}

function calculatePayroll(employees) {
  return employees.reduce((memo, employee) => allWagesFor(employee) + memo, 0);
}

function findEmployeeByFirstName(employees, firstName){
  return employees.find(employee => employee.firstName == firstName)
}
