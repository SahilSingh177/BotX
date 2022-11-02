require("dotenv").config(); //initialize dotenv
const Discord = require("discord.js"); //import discord.js
const axios = require("axios");
const client = new Discord.Client(); //create new client
const prefix = "tony";


const user_Command = {
  "Bot trial server": {
    "play songs": "bajao",
    "ping yourself": "ping",
    "kick user": "nikalo",
    "ban user": "ban",
    "unban user": "unban",
  },
  "Dark Domain": {
    "play songs": "bajao",
    "ping yourself": "ping",
    "kick user": "nikalo",
    "ban user": "ban",
    "unban user": "unban",
  },
  "hope_'s server": {
    "play songs": "bajao",
    "ping yourself": "ping",
    "kick user": "nikalo",
    "ban user": "ban",
    "unban user": "unban",
  },
};

const commands = {
  ping: ["Bot trial server"],
  aww: ["Bot trial server"],
  ugh: ["Bot trial server", "hope_'s server"],
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
  if (!msg.content.startsWith(prefix)) {
    return;
  }
  msg.content = msg.content.split(" ").slice(1).join(" ");
  let command = msg.content.split(" ")[0];
  let args = msg.content.replace(command, "").trim();
  console.log(args, command);

  if (
    "kick user" in user_Command[msg.guild.name] &&
    command === user_Command[msg.guild.name]["kick user"]
  ) {
    let userID = args.includes("<@!")
      ? args.replace("<@!", "").replace(">", "")
      : args.includes("<@")
      ? args.replace("<@", "").replace("<", "")
      : "";
    userID = userID.replace(">", "");
    if (userID == "") {
      msg.reply("Invalid user ID or mention.");
      return;
    }

    msg.guild.members.fetch(userID).then((member) => {
      member
        .kick("Kicked by " + msg.author.tag)
        .then((m) => {
          msg.channel.send("👢 Kicked <@" + userID + ">.");
        })
        .catch(() => {
          console.error;
          msg.reply("Could not kick the specified member.");
        });
    });
  }
  switch (command) {
    case "ban": {
      let userID = args.includes("<@!")
        ? args.replace("<@!", "").replace(">", "")
        : args.includes("<@")
        ? args.replace("<@", "").replace("<", "")
        : "";
      userID = userID.replace(">", "");
      if (userID == "") {
        msg.reply("Invalid user ID or mention.");
        return;
      }

      msg.guild.members.fetch(userID).then((member) => {
        member
          .ban({ days: 7, reason: "They deserved it" })
          .then(() => {
            msg.channel.send("🔨 Banned <@" + userID + ">.");
          })
          .catch(() => {
            console.error;
            msg.reply("Could not ban the specified member.");
          });
      });
      break;
    }

    case "unban": {
      let userID = args.includes("<@!")
        ? args.replace("<@!", "").replace(">", "")
        : args.includes("<@")
        ? args.replace("<@", "").replace("<", "")
        : "";
      userID = userID.replace(">", "");
      if (userID == "") {
        msg.reply("Invalid user ID or mention.");
        return;
      }

      msg.guild
        .fetchBans()
        .then((bans) => {
          let member = bans.get(userID);
          if (member == null) {
            msg.reply("Cannot find a ban for the given user.");
            return;
          }

          msg.guild.members
            .unban(userID)
            .then(() => {
              msg.channel.send("Unbanned <@" + userID + ">.");
            })
            .catch(console.error);
        })
        .catch(() => console.error);
      break;
    }
  }
  switch (msg.content) {
    case "ping":
      if (commands["ping"].includes(msg.guild.name)) {
        msg.reply("Pong!");
        break;
      } else {
        msg.reply("No such command exits bruh!");
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
      } else {
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
