const { albums } = require("../../data/albums");
const { photos } = require("../../data/photos");

function getAllAlbums() {
  return albums;
}

function getOneAlbum(id) {
  let oneAlbum = albums.find((album) => album.id == id);
  if (oneAlbum !== undefined) {
    return {
      __typename: "Album",
      ...oneAlbum,
    };
  }
  return {
    __typename: "AlbumNotFound",
    error: "Error",
    message: `Album with the id ${id} not exists`,
  };
}

function getAlbumPhotos(id) {
  return photos.filter((photo) => photo.albumId === id);
}

module.exports = {
  getAllAlbums,
  getOneAlbum,
  getAlbumPhotos,
};
