import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";
import { formatDate } from "../../../utils/formatDate.js";

// ^ Add a new address
export const addAddress = asyncHandler(async (req, res) => {
	const { userId } = req.params;
	const {
		street,
		city,
		town,
		state,
		region,
		zipCode,
		country,
		phone,
		isDefault,
	} = req.body;

	if (isDefault) {
		//^ Ensuring only one address is marked as default
		await prisma.address.updateMany({
			where: { userId, isDefault: true },
			data: { isDefault: false },
		});
	}

	const newAddress = await prisma.address.create({
		data: {
			userId,
			street,
			city,
			town,
			state,
			Region: region,
			zipCode,
			country,
			phone,
			isDefault,
		},
	});

	newAddress.createdAt = formatDate(newAddress.createdAt);
	newAddress.updatedAt = formatDate(newAddress.updatedAt);

	res.status(201).json({ success: true, address: newAddress });
});

// * Get all addresses for a user
export const getAddresses = asyncHandler(async (req, res) => {
	const { userId } = req.params;

	const addresses = await prisma.address.findMany({
		where: { userId },
		orderBy: {createdAt: 'desc'} 
	});

	const formattedAddresses = addresses.map((address) => ({
		...address,
		createdAt: formatDate(address.createdAt),
		updatedAt: formatDate(address.updatedAt),
	}));

	res.status(200).json({ success: true, addresses: formattedAddresses });
});

// * Update an existing address
export const updateAddress = asyncHandler(async (req, res) => {
	const { addressId } = req.params;
	const {
		street,
		city,
		town,
		state,
		region,
		zipCode,
		country,
		countryCode,
		isDefault,
	} = req.body;

	if (isDefault) {
		const address = await prisma.address.findUnique({
			where: { id: addressId },
		});
		if (!address) {
			return res
				.status(404)
				.json({ success: false, message: "Address not found" });
		}
		await prisma.address.updateMany({
			where: { userId: address.userId, isDefault: true },
			data: { isDefault: false },
		});
	}

	const updatedAddress = await prisma.address.update({
		where: { id: addressId },
		data: {
			street,
			city,
			town,
			state,
			Region: region,
			zipCode,
			country,
			countryCode,
			isDefault,
		},
	});

	updatedAddress.createdAt = formatDate(updatedAddress.createdAt);
	updatedAddress.updatedAt = formatDate(updatedAddress.updatedAt);

	res.status(200).json({ success: true, address: updatedAddress });
});

// * Delete an address
export const deleteAddress = asyncHandler(async (req, res) => {
	const { addressId } = req.params;

	const address = await prisma.address.findUnique({
		where: { id: addressId },
	});
	if (!address) {
		return res
			.status(404)
			.json({ success: false, message: "Address not found" });
	}

	await prisma.address.delete({ where: { id: addressId } });

	res.status(200).json({
		success: true,
		message: "Address deleted successfully",
	});
});

// * Set a default address
export const setDefaultAddress = asyncHandler(async (req, res) => {
	const { addressId } = req.params;

	const address = await prisma.address.findUnique({
		where: { id: addressId },
	});
	if (!address) {
		return res
			.status(404)
			.json({ success: false, message: "Address not found" });
	}

	//^ this Unset any other default addresses
	await prisma.address.updateMany({
		where: { userId: address.userId, isDefault: true },
		data: { isDefault: false },
	});

	//^ Set the selected address as default
	const updatedAddress = await prisma.address.update({
		where: { id: addressId },
		data: { isDefault: true },
	});

	updatedAddress.createdAt = formatDate(updatedAddress.createdAt);
	updatedAddress.updatedAt = formatDate(updatedAddress.updatedAt);

	res.status(200).json({ success: true, address: updatedAddress });
});
