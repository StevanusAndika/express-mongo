// Import PrismaClient
const { PrismaClient } = require("@prisma/client");

// Init Prisma Client
const prisma = new PrismaClient();

// Import validationResult from express-validator
const { validationResult } = require("express-validator");

// Function get all posts
const findPosts = async (req, res) => {
    try {
        // Get all posts from database
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                oshi_name: true,
                idol_group_name: true,
                tahun_debut: true,
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
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Function createPost
const createPost = async (req, res) => {
    // Periksa hasil validasi
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: "Validation error",
            errors: errors.array(),
        });
    }

    try {
        // Insert data ke database
        const post = await prisma.post.create({
            data: {
                oshi_name: req.body.oshi_name,
                idol_group_name: req.body.idol_group_name,
                tahun_debut: parseInt(req.body.tahun_debut), // Pastikan dikonversi ke integer
            },
        });

        res.status(201).json({
            success: true,
            message: "Post Created Successfully",
            data: post,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

// Export function
module.exports = {
    findPosts,
    createPost,
};
