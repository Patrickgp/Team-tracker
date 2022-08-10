const inquirer = require("inquirer");
const db = require("./db/connection");
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
          "Exit.",
        ],
        name: "optPrompts",
      },
    ])
    .then(function (answer) {
      switch (answer.optPrompts) {
        // Run viewDepartments() if selected
        case "View all Departments.":
          viewDepartments();
          break;

        // Run viewRoles() if selected
        case "View all Roles.":
          viewRoles();
          break;

        // Run viewEmployees() if selected
        case "View all Employees.":
          viewEmployees();
          break;

        // Run addDept() if selected
        case "Add a Department.":
          addDept();
          break;

        // Run addRole() if selected
        case "Add a Role.":
          addRole();
          break;

        // Run addEmployee() if selected
        case "Add an Employee.":
          addEmployee();
          break;

        // Run updateEmp() if selected
        case "Update an Employee Role.":
          updateEmp();
          break;

        // Run exit() if selected
        case "Exit.":
          exit();
          break;
      }
    });
}

function viewDepartments() {
  const sql = `SELECT id, department_name FROM department`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table("department", res);
    options();
  });
}

function viewRoles() {
  const sql = `SELECT id, title FROM roles`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table("roles", res);
    options();
  });
}

function viewEmployees() {
  const sql = `SELECT id, first_name, last_name, manager_id FROM employee`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table("All Employees", res);
    options();
  });
}

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
