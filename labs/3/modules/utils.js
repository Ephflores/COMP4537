// This code was developed with assistance from OpenAI's ChatGPT.

const messages = require("../lang/en/en.js");

exports.getDate = function (name) {
  const now = new Date();
  const message = messages.greeting.replace("%1", name);
  return `<p style="color:blue;">${message}${now}</p>`;
};