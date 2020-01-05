// Your code here

function createEmployeeRecord(array) {
    let employee = {
        firstName: array[0], familyName: array[1], title: array[2], payPerHour: array[3], timeInEvents: [], timeOutEvents: []
    };
    return employee
};

function createEmployeeRecords(arrayOArrays) {
    let objectArray = arrayOArrays.map(createEmployeeRecord)
    return objectArray
};

function createTimeInEvent(obj, date) {
    let record = obj
    let dateTime = date.split(" ")
    let monthNDay = dateTime[0]
    let time = dateTime[1]
    let timeIn = {
        type: "TimeIn",
        hour: parseInt(time),
        date: monthNDay
    }
    record.timeInEvents.push(timeIn)
    return record
}

function createTimeOutEvent(obj, date) {
    let record = obj
    let dateTime = date.split(" ")
    let monthNDay = dateTime[0]
    let time = dateTime[1]
    let timeOut = {
        type: "TimeOut",
        hour: parseInt(time),
        date: monthNDay
    }
    record.timeOutEvents.push(timeOut)

    return record
}

function hoursWorkedOnDate(obj, date) {
    let timeIn = obj.timeInEvents.find(element => element.date === date)
    let timeOut = obj.timeOutEvents.find(element => element.date === date)
    let hours = timeOut.hour - timeIn.hour
    return hours / 100
}

function wagesEarnedOnDate(obj, date) {
    let hours = hoursWorkedOnDate(obj, date)
    let pay = hours * obj.payPerHour
    return pay
}

function allWagesFor(obj) {
    let allDates = obj.timeInEvents.map(element => element.date)
    let allPay = 0
    for (let i = 0; i < allDates.length; i++) {
        allPay = allPay + wagesEarnedOnDate(obj, allDates[i])
    }
    return allPay
}

function findEmployeeByFirstName(srcArray, firstName) {
    let eRecord = srcArray.find(element => element.firstName === firstName)
    return eRecord
}

function calculatePayroll(array) {
    let arrayOfWages = array.map(element => allWagesFor(element))
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    let wages = arrayOfWages.reduce(reducer)
    return wages
}