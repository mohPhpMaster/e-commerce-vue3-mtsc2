export default defineEventHandler((event) => {

    return {
        data: {
            title: 'Well-coordinated Teamwork Speaks About Us',
            subtitle: 'History',
            image: 'http://localhost:3000/images/about/about-big-1.jpg',
            description: "We are thrilled to offer you a wide range of products that you won't find anywhere else. Whether you're shopping for clothing, accessories, gadgets, or home decor, we have something for everyone.\nOur commitment to quality is reflected in every product we offer. We work with top suppliers and manufacturers to ensure that every item we sell meets our high standards for durability, performance, and style. And with a user-friendly interface and intuitive navigation, shopping on our site is a breeze. We understand that security is a top concern for online shoppers, which is why we employ the latest encryption technologies and follow industry best practices to keep your personal information safe. And with fast, reliable shipping options, you can enjoy your purchases in no time."
        },
        status: 'success',
        message: 'about us retrieved successfully'
    }
})
