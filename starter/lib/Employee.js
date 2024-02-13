class Employee {
    constructor(name = "", employeeID = 0, email = "") {
        this.name = name;
        this.id = employeeID;
        this.email = email;
    }


    getName() { return this.name; }
    getId() { return this.id; }
    getEmail() { return this.email; }
    getRole() { return "Employee"; }
}

module.exports = Employee;