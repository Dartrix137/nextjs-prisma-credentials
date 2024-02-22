import { NextResponse } from 'next/server'
import db from '@/libs/db'
import cloudinary from '@/libs/cloudinary'
import processImage from '@/libs/processImage'
import { unlink } from 'fs/promises'

export async function GET(req, { params }) {
    const url = new URL(req.url)
    const userId = url.searchParams.get("id")
    try {
        const result = await db.product.findUnique({
            where: {
                id: parseInt(params.id),
                userId: userId
            }
        })
        if (result.lenght === 0) {
            return NextResponse.json({
                message: "Product not found"
            },
                {
                    status: 404,
                })
        }
        return NextResponse.json(result[0])
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        }, {
            status: 500
        })
    }
}

export async function DELETE(request, { params }) {
    try {
        const url = new URL(request.url)
        const userId = parseInt(url.searchParams.get("id"))
        const result = await db.product.delete({
            where: {
                id: parseInt(params.id),
                userId
            }
        })
        if (result.affectedRows === 0) {
            return NextResponse.json({
                message: "Product not found"
            },
                {
                    status: 404,
                })
        }
        return new Response(null, {
            status: 204
        })
    } catch (error) {
        return NextResponse.json({
            message: error.message,
        })
    }
}

export async function PUT(request, { params }) {
    try {
        let result=""
        const url = new URL(request.url)
        const userId = url.searchParams.get("id")
        const data = await request.formData()
        const image = data.get("image")
        const updateProduct = {
            name: data.get("name"),
            description: data.get("description"),
            price: parseFloat(data.get("price")),
        }
        if (!data.get('name')) {
            return NextResponse.json({
                message: "Name is required"
            },
                {
                    status: 400
                })
        }
        if (image) {
            const filePath = await processImage(image)
            const res = await cloudinary.uploader.upload(filePath)
            updateProduct.image = res.secure_url
            if (res) {
                await unlink(filePath)
            }
        }
        if(updateProduct.image){
            result = await prisma.product.update({
                where: {
                    id: parseInt(params.id),
                    userId:parseInt(userId)
                },
                data: {
                    name:updateProduct.name,
                    description:updateProduct.description,
                    price:updateProduct.price,
                    image:updateProduct.image
                },
            })
        }else{
            result = await prisma.product.update({
                where: {
                    id: parseInt(params.id),
                    userId:parseInt(userId)
                },
                data: {
                    name:updateProduct.name,
                    description:updateProduct.description,
                    price:updateProduct.price,
                },
            })
        }
        
        if (result.affectedRows === 0) {
            return NextResponse.json({
                message: "Product not found"
            },
                {
                    status: 404,
                })
        }
        const updatedProduct = await db.product.findUnique({
            where: {
                id: parseInt(params.id),
                userId:parseInt(userId)
            }
        })
        return NextResponse.json(updatedProduct)
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            message: error.message,
        })
    }
}