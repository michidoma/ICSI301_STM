class Article extends HTMLElement {

    constructor() {
        super();

        // this.attachShadow({mode: "open"});

        /*this.render();*/

        const urlParams = new URLSearchParams(window.location.search);
        this.blogId = urlParams.get('blogid');
        console.log(this.blogId);

        // Fetch and render the travel details based on the travel ID
        
        this.fetchAndRenderBlog();
    }

    fetchAndRenderBlog() {
        // Make a request to fetch the travel details based on the travel ID
        fetch(`http://localhost:3000/blogs/${this.blogId}`)
          .then(response => response.json())
          .then(blog => {
            // const blog = data.find(blog => blog.id === parseInt(this.blogId));
            // Render the travel details content
            this.render(blog);
          })
          .catch(error => {
            console.error('Error fetching blog:', error);
          });
      }
      render(news) {
        // Destructure the travel details object
        const {id, title, image, altText, content, author, publishdate} = news;

        const date = new Date(publishdate); 
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        const shortDate = date.toLocaleDateString(undefined, options);
    
        // Render the travel details content
        this.innerHTML = `
        <section class="wrap-article">

                <div class="text-info">
                    <div><i class="fa-regular fa-calendar"></i><div class="info">${shortDate}</div></div>
                    <div><i class="fa-regular fa-pen-to-square"></i><div class="info">${author}</div></div>
                </div>

                <h1>${title}</h1>

                <section class="article-image">
                    <img src="../../${image}" alt="${altText}" class="plane">
                </section>

                <section class="article">
                    <p>${content}</p>
                </section>

            </section>
        `;
    }
}

customElements.define("blog-news", Article);