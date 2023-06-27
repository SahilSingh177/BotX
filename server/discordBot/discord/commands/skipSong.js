const skipSong = (descr, cmd, comm, msg, queue) => {
    if (
        descr.includes("skip song") &&
        cmd.toLowerCase() === comm[descr.indexOf("skip song")].toLowerCase()
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
};

export default skipSong;
