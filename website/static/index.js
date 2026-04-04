function deleteNote(noteId) {
  fetch("/delete-note", {
    method: "POST",
    body: JSON.stringify({ noteId: noteId }),
  }).then((_res) => {
    window.location.href = "/";
  });
}

function like(sketchId) {
    const likeIcon = document.getElementById(`like-icon-${sketchId}`);
    const likeCount = document.getElementById(`likes-count-${sketchId}`);

    fetch(`/like-sketch/${sketchId}`, { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
            likeCount.innerHTML = data["likes"];

            if (data["liked"] === true) {
                likeIcon.classList.remove("far");
                likeIcon.classList.add("fas");
            } else {
                likeIcon.classList.remove("fas");
                likeIcon.classList.add("far");
            }
        })
        .catch((e) => console.error("Error liking sketch:", e));
}

function previewImage(event) {
    const reader = new FileReader();
    reader.onload = function() {
        const output = document.getElementById('output-preview');
        output.src = reader.result;
        output.style.display = 'block';
    };
    reader.readAsDataURL(event.target.files[0]);
}

setTimeout(function() {
    let alerts = document.querySelectorAll('.alert');
    alerts.forEach(function(alert) {
        alert.style.transition = "opacity 0.5s ease";
        alert.style.opacity = "0";
        setTimeout(()=> alert.remove(), 500);
    });
}, 3000);