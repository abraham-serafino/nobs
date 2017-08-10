const { AppActions } = require('../stores/appState');
const { createContainer } = require('../stores/SimpleStore');
const { EmployeeActions } = require('../stores/employeeList.es6');
const React = require('react');

export function AppComponent({
  employeeList,
  appState,
  addEmployee,
  removeEmployee,
  updateName,
  updateRank,
  reset,
}) {
  const { name, rank } = appState;
  const sn = (new Date()).valueOf();

  function onChange(field) {
    const callUpdater = {
      name: updateName,
      rank: updateRank,
    };

    return (e) => {
      callUpdater[field](e.target.value);
    };
  }

  return (
    <div>
      <form name='add-employee-form' onSubmit={(e) => {
        addEmployee({ name, rank, sn });
        reset();
        e.preventDefault();
      }}>
          Name:
          <input type='text' value={name} onChange={onChange('name')}/><br/>
          Rank:
          <input type='text' value={rank} onChange={onChange('rank')}/><br/>

          <button type='submit'>Add</button>
      </form>
      <ul>
        {employeeList.map(employee =>
          <li key={employee.sn}>
            <button onClick={() => removeEmployee(employee)}>Remove</button>
            &nbsp;
            {employee.name} - {employee.rank}
          </li>
        )}
      </ul>
    </div>
  );
}

module.exports = {
  App: createContainer(AppComponent, {
    ...EmployeeActions,
    ...AppActions,
  }),

  AppComponent,
};
