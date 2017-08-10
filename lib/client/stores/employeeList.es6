const { createReducer } = require('./SimpleStore');

const initialState = [
  {
    name: 'Bob',
    rank: 'Manager',
    sn: (new Date()).valueOf()
  },
];

const EmployeeActions = {
  addEmployee(employeeList, { name, rank, sn }) {
    employeeList.push({ name, rank, sn });
    return [...employeeList];
  },

  removeEmployee(employeeList, { name, rank, sn }) {
    const index = employeeList.indexOf({ name, rank, sn });

    if (index) {
      employeeList.splice(index);
    }

    return [...employeeList];
  },
};

const employeeList = createReducer('employeeList', EmployeeActions, initialState);

module.exports = { employeeList, EmployeeActions };
