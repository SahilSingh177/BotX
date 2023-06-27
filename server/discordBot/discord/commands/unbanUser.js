// unbanUser.js
const unbanUser = (descr, cmd, comm, msg, args) => {
    if (
        descr.includes("unban user") &&
        cmd.toLowerCase() === comm[descr.indexOf("unban user")].toLowerCase()
    ) {
        let userID = args.includes("<@!")
            ? args.replace("<@!", "").replace(">", "")
            : args.includes("<@")
            ? args.replace("<@", "").replace("<", "")
            : "";
        userID = userID.replace(">", "");

        if (userID === "") {
            msg.reply("Invalid user ID or mention.");
            return;
        }

        msg.guild.bans
            .fetch()
            .then((bans) => {
                let member = bans.get(userID);
                if (member == null) {
                    msg.reply("Cannot find a ban for the given user.");
                    return;
                }

                msg.guild.members
                    .unban(userID)
                    .then(() => {
                        msg.channel.send("Unbanned <@" + userID + ">.");
                    })
                    .catch(console.error);
            })
            .catch(() => console.error);
    }
};

export default unbanUser;
