const Employee = require("./Employee");

class Manager extends Employee{
    constructor(name = "", employeeID = 0, email = "", officeNumber = ""){
        super(name, employeeID, email)

        this.officeNumber = officeNumber;
    }

    getRole(){
        return 'Manager';
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
}

module.exports = Manager;