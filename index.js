const inquirer = require("inquirer");
const fs = require("fs");

//create sections; description ToC, Installations, Usage, 
//TODO create and array of questions
const askQuestions = () =>
inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is your project title?", //C-Line Application ReadMe
    },
    {
      type: "input",
      name: "description",
      message: "Add a meaningful description of your Project",
    },

    {
      type: "input",
      name: "email",
      message: "What is your email address?",
    },

    {
      type: "input",
      name: "GitHub",
      message: "What is your GitHub username?",
    },

    {
      type: "checkbox",
      name: "license",
      message: "What license does you project use?", //ISC
      choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
    },

    {
      type: "input",
      name: "start",
      message: "What is the command to start the project?",
      default: "npm start",
    },

    {
      type: "input",
      name: "test",
      message: "What is the command to test the project?",
      default: "npm test",
    },

    {
      type: "input",
      name: "install",
      message: "What command will install the dependences?",
      default: "npm i",
    },
  ])


// askQuestions()
//   .then(answers => console.log(answers));

function generateMarkdown (answers) {
  let file= `
  ![${answers.license[0]}](https://img.shields.io/github/license/${answers.GitHub}/${answers.title})
  # ${answers.title}
  
  ## Description of Project
  
  ${answers.description}

  ## Installing Auth Server

  git clone ${answers.GitHub}

  to install run ${answers.install}

  ## Using Auth Server
  
  To use ${answers.title}, follow these steps
  
  - to start ${answers.start}
  
  - to test ${answers.test}
  
  
  ## Contact Me
  
  ${answers.email}`
  return file
}

function init() {
  askQuestions()
  .then(answers => {
    let markDown= generateMarkdown (answers)
    
    fs.writeFile("README.md", markDown, (err) => {
              if (err) {
                console.log("Error: " + err);
              } else {
                console.log("ReadMe successfully created!");
              }
    });
  });
}

init();
  // .then((answers) => {
  //   console.log(answers);
  //   axios
  //     .get(`https://api.github.com/users/${answers.github}`)
  //     .then((response) => {
  //       console.log(response);
      
  //       const readMe = `
  //       # ${answers.title}
  //       # ${answers.description}
  //       ${answers.email}
  //       ${answers.GitHub}
  //       ${answers.license} 

  //       `;

  //       fs.writeFile("ReadME.md", readMe, (err) => {
  //         if (err) {
  //           console.log("Error: " + err);
  //         } else {
  //           console.log("ReadMe successfully created!");
  //         }
  //       });
  //     });
  // });

  // const generateMarkdown = (answers) =>

  // <details open="open">
  // <summery><h2 style="diplay: inline-block">Table of Contents</h2>
  // </summery>
  // <ol>
  // <a href="#about the project">About the Project</a>
  // </ol>
  // </details> 
