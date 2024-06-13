import prisma from "../libs/prismadb";

export default async function getListings() {
    try {
        const listings = await prisma?.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        });
        const safeListings = listings.map((list) => ({
            ...list,
            createdAt: list.createdAt.toISOString(),
        }));
        return safeListings;
    }
    catch (error:any) {
        throw new Error(error);
    }
}