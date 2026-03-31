function deleteNote(noteId) {
  fetch("/delete-note", {
    method: "POST",
    body: JSON.stringify({ noteId: noteId }),
  }).then((_res) => {
    window.location.href = "/";
  });
}

function like(sketchId) {
    const likeCount = document.getElementById(`likes-count-${sketchId}`);

    fetch(`/like-sketch/${sketchId}`, { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
            likeCount.innerHTML = data["likes"];
        })
        .catch((e) => alert("Could not like sketch."));
}