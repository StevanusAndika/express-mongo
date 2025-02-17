// Import PrismaClient
const { PrismaClient } = require('@prisma/client');

// Init Prisma Client
const prisma = new PrismaClient();

// Function findPosts
const findPosts = async (req, res) => {
    try {
        // Get all posts from database
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                updatedAt: true,
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Send response
        res.status(200).json({
            success: true,
            message: "Get All Posts Successfully",
            data: posts,
        });

    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};

// Export function
module.exports = {
    findPosts,
};
