// Your code here
function createEmployeeRecord(array)  {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(data){
    return data.map(function(array){
        return createEmployeeRecord(array)
    })
}

function createTimeInEvent(employee, timestamp){
    let [date, hour] = timestamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })
    return employee
}

function createTimeOutEvent(employee, timestamp) {
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(timestamp.split(' ')[1]),
        date: timestamp.split(' ')[0]
    })
    return employee
}

function hoursWorkedOnDate(employee, date){
    let inEvent = employee.timeInEvents.find(function(element){
        return element.date === date
    })

    let outEvent = employee.timeOutEvents.find(function(element){
        return element.date === date
    })
    return (outEvent.hour - inEvent.hour)/100
}

function wagesEarnedOnDate(employee, date){
    let wage = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return parseFloat(wage.toString())
}

function allWagesFor(employee){
    let availDates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let pay = availDates.reduce(function(memo, date){
        return memo + wagesEarnedOnDate(employee, date)
    }, 0)
    return pay
}

function findEmployeeByFirstName(array, firstName) {
    return array.find(function(r){
        return r.firstName === firstName
    })
}

function calculatePayroll(array) {
    return array.reduce(function(memo, r){
        return memo + allWagesFor(r)
    }, 0)
}