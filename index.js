// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  let EmployeeRecord = { firstName, familyName, title, payPerHour };
  EmployeeRecord.timeInEvents = [];
  EmployeeRecord.timeOutEvents = [];
  return EmployeeRecord;
}

function createEmployeeRecords(recordsArray) {
  return recordsArray.map(createEmployeeRecord);
}

function createTimeInEvent(EmployeeRecord, datestamp) {
  let date = datestamp.split(" ")[0];
  let time = datestamp.split(" ")[1];
  const timeInEvent = {
    type: "TimeIn",
    date: date,
    hour: parseInt(time),
  };

  EmployeeRecord.timeInEvents.push(timeInEvent);
  return EmployeeRecord;
}

function createTimeOutEvent(EmployeeRecord, datestamp) {
  let date = datestamp.split(" ")[0];
  let time = datestamp.split(" ")[1];
  const timeOutEvent = {
    type: "TimeOut",
    date: date,
    hour: parseInt(time),
  };

  EmployeeRecord.timeOutEvents.push(timeOutEvent);
  return EmployeeRecord;
}

function hoursWorkedOnDate(EmployeeRecord, datestamp) {
  const timeInEvent = EmployeeRecord.timeInEvents.find(
    (event) => event.date === datestamp
  );
  const timeOutEvent = EmployeeRecord.timeOutEvents.find(
    (event) => event.date === datestamp
  );
  return (timeOutEvent.hour - timeInEvent.hour) / 100;
}

function wagesEarnedOnDate(EmployeeRecord, datestamp) {
  return (
    hoursWorkedOnDate(EmployeeRecord, datestamp) * EmployeeRecord.payPerHour
  );
}

function allWagesFor(EmployeeRecord) {
  let daysWorked = EmployeeRecord.timeInEvents.map((event) => event.date);
  let wagesTotal = daysWorked.map((day) =>
    wagesEarnedOnDate(EmployeeRecord, day)
  );
  return wagesTotal.reduce((a, b) => a + b, 0);
}

function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName);
}

function calculatePayroll(srcArray) {
  return srcArray.reduce(
    (accumulator, employee) => allWagesFor(employee) + accumulator,
    0
  );
}
