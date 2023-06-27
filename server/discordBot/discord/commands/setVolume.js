const setVolume = (descr, cmd, comm, msg, queue, args) => {
    if (
        descr.includes("set volume") &&
        cmd.toLowerCase() === comm[descr.indexOf("set volume")].toLowerCase()
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
};

export default setVolume;
