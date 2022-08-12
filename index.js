// Dependencies
const inquirer = require("inquirer");
const db = require("./db/connection");
const rolesObj = require("./utils/roles");
const deptObj = require("./utils/department");
const empObj = require("./utils/employee");
const cTable = require("console.table");

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  options();
});

// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
function options() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        choices: [
          "View all Departments.",
          "View all Roles.",
          "View all Employees.",
          "Add a Department.",
          "Add a Role.",
          "Add an Employee.",
          "Update an Employee Role.",
          "Update Employee's Manager.",
          "View Employees by Manager.",
          "View Employees by Department.",
          "Delete a Department",
          "Delete a Role",
          "Delete an Employee",
          "View Total Salaries by Department.",
          "Exit.",
        ],
        name: "optPrompts",
      },
    ])
    .then(function (answer) {
      switch (answer.optPrompts) {
        // Run viewDepartments() if selected
        case "View all Departments.":
          deptObj.viewDepartments();
          break;

        // Run viewRoles() if selected
        case "View all Roles.":
          rolesObj.viewRoles();
          break;

        // Run viewEmployees() if selected
        case "View all Employees.":
          empObj.viewEmployees();
          break;

        // Run addDept() if selected
        case "Add a Department.":
          deptObj.addDept();
          break;

        // Run addRole() if selected
        case "Add a Role.":
          rolesObj.addRole();
          break;

        // Run addEmployee() if selected
        case "Add an Employee.":
          empObj.addEmployee();
          break;

        // Run updateEmp() if selected
        case "Update an Employee Role.":
          empObj.updateEmp();
          break;

        // Run exit() if selected
        case "Exit.":
          exit();
          break;
      }
    });
}

exports.options = options;
