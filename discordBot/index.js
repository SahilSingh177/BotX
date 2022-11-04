import {} from "dotenv/config"; //initialize dotenv
import {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  messageLink,
} from "discord.js";
//import discord.js
import axios from "axios";
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildMembers,
  ],
}); //create new client
import { DisTube } from "distube";
import { SpotifyPlugin } from "@distube/spotify";
import { SoundCloudPlugin } from "@distube/soundcloud";
import { YtDlpPlugin } from "@distube/yt-dlp";

let flag = true;
let servers = {};
let data;
const getData = async (e) => {
  const getAllServers = await fetch("http://localhost:5000/get-bot", {
    method: "get",
  });
  const resp = await getAllServers.json();
  data = resp;
  for (let i = 0; i < resp.length; i++) {
    servers[String(resp[i].name)] = i;
  }
  flag = false;
};
while (flag == true) {
  await getData();
}

client.emotes = {
  play: "▶️",
  stop: "⏹️",
  queue: "📄",
  success: "☑️",
  repeat: "🔁",
  error: "❌",
};

client.distube = new DisTube(client, {
  leaveOnStop: true,
  leaveOnEmpty: false,
  leaveOnFinish: false,
  emitNewSongOnly: false,
  emitAddSongWhenCreatingQueue: false,
  emitAddListWhenCreatingQueue: false,
  savePreviousSongs: true,
  searchSongs: 0,
  plugins: [
    new SpotifyPlugin({
      emitEventsAfterFetching: true,
    }),
    new SoundCloudPlugin(),
    new YtDlpPlugin(),
  ],
});

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

const flirtyText = [
  "Thinking a lot of things about you I can't say…but I could text.",
  "You're my favorite veggie—a cute-cumber!",
  "Can't stop thinking about your lips.",
  "Feeling cuddly? ...",
  `When can I see you again? Pick a day that ends in y`,
  `Do you believe in love at first text? Because you can delete this one, and I can keep texting until you do.`,
];
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

