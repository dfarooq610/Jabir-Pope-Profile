 // using d3 for convenience
  var mainOverlay = document.querySelector("main");
  var scrollyOverlay = main.querySelector("#scrolly-overlay");
  var stickyOverlay = scrolly.querySelector(".sticky-thing-overlay");
  var articleOverlay = scrolly.querySelector(".article-overlay");
  var stepsOverlay = articleOverlay.querySelectorAll(".step-overlay");

  // initialize the scrollama
  var scrollerOverlay = scrollama();

  // scrollama event handlers
  function handleStepEnter2(response) {
    // response = { element, direction, index }
    var el = response.element;

    // remove is-active from all steps
    // then add is-active to this step
    stepsOverlay.forEach(step => step.classList.remove('is-active'));
    el.classList.add('is-active');

    // update graphic based on step
    stickyOverlay.querySelector("p").innerText = el.dataset.step;
  }

  function init() {
    // 2. setup the scroller passing options
    // 		this will also initialize trigger observations
    // 3. bind scrollama event handlers (this can be chained like below)
    scrollerOverlay
      .setup({
        step: "#scrolly-overlay articleOverlay .step",
        offset: 0.33,
        debug: true
      })
      .onStepEnter(handleStepEnter2);

    // setup resize event
    window.addEventListener("resize", scrollerOverlay.resize);
  }

  // kick things off
  init();
