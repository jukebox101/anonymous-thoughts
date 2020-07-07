
function renderOnePost(post){
    const postList = document.querySelector("#post-list")

    const postCard = document.createElement("div")
    postCard.className = "post-card"
    postCard.innerHTML = `
        <p>${post.content}</p>
        <p>- ${post.user.name}</p>
        <p>${post.like} likes</p>
        <p>${post.dislike} dislikes</p>
        <button type="button" class="btn btn-success">Like</button>
        <button type="button" class="btn btn-danger">Dislike</button>
    `
    postList.append(postCard)
}
function renderAllPosts(posts){
    posts.forEach(renderOnePost);
}

fetch("http://localhost:3000/posts")
    .then(response => response.json())
    .then(renderAllPosts)