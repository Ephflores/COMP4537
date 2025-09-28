// This code was developed with assistance from OpenAI's ChatGPT.

const en = require("../lang/en/en.js");

exports.getDate = function (name) {
  const now = new Date();
  const greeting = en.messages.greeting.replace("%1", name);
  return `<p style="color:blue;">${greeting}${now}</p>`;
};