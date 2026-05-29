// --- GLOBAL DATA ---
let reasonCount = 0;
// This "Memory" list resets every time you refresh the page.
// Once we add a Database later, this will stay forever!
let existingFingerprints = [];

// --- THE BUTTON CLICK ACTION ---
document.getElementById('submitBtn').addEventListener('click', function() {
    const inputArea = document.getElementById('reasonInput');
    const originalText = inputArea.value.trim();
    
    // 1. Don't do anything if the box is empty
    if (originalText === "") {
        alert("Please share a reason, even a tiny one.");
        return;
    }

    // 2. THE SMART MODERATION FILTER
    // This creates a "Letter Fingerprint"
    // Example: "Dog" becomes "dgo" | "God" becomes "dgo"
    const fingerprint = originalText.toLowerCase()
        .replace(/[^a-z0-9]/g, "") // Remove spaces and punctuation
        .split("")                 // Split into letters
        .sort()                    // Alphabetize letters
        .join("");                 // Squash back together

    // 3. CHECK FOR DUPLICATES
    if (existingFingerprints.includes(fingerprint)) {
        alert("This beautiful reason (or something very similar) is already on the wall!");
        return; // This STOPS the note from being created
    }

    // 4. IF UNIQUE: ADD TO MEMORY AND POST
    existingFingerprints.push(fingerprint);
    reasonCount++;
    
    // Update the number at the top of the screen
    document.getElementById('countNumber').textContent = reasonCount;

    // 5. CREATE THE STICKY NOTE HTML
    const note = document.createElement('div');
    note.className = `sticky-note note-yellow`; 
    
    // Give it a random messy tilt
    const randomTilt = Math.floor(Math.random() * 12) - 6; 
    note.style.transform = `rotate(${randomTilt}deg)`;

    // Put the text and the reason number inside the note
    note.innerHTML = `
        <p>${originalText}</p>
        <span class="reason-number">Reason #${reasonCount}</span>
    `;

    // 6. ADD TO THE WALL
    const board = document.getElementById('stickyBoard');
    board.prepend(note);

    // 7. CLEAR THE INPUT BOX
    inputArea.value = "";
});
