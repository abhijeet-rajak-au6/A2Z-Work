const upload = require("../../multer");
const { Router } = require("express");
const {
	jobPost,
	getAllOpenJobs,
	getParticularJob,
	getClientPostedJobs,
	jobApplied,
	getAppliedJobFreelancer,
	clientReview,
	getClientReview,
	addFreelancerReview,
	getFreelancerReview,
	hireFreelancer,
	sendHireEmail,
	getFreelenacerJobDetails,
	getFreelenacerJobApplication,
	searchByJobCategory,
} = require("../../controllers/job/jobController");
const { authentication } = require("../../middlewares/Auth");
const router = Router();
router.post("/jobPost", authentication, upload.array("projectFile"), jobPost);
router.get("/getOpenJobs", getAllOpenJobs);
router.get("/getParticularJob/:jobId", getParticularJob);
router.get("/getUserJobPosted", authentication, getClientPostedJobs);
router.post("/applyJob/:jobId", authentication, jobApplied); //
router.get("/getUserAppliedJob/:jobId", getAppliedJobFreelancer); //
router.post("/addClientReview/:jobId", authentication, clientReview);
router.get("/getClientReview/:jobId/:userId", getClientReview);
router.post("/addFreelancerReview/:jobId", authentication, addFreelancerReview);
router.get("/getFreelancerReview/:jobId", authentication, getFreelancerReview);
router.get(
	"/hireFreelancer/:jobId/:freelancerId/:expToken/:userId",
	hireFreelancer,
);
router.post("/sendHireEmail/:jobId/:freelancerId/:userId", sendHireEmail);
router.get("/freelancerJobDetails", authentication, getFreelenacerJobDetails);
router.get(
	"/getFreelancerJobApplication/:jobId",
	authentication,
	getFreelenacerJobApplication,
);

router.get("/searchJobsByCategory", searchByJobCategory);

module.exports = router;
