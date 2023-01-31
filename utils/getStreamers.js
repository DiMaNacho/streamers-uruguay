import axios from "axios";

export const getStreamers = async (from = "uy") => {
  try {
    const clientId = "adnwt0mswhvgddgkjwhe6fs96zaxfn";
    const clientSecret = "khotgt9vv1qln4wmxj4x7bs91vrxiy";
    const encodedCredentials = btoa(`${clientId}:${clientSecret}`);

    const req = await axios.post(
      "https://id.twitch.tv/oauth2/token",
      {
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${encodedCredentials}`,
        },
      }
    );

    const access_token = req.data.access_token;
    // Utilizar el token para hacer solicitudes autorizadas a la API de Twitch

    const headers = {
      Authorization: "Bearer " + access_token,
      "Client-ID": clientId,
    };

    const url =
      "https://api.twitch.tv/helix/streams?country=UY&limit=1000&language=es";
    // Utilice una fecha de inicio de hace un año para obtener streamers activos en los últimos 365 días
    const startDate = new Date();
    startDate.setFullYear(startDate.getFullYear() - 1);
    const response = await axios.get(url, { headers });
    const streamers = response.data.data;
    // filtrar por fecha de inicio de transmisión
    const activeStreamers = streamers.filter((streamer) => {
      return new Date(streamer.started_at) >= startDate;
    });
    console.log(activeStreamers);

    // Remplace YOUR_CLIENT_ID con su propia clave de API de Twitch
  } catch (error) {
    console.error(error);
  }
};
