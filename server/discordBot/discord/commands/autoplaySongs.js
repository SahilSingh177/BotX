// autoplaySongs.js
const autoplaySongs = async (descr, cmd, comm, msg, queue) => {
    if (
        descr.includes("autoplay songs") &&
        cmd.toLowerCase() === comm[descr.indexOf("autoplay songs")].toLowerCase()
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
};

export default autoplaySongs;
