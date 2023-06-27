const resumeSong = (descr, cmd, comm, msg, queue) => {
    if (
        descr.includes("resume song") &&
        cmd.toLowerCase() === comm[descr.indexOf("resume song")].toLowerCase()
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
};

export default resumeSong;
