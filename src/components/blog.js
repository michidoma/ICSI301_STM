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
        fetch(`../../db.json`)
          .then(response => response.json())
          .then(data => {
            const blog = data.news.find(blog => blog.id === parseInt(this.blogId));
            // Render the travel details content
            this.render(blog);
          })
          .catch(error => {
            console.error('Error fetching blog:', error);
          });
      }
      render(news) {
        // Destructure the travel details object
        const {id, title, image, altText, content, author, date} = news;
    
        // Render the travel details content
        this.innerHTML = `
        <section class="wrap-article">

                <div class="text-info">
                    <div><i class="fa-regular fa-calendar"></i><div class="info">${date}</div></div>
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