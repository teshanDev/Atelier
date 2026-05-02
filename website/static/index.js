function deleteNote(noteId) {
  fetch("/delete-note", {
    method: "POST",
    body: JSON.stringify({ noteId: noteId }),
  }).then((_res) => {
    window.location.href = "/";
  });
}

function like(sketchId) {
    const likeIcon = document.getElementById(`like-icon-${sketchId}`); // Backticks!
    const likeCount = document.getElementById(`likes-count-${sketchId}`); // Backticks!

    fetch(`/like-sketch/${sketchId}`, { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
            likeCount.innerHTML = data["likes"];
            // Toggle classes
            if (data["liked"] === true) {
                likeIcon.classList.remove("far");
                likeIcon.classList.add("fas");
            } else {
                likeIcon.classList.remove("fas");
                likeIcon.classList.add("far");
            }
        });
}

setTimeout(function() {
    let alerts = document.querySelectorAll('.alert');
    alerts.forEach(function(alert) {
        alert.style.transition = "opacity 0.5s ease";
        alert.style.opacity = "0";
        setTimeout(()=> alert.remove(), 500);
    });
}, 3000);

function autoSubmit() {
    const form = document.getElementById('upload-form');
    const fileInput = document.getElementById('sketch_image');

    if (fileInput.files.length > 0) {
        // You could add a loading spinner here if you want!
        form.submit();
    }
}