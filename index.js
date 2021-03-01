const inquirer = require("inquirer");
const fs = require("fs");

//TODO create and array of questions
const askQuestions = () =>
inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "What is your project title?", 
    },
    {
      type: "input",
      name: "description",
      message: "Add a description of your Project",
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
      message: "What license does your project use?", 
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

  ]);


// askQuestions()
//   .then(answers => console.log(answers));
//generate markdown README
function generateMarkdown (answers) {
  let file= `
  
  ![readmeIMG.png](readmeIMG.png)
  
  ![${answers.license[0]}](https://img.shields.io/github/license/${answers.GitHub}/${answers.title})
  https://opensource.org/licenses/MIT
  # ${answers.title}

  ## Table of Contents
  - [Description of Project](#description-of-project)
  - [Installing Project](#installing-project)
  - [Using the Project](#using-the-project)
  - [Demo Video](#demo-video)
  - [Contact](#contact)

  ## Description of Project
  
  ${answers.description}

  ## Installing Project

  - git clone @ ${answers.GitHub} and paste into your terminal

  - To install dependencies run ${answers.install}
  
  ## Using the Project
  
  - To use ${answers.title}, follow these steps;

  - - To Run open file in VSCode and open Intergrated Terminal
  
  - - To Begin type node index.js 

  - - Follow prompts and answer question
  
  - - ReadMe is generated 

  - - To start ${answers.start}
  
  - - To test ${answers.test}

  ![terminal.png](terminal.png)

  ## Demo Video
  https://drive.google.com/file/d/1eHpmS32xqbijSfxDkKUXo_sB8JG8SUa7/view?usp=sharing

  ## Contact

  ${answers.email}

  [https://github.com/adams1971](https://github.com/adams1971)`

  return file
}

//initiate markDown
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

