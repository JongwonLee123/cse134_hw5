class ProjectCard extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        shadow.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                    max-width: 500px;
                    background: var(--main-bg-color, #fff);
                    border-radius: var(--card-radius);
                    box-shadow: var(--card-shadow);
                    overflow: hidden;
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                :host(:hover) {
                    transform: translateY(-4px);
                    box-shadow: 0 6px 18px rgba(0,0,0,0.25);
                }

                img {
                    width: 100%;
                    height: 200px;
                    object-fit: cover;
                    display: block;
                }

                .content {
                    padding: 1rem;
                    text-align: center;
                }

                h3 {
                    margin: 0 0 0.5rem 0;
                    font-size: 1.25rem;
                }

                p {
                    color: var(--text-color);
                    margin-bottom: 1rem;
                }

                a {
                    color: var(--main-bubble-color);
                    font-weight: bold;
                    text-decoration: none;
                    font-size: 1rem;
                }

                a:hover {
                    text-decoration: underline;
                }
            </style>

            <slot name="picture"></slot>

            <div class="content">
                <h3><slot name="title"></slot></h3>
                <p><slot name="description"></slot></p>

                <!-- FIXED: slot for the hyperlink is now inside the <a> tag -->
                <a id="link" target="_blank">
                    <slot name="link"></slot>
                </a>
            </div>
        `;

        const linkEl = shadow.querySelector("#link");
        const linkSlot = shadow.querySelector('slot[name="link"]');

        if (linkSlot) {
            linkSlot.addEventListener("slotchange", () => {
                const value = linkSlot.assignedNodes()[0]?.textContent?.trim();
                if (value) {
                    linkEl.href = value;
                    linkEl.textContent = "Learn More →";
                }
            });
        }
    }
}

customElements.define("project-card", ProjectCard);
