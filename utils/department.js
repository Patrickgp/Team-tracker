// Dependencies
const inquirer = require("inquirer");
const db = require("../db/connection");
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

// WHEN I choose to delete a department
// THEN I am prompted to select a department and that department is deleted from the database
function deleteDept() {
  let sql = `SELECT * FROM department`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "terminatorDepartment",
          message: "Select department to delete from the database.",
          choices: res.map((department) => {
            return {
              name: `${department.department_name}`,
              value: department.id,
            };
          }),
        },
      ])
      .then((answer) => {
        let sql2 = `DELETE FROM department WHERE ?`;
        db.query(sql2, [{ id: answer.terminatorDepartment }], (err) => {
          if (err) throw err;
          console.log(`Department has been deleted.`);
          optObj.options();
        });
      });
  });
}

// WHEN I choose to view total salaries of each department
// THEN I am prompted to select a department and that department's total salaries are displayed
function viewTotalSalaries() {
  const sql = `SELECT  * FROM department`;
  db.query(sql, (err, response) => {
    if (err) throw err;
    const departments = response.map((department) => {
      return { name: `${department.department_name}`, value: department.id };
    });
    inquirer
      .prompt([
        {
          type: "list",
          name: "deptSal",
          message: "Select a department to view total salaries",
          choices: departments,
        },
      ])
      .then((answer) => {
        const sql2 = `SELECT SUM(salary) FROM role LEFT JOIN employee ON role_id = role.id WHERE ?`;
        db.query(
          sql2,
          [{ department_id: answer.deptSal }],
          function (err, res) {
            if (err) throw err;
            console.table(res);
            optObj.options();
          }
        );
      });
  });
}

// My functions I am exporting to index.js
exports.viewDepartments = viewDepartments;
exports.addDept = addDept;
exports.deleteDept = deleteDept;
exports.viewTotalSalaries = viewTotalSalaries;
