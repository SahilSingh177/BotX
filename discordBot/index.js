require("dotenv").config(); //initialize dotenv
const Discord = require("discord.js"); //import discord.js
const axios = require("axios");
const client = new Discord.Client(); //create new client

const commands = {
  "ping": ["Bot trial server"],
  " aww": ["Bot trial server"],
  "ugh": ["Bot trial server", "hope_'s server"],
  "!meme": ["hope_'s server", "Dark Domain"],
};

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

client.on("message", async (msg) => {
  switch (msg.content) {
    case "ping":
      if (commands["ping"].includes(msg.guild.name)) {
        msg.reply("Pong!");
        break;
      } else {
        msg.reply("No such command exits bro!");
        break;
      }
    case "ugh":
      msg.reply("Stfu!");
      break;

    case "aww":
      msg.reply("Suka!");
      break;
    //our meme command below

    case "!meme":
      if (commands["!meme"].includes(msg.guild.name)) {
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
      else {
        msg.reply("Naah Hard paas!");
        break;
      }
  }
});

function getRandomPost(posts) {
  const randomIndex = randomInt(0, posts.length);
  return posts[randomIndex].data;
}

client.login(process.env.CLIENT_TOKEN);
