export default defineEventHandler((event) => {
    return {
        data: {
            title: 'Terms & Conditions',
            subtitle: 'History',
            image: 'http://localhost:3000/images/about/about-big-1.jpg',
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. In nec facilisis mi. Praesent eu erat vitae velit malesuada ultricies. Sed ut nulla et nisl malesuada ultricies. Sed ut nulla et nisl malesuada ultricies. ${Math.random() < 0.5 ? 'Sed' : 'Nam'} ut nulla et nisl malesuada ultricies.`
        },
        status: 'success',
        message: 'site terms & conditions retrieved successfully'
    }
})
