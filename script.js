let reasonCount = 0;
let existingFingerprints = [];

document.getElementById('submitBtn').addEventListener('click', function() {
    const inputArea = document.getElementById('reasonInput');
    const originalText = inputArea.value.trim();
    
    if (originalText === "") return;

    // --- SMART MODERATION FILTER ---
    // This creates the "fingerprint" by sorting letters alphabetically
    const fingerprint = originalText.toLowerCase()
        .replace(/[^a-z0-9]/g, "") 
        .split("")                 
        .sort()                    
        .join("");                 

    if (existingFingerprints.includes(fingerprint)) {
        alert("This reason is already on the wall!");
        return; 
    }

    // --- LOGIC ---
    existingFingerprints.push(fingerprint);
    reasonCount++;
    document.getElementById('countNumber').textContent = reasonCount;

    // --- DESIGN: RESTORING RANDOM COLORS ---
    const note = document.createElement('div');
    
    // This array lists the 5 colors we set up in your CSS
    const colors = ['yellow', 'green', 'blue', 'pink', 'purple'];
    // This picks one of those 5 colors at random
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    // This applies the correct glowing class (e.g., "note-pink")
    note.className = `sticky-note note-${randomColor}`; 
    
    const randomTilt = Math.floor(Math.random() * 12) - 6; 
    note.style.transform = `rotate(${randomTilt}deg)`;

    note.innerHTML = `
        <p>${originalText}</p>
        <span class="reason-number">Reason #${reasonCount}</span>
    `;

    document.getElementById('stickyBoard').prepend(note);
    inputArea.value = "";
});
