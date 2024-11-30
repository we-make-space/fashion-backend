import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";


export const createComment = asyncHandler(async (req, res) => {
  const { productId, comment, userEmail } = req.body;

  // Validate input data
  if (!productId || !comment || !userEmail) {
    return res.status(400).json({ message: 'Invalid input data' });
  }

  // Check if product exists
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  // Check if user exists
  const user = await prisma.user.findUnique({ where: { email: userEmail } });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Create comment
  try {
    const newComment = await prisma.comment.create({
      data: {
        product: { connect: { id: productId } },
        User: { connect: { email: userEmail } },
        content: comment,
      },
    });
    res.status(201).json({ message: 'Comment created successfully', comment: newComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating comment' });
  }
});


export const getAllComments = asyncHandler(async (req, res) => {
  try {
    const comments = await prisma.comment.findMany();
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching comments' });
  }
});


export const getCommentById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await prisma.comment.findUnique({ where: { id } });
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    res.status(200).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching comment' });
  }
});

export const updateComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { comment } = req.body;
  try {
    const updatedComment = await prisma.comment.update({
      where: { id },
      data: { content: comment },
    });
    res.status(200).json(updatedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating comment' });
  }
});
export const deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const deletedComment = await prisma.comment.delete({ where: { id } });
    res.status(200).json(deletedComment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting comment' });
  }
})