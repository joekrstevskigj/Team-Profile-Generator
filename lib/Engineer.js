const Employee = require("./Employee");

class Engineer extends Employee{
    constructor(name = "", employeeID = 0, email = "", github = ""){
        super(name, employeeID, email)

        this.github = github;
    }

    getRole(){
        return 'Engineer';
    }
    getGithub(){
        return this.github;
    }
}

module.exports = Engineer;