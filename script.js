/* =====================================================
   CAMPUSX — CAMPUS EVENT MANAGEMENT SYSTEM
   JavaScript Functionality
===================================================== */


/* =====================================================
   MOBILE NAVIGATION
===================================================== */

function toggleMenu() {
    const navLinks = document.querySelector(".nav-links");

    navLinks.classList.toggle("active");
}


function closeMenu() {
    const navLinks = document.querySelector(".nav-links");

    navLinks.classList.remove("active");
}


/* =====================================================
   EVENT FILTERING
===================================================== */

let currentCategory = "all";


function filterCategory(category, button) {

    currentCategory = category;

    // Remove active state from all filter buttons
    const buttons = document.querySelectorAll(".filter-btn");

    buttons.forEach(btn => {
        btn.classList.remove("active");
    });

    // Add active state to selected button
    if (button) {
        button.classList.add("active");
    }

    filterEvents();
}


/* =====================================================
   SEARCH EVENTS
===================================================== */

function filterEvents() {

    const searchInput = document.getElementById("searchInput");

    const searchTerm = searchInput.value
        .toLowerCase()
        .trim();

    const eventCards = document.querySelectorAll(".event-card");

    let visibleEvents = 0;


    eventCards.forEach(card => {

        const category = card.dataset.category;

        const title = card.dataset.title.toLowerCase();


        const matchesCategory =
            currentCategory === "all" ||
            category === currentCategory;


        const matchesSearch =
            title.includes(searchTerm);


        if (matchesCategory && matchesSearch) {

            card.classList.remove("hidden");

            visibleEvents++;

        } else {

            card.classList.add("hidden");

        }

    });


    // Show "No events found" message
    const noEvents = document.getElementById("noEvents");

    if (visibleEvents === 0) {

        noEvents.classList.add("show");

    } else {

        noEvents.classList.remove("show");

    }

}


/* =====================================================
   REGISTRATION MODAL
===================================================== */

let selectedEventName = "";


function openRegistration(eventName) {

    selectedEventName = eventName;


    const modal =
        document.getElementById("registrationModal");

    const selectedEvent =
        document.getElementById("selectedEvent");

    const registrationForm =
        document.getElementById("registrationForm");

    const successMessage =
        document.getElementById("registrationSuccess");


    selectedEvent.textContent = eventName;


    // Reset form
    registrationForm.reset();

    registrationForm.style.display = "block";

    successMessage.classList.remove("show");


    // Open modal
    modal.classList.add("show");


    // Prevent background scrolling
    document.body.style.overflow = "hidden";


    // Focus on name field
    setTimeout(() => {

        document.getElementById("studentName").focus();

    }, 200);

}


function closeRegistration() {

    const modal =
        document.getElementById("registrationModal");

    modal.classList.remove("show");

    document.body.style.overflow = "";

}


/* =====================================================
   REGISTRATION FORM
===================================================== */

const registrationForm =
    document.getElementById("registrationForm");


registrationForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const name =
        document.getElementById("studentName").value.trim();

    const email =
        document.getElementById("studentEmail").value.trim();

    const department =
        document.getElementById("studentDepartment").value;


    if (!name || !email || !department) {

        alert("Please complete all fields.");

        return;

    }


    /*
       Save registration in browser storage.
       This is useful for demonstrating
       data persistence without a backend.
    */

    const registration = {

        event: selectedEventName,

        name: name,

        email: email,

        department: department,

        registeredAt: new Date().toISOString()

    };


    let registrations =
        JSON.parse(
            localStorage.getItem("campusXRegistrations")
        ) || [];


    registrations.push(registration);


    localStorage.setItem(
        "campusXRegistrations",
        JSON.stringify(registrations)
    );


    // Hide form
    registrationForm.style.display = "none";


    // Show success message
    const successMessage =
        document.getElementById("registrationSuccess");

    successMessage.classList.add("show");

});


/* =====================================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
===================================================== */

const registrationModal =
    document.getElementById("registrationModal");


registrationModal.addEventListener("click", function(event) {

    if (event.target === registrationModal) {

        closeRegistration();

    }

});


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        closeRegistration();

        closeMenu();

    }

});


/* =====================================================
   SMOOTH NAVIGATION
===================================================== */

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function(event) {

        const targetId =
            this.getAttribute("href");

        const target =
            document.querySelector(targetId);


        if (target) {

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth"
            });

        }

    });

});


/* =====================================================
   INITIALIZE APPLICATION
===================================================== */

document.addEventListener("DOMContentLoaded", function() {

    console.log(
        "CampusX Event Management System loaded successfully."
    );

});
