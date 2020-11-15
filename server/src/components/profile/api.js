const express = require("express");
const { auth } = require("../../middleware");
const router = express.Router();
const profileController = require("./controller");

router.get("/get/:username", profileController.getProfile);
router.get("/get/about/:username", profileController.getProfileAbout);
router.get("/get/post/:username", profileController.getProfilePost);
router.put("/update/profile-photo", auth, profileController.updateProfilePhoto);
router.put("/update/cover-photo", auth, profileController.updateCoverPhoto);
router.put("/remove/profile-photo", auth, profileController.removeProfilePhoto);
router.put("/remove/cover-photo", auth, profileController.removeCoverPhoto);

module.exports = router;
