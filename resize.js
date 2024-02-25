document.querySelectorAll(".resizable").forEach((resizable) => {
  const dragHandle = resizable.querySelector(".resize-visual");
  let isResizing = false;

  let isDragging = false;
  let dragStartX, dragSTartY;

  // right click drag
  resizable.addEventListener("contextmenu", (e) => {
    e.preventDefault(); // with this, browser actions will be invisible
  });
  resizable.addEventListener("mousedown", (e) => {
    if (e.button === 2 && e.target !== dragHandle) {
      isDragging = true;
      dragStartX = e.clientX - resizable.offsetLeft;
      dragStartY = e.clientY - resizable.offsetTop;

      function doDrag(e) {
        if (isDragging) {
          resizable.style.left = e.clientX - dragStartX + "px";
          resizable.style.top = e.clientY - dragStartY + "px";
        }
      }

      function stopDrag() {
        window.removeEventListener("mousemove", doDrag);
        window.removeEventListener("mouseup", stopDrag);
        isDragging = false;
      }

      window.addEventListener("mousemove", doDrag);
      window.addEventListener("mouseup", stopDrag);
    }
  });

  // resize
  dragHandle.addEventListener("mousedown", (e) => {
    e.preventDefault();
    isResizing = true;
    let startX, startY, startWidth, startHeight;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = resizable.offsetWidth;
    startHeight = resizable.offsetHeight;

    function doResize(e) {
      if (isResizing) {
        resizable.style.width = startWidth + e.clientX - startX + "px";
        resizable.style.height = startHeight + e.clientY - startY + "px";
      }
    }

    function stopResize() {
      window.removeEventListener("mousemove", doResize);
      window.removeEventListener("mouseup", stopResize);
      isResizing = false;
    }

    window.addEventListener("mousemove", doResize);
    window.addEventListener("mouseup", stopResize);
  });
});