client.on("messageCreate", async (msg) => {
  let prefix = [];
  for (let i = 0; i < data[servers[msg.guild.name]].bots.length; i++) {
    prefix.push(data[servers[msg.guild.name]].bots[i].bot_name);
  }
  const first = msg.content.split(" ")[0];

  if (msg.author.bot || !msg.guild) return;

  if (!prefix.includes(first)) {
    return;
  }
  let descr = data[servers[msg.guild.name]].bots[prefix.indexOf(first)].command;
  let comm = data[servers[msg.guild.name]].bots[prefix.indexOf(first)].desc;
  msg.content = msg.content.split(" ").slice(1).join(" ");
  let command_user = msg.content.split(" ")[0];
  let args = msg.content.replace(command_user, "").trim();
  
  if (
    "kick user" in descr &&
    command_user === comm[descr.indexOf("kick user")]
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
  if ("ban user" in descr && command_user === comm[descr.indexOf("ban user")]) {
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
  }

  if (
    "unban user" in descr &&
    command_user === comm[descr.indexOf("unban user")]
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
  }
  if ("meme" in descr && command_user === comm[descr.indexOf("meme")]) {
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
  }
  if ("flirt" in descr && command_user === comm[descr.indexOf("flirt")]) {
    const randomIndex = randomInt(0, flirtyText.length);
    msg.channel.send(flirtyText[randomIndex]);
  }
  args = msg.content.trim().split(/ +/g);
  let cmd = args.shift()?.toLowerCase();
  let queue = client.distube.getQueue(msg);
  
  if ((descr.includes("play a song")) && (cmd === comm[descr.indexOf("play a song")])) {
    let song = args.join(" ");
    let voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) {
      return msg.reply(`**👀 Please join a voice channel.**`);
    } else if (!song) {
      return msg.reply(`**👀 Please provide a song name or link.**`);
    } else {
      client.distube.play(voiceChannel, song, {
        member: msg.member,
        textChannel: msg.channel,
        msg: msg,
      });
    }
  }
  if (
    "playskip a song" in descr &&
    command_user === cmd[descr.indexOf("playskip a song")]
  ) {
    let song = args.join(" ");
    let voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) {
      return msg.reply(`**👀 Please join a voice channel.**`);
    } else if (!song) {
      return msg.reply(`**👀 Please provide a song name or link.**`);
    } else {
      client.distube.play(voiceChannel, song, {
        member: msg.member,
        textChannel: msg.channel,
        msg: msg,
        skip: true,
      });
    }
  }
  if (
    "playtop a song" in descr &&
    command_user === cmd[descr.indexOf("playtop a song")]
  ) {
    let song = args.join(" ");
    let voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) {
      return msg.reply(`**👀 Please join a voice channel.**`);
    } else if (!song) {
      return msg.reply(`**👀 Please provide a song name or link.**`);
    } else {
      client.distube.play(voiceChannel, song, {
        member: msg.member,
        textChannel: msg.channel,
        msg: msg,
        skip: true,
        unshift: true,
      });
    }
  }
  if (
    "skip song" in descr &&
    command_user === cmd[descr.indexOf("skip song")]
  ) {
    let voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) {
      return msg.reply(`**👀 Please join a voice channel.**`);
    } else if (!queue) {
      return msg.reply(`**Nothing to play.**`);
    } else if (queue.songs.length <= 1) {
      queue.stop();
      return msg.reply(`End of the playlist.\n`);
    } else {
      queue.skip().then((s) => {
        msg.reply(`Song Skipped.\n`);
      });
    }
  }

  if (
    "stop playing song" in descr &&
    command_user === cmd[descr.indexOf("stop playing song")]
  ) {
    let voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) {
      return msg.reply(`**👀 Please join a voice channel.**`);
    } else if (!queue) {
      return msg.reply(`**Nothing to play.**`);
    } else {
      queue.stop().then((s) => {
        msg.reply(`Song stopped`);
      });
    }
  }
  if (
    "autoplay songs" in descr &&
    command_user === cmd[descr.indexOf("autoplay songs")]
  ) {
    let voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) {
      return msg.reply(`**👀 Please join a voice channel.**`);
    } else if (!queue) {
      return msg.reply(`**Nothing to play.**`);
    } else {
      let autoplay = await queue.toggleAutoplay();
      msg.reply(`Autoplay: \`${autoplay ? "On" : "Off"}\``);
    }
  }
  if (
    "use filter for song" in descr &&
    command_user === cmd[descr.indexOf("use filter for song")]
  ) {
    let voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) {
      return msg.reply(`**👀 Please join a voice channel.**`);
    } else if (!queue) {
      return msg.reply(`**Nothing to play.**`);
    } else {
      if (args[0] === "off" && queue.filters?.length) queue.setFilter(false);
      else if (Object.keys(client.distube.filters).includes(args[0])) {
        if (queue.filters.has(args[0])) queue.filters.remove(args[0]);
        else queue.filters.add(args[0]);
      } else if (args[0]) {
        msg.channel.send(
          `Current Queue Filter: \`${queue.filters.names.join(", ") || "Off"}\``
        );
      }
    }
  }
  if (
    "pause song" in descr &&
    command_user === cmd[descr.indexOf("pause song")]
  ) {
    let voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) {
      return msg.reply(`**👀 Please join a voice channel.**`);
    } else if (!queue) {
      return msg.reply(`**Nothing to play.**`);
    } else if (queue.paused) {
      return msg.reply(`**Song Already paused.**`);
    } else {
      queue.pause();
      msg.reply(`Song paused.`);
    }
  }
  if (
    "resume song" in descr &&
    command_user === cmd[descr.indexOf("resume song")]
  ) {
    let voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) {
      return msg.reply(`**👀 Please join a voice channel.**`);
    } else if (!queue) {
      return msg.reply(`**Nothing to play.**`);
    } else if (!queue.paused) {
      return msg.reply(`**Song Already resumed.**`);
    } else {
      queue.resume();
      msg.reply(`Song Resumed.`);
    }
  }
  if (
    "set volume" in descr &&
    command_user === cmd[descr.indexOf("set volume")]
  ) {
    let voiceChannel = msg.member.voice.channel;
    let volume = Number(args[0]);
    if (!voiceChannel) {
      return msg.reply(`**👀 Please join a voice channel.**`);
    } else if (!queue) {
      return msg.reply(`**Nothing to play.**`);
    } else if (!volume) {
      return msg.reply(`**Please provide volume.**`);
    } else {
      queue.setVolume(volume);
      msg.reply(`Volume changed to \`${queue.volume}%\` `);
    }
  }
  if (
    "show playlist" in descr &&
    command_user === cmd[descr.indexOf("show playlist")]
  ) {
    let voiceChannel = msg.member.voice.channel;
    if (!voiceChannel) {
      return msg.reply(`**👀 Please join a voice channel.**`);
    } else if (!queue) {
      return msg.reply(`**Nothing to play.**`);
    } else {
      let songs = queue.songs
        .slice(0, 10)
        .map((song, index) => {
          return `\`${index + 1}\` [\`${song.name}\`](${song.url})[${
            song.formattedDuration
          }]`;
        })
        .join("\n");

      msg.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("BLURPLE")
            .setTitle(`Queue of ${msg.guild.name}`)
            .setDescription(songs)
            .setFooter({
              text: `Requested by ${msg.author.tag}`,
              iconURL: msg.author.displayAvatarURL({ dynmic: true }),
            }),
        ],
      });
    }
  }
  if (
    "loop a song or a playlist" in descr &&
    command_user === cmd[descr.indexOf("loop a song or a playlist")]
  ) {
    let voiceChannel = msg.member.voice.channel;
    let loopmode = args[0];
    let mods = ["song", "queue", "off"];

    if (!voiceChannel) {
      return msg.reply(`**👀 Please join a voice channel.**`);
    } else if (!queue) {
      return msg.reply(`**Nothing to play.**`);
    } else if (!mods.includes(loopmode)) {
      return msg.reply(`**Wrong usage \n ${mods.join(" , ")}**`);
    } else {
      if (loopmode === "song") {
        queue.setRepeatMode(1);
        msg.reply(`Song set to loop`);
      } else if (loopmode === "queue") {
        queue.setRepeatMode(2);
        msg.reply(`Queue set to loop`);
      } else if (loopmode === "off") {
        queue.setRepeatMode(0);
        msg.reply(`Loop disabled`);
      }
    }
  }
});

client.distube.on("playSong", (queue, song) => {
  queue.textChannel.send({
    embeds: [
      new EmbedBuilder()
        .setColor("BLURPLE")
        .setTitle(`Now Playing`)
        .setDescription(`[\`${song.name}\`](${song.url})`),
    ],
  });
});
client.distube.on("addSong", (queue, song) => {
  queue.textChannel.send({
    embeds: [
      new EmbedBuilder()
        .setColor("BLURPLE")
        .setTitle(`👍 Song Added in Queue`)
        .setDescription(`[\`${song.name}\`](${song.url})`),
    ],
  });
});
client.distube.on("disconnect", (queue, song) => {
  queue.textChannel.send({
    embeds: [
      new EmbedBuilder()
        .setColor("BLURPLE")
        .setDescription(
          `Disconnected from ${queue.voice.channel.name} Voice Channel`
        ),
    ],
  });
});

function getRandomPost(posts) {
  const randomIndex = randomInt(0, posts.length);
  return posts[randomIndex].data;
}

client.login(process.env.CLIENT_TOKEN);
