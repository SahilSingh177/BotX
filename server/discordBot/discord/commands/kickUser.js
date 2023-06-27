const kickUser = (descr, cmd, comm, msg, args) => {
    if (
        descr.includes("kick user") &&
        cmd.toLowerCase() === comm[descr.indexOf("kick user")].toLowerCase()
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
};

export default kickUser;
