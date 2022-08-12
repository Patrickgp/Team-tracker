INSERT INTO department (id, department_name)
VALUES
    (1, 'Management'),
    (2, 'R&D'),
    (3, 'IT'),
    (4, 'Marketing & Sales'),
    (5, 'Accounting'),
    (6, 'Human Resource'),
    (7, 'Customer Services');

INSERT INTO role (id, title, salary, department_id)
VALUES
    (1, "CEO", 4600000, 1),
    (2, "CFO", 2000000, 1),
    (3, "COO", 2000000, 1),
    (4, "General Manager", 115000, 1),
    (5, "IT Manager", 105000, 1),
    (6, "Full Stack Web Developer", 80000, 3),
    (7, "Marketing & Sales Manager", 80000, 1),
    (8, "Sales Representative", 50000, 4),
    (9, "Marketer", 30000, 4),
    (10, "Lead Accountant", 65000, 5),
    (11, "Expenses Clerk", 45000, 5),
    (12, "Payroll Clerk", 45000, 6),
    (13, "Benefits Coordinator", 30000, 6),
    (14, "Customer Service Supervisor", 45000, 7),
    (15, "Customer Service Rep", 30000, 7),
    (16, "Help Desk Representative", 30000, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES
    (1, "Dawn", "Keigh", 1, NULL), -- CEO
    (2, "Jack", "Pott", 2, 1), -- CFO
    (3, "Iona", "Mink", 3, 1), -- COO
    (4, "Bea", "O'Problem", 4, 3), -- General Manager
    (5, "Herbie", "Derr", 5, 4), -- IT Manager
    (6, "Patrick", "Poopathi", 6, 5), -- Full Stack Web Developer
    (7, "Ben", "Dover", 16, 5), -- Help Desk Representative
    (8, "Ima", "Hogg", 7, 4), -- Marketing & Sales Manager
    (9, "Hugh", "Raye", 8, 8), -- Sales Representative
    (10, "Horace", "Cope", 8, 8), -- Sales Representative
    (11, "Helen", "Hywater", 8, 8), -- Sales Representative
    (12, "Anita", "Mann", 9, 8), -- Marketer
    (13, "Chester", "Minit", 9, 8), -- Marketer
    (14, "Jay", "Walker", 10, 2),  -- Accountant
    (15, "Arty", "Fischel", 11, 2), -- Expenses Clerk
    (16, "Anna", "Mull", 12, 4), -- Payroll Clerk
    (17, "Bennie", "Factor", 13, 4), -- Benefits Coordinator
    (18, "Crystal", "Ball", 14, 8), -- Customer Service Supervisor
    (19, "Dick", "Tate", 15, 18), -- Customer Service Representative
    (20, "Jim", "Nasium", 15, 18), -- Customer Service Representative
    (21, "Joe", "King", 15, 18), -- Customer Service Representative
    (22, "Dinah", "Mite", 15, 18); -- Customer Service Representative