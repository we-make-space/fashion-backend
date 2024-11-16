import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";



// Follow a user
export const followUser = asyncHandler(async (req, res) => {
  const { followerId, followingId } = req.body;

  if (!followerId || !followingId) {
    return res.status(400).json({ message: "Missing followerId or followingId" });
  }
  if (followerId === followingId) {
    return res.status(400).json({ message: "You cannot follow yourself" });
  }

  const followerExists = await prisma.follower.findUnique({
    where: { followerId_followeeId: { followerId, followeeId: followingId } },
  });

  if (followerExists) {
    return res.status(400).json({ message: "You are already following this user" });
  }

  await prisma.follower.create({
    data: {
      followerId,
      followeeId: followingId,
    },
  });

  res.status(201).json({ message: "User followed successfully" });
});

// Unfollow a user
export const unfollowUser = asyncHandler(async (req, res) => {
  const { followerId, followingId } = req.body;

  if (!followerId || !followingId) {
    return res.status(400).json({ message: "Missing followerId or followingId" });
  }
  if (followerId === followingId) {
    return res.status(400).json({ message: "You cannot unfollow yourself" });
  }

  const followerExists = await prisma.follower.findUnique({
    where: { followerId_followeeId: { followerId, followeeId: followingId } },
  });

  if (!followerExists) {
    return res.status(400).json({ message: "You are not following this user" });
  }

  await prisma.follower.delete({
    where: { followerId_followeeId: { followerId, followeeId: followingId } },
  });

  res.status(200).json({ message: "User unfollowed successfully" });
});