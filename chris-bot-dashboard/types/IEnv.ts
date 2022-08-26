export type IEnv = {
    [key in 'development' | 'test' | 'preview' | 'production']: {discordRedirectAPI: string, discordOauth2Url: string}
}