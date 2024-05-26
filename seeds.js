const { faker } = require('@faker-js/faker');
const Post = require('./models/post');
const cities = require('./cities');

async function seedPosts() {
    await Post.deleteMany({});
    const posts = [];

    for (let i = 0; i < 600; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
		const random5 = Math.floor(Math.random() * 6);
        const title = faker.lorem.words();
        const description = faker.lorem.paragraphs();
        const postData = {
            title,
            description,
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            geometry: {
                type: 'Point',
                coordinates: [cities[random1000].longitude, cities[random1000].latitude],
            },
			price: random1000,
			avgRating: random5,
            author: '65adcba625c9bdb1a7542fe8'
        }
        let post = new Post(postData);
        post.properties = {
            description: `<strong><a href="/posts/${post._id}">${title}</a></strong><p>${post.location}</p><p>${description.substring(0, 20)}...</p>`
        };
        posts.push(post.save());
    }

    await Promise.all(posts);
    console.log('600 new posts created');
}

module.exports = seedPosts;