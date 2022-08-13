// Dependencies
const inquirer = require("inquirer");
const db = require("../db/connection");
const optObj = require("../index");
const cTable = require("console.table");

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
function viewRoles() {
  const sql = `SELECT title, role.id, salary, department.department_name FROM role LEFT JOIN department ON role.department_id = department.id`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    console.table("roles", res);
    optObj.options();
  });
}

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole() {
  const sql = `SELECT * FROM role`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "input",
          name: "roleId",
          message: "Enter ID for new Role: ",
        },
        {
          type: "input",
          name: "roleTitle",
          message: "Enter new role's Title: ",
        },
        {
          type: "input",
          name: "roleSalary",
          message: "Enter new role's salary: ",
        },
        {
          type: "input",
          name: "roleDept",
          message: "Enter Dept ID for new role: ",
        },
      ])
      .then((answers) => {
        const sql2 = `INSERT INTO role VALUES (?,?,?,?)`;
        db.query(
          sql2,
          [
            answers.roleId,
            answers.roleTitle,
            answers.roleSalary,
            answers.roleDept,
          ],
          (err) => {
            if (err) throw err;
            console.log(`${answers.roleSalary} has been added as a new role.`);
            optObj.options();
          }
        );
      });
  });
}

// WHEN I choose to delete a role
// THEN I am prompted to select a role and that selected role is deleted
function deleteRole() {
  let sql = `SELECT * FROM role`;
  db.query(sql, (err, res) => {
    if (err) throw err;
    inquirer
      .prompt([
        {
          type: "list",
          name: "terminatorRole",
          message: "Select role to delete from the database.",
          choices: res.map((role) => {
            return { name: `${role.title}`, value: role.id };
          }),
        },
      ])
      .then((answer) => {
        let sql2 = `DELETE FROM role WHERE ?`;
        db.query(sql2, [{ id: answer.terminatorRole }], (err) => {
          if (err) throw err;
          console.log(`Role has been deleted.`);
          optObj.options();
        });
      });
  });
}

// My functions I am exporting to index.js
exports.viewRoles = viewRoles;
exports.addRole = addRole;
exports.deleteRole = deleteRole;
