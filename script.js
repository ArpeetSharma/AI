document.getElementById('start-button').addEventListener('click', function () {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    recognition.onstart = function() {
        document.getElementById('feedback').textContent = "Listening...";
    };

    recognition.onresult = function(event) {
        const voiceCommand = event.results[0][0].transcript;
        document.getElementById('feedback').textContent = `You said: ${voiceCommand}`;
        
        // Send the voice command to Python backend
        fetch('/process-voice-command', {
            method: 'POST',
            body: JSON.stringify({ command: voiceCommand }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => response.json()).then(data => {
            document.getElementById('feedback').textContent = data.message;
        });
    };

    recognition.start();
});
