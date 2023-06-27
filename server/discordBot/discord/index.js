import axios from 'axios';
import {EmbedBuilder} from "discord.js";

import autoplaySongs from "./commands/autoplaySongs.js";
import banUser from "./commands/banUser.js";
import showBotList from "./commands/botList.js";
import conductPoll from "./commands/conductPoll.js";
import flirt from "./commands/flirt.js";
import kickUser from "./commands/kickUser.js";
import loopMode from "./commands/loopMode.js";
import meme from "./commands/meme.js";
import pauseSong from "./commands/pauseSong.js";
import playSkipSong from "./commands/playSkipSong.js";
import playSong from "./commands/playSong.js";
import playTopSong from "./commands/playTopSong.js";
import resumeSong from "./commands/resumeSong.js";
import setVolume from "./commands/setVolume.js";
import showFilters from "./commands/showFilters.js";
import showPlaylist from "./commands/showPlaylist.js";
import skipSong from "./commands/skipSong.js";
import stopPlayingSong from "./commands/stopPlayingSong.js";
import unbanUser from "./commands/unbanUser.js";
import useFilterForSong from "./commands/useFilterForSong.js";

import { getData, initializeData, getRandomPost, randomInt } from "./helper.js";
import { handleAddSong, handleDisconnect, handlePlaySong } from "./commands/distubeEventHandlers.js";
import { subReddits, filtersList, flirtyText} from './constants.js';

const { response, servers } = await initializeData();

const handleCommands = (client) => {
  client.on("messageCreate", async (msg) => {
    console.log(msg);
    await getData();
    
    if (!data[servers[msg.guild.name]]) return;

    let prefix = [];
    while (!data[servers[msg.guild.name]].bots) {}
    
    for (let i = 0; i < data[servers[msg.guild.name]].bots.length; i++) {
      prefix.push(data[servers[msg.guild.name]].bots[i].bot_name);
    }
    
    console.log(data[data.length - 1]);
    
    const first = msg.content.split(" ")[0];
    
    if (msg.author.bot || !msg.guild) return;
    
    if (msg.content.toLowerCase() === "showbots") {
      showBotList(prefix, msg);
    }
    
    if (!prefix.includes(first)) return;

    console.log("connected");
    let descr = data[servers[msg.guild.name]].bots[prefix.indexOf(first)].command;
    let comm = data[servers[msg.guild.name]].bots[prefix.indexOf(first)].desc;
    msg.content = msg.content.split(" ").slice(1).join(" ");
    let command_user = msg.content.split(" ")[0];
    let args = msg.content.replace(command_user, "").trim();
    args = msg.content.trim().split(/ +/g);
    let cmd = args.shift()?.toLowerCase();
    let queue = client.distube.getQueue(msg);

    if (descr.includes("play a song") && cmd.toLowerCase() === comm[descr.indexOf("play a song")].toLowerCase()) {
      playSong(descr, cmd, args, msg, client, comm);
    }

    if (descr.includes("playskip a song") && cmd.toLowerCase() === comm[descr.indexOf("playskip a song")].toLowerCase()) {
      playSkipSong(descr, cmd, args, msg, client, comm);
    }

    if (descr.includes("playtop a song") && cmd.toLowerCase() === comm[descr.indexOf("playtop a song")].toLowerCase()) {
      playTopSong(descr, cmd, args, msg, client, comm);
    }

    if (descr.includes("skip song") && cmd.toLowerCase() === comm[descr.indexOf("skip song")].toLowerCase()) {
      skipSong(descr, cmd, comm, msg, queue);
    }

    if (descr.includes("stop playing song") && cmd.toLowerCase() === comm[descr.indexOf("stop playing song")].toLowerCase()) {
      stopPlayingSong(descr, cmd, comm, msg, queue);
    }

    if (descr.includes("autoplay songs") && cmd.toLowerCase() === comm[descr.indexOf("autoplay songs")].toLowerCase()) {
      autoplaySongs(descr, cmd, comm, msg, queue);
    }

    if (descr.includes("use filter for song") && cmd.toLowerCase() === comm[descr.indexOf("use filter for song")].toLowerCase()) {
      useFilterForSong(descr, cmd, comm, msg, queue, client, first);
    }

    if (descr.includes("pause song") && cmd.toLowerCase() === comm[descr.indexOf("pause song")].toLowerCase()) {
      pauseSong(descr, cmd, comm, msg, queue);
    }

    if (descr.includes("resume song") && cmd.toLowerCase() === comm[descr.indexOf("resume song")].toLowerCase()) {
      resumeSong(descr, cmd, comm, msg, queue);
    }

    if (descr.includes("set volume") && cmd.toLowerCase() === comm[descr.indexOf("set volume")].toLowerCase()) {
      setVolume(descr, cmd, comm, msg, queue, args);
    }

    if (descr.includes("show playlist") && cmd.toLowerCase() === comm[descr.indexOf("show playlist")].toLowerCase()) {
      showPlaylist(descr, cmd, comm, msg, queue);
    }

    if (descr.includes("loop a song/playlist") && cmd.toLowerCase() === comm[descr.indexOf("loop a song/playlist")].toLowerCase()) {
      loopMode(descr, cmd, comm, msg, queue, args);
    }

    args = args[0];

    if (descr.includes("kick user") && cmd.toLowerCase() === comm[descr.indexOf("kick user")].toLowerCase()) {
      kickUser(descr, cmd, comm, msg, args);
    }

    if (descr.includes("ban user") && cmd.toLowerCase() === comm[descr.indexOf("ban user")].toLowerCase()) {
      banUser(descr, cmd, comm, msg, args);
    }

    if (descr.includes("unban user") && cmd.toLowerCase() === comm[descr.indexOf("unban user")].toLowerCase()) {
      unbanUser(descr, cmd, comm, msg, args);
    }

    if (descr.includes("meme") && cmd.toLowerCase() === comm[descr.indexOf("meme")].toLowerCase()) {
      meme(descr, cmd, comm, msg, subReddits, axios, randomInt, getRandomPost);
    }

    if (descr.includes("flirt") && cmd.toLowerCase() === comm[descr.indexOf("flirt")].toLowerCase()) {
      flirt(descr, cmd, comm, msg, flirtyText);
    }

    if (cmd.toLowerCase() === "help") {
      showHelp(cmd, descr, comm, msg, EmbedBuilder);
    }

    if (descr.includes("conduct poll") && cmd.toLowerCase() === comm[descr.indexOf("conduct poll")].toLowerCase()) {
      conductPoll(descr, cmd, comm, msg);
    }

    if (msg.content.toLowerCase() === "showfilters") {
      showFilters(filtersList, msg);
    }

    client.distube.on("playSong", handlePlaySong);
    client.distube.on("addSong", handleAddSong);
    client.distube.on("disconnect", handleDisconnect);
  });
};

export default handleCommands;
