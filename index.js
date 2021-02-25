const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios"); //github api, w/o this the username call will not work
//create sections; description ToC, Installations, Usage, 
//create questions
inquirer
  .prompt([
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
      type: "input",
      name: "license",
      message: "What license does you project use?", //ISC
    },
  ])
  .then((answers) => {
    console.log(answers);
    axios
      .get(`https://api.github.com/users/${answers.github}`)
      .then((response) => {
        console.log(response);
      
        const readMe = `
        # ${answers.title}
        # ${answers.description}
        ${answers.email}
        ${answers.GitHub}
        ${answers.license} 

        `;

        fs.writeFile("ReadME.md", readMe, (err) => {
          if (err) {
            console.log("Error: " + err);
          } else {
            console.log("ReadMe successfully created!");
          }
        });
      });
  });

  // const generateMarkdown = (answers) =>

  // <details open="open">
  // <summery><h2 style="diplay: inline-block">Table of Contents</h2>
  // </summery>
  // <ol>
  // <a href="#about the project">About the Project</a>
  // </ol>
  // </details> 
