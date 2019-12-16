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

function createEmployeeRecords(employees) {
    return employees.map(createEmployeeRecord)
}

function createTimeInEvent(employee, dateHour) {
    employee.timeInEvents.push({
        type: "TimeIn",
        date: dateHour.split(" ")[0],
        hour: parseInt(dateHour.split(" ")[1])
    })
    return employee
}

function createTimeOutEvent(employee, dateHour) {
    employee.timeOutEvents.push({
        type: "TimeOut",
        date: dateHour.split(" ")[0],
        hour: parseInt(dateHour.split(" ")[1])
    })
    return employee
}

function hoursWorkedOnDate(employee, date) { 
    const timeInEvent = employee.timeInEvents.find(event => event.date === date)
    const timeOutEvent = employee.timeOutEvents.find(event => event.date === date)
    return (timeOutEvent.hour - timeInEvent.hour)/100
}

function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour
}

function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date)
    const wagesEarned = datesWorked.map(date => wagesEarnedOnDate(employee, date))
    return wagesEarned.reduce((e, memo) => e + memo, 0)
}

function calculatePayroll(employees) { 
    return employees.reduce((memo, employee) => allWagesFor(employee) + memo, 0)
}

function findEmployeeByFirstName(employees, firstName) {
    return employees.find(employee => employee.firstName === firstName)
}
