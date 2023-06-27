import { Client, GatewayIntentBits} from "discord.js";
import { DisTube } from "distube";
import { SpotifyPlugin } from "@distube/spotify";
import { SoundCloudPlugin } from "@distube/soundcloud";
import { YtDlpPlugin } from "@distube/yt-dlp";

const initializeClient = () => {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
      GatewayIntentBits.GuildVoiceStates,
      GatewayIntentBits.GuildMembers,
    ],
  });

  client.emotes = {
    play: "▶️",
    stop: "⏹️",
    queue: "📄",
    success: "☑️",
    repeat: "🔁",
    error: "❌",
  };

  client.distube = new DisTube(client, {
    leaveOnStop: true,
    leaveOnEmpty: false,
    leaveOnFinish: false,
    emitNewSongOnly: false,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    savePreviousSongs: true,
    searchSongs: 0,
    plugins: [
      new SpotifyPlugin({
        emitEventsAfterFetching: true,
      }),
      new SoundCloudPlugin(),
      new YtDlpPlugin(),
    ],
  });
  client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
   
  });
  return client;
};

export default initializeClient;
