import asyncHandler from 'express-async-handler';
import { prisma } from '../config/prismaConfig.js';

// create a new message
export const createMessage = asyncHandler(async (req, res) => {
	const { chatId, senderId, text } = req.body;

	try {
		const message = await prisma.message.create({
			data: {
				chat: { connect: { id: chatId } },
				sender: { connect: { id: senderId } },
				text
			}
		});
		res.status(201).json(message);
	} catch (error) {
		console.error('Error creating message:', error);
		res.status(500).json({ error: 'An error occurred while creating the message' });
	}
});

// get messages of a chat
export const getMessages = asyncHandler(async (req, res) => {
	const { chatId } = req.params;

	try {
		const messages = await prisma.message.findMany({
			where: { chatId }
		});

		res.status(200).json(messages);
	} catch (error) {
		console.error('Error fetching messages:', error);
		res.status(500).json({ error: 'An error occurred while fetching messages' });
	}
});
