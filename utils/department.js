// Dependencies
const inquirer = require("inquirer");
const db = require("../db/connection");
const rolesObj = require("./roles");
const empObj = require("./employee");
const optObj = require("../index");
const cTable = require("console.table");

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
function viewDepartments() {
  const sql = `SELECT id, department_name FROM department`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table("department", res);
    optObj.options();
  });
}

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
function addDept() {
  const sql = `SELECT * FROM department`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "departmentId",
          message: "Enter ID for new Department: ",
        },
        {
          type: "input",
          name: "departmentName",
          message: "Enter new Department Name: ",
        },
      ])
      .then((answers) => {
        const sql2 = `INSERT INTO department VALUES (?,?)`;
        db.query(
          sql2,
          [answers.departmentId, answers.departmentName],
          (err) => {
            if (err) throw err;
            console.log(
              `${answers.departmentName} has been added as a new department`
            );
            optObj.options();
          }
        );
      });
  });
}

exports.viewDepartments = viewDepartments;
exports.addDept = addDept;
