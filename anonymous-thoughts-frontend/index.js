const postList = document.querySelector("#post-list")
const postForm = document.querySelector("#create-post")
const alertDiv = document.querySelector("#alert-div")

postForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const newPost = {
        content: event.target.content.value,
        like: 0,
        dislike: 0,
        alias: event.target.alias.value
    }
    if (newPost["content"] !== "" && newPost["alias"] !== ""){
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
    .catch((errors) => {
      console.error('Error:', errors);
    });
  }
  else {
    console.log("Invalid Input")
    alertDiv.innerHTML = `
    <div class="alert alert-danger alert-dismissible fade show">
      <button type="button" class="close" data-dismiss="alert">&times;</button>
      <strong>Invalid Input!</strong> All inputs fields must be filled.
    </div>
    `
  }
})
function renderOnePost(post){
    
    const postCard = document.createElement("div")
    postCard.className = "card"
    postCard.setAttribute("id", "post-card")
    postCard.innerHTML = `
        <p class="card-text" id="content-body">${post.content}</p>
        <p class="card-text" id="alias-name"> ${post.alias}</p>
        <button type="button" class="btn" id="like-btn">${post.like} 👍</button>
        <button type="button" class="btn" id="dislike-btn">${post.dislike} 👎</button>
    `
    // const cardBreak = document.createElement("br")
    
    postList.prepend(postCard)
    // postList.prepend(cardBreak)
    console.log(`${post.id} card created`)
    const likeButton = postCard.querySelector("#like-btn")
    const dislikeButton = postCard.querySelector("#dislike-btn")
    const contentBody = postCard.querySelector("#content-body")
    contentBody.innerHTML = Autolinker.link(contentBody.innerHTML)

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
          .catch((errors) => {
            console.error('Error:', errors);
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
          .catch((errors) => {
            console.error('Error:', errors);
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
    div = document.getElementById("post-list");
    innerDiv = div.getElementsByClassName("card");

    for (i = 0; i < innerDiv.length; i++) {
        p = innerDiv[i].getElementsByClassName("card-text")[0];
        txtValue = p.textContent || p.innerText;

        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            innerDiv[i].style.display = "block";
        } else {
            innerDiv[i].style.display = "none";
        }
    }

}