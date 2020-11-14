const express = require("express");
const router = express.Router();
const profileController = require("./controller");

router.get("/get/:username", profileController.getProfile);
router.get("/get/about/:username", profileController.getProfileAbout);
router.get("/get/post/:username", profileController.getProfilePost);
router.put("/update/profile-photo", profileController.updateProfilePhoto);
router.put("/update/cover-photo", profileController.updateCoverPhoto);
router.put("/remove/profile-photo", profileController.removeProfilePhoto);
router.put("/remove/cover-photo", profileController.removeCoverPhoto);

module.exports = router;
