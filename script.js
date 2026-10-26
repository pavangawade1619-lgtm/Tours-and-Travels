
// =========================================
// BHARAT TRAILS — JAVASCRIPT
// =========================================

// 1. DESTINATION DATA
// Add or edit destinations in this array.

const destinations = [
  {
    name: "Kashmir",
    state: "Jammu & Kashmir",
    category: "mountains",
    label: "Mountain Escape",
    description: "Snow-capped peaks, alpine lakes and breathtaking valleys.",
    duration: "5–7 days",
    image: "photo-1595815771614-ade9d652a65d",
    alt: "Mountain scenery in Kashmir"
  },
  {
    name: "Goa",
    state: "Goa",
    category: "beaches",
    label: "Beach Paradise",
    description: "Golden sands, coastal villages and laid-back sunsets.",
    duration: "3–5 days",
    image: "photo-1512343879784-a960bf40e7f2",
    alt: "Tropical beach in Goa"
  },
  {
    name: "Jaipur",
    state: "Rajasthan",
    category: "heritage",
    label: "Royal Heritage",
    description: "Pink facades, magnificent forts and royal architecture.",
    duration: "2–4 days",
    image: "photo-1477587458883-47145ed94245",
    alt: "Historic architecture in Jaipur"
  },
  {
    name: "Kerala",
    state: "Kerala",
    category: "nature",
    label: "Green Paradise",
    description: "Lush tea gardens, peaceful backwaters and tropical beauty.",
    duration: "4–6 days",
    image: "photo-1602216056096-3b40cc0c9944",
    alt: "Green landscapes of Kerala"
  },
  {
    name: "Ladakh",
    state: "Ladakh",
    category: "mountains",
    label: "Adventure",
    description: "High-altitude roads, dramatic peaks and blue mountain lakes.",
    duration: "6–8 days",
    image: "photo-1519681393784-d120267933ba",
    alt: "Mountain landscape"
  },
  {
    name: "Agra",
    state: "Uttar Pradesh",
    category: "heritage",
    label: "Iconic India",
    description: "Discover the Taj Mahal and the grandeur of Mughal history.",
    duration: "1–2 days",
    image: "photo-1564507592333-c60657eea523",
    alt: "Taj Mahal in Agra"
  },
  {
    name: "Manali",
    state: "Himachal Pradesh",
    category: "mountains",
    label: "Mountain Escape",
    description: "Pine forests, river valleys and Himalayan adventures.",
    duration: "4–5 days",
    image: "photo-1626621341517-bbf3d9990a23",
    alt: "Himalayan scenery near Manali"
  },
  {
    name: "Varanasi",
    state: "Uttar Pradesh",
    category: "spiritual",
    label: "Sacred India",
    description: "Ancient ghats, timeless traditions and riverside rituals.",
    duration: "2–3 days",
    image: "photo-1561361513-2d000a50f0dc",
    alt: "Historic Indian riverside architecture"
  }
];

// 2. SELECT DOM ELEMENTS

const destinationGrid = document.getElementById("destinationGrid");
const filterBar = document.getElementById("filterBar");
const noResults = document.getElementById("noResults");

// 3. RENDER DESTINATION CARDS

function renderDestinations(category = "all") {
  const filtered = destinations.filter(destination => {
    return category === "all" || destination.category === category;
  });

  destinationGrid.innerHTML = "";

  noResults.classList.toggle("hidden", filtered.length !== 0);

  filtered.forEach((destination, index) => {
    const card = document.createElement("article");
    card.className = "destination-card";
    card.style.animationDelay = `${index * 90}ms`;

    // Use DOM APIs and textContent for destination text.
    const imageWrap = document.createElement("div");
    imageWrap.className = "destination-image-wrap";

    const image = document.createElement("img");
    image.className = "destination-image";
    image.src =
      `https://images.unsplash.com/${destination.image}?auto=format&fit=crop&w=900&q=80`;
    image.alt = destination.alt;
    image.loading = index < 3 ? "eager" : "lazy";
    image.decoding = "async";

    image.addEventListener("error", () => {
      image.alt = `${destination.name} photo unavailable`;
    }, { once: true });

    const tag = document.createElement("span");
    tag.className = "destination-tag";
    tag.textContent = destination.label;

    const number = document.createElement("span");
    number.className = "destination-number";
    number.textContent = String(index + 1).padStart(2, "0");

    imageWrap.append(image, tag, number);

    const content = document.createElement("div");
    content.className = "destination-content";

    const location = document.createElement("div");
    location.className = "destination-location";
    location.textContent = `✳ ${destination.state}`;

    const title = document.createElement("h3");
    title.textContent = destination.name;

    const description = document.createElement("p");
    description.textContent = destination.description;

    const bottom = document.createElement("div");
    bottom.className = "destination-bottom";

    const duration = document.createElement("span");
    duration.textContent = `◷ ${destination.duration}`;

    const link = document.createElement("a");
    link.className = "destination-link";
    link.href = "#contact";
    link.textContent = "Plan a trip ↗";
    link.setAttribute("aria-label", `Plan a trip to ${destination.name}`);

    link.addEventListener("click", () => {
      const select = document.getElementById("destinationSelect");
      select.value = destination.name;
    });

    bottom.append(duration, link);
    content.append(location, title, description, bottom);
    card.append(imageWrap, content);
    destinationGrid.appendChild(card);
  });
}

// 4. DESTINATION FILTERS

filterBar.addEventListener("click", event => {
  const button = event.target.closest("[data-filter]");

  if (!button) return;

  document.querySelectorAll(".filter-btn").forEach(filter => {
    filter.classList.remove("active");
  });

  button.classList.add("active");
  renderDestinations(button.dataset.filter);
});

// 5. EXPERIENCE CARD FILTERING

document.querySelectorAll("[data-experience]").forEach(card => {
  card.addEventListener("click", () => {
    const category = card.dataset.experience;

    const filterButton = document.querySelector(
      `[data-filter="${category}"]`
    );

    if (filterButton) {
      filterButton.click();
    }
  });
});

// 6. NAVBAR SCROLL EFFECT

const navbar = document.getElementById("navbar");

function updateNavbar() {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
}

window.addEventListener("scroll", updateNavbar, { passive: true });
updateNavbar();

// 7. MOBILE NAVIGATION

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    menuToggle.textContent = "☰";
  });
});

// 8. SCROLL REVEAL ANIMATIONS

const revealElements = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: "0px 0px -35px 0px"
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach(element => {
    element.classList.add("visible");
  });
}

// 9. TRAVEL INQUIRY FORM

const travelForm = document.getElementById("travelForm");
const formMessage = document.getElementById("formMessage");
const travelDate = document.getElementById("travelDate");

// Prevent selecting a date in the past.
const today = new Date();
const localToday = [
  today.getFullYear(),
  String(today.getMonth() + 1).padStart(2, "0"),
  String(today.getDate()).padStart(2, "0")
].join("-");

travelDate.min = localToday;

travelForm.addEventListener("submit", event => {
  event.preventDefault();

  if (!travelForm.reportValidity()) return;

  const formData = new FormData(travelForm);
  const name = formData.get("name").trim();
  const destination = formData.get("destination");

  formMessage.textContent =
    `Thank you, ${name}! Your ${destination} trip inquiry is ready. ` +
    "This demo does not send your details. Connect a backend or email service to receive it.";

  // No data is uploaded or sent by this demo.
});

// 10. AUTOMATIC FOOTER YEAR

document.getElementById("currentYear").textContent =
  new Date().getFullYear();

// 11. INITIAL RENDER

renderDestinations();
