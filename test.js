// Try new way
// Source: http://rstudio-pubs-static.s3.amazonaws.com/492661_bbe5d5e670b74ddab6d05cf3ee909a33.html

(function() {
  var scrolla = scrollama(),
      selector = "div.figure, img, table, video, embed, iframe, .html-widget",
      container = document.querySelector(".exhibit");

  scrolla.setup({"step": ".section, " + selector})
    .onStepEnter(res => {
      var el = res.element;
      el.classList.add("is-active");
      var ex = el;
      if (el.classList.contains("section")) {
        ex = el.querySelector(selector);
        if (!ex) {
          container.innerHTML = "";
          return;
        }
      }
      if (ex.nodeName === "img" && ex.parentNode.classList.contains("figure")) {
        ex = ex.parentNode;
      }
      container.innerHTML = "";
      container.append(ex.cloneNode(true));
      var els = container.querySelectorAll("*[width]");
      for (var i = 0; i < els.length; i++) {
        els[i].removeAttribute('width');
      }
    })
    .onStepExit(res => {
      res.element.classList.remove("is-active");
    });

  window.addEventListener("resize", scrolla.resize);
})();