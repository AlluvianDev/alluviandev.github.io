import { query } from "minecraft-status";

export async function onRequest(context) {
  const ip = "session-hist.gl.joinmc.link";   // CHANGE THIS
  const port = 25565;            // Query port (default)

  try {
    const data = await query(ip, port, { enableSRV: true, timeout: 3000 });

    return new Response(JSON.stringify({
      online: true,
      motd: data.motd.clean,
      players: {
        online: data.players.online,
        max: data.players.max,
        list: data.players.list
      },
      version: data.version,
      map: data.map,
      plugins: data.plugins
    }), {
      headers: { "Content-Type": "application/json" }
    });

  } catch (err) {
    return new Response(JSON.stringify({ online: false }), {
      headers: { "Content-Type": "application/json" }
    });
  }
}
