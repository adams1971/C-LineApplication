const inquirer = require("inquirer");
const fs = require("fs");
const axios = require("axios");

inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: "What is your project title?",
    },
    {
      type: "input",
      name: "github",
      message: "What is your ghub username?",
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
