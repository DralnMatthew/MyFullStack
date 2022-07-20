const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    const reducer = (sum, item) => {
        return sum + item.likes
    }
    return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return {};
    let title, author, likes = 0;
    for (let i = 0; i < blogs.length; i ++ ) {
        if (blogs[i].likes >= likes) {
            title = blogs[i].title;
            author = blogs[i].author;
            likes = blogs[i].likes;
        }
    }
    return {title: title, author: author, likes: likes};
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return {};
    const hash = new Map();
    for (let i = 0; i < blogs.length; i ++ ) {
        const author = blogs[i].author;
        if (hash.has(author)) {
            hash.set(author, hash.get(author) + 1);
        } else {
            hash.set(author, 1);
        }
    }
    let author, cnt = 0;
    for (const [key, value] of hash) {
        if (value >= cnt) {
            cnt = value;
            author = key;
        }
    }
    return {author: author, blogs: cnt};
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return {};
    const hash = new Map();
    for (let i = 0; i < blogs.length; i ++ ) {
        const author = blogs[i].author;
        if (hash.has(author)) {
            hash.set(author, hash.get(author) + blogs[i].likes);
        } else {
            hash.set(author, blogs[i].likes);
        }
    }
    let author, cnt = 0;
    for (const [key, value] of hash) {
        if (value >= cnt) {
            cnt = value;
            author = key;
        }
    }
    return {author: author, likes: cnt};
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};