import express from "express";
import { logAction, logError } from "../../../middlewares/loggerMiddlewares.js";
import { createComment, deleteComment, getAllComments, getCommentById, updateComment } from "../controllers/commentController.js";


const router = express.Router();


router.post(
    "/",
    logAction("Creating a new comment"),
    createComment,
    logError
)

router.get(
    "/",
    logAction("Fetching all comments"),
    getAllComments,
    logError
)

router.get(
    '/:id',
    logAction("Fetching a comment"),
    getCommentById,
    logError
)
router.delete(
    '/:id',
    logAction("Deleting a comment"),
    deleteComment,
    logError
)
router.patch(
    '/:id',
    logAction("Updating a comment"),
    updateComment,
    logError
)



export { router as commentRoute}
