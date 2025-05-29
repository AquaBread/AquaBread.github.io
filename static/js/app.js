const navLinks = document.querySelectorAll("#sub-navbar .nav-link");
const currentSectionTitle = document.getElementById("current-section-title");
const subNavbarCollapse = document.getElementById("subNavbarNav");

const sectionMap = {
    abt: "About Me",
    hero: "Project Description",
    pdesc: "Project Description",
    data: "Data Analytics",
    proj: "Projects",
    mthd: "Methodology",
    con: "Conclusion",
    contact: "Contact"
};

function getNavHeight() {
    const nav = document.querySelector(".navbar");
    const subNav = document.querySelector(".sub-navbar");
    return nav.offsetHeight + subNav.offsetHeight;
}

function getCurrentSectionId() {
    const scrollPosition = window.scrollY + getNavHeight() + 20; // Add a little buffer
    let currentId = "abt";

    Object.keys(sectionMap).forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            const sectionTop = el.offsetTop;
            if (scrollPosition >= sectionTop) {
                currentId = id;
            }
        }
    });

    return currentId;
}

function updateActiveNav() {
    const currentId = getCurrentSectionId();
    currentSectionTitle.textContent = sectionMap[currentId];

    navLinks.forEach(link => {
        link.classList.remove("active");
        const hrefId = link.getAttribute("href").slice(1);
        if (hrefId === currentId) {
            link.classList.add("active");
        }
    });
}

function scrollToSection(e) {
    const id = this.getAttribute("href").slice(1);
    const target = document.getElementById(id);
    if (target) {
        e.preventDefault();
        const offset = getNavHeight();
        const position = target.getBoundingClientRect().top + window.scrollY - offset + 100;
        window.scrollTo({ top: position, behavior: "smooth" });
    }

    // Close navbar on mobile
    if (subNavbarCollapse.classList.contains("show")) {
        bootstrap.Collapse.getInstance(subNavbarCollapse)?.hide();
    }
}

navLinks.forEach(link => link.addEventListener("click", scrollToSection));
window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);