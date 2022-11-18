//Main Javascript

//Event Listeners

const openCloseButton = document.querySelector('.openClose');
openCloseButton.addEventListener('click', () => {

    const innerButtons = document.querySelectorAll('.innerButton');

    const gradientLayer = document.querySelector('.gradientLayer');
    gradientLayer.classList.toggle('expanded');

    const innerButtonContainers = document.querySelectorAll('.innerButtonContainer');
    innerButtonContainers.forEach((buttonContainer) => {
        buttonContainer.classList.toggle('expanded');
    });

    innerButtons.forEach((button) => {
        button.classList.remove('hoverable');
        button.classList.toggle('expanded');
    });

    waitForTransition(innerButtons[0], () => {
        innerButtons.forEach((button) => {
            button.classList.toggle('hoverable');
        });
    });
});

//assignCirclePoints(findCirclePoints(30));

function assignCirclePoints (points) {
    const innerButtons = document.querySelectorAll('.innerButton');
    innerButtons.forEach((button, index) => {

        button.style.top = (-points[index].y + 1) + "rem";
    });

    const innerButtonContainers = document.querySelectorAll('.innerButtonContainer');
    console.log(innerButtonContainers);
    innerButtonContainers.forEach((container, index) => {
    container.style.right = (-points[index].x - 22) + "rem";
    });
}

function findCirclePoints (radius) {
    let positions = [];
    for ( let i = 150; i <= 210; i += 10 ) {

        let radians = i*(Math.PI/180);
        let x = Math.floor(100*(Math.cos(radians)*radius))/100;
        let y = Math.floor(100*(Math.sin(radians)*radius))/100;
        y = Math.round(y*100)/100;
        x = Math.round(x*100)/100;
        y += 20;
        console.log("%cx: " + x, "color: #52489C;");
        console.log("%cy: " + y, "color: #00C408;");
        console.log("----------------------");
        positions.push({ x, y });
    }
    console.log(positions);
    return positions.reverse();
}

function waitForTransition(element, functionToFire) {
    function whichTransition() {
        const transitions = {
            transition: 'transitionend',
            OTransition: 'oTransitionEnd',
            MozTransition: 'transitionend',
            WebkitTransition: 'webkitTransitionEnd',
        };
        for (const transition in transitions) {
            if (element.style[transition] !== 'undefined') {
                return transitions[transition];
            }
        }
    }
    let transitionend = whichTransition();
    element.addEventListener(transitionend, functionToFire, false);
}