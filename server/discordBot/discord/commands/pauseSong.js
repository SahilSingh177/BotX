const pauseSong = (descr, cmd, comm, msg, queue) => {
    if (
        descr.includes("pause song") &&
        cmd.toLowerCase() === comm[descr.indexOf("pause song")].toLowerCase()
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
};

export default pauseSong;
