// preventing browser default actions
document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});
//---------------------------------------------------------

// removing boxes on button click or 'Alt' key
let removing_mode = false;

function remove_status() {
  const remove_box = document.getElementById("remove_box");
  remove_box.textContent = removing_mode ? "removing.." : "remove mode off";
  document.querySelectorAll(".resizable").forEach((box) => {
    box.style.cursor = removing_mode ? "pointer" : "";
  });
}

document.querySelector("#remove_box").addEventListener("click", () => {
  removing_mode = !removing_mode; // toggle removing mode on button click
  remove_status();
});

// keydown and keyup events for removal mode toggle
document.addEventListener("keydown", (e) => {
  if (e.key === "Alt") {
    e.preventDefault();
    removing_mode = true;
    remove_status();
  }
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Alt") {
    e.preventDefault();
    removing_mode = false;
    remove_status();
  }
});

// acually removing boxes
document.addEventListener("click", (e) => {
  if (removing_mode && e.target.classList.contains("box")) {
    e.target.remove();
  }
});
//---------------------------------------------------------

// adding new boxes
document.querySelector("#add_box").addEventListener("click", () => {
  const box_container = document.querySelector("#main_block");
  const new_box = document.createElement("div");

  new_box.className = "box";
  new_box.innerHTML = '<div class="resize_visual"></div>';
  box_container.appendChild(new_box);
  append_box_features(new_box);
});
//---------------------------------------------------------

// adding features to new boxes
function append_box_features(new_box) {
  const resize = new_box.querySelector(".resize_visual");
  let is_resizing = false;

  resize.addEventListener("mousedown", (e) => {
    e.preventDefault();
    is_resizing = true;

    let startX = e.clientX;
    let startWidth = new_box.offsetWidth;

    let startY = e.clientY;
    let startHeight = new_box.offsetHeight;

    function do_resize(e) {
      if (is_resizing) {
        new_box.style.width = startWidth + e.clientX - startX + "px";
        new_box.style.height = startHeight + e.clientY - startY + "px";
      }
    }

    function stop_resize() {
      is_resizing = false;
      window.removeEventListener("mousemove", do_resize);
      window.removeEventListener("mouseup", stop_resize);
    }

    window.addEventListener("mousemove", do_resize);
    window.addEventListener("mouseup", stop_resize);
  });

  // drag by right click
  let is_dragging = false;
  new_box.addEventListener("mousedown", (e) => {
    if (e.button === 2 && e.target !== resize) {
      is_dragging = true;
      let drag_start_x = e.clientX - new_box.offsetLeft;
      let drag_start_y = e.clientY - new_box.offsetTop;

      function do_drag(e) {
        if (is_dragging) {
          let newX = e.clientX - drag_start_x;
          let newY = e.clientY - drag_start_y;

          new_box.style.position = "absolute";
          new_box.style.left = newX + "px";
          new_box.style.top = newY + "px";
        }
      }

      function stop_drag() {
        is_dragging = false;
        window.removeEventListener("mousemove", do_drag);
        window.removeEventListener("mouseup", stop_drag);
      }

      window.addEventListener("mousemove", do_drag); // Corrected event name
      window.addEventListener("mouseup", stop_drag);
    }
  });
}

//---------------------------------------------------------
