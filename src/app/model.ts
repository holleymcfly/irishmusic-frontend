export interface Artist {
    id: number
    name: string
    photo: object
    image: object
}

export interface Venue {
    id: number
    location: string
    city: string
    country: string
}

export interface Event {
    id: number
    artistId: number
    artist: Artist
    venueId: number
    venue: Venue
    date: string
}

export interface Script {
    id: number
    name: string
    description: string
    code: string
    workspace: string
}

export const emptyScript: Script = {
    id: -1,
    name: '',
    description: '',
    code: '',
    workspace: ''
  }