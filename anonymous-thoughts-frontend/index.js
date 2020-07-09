const postList = document.querySelector("#post-list")
const postForm = document.querySelector("#create-post")

postForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const newPost = {
        content: event.target.content.value,
        like: 0,
        dislike: 0,
        alias: event.target.alias.value
    }
    console.log(newPost)
    fetch(`http://localhost:3000/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify(newPost)
  })
    .then(r => r.json())
    .then(actualNewPost => {
      renderOnePost(actualNewPost)
      postForm.reset()
    })
})
function renderOnePost(post){
    
    const postCard = document.createElement("div")
    postCard.className = "card"
    postCard.setAttribute("id", "post-card")
    postCard.innerHTML = `
        <p class="card-text">${post.content}</p>
        <p class="card-text">- ${post.alias}</p>
        <button type="button" class="btn btn-success" id="like-btn">${post.like} 👍</button>
        <button type="button" class="btn btn-danger" id="dislike-btn">${post.dislike} 👎</button>
        <br>
    `
    // const cardBreak = document.createElement("br")
    
    postList.append(postCard)
    // postList.prepend(cardBreak)
    console.log(`${post.id} card created`)
    const likeButton = postCard.querySelector("#like-btn")
    const dislikeButton = postCard.querySelector("#dislike-btn")

    

    likeButton.addEventListener("click", () => {

        
        
        console.log(post.like)

        fetch (`http://localhost:3000/posts/${post.id}/like`, {
            method: 'PATCH'
          })
          .then(response => response.json())
          .then(data => {
            likeButton.innerText = `${data.like} 👍`
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    })

    dislikeButton.addEventListener("click", () => {
        
        console.log(post.dislike)

        fetch (`http://localhost:3000/posts/${post.id}/dislike`, {
            method: 'PATCH'
          })
          .then(response => response.json())
          .then(data => {
            dislikeButton.innerText = `${data.dislike} 👎`
            console.log('Success:', data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
    })


}

function renderAllPosts(posts){
    posts.forEach(element => {
        renderOnePost(element)
    });
}

fetch("http://localhost:3000/posts")
    .then(response => response.json())
    .then(postsArr => {
        console.log(postsArr)
        renderAllPosts(postsArr)
    })

function dynamicSearch() {
    let input, filter, div, innerDiv, p, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    console.log(filter)
    div = document.getElementById("post-list");
    console.log(div)
    innerDiv = div.getElementsByClassName("card");
    console.log(innerDiv)
    for (i = 0; i < innerDiv.length; i++) {
        p = innerDiv[i].getElementsByClassName("card-text")[0];
        console.log(p)
        txtValue = p.textContent || p.innerText;
        console.log(txtValue)
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            innerDiv[i].style.display = "block";
        } else {
            innerDiv[i].style.display = "none";
        }
    }

}