/* =====================================================
   COMPLIMENTS
===================================================== */

const compliments = [
    {
        title: "How It Started ❤️",
        text: "I love that a simple change in my Hinge settings led us here, together. Seeing your profile gave me butterflies. I knew there was something special about you. From getting food and drinks in Manitou to playing air hockey at the penny arcade, everthing about our first date was special to me.",
        image: "images/hinge-date.jpg"
    },

    {
        title: "Fall With You 🎃",
        text: "This was a special day. I really knew I had fallen for you after this day. Hence, me saying I love you for the first time. The pumpkin patch, picking our first child, Gordo, and freaking out the whole night from the heavy winds made this day truly special.",
        image: "images/pumpkin-patch.JPG"
    },

    {
        title: "Our Adventures",
        text: "I love having such a wonderful woman in my life that enjoys trying new restaurants with me. Even if that means the places with AI generated menus...",
        image: "images/adventures.jpeg"
    },

    {
        title: "Nashville ❤️",
        text: "This trip was so incredibly special. I always find myself smiling when I think about this trip. And like c'mon how couldn't you with the walking tacos being the stars of the show.",
        image: "images/nashville.jpeg"
    },

    {
        title: "The Grand Tetons 🏔️",
        text: "This trip was just sooo WOW. I think you turned me into a fake country boy and that's a true testament to how deeply in love I am with you.",
        image: "images/grand-tetons.JPG"
    },

    {
        title: "The Little Things 🍽️",
        text: "You know...there's just something extremely special about the person you love cooking the most delicious home cooked meals for you. I will gladly do the dishes when the meals are that delicious.",
        image: "images/cooking.jpeg"
    },

    {
        title: "What I Love About You ❤️",
        text: "More than any trip, restaurant, or adventure, my favorite part of this year with you has been getting to know you better. I love the person you are, and I feel incredibly lucky to have you in my life.",
        image: "images/us.JPG"
    },

    {
        title: "Our Future ❤️",
        text: "I'm so excited to watch you start your journey through law school and to be there cheering for you along the way. I know the distance won't last forever, and I can't wait for the day we finally get to close that distance and start building a future together. This time apart is worth it if it means I get to spend the rest of my life with you.",
        image: "images/future.jpeg"
    }
];

/* =====================================================
   GET ELEMENTS
===================================================== */

const welcomeScreen = document.getElementById("welcomeScreen");
const wheelScreen = document.getElementById("wheelScreen");
const finalScreen = document.getElementById("finalScreen");

const beginButton = document.getElementById("beginButton");
const spinButton = document.getElementById("spinButton");

const wheel = document.getElementById("wheel");

const complimentBox =
    document.getElementById("complimentBox");

const complimentText =
    document.getElementById("complimentText");

const complimentImage =
    document.getElementById("complimentImage");

const memoryCounter =
    document.getElementById("memoryCounter");
/* =====================================================
   AVAILABLE COMPLIMENTS
===================================================== */

let availableCompliments = [];

function resetAvailableCompliments() {

    availableCompliments = [];

    for (let i = 0; i < compliments.length; i++) {
        availableCompliments.push(i);
    }

}

resetAvailableCompliments();

/* =====================================================
   CREATE WHEEL NUMBERS
===================================================== */

compliments.forEach((compliment, index) => {

    const number = document.createElement("div");

    number.classList.add("wheel-number");


    /*
       Create the actual number text.
    */

    const label = document.createElement("span");

    label.classList.add("number-label");

    label.innerText = index + 1;

    number.appendChild(label);


    /*
       Find the center of each section.

       Each section is 45 degrees.
    */

    const angle =
        index * 45 + 22.5;

    const radians =
        angle * Math.PI / 180;


    /*
       Distance from the center.

       0.38 puts the number nicely
       inside the middle of the wedge.
    */

    const radius =
        wheel.clientWidth * 0.38;


    /*
       Calculate the position.
    */

    const x =
        Math.sin(radians) * radius;

    const y =
        -Math.cos(radians) * radius;


    /*
       Position the number.
    */

    number.style.left =
        `calc(50% + ${x}px)`;

    number.style.top =
        `calc(50% + ${y}px)`;


    /*
       Remember the angle.
    */

    number.dataset.angle = angle;


    /*
       IMPORTANT:
       The number starts perfectly horizontal.
    */

    label.style.transform =
        "rotate(0deg)";


    wheel.appendChild(number);

});

/* =====================================================
   BEGIN BUTTON
===================================================== */

beginButton.addEventListener("click", function () {

    welcomeScreen.classList.remove("active");

    setTimeout(() => {

        wheelScreen.classList.add("active");

    }, 300);

});


/* =====================================================
   SPINNING
===================================================== */

let currentRotation = 0;

let memoriesRevealed = 0;

let isSpinning = false;


spinButton.addEventListener("click", function () {

    /*
       If all eight memories have already been revealed,
       this button now takes us to the final message.
    */

    if (memoriesRevealed === compliments.length) {

        wheelScreen.classList.remove("active");

        setTimeout(() => {

            finalScreen.classList.add("active");

        }, 800);

        return;
    }


    if (isSpinning) {
        return;
    }

    isSpinning = true;

    spinButton.disabled = true;

    complimentBox.classList.remove("show");

    /*
    Pick a random compliment that has
    NOT already been revealed.
    */

    const randomPosition =
        Math.floor(
            Math.random() * availableCompliments.length
        );

    const winner =
        availableCompliments[randomPosition];


    /*
    Remove this compliment from the
    available choices.
    */

    availableCompliments.splice(
        randomPosition,
        1
    );
    
    /*
       Each section is 45 degrees.
    */

    const sectionAngle = 45;


    /*
       We want the selected section
       to stop underneath the pointer.

       The +22.5 centers the section.
    */

    const targetAngle =
        winner * sectionAngle + 22.5;



    /*
    Find where the wheel is currently positioned.
    */

    const currentAngle =
        currentRotation % 360;


    /*
    Calculate how far we need to rotate
    from the current position to the winner.
    */

    const rotationNeeded =
        (360 - targetAngle - currentAngle + 360) % 360;


    /*
    Add several complete rotations so
    the wheel still makes a nice long spin.
    */

    const extraSpins = 5 * 360;


    /*
    Calculate the final rotation.
    */

    currentRotation +=
        extraSpins +
        rotationNeeded;


    wheel.style.transform =
        `rotate(${currentRotation}deg)`;

    /*
   Counter-rotate the numbers so they
   remain horizontally upright.
    */

    const numeros =
        document.querySelectorAll(".number-label");

    numeros.forEach((label) => {

        label.style.transform =
            `rotate(${-currentRotation}deg)`;

    });

    /*
       Wait for the animation to finish.
    */

    setTimeout(() => {

        complimentImage.src =
            compliments[winner].image;

        complimentText.innerHTML = `
            <strong>${compliments[winner].title}</strong>
            <span>${compliments[winner].text}</span>
        `;

        memoriesRevealed++;

        memoryCounter.innerText =
            `Memory ${memoriesRevealed} of ${compliments.length} ❤️`;

        complimentBox.classList.add("show");


        /*
        Once all eight memories have been revealed,
        change the button into the final transition.
        */

        if (memoriesRevealed === compliments.length) {

            spinButton.innerText =
                "One More Thing... ❤️";

            spinButton.classList.add("final-button");

        }

        spinButton.disabled = false;

        isSpinning = false;

    }, 5200);

});