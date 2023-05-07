export interface Music {
    name: string,
    style: string,
    artist: string,
    file: File | null
}

export interface Musics {
    artist: string,
    music_url: string,
    style: string,
    title: string,
    username: string | undefined
}