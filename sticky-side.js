    // using d3 for convenience
    var main = document.querySelector("main");
    var scrolly = main.querySelector(".scrolly-2");
    var sticky = scrolly.querySelector(".sticky-thing");
    var article = scrolly.querySelector("article");
    var steps2 = article.querySelectorAll(".step-2");

    // initialize the scrollama
    var scroller2 = scrollama();

    // scrollama event handlers
    function handleStepEnter(response) {
    // response = { element, direction, index }
    var el = response.element;

    // remove is-active from all steps
    // then add is-active to this step
    steps2.forEach(step2 => step2.classList.remove('is-active'));
    el.classList.add('is-active');

    // update graphic based on step
    sticky.querySelector("p").innerText = el.dataset.step2;
    }


    // just comment out debug: true to make lines go away
    function init() {
    scroller2
        .setup({
        step2: "#scrolly2 .article2 .step-2",
        offset: 0.33,
        debug: true
        })
        .onStepEnter(handleStepEnter);

    // setup resize event
    window.addEventListener("resize", scroller2.resize);
    }

    // kick things off
    init();