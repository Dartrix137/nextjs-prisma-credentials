import { NextResponse } from 'next/server'
import db from '@/libs/db'
import cloudinary from '@/libs/cloudinary'
import processImage from '@/libs/processImage'
import { unlink } from 'fs/promises'


export async function GET(req) {
  const url = new URL(req.url)
  const userId = url.searchParams.get("id")
  console.log("Hola loco")
  try {
    // Realizar la consulta a la base de datos utilizando userId
    const result = await db.product.findMany({
      where: {
        userId: parseInt(userId) // Asegúrate de convertir userId a un número si es necesario
      }
    })
    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({
      message: error.message,
    })
  }
}

export async function POST(request) {
  try {
    const data = await request.formData()
    const image = data.get("image")
    console.log(image)
    if (!data.get('name')) {
      return NextResponse.json({
        message: "Name is required"
      },
        {
          status: 400
        })
    }
    if (image === "null") {
      return NextResponse.json({
        message: "Image is required"
      },
        {
          status: 400
        })
    }

    const filePath = await processImage(image);
    let img=""
    new Promise((resolve) => {
      cloudinary.v2.uploader.upload_stream((error, uploadResult) => {
        return resolve(uploadResult);
      }).end(byteArrayBuffer);
    }).then((uploadResult) => {
      console.log(`Buffer upload_stream wth promise success - ${uploadResult.public_id}`);
      img=uploadResult.secure_url
    });
    const result = await db.product.create({
      data: {
        name: data.get("name"),
        description: data.get("description"),
        price: parseFloat(data.get("price")),
        userId: parseInt(data.get("userId")),
        image: img
      }
    });
    return NextResponse.json({
      name: data.get("name"),
      description: data.get("description"),
      price: parseFloat(data.get("price")),
      userId: parseInt(data.get("userId")),
      id: result.insertId
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: error.message });
  }
}
