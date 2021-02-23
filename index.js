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
      name: "github",
      message: "What is your GitHub username?",
    },

    {
      type: "input",
      name: "email",
      message: "What is your email address?",
    },

    {
      type: "input",
      name: "description",
      message: "Briefly describe your project",
    },

    {
      type: "input",
      name: "license",
      message: "What license does you project use?",
    },
  ])
  .then((answers) => {
    console.log(answers);
    axios
      .get(`https://api.github.com/users/${answers.github}`)
      .then((response) => {
        console.log(response);
        //make github and email link to repo
        const readMe = `
        # ${answers.title}
        ${answers.github}
        ${answers.email} 

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
