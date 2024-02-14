const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


//questions for the manager
const managerQ = [
    {
        type: 'input',
        name: 'managerName',
        message: "Manager name : ",
        default: "Manager Name"
    },
    {
        type: 'input',
        name: 'managerId',
        message: "Manager ID :",
        default: "1"
    },
    {
        type: 'input',
        name: 'managerEmail',
        message: "Manager e-mail :",
        default: "manager@gmail.com"
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: "Manager office number :",
        default: "1234"
    },
];

// questions for the engineer
const engineerQ = [
    {
        type: 'input',
        name: 'engineerName',
        message: "Engineer name:",
        default: "Engineer Name"
    },
    {
        type: 'input',
        name: 'engineerId',
        message: "Engineer ID:",
        default: "2"
    },
    {
        type: 'input',
        name: 'engineerEmail',
        message: "Engineer e-mail:",
        default: "engineer@gmail.com"
    },
    {
        type: 'input',
        name: 'github',
        message: "Engineer's GitHub username:",
        default: "https://github.com/engineer"
    },
];

// questions for the engineer intern
const internQ = [
    {
        type: 'input',
        name: 'internName',
        message: "Intern name:",
        default: "Intern Name"
    },
    {
        type: 'input',
        name: 'internId',
        message: "Intern ID:",
        default: "3"
    },
    {
        type: 'input',
        name: 'internEmail',
        message: "Intern email:",
        default: "intern@gmail.com"
    },
    {
        type: 'input',
        name: 'school',
        message: "Enter intern's school:",
        default: "My School"
    },
];
//create an array to hold all team members
let theTeam = [];

//function to render the actual html file
const createHTML = (outputPath) => {
    const html = render(theTeam);

    //create output folder only if not exsists
    if (!fs.existsSync(OUTPUT_DIR)){
        fs.mkdirSync(OUTPUT_DIR);
    }
   
    fs.writeFile(outputPath, html, err => {
        if (err) {
            console.error('Error writing HTML file:', err);
        } else {
            console.log('HTML file generated!');
        }
    });
}

//Entry point for the application


console.log("Let's build your team. Start with the Manager.")
inquirer.prompt(managerQ)
    .then((answers) => {
        theTeam.push(new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.officeNumber));
        chooseMember();
    })
    .catch((error) => console.error("Error:", error));

const chooseMember = () => {
    inquirer.prompt({
        type: 'list',
        name: 'role',
        message: 'Do you want to add a new member?',
        choices: ['Add an Engineer', 'Add an Intern', 'Finish building the team'],
    }).then(answer => {
        switch (answer.role) {
            case 'Add an Engineer':
                inquirer.prompt(engineerQ)
                    .then((answers) => {
                        theTeam.push(new Engineer(answers.engineerName, answers.engineerId, answers.engineerEmail, answers.github));
                        chooseMember();
                    })
                    .catch((error) => console.error("Error:", error));
                break;
            case 'Add an Intern':
                inquirer.prompt(internQ)
                    .then((answers) => {
                        theTeam.push(new Intern(answers.internName, answers.internId, answers.internEmail, answers.school));
                        chooseMember();
                    })
                    .catch((error) => console.error("Error:", error));
                break;
            case 'Finish building the team':
                createHTML(outputPath);
                break;
        }
    });
}


