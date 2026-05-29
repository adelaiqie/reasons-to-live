let reasonCount = 0;
// Added: This array remembers all previously approved submissions
let existingReasons = [];

document.getElementById('submitBtn').addEventListener('click', function() {
    const text = document.getElementById('reasonInput').value;

    if (text.trim() === "") return;

    // --- MODERATION LOGIC START ---
    // 1. Clean the incoming text (lowercase, strip out punctuation/extra spaces)
    const cleanNewText = text.toLowerCase().trim().replace(/[^\w\s]/gi, '');

    // 2. Scan the wall to see if it's identical or heavily overlapping
    let isDuplicate = existingReasons.some(oldText => {
        return oldText === cleanNewText || 
               (oldText.includes(cleanNewText) && cleanNewText.length > 10) ||
               (cleanNewText.includes(oldText) && oldText.length > 10);
    });

    if (isDuplicate) {
        alert("This beautiful reason is already on our wall! Try sharing something else that keeps you going.");
        return; // Stops execution so the note is never created
    }
    // --- MODERATION LOGIC END ---

    reasonCount++;
    // Save this unique text to our memory array for future checks
    existingReasons.push(cleanNewText); 
    
    document.getElementById('countNumber').textContent = reasonCount;

    const note = document.createElement('div');

    // This safely chooses a random color from 1 to 5 (Kept from your original code!)
    const randomColor = Math.floor(Math.random() * 5) + 1;
    note.className = "sticky-note color-" + randomColor;

    note.innerHTML = `
        <p>${text}</p>
        <span class="reason-number">Reason #${reasonCount}</span>
    `;

    document.getElementById('stickyBoard').prepend(note);
    document.getElementById('reasonInput').value = "";
});
