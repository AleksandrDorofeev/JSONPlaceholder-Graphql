const {
  getAllAlbums,
  getOneAlbum,
  getAlbumPhotos,
} = require("../controllers/album.controller");

const albumResolver = {
  Query: {
    albums: getAllAlbums,
    album: (_, { id }) => getOneAlbum(id),
  },
  Album: {
    photos: ({ id }) => getAlbumPhotos(id),
  },
};

module.exports = albumResolver;
