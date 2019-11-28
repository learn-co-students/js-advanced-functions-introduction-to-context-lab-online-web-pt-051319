const createEmployeeRecord = ([firstName, familyName, title, payPerHour]) => {
	
	return {
		'firstName': firstName,
		'familyName': familyName,
		'title': title,
		'payPerHour': payPerHour,
		'timeInEvents': [],
		'timeOutEvents': []
	}
}

const createEmployeeRecords = (records) => {
	return records.map(record => createEmployeeRecord(record))
}

const createTimeEvent = (eventInfo, type) => {
	let event = {
		'type': type,
		'date': eventInfo.split(' ')[0],
		'hour': parseInt(eventInfo.split(' ')[1])
	}
	return event
}

const createTimeInEvent = (record, eventInfo) => {
	record.timeInEvents.push(createTimeEvent(eventInfo, 'TimeIn'))
	return record
}

const  createTimeOutEvent = (record, eventInfo) => {
	record.timeOutEvents.push(createTimeEvent(eventInfo, 'TimeOut'))
	return record
}

const hoursWorkedOnDate = (record, date) => {
	let eventIn = record.timeInEvents.find(event => event.date == date)
	let eventOut = record.timeOutEvents.find(event => event.date == date)
	return eventOut && eventIn ? (eventOut.hour - eventIn.hour)/100 : 0
}

const wagesEarnedOnDate = (record, date) => {
	return record.payPerHour * hoursWorkedOnDate(record, date)
}

const allWagesFor = (record) => {
	return record.timeOutEvents.reduce((wages, event) => wages + wagesEarnedOnDate(record, event.date), 0)
}

const calculatePayroll = (employees) => {
	return employees.reduce((payroll, employee) => payroll + allWagesFor(employee), 0 )
}

const findEmployeeByFirstName = (employees, firstName) => {
	return employees.find(employee => employee.firstName == firstName) || false
}