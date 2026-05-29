let reasonCount = 0;

document.getElementById('submitBtn').addEventListener('click', function() {
    const text = document.getElementById('reasonInput').value;
    
    if (text.trim() === "") return;

    reasonCount++;
    document.getElementById('countNumber').textContent = reasonCount;

    const note = document.createElement('div');
    
    // This safely chooses a random color from 1 to 5
    const randomColor = Math.floor(Math.random() * 5) + 1;
    note.className = "sticky-note color-" + randomColor;
    
    note.innerHTML = `
        <p>${text}</p>
        <span class="reason-number">Reason #${reasonCount}</span>
    `;

    document.getElementById('stickyBoard').prepend(note);
    document.getElementById('reasonInput').value = "";
});
