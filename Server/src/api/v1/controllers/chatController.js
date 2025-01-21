import { prisma } from '../config/prismaConfig.js';
import asyncHandler from 'express-async-handler';

export const createChat = asyncHandler(async (req, res) => {
	const { senderId, receiverId } = req.body;

	try {
		const chat = await prisma.chat.findFirst({
			where: {
				members: {
					hasEvery: [senderId, receiverId]
				}
			}
		});

		if (chat) {
			res.status(200).json(chat);
			return;
		}

		const newChat = await prisma.chat.create({
			data: {
				members: [senderId, receiverId]
			}
		});
		res.status(201).json(newChat);
	} catch (error) {
		console.error('Error creating chat:', error);
		res.status(500).json({ error: 'An error occurred while creating the chat' });
	}
});

export const findUserChat = asyncHandler(async (req, res) => {
	const userId = req.params.id;
	try {
		const chats = await prisma.chat.findMany({
			where: {
				members: {
					hasSome: [userId]
				}
			}
		});
		res.status(200).json(chats);
	} catch (error) {
		console.error('Error finding user chat:', error);
		res.status(500).json({ error: 'An error occurred while finding the user chat' });
	}
});

export const findChat = asyncHandler(async (req, res) => {
	const { senderId, receiverId } = req.params;
	try {
		const chat = await prisma.chat.findFirst({
			where: {
				members: {
					hasEvery: [senderId, receiverId]
				}
			}
		});
		if (!chat) {
			return res.status(404).json({ message: 'Chat not found' });
		}
		res.status(200).json(chat);
	} catch (error) {
		console.error('Error finding chat:', error);
		res.status(500).json({ error: 'An error occurred while finding the chat' });
	}
});
