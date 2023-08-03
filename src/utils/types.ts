export interface CreateUserInput  {
    spotifyId: string,
    displayName: string
}

export interface CreateHistoryItemInput {
    title: string,
    artist: string,
    album: string,
    albumArt: string,
    uri: string,
    duration: number,
    liked: boolean
}