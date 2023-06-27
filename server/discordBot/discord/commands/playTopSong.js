const playTopSong = (descr, cmd, args, msg, client, comm) => {
    if (
        descr.includes("playtop a song") &&
        cmd.toLowerCase() === comm[descr.indexOf("playtop a song")].toLowerCase()
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
};

export default playTopSong;
