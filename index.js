let createEmployeeRecord = function(row) {
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents:[],
        timeOutEvents:[]
    }
}

let createEmployeeRecords = function(employeeData) {
    return employeeData.map(function(row) {
        return createEmployeeRecord(row)
    })
}

let createTimeInEvent = function(employeeRecord, timeStamp) {
    let [date, hour] = timeStamp.split(" ")
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date,
    })
    return employeeRecord
  }
  
  let createTimeOutEvent = function(employeeRecord, timeStamp) {
    let [date, time] = timeStamp.split(" ")
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(time, 10),
      date,
    })
    return employeeRecord
  }
  
  let hoursWorkedOnDate = function(employee, date) {
    let inEvent = employee.timeInEvents.find(function(e){
      return e.date === date
  })
  let outEvent = employee.timeOutEvents.find(function(e){
      return e.date === date
  })
  return (outEvent.hour - inEvent.hour) / 100
  }
  
  let wagesEarnedOnDate = function(employee, dateSought) {
    let rawWage = hoursWorkedOnDate(employee, dateSought)
    * employee.payPerHour
  return parseFloat(rawWage.toString())
  }
  
  let allWagesFor = function(employee) {
    let dates = employee.timeInEvents.map(e => e.date)
    let wages = dates.map(d => wagesEarnedOnDate(employee, d))
    return wages.reduce((a, b) => a+b )
  }
  
  let findEmployeeByFirstName = function(sourceArr, name) {
    let employee = sourceArr.find(n => n.firstName === name)
    return employee
  }
  
  let calculatePayroll = function(employees) {
    let payroll = employees.map(e => allWagesFor(e))
    return payroll.reduce((a, b) => a+b )
  }