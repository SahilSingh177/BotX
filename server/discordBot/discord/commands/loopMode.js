const loopMode = (descr, cmd, comm, msg, queue, args) => {
    if (
        descr.includes("loop a song/playlist") &&
        cmd.toLowerCase() === comm[descr.indexOf("loop a song/playlist")].toLowerCase()
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
};

export default loopMode;
