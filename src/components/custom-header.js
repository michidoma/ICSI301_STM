class Header extends HTMLElement {
  current = "";
  route = "";
  constructor() {
    super();
  }
  static get observedAttributes() {
    return ["current"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name == "current") {
      this.current = newValue || "";
    }
    if (this.current == "home") {
      this.route = "src";
    } else {
      this.route = "..";
    }
    this.render();
  }
  render() {
    this.innerHTML = `
    <header>
    <section class="top-bar">
        <div class="right">
            <div>USD <img src="${this.current == "home" ? `assets` : `../../assets`}/icons/usd.webp" width="16" height="16" alt="US currency"/>
             3,527.29</div>
            <div>Улаанбаатар -13.9°C</div>
            <div>
                <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.5 18L14.8571 12M9.14286 12L2.50003 18M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <a href="mailto:info@mongolayalal.mn" rel="nofollow">info@mongolayalal.mn</a>
            </div>
            <div>
                <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5 6.5C15.2372 6.64382 15.9689 6.96892 16.5 7.5C17.0311 8.03108 17.3562 8.76284 17.5 9.5M15 3C16.5315 3.17014 17.9097 3.91107 19 5C20.0903 6.08893 20.8279 7.46869 21 9M20.9995 16.4767V19.1864C21.0037 20.2223 20.0723 21.0873 19.0265 20.9929C10.0001 21 3.00006 13.935 3.00713 4.96919C2.91294 3.92895 3.77364 3.00106 4.80817 3.00009H7.52331C7.96253 2.99577 8.38835 3.151 8.72138 3.43684C9.66819 4.24949 10.2772 7.00777 10.0429 8.10428C9.85994 8.96036 8.99696 9.55929 8.41026 10.1448C9.69864 12.4062 11.5747 14.2785 13.8405 15.5644C14.4272 14.9788 15.0274 14.1176 15.8851 13.935C16.9855 13.7008 19.7615 14.3106 20.5709 15.264C20.858 15.6021 21.0105 16.0337 20.9995 16.4767Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <a href="tel:(+976) 7570 - 7779" rel="nofollow">(+976) 7570 - 7779</a>
            </div>
        </div>
        <div class="left">
            <a aria-label="Facebook" target="_blank" rel="noopener" href="https://www.facebook.com/mongoliantravel/">
                <i class="fa-brands fa-facebook-f"></i>
            </a>
            <a aria-label="Instagram" target="_blank" rel="noopener" href="https://www.instagram.com/mongolayalal/">
                <i class="fa-brands fa-instagram"></i>
            </a>
            <a aria-label="Youtube" target="_blank" rel="noopener" href="https://www.youtube.com/@mongoliantravelcompany">
                <i class="fa-brands fa-youtube"></i>
            </a>
            <a aria-label="Twitter" target="_blank" rel="noopener" href="https://twitter.com/mongolayalal">
                <i class="fa-brands fa-twitter"></i>
            </a>
        </div>
    </section>
    <nav class="wrapper">
        <a href="#" class="logo">
            ${
              this.current == "home"
                ? `<img src="assets/img/logo-no-background.png" width="163" height="56" alt="logo-mongol-ayalal" />`
                : `<img src="../../assets/img/logo.png" width="193" height="56" alt="logo-mongol-ayalal" />`
            }
        </a>
        <ul class="menu">
            <li>
            <a aria-label="navigate to home page" class=${
              this.current == "home" && "active"
            } href="../../index.html">Нүүр</a>
            </li>
            <li>
            <a aria-label="navigate to travels list page" class=${
              this.current == "travels" && "active"
            } href="${this.route}/html/travel-details.html">Аяллууд</a>
            </li>
            <li>
            <a aria-label="navigate to blog page" class=${
              this.current == "blog" && "active"
            } href="${this.route}/html/blog.html">Мэдээлэл</a>
            </li>
            <li>
            <a aria-label="navigate to contact page" class=${
              this.current == "contact" && "active"
            } href="${this.route}/html/contact.html">Холбоо барих</a>
            </li>
            <li id="book-button">
            <a aria-label="navigate to booking page" class=${
              this.current == "book" && "active"
            } href="${this.route}/html/book.html">Захиалах</a>
            </li>
            <li class="menu-bottom">
            <div>
                <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.5 18L14.8571 12M9.14286 12L2.50003 18M2 7L10.1649 12.7154C10.8261 13.1783 11.1567 13.4097 11.5163 13.4993C11.8339 13.5785 12.1661 13.5785 12.4837 13.4993C12.8433 13.4097 13.1739 13.1783 13.8351 12.7154L22 7M6.8 20H17.2C18.8802 20 19.7202 20 20.362 19.673C20.9265 19.3854 21.3854 18.9265 21.673 18.362C22 17.7202 22 16.8802 22 15.2V8.8C22 7.11984 22 6.27976 21.673 5.63803C21.3854 5.07354 20.9265 4.6146 20.362 4.32698C19.7202 4 18.8802 4 17.2 4H6.8C5.11984 4 4.27976 4 3.63803 4.32698C3.07354 4.6146 2.6146 5.07354 2.32698 5.63803C2 6.27976 2 7.11984 2 8.8V15.2C2 16.8802 2 17.7202 2.32698 18.362C2.6146 18.9265 3.07354 19.3854 3.63803 19.673C4.27976 20 5.11984 20 6.8 20Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <a href="mailto:info@mongolayalal.mn" rel="nofollow">info@mongolayalal.mn</a>
            </div>
            <div>
                <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.5 6.5C15.2372 6.64382 15.9689 6.96892 16.5 7.5C17.0311 8.03108 17.3562 8.76284 17.5 9.5M15 3C16.5315 3.17014 17.9097 3.91107 19 5C20.0903 6.08893 20.8279 7.46869 21 9M20.9995 16.4767V19.1864C21.0037 20.2223 20.0723 21.0873 19.0265 20.9929C10.0001 21 3.00006 13.935 3.00713 4.96919C2.91294 3.92895 3.77364 3.00106 4.80817 3.00009H7.52331C7.96253 2.99577 8.38835 3.151 8.72138 3.43684C9.66819 4.24949 10.2772 7.00777 10.0429 8.10428C9.85994 8.96036 8.99696 9.55929 8.41026 10.1448C9.69864 12.4062 11.5747 14.2785 13.8405 15.5644C14.4272 14.9788 15.0274 14.1176 15.8851 13.935C16.9855 13.7008 19.7615 14.3106 20.5709 15.264C20.858 15.6021 21.0105 16.0337 20.9995 16.4767Z" stroke="#fff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <a href="tel:(+976) 7570 - 7779" rel="nofollow">(+976) 7570 - 7779</a>
            </div>
            <div class="left">
                <a aria-label="Facebook" target="_blank" rel="noopener" href="https://www.facebook.com/mongoliantravel/">
                    <i class="fa-brands fa-facebook-f"></i>
                </a>
                <a aria-label="Instagram" target="_blank" rel="noopener" href="https://www.instagram.com/mongolayalal/">
                    <i class="fa-brands fa-instagram"></i>
                </a>
                <a aria-label="Youtube" target="_blank" rel="noopener" href="https://www.youtube.com/@mongoliantravelcompany">
                    <i class="fa-brands fa-youtube"></i>
                </a>
                <a aria-label="Twitter" target="_blank" rel="noopener" href="https://twitter.com/mongolayalal">
                    <i class="fa-brands fa-twitter"></i>
                </a>
            </div>
            </li>
        </ul>
        <div class="bx bx-menu" id="menu-icon"></div>
    </nav>
    </header>
  `;
  }
}

customElements.define("custom-header", Header);