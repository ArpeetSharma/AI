from flask import Flask, request, jsonify
import speech_recognition as sr
import os
import pyautogui

app = Flask(__name__)

@app.route('/process-voice-command', methods=['POST'])
def process_voice_command():
    data = request.get_json()
    command = data['command'].lower()

    # Example of command processing
    if "open notepad" in command:
        os.system("start notepad.exe")
        return jsonify({"message": "Opening Notepad"})
    elif "take screenshot" in command:
        screenshot = pyautogui.screenshot()
        screenshot.save("screenshot.png")
        return jsonify({"message": "Screenshot taken"})
    else:
        return jsonify({"message": "Command not recognized"})

if __name__ == '__main__':
    app.run(debug=True)
