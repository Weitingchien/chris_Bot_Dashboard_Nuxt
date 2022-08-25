export type IEnv = {
    development: {
        discordRedirectAPI: string,
        discordOauth2Url: string
    },
    test: {
        discordRedirectAPI: string,
        discordOauth2Url: string
    },
    production: {
        discordRedirectAPI: string,
        discordOauth2Url: string
    }
}