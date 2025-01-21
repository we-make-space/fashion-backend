import { renderToString } from 'react-dom/server';
import { prisma } from '../config/prismaConfig.js';
import { Resend } from 'resend';
import Email from '../../../../dist/emailTemplate.js';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (req, res) => {
	const { from, to, subject, orderId } = req.body;
	const order = await prisma.order.findUnique({
		where: {
			id: orderId
		},
		include: {
			items: {
				include: {
					product: true
				}
			},
			user: true
		}
	});

	const html = renderToString(Email({ order: order }), {
		pretty: true
	});

	if (!from || !to || !subject || !orderId) {
		return res.status(400).json({ error: 'Missing required fields' });
	}

	try {
		const email = await resend.emails.send({
			from,
			to,
			subject,
			html
		});
		console.log(email);
		return res.status(200).json(email);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
};
