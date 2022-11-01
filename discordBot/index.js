require("dotenv").config(); //initialize dotenv
const Discord = require("discord.js"); //import discord.js
const axios = require("axios");
const client = new Discord.Client(); //create new client
const client2 = new Discord.Client(); //create new client

// const users = ["Sahil", "Samuel"];
// const commands = {
//   ping: ["Sahil"],
//   aww: ["Sahil", "Samuel"],
//   ugh: ["Samuel"],
//   "!meme": ["Sahil"],
// };

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const subReddits = [
  "r/programmerreactions",
  "r/ProgrammerHumor",
  "r/programme_irl",
  "r/softwaregore",
  "r/badUIbattles",
];
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

console.log(client)

client.on("message", async (msg) => {
  switch (msg.content) {
    case "ping":
      msg.reply("Pong!");
      break;
    
    case "ugh":
      msg.reply("Stfu!");
      break;
    
    case "aww":
      msg.reply("Suka!");
      break;
    //our meme command below

    case "!meme":
      msg.channel.send("Here's your meme!"); //Replies to user command
      
      const randomIndex = randomInt(0, subReddits.length);
      axios
        .get(`https://reddit.com/${subReddits[randomIndex]}/.json`)
        .then((resp) => {
          const {
            title,
            url,
            subreddit_name_prefixed: subreddit,
          } = getRandomPost(resp.data.data.children);
          msg.channel.send(`${title}\n${url}\n from ${subreddit}`);
        });
      break;
  }
});
client2.on("message", async (msg) => {
  switch (msg.content) {
    case "ping":
      msg.reply("Pong!");
      break;
    

    case "!meme":
      msg.channel.send("Here's your meme!"); //Replies to user command
      
      const randomIndex = randomInt(0, subReddits.length);
      axios
        .get(`https://reddit.com/${subReddits[randomIndex]}/.json`)
        .then((resp) => {
          const {
            title,
            url,
            subreddit_name_prefixed: subreddit,
          } = getRandomPost(resp.data.data.children);
          msg.channel.send(`${title}\n${url}\n from ${subreddit}`);
        });
      break;
  }
});

function getRandomPost(posts) {
  const randomIndex = randomInt(0, posts.length);
  return posts[randomIndex].data;
}

client.login(process.env.CLIENT_TOKEN);
client2.login(process.env.CLIENT_TOKEN);
