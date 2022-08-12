// Dependencies
const inquirer = require("inquirer");
const db = require("../db/connection");
const rolesObj = require("./roles");
const deptObj = require("./department");
const optObj = require("../index");
const cTable = require("console.table");

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewEmployees() {
  const sql = `SELECT employee.id, employee.first_name, employee.last_name, role.title AS role, CONCAT(manager.first_name,' ', manager.last_name) AS manager, department.department_name FROM employee LEFT JOIN role ON employee.role_id = role.id LEFT JOIN department ON role.department_id = department.id LEFT JOIN employee manager ON employee.manager_id = manager.id`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table("All Employees", res);
    optObj.options();
  });
}

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee() {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "employeeId",
          message: "Enter ID for new employee: ",
        },
        {
          type: "input",
          name: "employeeFirstName",
          message: "Enter new employee's first name: ",
        },
        {
          type: "input",
          name: "employeeLastName",
          message: "Enter new employee's last name: ",
        },
        {
          type: "input",
          name: "employeeRoleID",
          message: "Enter new employee's role ID#: ",
        },
        {
          type: "input",
          name: "employeeManager",
          message: "Enter new employee's direct Manager: ",
        },
      ])
      .then((answers) => {
        const sql2 = `INSERT INTO employee VALUES (?,?,?,?,?)`;
        db.query(
          sql2,
          [
            answers.employeeId,
            answers.employeeFirstName,
            answers.employeeLastName,
            answers.employeeRoleID,
            answers.employeeManager,
          ],
          (err) => {
            if (err) throw err;
            console.log(
              `${answers.employeeFirstName} ${answers.employeeLastName} has been added as a new employee.`
            );
            optObj.options();
          }
        );
      });
  });
}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
function updateEmp() {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (err, res) => {
    const employees = res.map(function (element) {
      return {
        name: `${element.first_name} ${element.last_name}`,
        value: element.id,
      };
    });

    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee's role do you want to update",
          choices: employees,
        },
      ])
      .then((input1) => {
        const sql2 = `SELECT * FROM role`;
        db.query(sql2, (err, data) => {
          const roles = data.map(function (role) {
            return {
              name: role.title,
              value: role.id,
            };
          });

          inquirer
            .prompt([
              {
                type: "list",
                name: "roleId",
                message: "What is their new role? ",
                choices: roles,
              },
            ])
            .then((input2) => {
              const sql3 = `UPDATE employee SET employee.role_id = ? WHERE employee.id = ?`;
              db.query(
                sql3,
                [input2.roleId, input1.employeeId],
                function (err, res) {
                  var tempPosition;
                  for (var i = 0; i < roles.length; i++) {
                    if (roles[i].value == input2.roleId) {
                      tempPosition = roles[i].name;
                    }
                  }
                  var tempName;
                  for (var x = 0; x < employees.length; x++) {
                    if (employees[x].value == input1.employeeId) {
                      tempName = employees[x].name;
                    }
                  }
                  if (res.changedRows === 1) {
                    console.log(
                      `Updated ${tempName} to position of ${tempPosition} successfully.`
                    );
                  } else {
                    console.log(
                      `Could not change ${tempName}'s current position. Try again.`
                    );
                  }
                  optObj.options();
                }
              );
            });
        });
      });
  });
}

// WHEN I choose to update an employee's manager
// THEN I am prompted to select an employee to update and their new manager is updated in the database
function updateEmpMan() {
  const sql = `SELECT * FROM employee`;
  db.query(sql, (err, res) => {
    const employees = res.map(function (element) {
      return {
        name: `${element.first_name} ${element.last_name}`,
        value: element.id,
      };
    });

    inquirer
      .prompt([
        {
          type: "list",
          name: "employeeId",
          message: "Which employee is receiving a new manager?",
          choices: employees,
        },
      ])
      .then((input1) => {
        const sql2 = `SELECT * FROM employee`;
        db.query(sql2, (err, data) => {
          const mgr = data.map(function (element) {
            return {
              name: `${element.first_name} ${element.last_name}`,
              value: element.id,
            };
          });

          inquirer
            .prompt([
              {
                type: "list",
                name: "mgrId",
                message: "Who is their new Manager ",
                choices: mgr,
              },
            ])
            .then((input2) => {
              const sql3 = `UPDATE employee SET employee.manager_id = ? WHERE employee.id = ?`;
              db.query(
                sql3,
                [input2.mgrId, input1.employeeId],
                function (err, res) {
                  var tempManager;
                  for (var i = 0; i < mgr.length; i++) {
                    if (mgr[i].value == input2.mgrId) {
                      tempManager = mgr[i].name;
                    }
                  }
                  var tempName;
                  for (var x = 0; x < employees.length; x++) {
                    if (employees[x].value == input1.employeeId) {
                      tempName = employees[x].name;
                    }
                  }
                  if (res.changedRows === 1) {
                    console.log(
                      `Updated manager of ${tempName} to ${tempManager} successfully.`
                    );
                  } else {
                    console.log(
                      `Could not change ${tempName}'s current manager. Try again.`
                    );
                  }
                  optObj.options();
                }
              );
            });
        });
      });
  });
}

// WHEN I choose to show employees organized by their managers
// THEN I am prompted to select a manager to display their teams
function empByMan() {
  const sql = `SELECT * FROM employee WHERE employee.id IN (null, 1, 2, 3, 4, 5, 8, 18)`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    const managers = res.map(function (element) {
      return {
        name: `${element.first_name} ${element.last_name}`,
        value: element.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "list",
          name: "empByMgr",
          message: "Select a manager to view their employees: ",
          choices: managers,
        },
      ])
      .then((response) => {
        console.log(response.empByMgr);
        let sql2 = `SELECT employee.id, employee.first_name, employee.last_name, title AS role, CONCAT(manager.first_name, ' ', manager.last_name) AS manager, department.department_name AS department FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on department.id = role.department_id LEFT JOIN employee manager on employee.manager_id = manager.id WHERE employee.manager_id = ?`;
        db.query(sql2, [response.empByMgr], (err, data) => {
          if (err) throw err;
          console.table(data);
          optObj.options();
        });
      });
  });
}

function empByDept() {}

function deleteEmp() {}

exports.updateEmp = updateEmp;
exports.addEmployee = addEmployee;
exports.viewEmployees = viewEmployees;
exports.updateEmpMan = updateEmpMan;
exports.empByMan = empByMan;
