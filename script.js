let reasonCount = 0;
// We will store the "fingerprints" of the words used so far
let existingFingerprints = [];

document.getElementById('submitBtn').addEventListener('click', function() {
    const inputArea = document.getElementById('reasonInput');
    const originalText = inputArea.value.trim();
    
    if (originalText === "") return;

    // --- SMART MODERATION LOGIC ---

    // 1. Create the "Fingerprint"
    // We lowercase it, remove punctuation/emojis, and split it into words
    const words = originalText.toLowerCase()
        .replace(/[^\w\s]|_/g, "") // Removes punctuation
        .split(/\s+/)              // Splits into individual words
        .filter(word => word.length > 0) // Removes empty spaces
        .sort();                   // Sorts alphabetically (A-Z)

    const fingerprint = words.join(""); // Squashes them into one string

    // 2. Check if this fingerprint has been seen before
    if (existingFingerprints.includes(fingerprint)) {
        alert("This sentiment is already on the wall! Try sharing a different reason.");
        return; 
    }

    // 3. If it's new, save the fingerprint and create the note
    existingFingerprints.push(fingerprint);
    reasonCount++;
    
    document.getElementById('countNumber').textContent = reasonCount;

    const note = document.createElement('div');
    note.className = `sticky-note note-yellow`; 
    
    const randomTilt = Math.floor(Math.random() * 10) - 5; 
    note.style.transform = `rotate(${randomTilt}deg)`;

    note.innerHTML = `
        <p>${originalText}</p>
        <span class="reason-number">Reason #${reasonCount}</span>
    `;

    document.getElementById('stickyBoard').prepend(note);
    inputArea.value = "";
});
