const banUser = (descr, cmd, comm, msg, args) => {
    if (
        descr.includes("ban user") &&
        cmd.toLowerCase() === comm[descr.indexOf("ban user")].toLowerCase()
    ) {
        let userID = args.includes("<@!")
            ? args.replace("<@!", "").replace(">", "")
            : args.includes("<@")
            ? args.replace("<@", "").replace("<", "")
            : "";
        console.log(userID);
        userID = userID.replace(">", "");
        if (userID == "") {
            msg.reply("Invalid user ID or mention.");
            return;
        }

        msg.guild.members.fetch(userID).then((member) => {
            member
                .ban({ days: 7, reason: "They deserved it" })
                .then(() => {
                    msg.channel.send("🔨 Banned <@" + userID + ">.");
                })
                .catch(() => {
                    console.error;
                    msg.reply("Could not ban the specified member.");
                });
        });
    }
};

export default banUser;
