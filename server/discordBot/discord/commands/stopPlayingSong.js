const stopPlayingSong = (descr, cmd, comm, msg, queue) => {
    if (
        descr.includes("stop playing song") &&
        cmd.toLowerCase() === comm[descr.indexOf("stop playing song")].toLowerCase()
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
};

export default stopPlayingSong;
