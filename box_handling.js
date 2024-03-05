// adding new boxes
document.querySelector("#add_box").addEventListener("click", () => {
  const boxContainer = document.querySelector("#main_block");
  const newBox = document.createElement("div");

  newBox.className = "box";
  newBox.innerHTML = '<div class="resize_visual"></div>';
  boxContainer.appendChild(newBox);
  append_box_features(newBox);
});
//---------------------------------------------------------

// removing boxes on button click or 'Alt' key
let removing_mode = false;

function remove_status() {
  const removeBoxButton = document.getElementById("remove_box");
  removeBoxButton.textContent = removing_mode
    ? "removing.."
    : "remove mode off";
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

// adding fetures to new boxes
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
}
//---------------------------------------------------------
