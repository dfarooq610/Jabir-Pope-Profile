// PARALLAX ON SCROLL
var bannerPosition = d3.scaleLinear()
.domain([0, window.innerHeight/2])
.range([100, 0]);

d3.select(window)
.on("scroll", function() {
    
    var y = bannerPosition(window.scrollY);
    d3.select("#banner")
    .style("background-position", "50% " + y + "%");

});

// IMPLEMENT SCROLLAMA FOR ID="SCROLLY"
const Project = {};

Project.scrolling = {
  // these hold references to helpers and rendered page elements (filled in by `initialize`)
  scroller: undefined, // an instance of scrollama
  steps: undefined, // an array of all the step elements

  // a list of the backdrop images, ordered so they match the `step` elements on the page
  backdrops: [
    {
      src: "./assets/images/jabir1.jpg",
      credit: "Danica",
    },
    {
      src: "https://cdn.glitch.global/60a947a3-a0d4-473b-a51a-ef7120e2f598/puppies.jpg?v=1673897599766",
      credit: "https://www.wisdompanel.com/en-us/blog/sibling-genetics-in-dogs",
    },
    {
      src: "https://cdn.glitch.global/60a947a3-a0d4-473b-a51a-ef7120e2f598/kitten-vs-puppy.jpeg?v=1673897648888",
      credit:
        "https://www.marketwatch.com/story/owning-a-cat-vs-owning-a-dog-which-pet-makes-better-financial-sense-11649445375",
    },
  ],

  // set up the webpage to scroll
  initialize: () => {
    // grab the elements on the page that are related to the scrolling
    const scrollWrapper = document.getElementById("scrolly");
    Project.scrolling.figure = scrollWrapper.getElementsByTagName("figure")[0];
    const article = scrollWrapper.getElementsByTagName("article")[0];
    Project.scrolling.steps = Array.from(
      article.getElementsByClassName("step")
    ); // convert from HTMLCollection to Array for ease of use later
    // intialize the scrollama helper
    Project.scrolling.scroller = scrollama();
    Project.scrolling.scroller
      .setup({
        step: "#scrolly article .step",
        offset: 0.9,
        debug: false,
      })
      .onStepEnter(Project.scrolling.handleStepEnter)
      .onStepExit(Project.scrolling.handleStepExit);
    // setup the default view to be the right size and include first step
    Project.scrolling.handleResize();
    Project.scrolling.setBackdropImage(0); // remember: 0 means the first item in an array
  },

  // call this to switch the background image
  setBackdropImage: (index) => {
    const image = Project.scrolling.figure.getElementsByTagName("img")[0];
    image.src = Project.scrolling.backdrops[index].src;
    image.classList.add = "fade-in";
    // TODO: make this caption text a link
    document.getElementsByTagName("figcaption")[0].innerHTML =
      Project.scrolling.backdrops[index].credit;
  },

  // called by scrollama when the step is being entered
  handleStepEnter: (stepInfo) => {
    // stepInfo = { element, directihandle, index }
    // console.log(`Switched to step ${stepInfo.index}`);
    // TODO: add an `is-active` class on the step that we switched to (and remove from all others)
    // and switch the background image to match the step content
    Project.scrolling.setBackdropImage(stepInfo.index);
  },

  // called by scrollama when moving out of a step
  handleStepExit: (stepInfo) => {
    // we don't make any transitions when a step scrolls out of view
  },

  // called to get content to be the right size to fit the device
  handleResize: () => {
    const stepH = Math.floor(window.innerHeight * 1); // update step heights
    Project.scrolling.steps.forEach(
      (step) => (step.style.height = stepH + "px")
    );
    const figureHeight = window.innerHeight;
    const figureMarginTop = 0;
    Project.scrolling.figure.style.height = figureHeight + "px";
    Project.scrolling.figure.style.top = figureMarginTop + "px";
    Project.scrolling.figure.getElementsByClassName("wrapper")[0].style.height =
      figureHeight + "px";
    Project.scrolling.scroller.resize(); // tell scrollama to update new element dimensions
  },
};