function AboutPage() {
    return (
        <section className="container mx-auto text-white">
            <h3 className="text-4xl font-bold my-5">About</h3>
            <p className="text-xl text-justify">
                The Product Management Platform, built with Next.js, Tailwind CSS and PostgreSQL, provides users with secure authentication using NextAuth and CRUD capabilities for products. It allows each user to register, view, edit, and delete products with associated names, descriptions, and images. Additionally, it utilizes the Cloudinary platform for storing images in the cloud. The intuitive and responsive interface ensures a seamless experience across various devices.
            </p>
        </section>
    )
}

export default AboutPage