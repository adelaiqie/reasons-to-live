let reasonCount = 0;
// We will store the alphabetical "fingerprints" of the words used so far
let existingFingerprints = [];

document.getElementById('submitBtn').addEventListener('click', function() {
    const text = document.getElementById('reasonInput').value;

    if (text.trim() === "") return;

    // --- MODERATION LOGIC START ---
    
    // 1. Convert to lowercase, strip punctuation and emojis
    const cleanText = text.toLowerCase().replace(/[^\w\s]|_/g, "");

    // 2. Break the phrase into individual words, sort them alphabetically, and squash them back together
    const wordsArray = cleanText.split(/\s+/).filter(word => word.length > 0);
    wordsArray.sort(); 
    const currentFingerprint = wordsArray.join("");

    // 3. Scan our memory to see if this exact combination of words has been used before
    if (existingFingerprints.includes(currentFingerprint)) {
        alert("This beautiful reason is already on our wall! Try sharing something else that keeps you going.");
        return; // Stops execution so the note is never created
    }
    
    // --- MODERATION LOGIC END ---

    reasonCount++;
    
    // Save this unique fingerprint to our memory for future checks
    existingFingerprints.push(currentFingerprint); 
    
    document.getElementById('countNumber').textContent = reasonCount;

    const note = document.createElement('div');

    // Chooses a random color from 1 to 5
    const randomColor = Math.floor(Math.random() * 5) + 1;
    note.className = "sticky-note color-" + randomColor;

    note.innerHTML = `
        <p>${text}</p>
        <span class="reason-number">Reason #${reasonCount}</span>
    `;

    document.getElementById('stickyBoard').prepend(note);
    document.getElementById('reasonInput').value = "";
});
