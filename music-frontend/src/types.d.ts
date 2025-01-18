export interface IArtist {
  _id: string;
  name: string;
  description?: string;
  date: Date;
  image: string | null;
}
export interface IAlbum {
  _id: string;
  name: string;
  artist: string;
  date: Date;
  image: string | null;
}