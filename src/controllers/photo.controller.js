const { photos } = require("../../data/photos");

function getAllPhotos() {
  return photos;
}

function getOnePhoto(id) {
  let onePhoto = photos.find((photo) => photo.id == id);
  if (onePhoto !== undefined) {
    return {
      __typename: "Photo",
      ...onePhoto,
    };
  }
  return {
    __typename: "PhotoNotFound",
    error: "Error",
    message: `Photo with the id ${id} not exists`,
  };
}

module.exports = {
  getAllPhotos,
  getOnePhoto,
};
