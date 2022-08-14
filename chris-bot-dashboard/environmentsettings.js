export const globalSettings = {
  development: {
    discordRedirectAPI: 'http://localhost:3000/api/v1/discord/redirect',
    discordOauth2Url: `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fv1%2Fdiscord%2Fredirect&response_type=code&scope=identify`
  },
  test: {
    discordRedirectAPI: 'http://test',
    discordOauth2Url: `https://testdiscord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fapi%2Fv1%2Fdiscord%2Fredirect&response_type=code&scope=identify`
  },
  production: {
    discordRedirectAPI:
      'https://lexi-dashboard.vercel.app/api/v1/discord/redirect',
    discordOauth2Url: `https://discord.com/api/oauth2/authorize?client_id=${process.env.DISCORD_CLIENT_ID}&redirect_uri=https%3A%2F%2Flexi-dashboard.vercel.app%2Fapi%2Fv1%2Fdiscord%2Fredirect&response_type=code&scope=identify`
  }
};
