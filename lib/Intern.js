const Employee = require("./Employee");

class Intern extends Employee{
    constructor(name = "", employeeID = 0, email = "", school = ""){
        super(name, employeeID, email)

        this.school = school;
    }

    getRole(){
        return 'Intern';
    }
    getSchool(){
        return this.school;
    }
}

module.exports = Intern;