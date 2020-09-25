const upload = require("../../multer");
const { Router } = require("express");
const {
	register,
	login,
	logout,
	checkAuthentication,
	createClientAccount,
	createFreelancerAccount,
	verify,
	sendForgotPasswordEmail,
	changePassword,
	resendEmail,
	postEditUserProfile,
	getUserProfile,
	postEditClientProfile,
	portfolioUpdate,
	updateEmpHistory,
	getSpecificUserProfile,
	socialRegistration,
	socialLogin
} = require("../../controllers/user/userController");

const {
	getEmpHistory,
	getUserPortfolio,
} = require("../../controllers/data/dataController");
const { generateNewAccessToken } = require("../../middlewares/Auth");
// const {
// 	authentication,
// 	dataAuthentication,
// } = require("../../middlewares/Authentication");

const { authentication } = require("../../middlewares/Auth");
const router = Router();

router.post("/userRegistration", register);
router.post("/userLogin", login);
router.delete("/userLogout", authentication, logout);
router.get("/checkAuthentication", authentication, checkAuthentication);
router.post("/createClientAccount", authentication, createClientAccount);
router.post(
	"/createFreelancerAccount",
	authentication,
	createFreelancerAccount,
);
router.get("/verify", verify);
router.post("/sendForgotPasswordEmail", sendForgotPasswordEmail);
router.post("/changePassword/:token", changePassword);
router.get("/resendEmail", resendEmail);
router.get("/generateNewAccessToken/:refreshToken", generateNewAccessToken);
router.post(
	"/postEditUserProfile",
	authentication,
	upload.any(),
	postEditUserProfile,
);
router.post(
	"/postEditClientProfile",
	authentication,
	upload.single("profileImage"),
	postEditClientProfile,
);
router.get("/getUserProfile", authentication, getUserProfile);
router.post(
	"/portfolioUpdate",
	authentication,
	upload.single("portfolioImage"),
	portfolioUpdate,
);

router.get("/getEmpHistory", authentication, getEmpHistory);
router.get("/getUserPortfolio", authentication, getUserPortfolio);

router.post("/postEmpHistory", authentication, updateEmpHistory);

router.get("/getSpecificUserDetails/:freelancerId", getSpecificUserProfile);

router.post('/socialRegister',socialRegistration);
router.post('/socialLogin',socialLogin);
module.exports = router;
