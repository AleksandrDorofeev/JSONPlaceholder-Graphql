const { getAllPhotos, getOnePhoto } = require("../controllers/photo.controller");

const photoResolver = {
  Query: {
    photos: getAllPhotos,
    photo: (_, {id}) => getOnePhoto(id)
  },
};

module.exports = photoResolver;
