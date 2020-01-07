// Your code here
function createEmployeeRecord(employee) {
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeRecord) {
    return employeeRecord.map(createEmployeeRecord)
}

function createTimeInEvent(employeeRecord, dateHour) {
    let [date, hour] = dateHour.split(' ')

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        date,
        hour: parseInt(hour, 10)
    })
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateHour) {
    let [date, hour] = dateHour.split(' ')

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        date,
        hour: parseInt(hour, 10)
    })
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date) { 
    let timeInEvent = employeeRecord.timeInEvents.find(e => e.date === date)
    let timeOutEvent = employeeRecord.timeOutEvents.find(e => e.date === date)
    return (timeOutEvent.hour - timeInEvent.hour)/100
}

function wagesEarnedOnDate(employeeRecord, date) {
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour
}

function allWagesFor(employeeRecord) {
    let workedDates = employeeRecord.timeInEvents.map(e => e.date)
    return (workedDates.map(date => wagesEarnedOnDate(employeeRecord, date)).reduce((e, memo) => e + memo, 0))
}

function calculatePayroll(employeeRecords) { 
    return employeeRecords.reduce((memo, employeeRecord) => allWagesFor(employeeRecord) + memo, 0)
}

function findEmployeeByFirstName(employeeRecords, firstName) {
    return employeeRecords.find(employee => employee.firstName === firstName)
}