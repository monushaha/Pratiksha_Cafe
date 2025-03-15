from flask import Flask, render_template, jsonify, request
import json
import os

# Create required directories
directories = [
    'static/css',
    'static/js',
    'static/images',
    'templates',
    'data'
]

for directory in directories:
    os.makedirs(directory, exist_ok=True)

app = Flask(__name__)  # Remove static_url_path and static_folder

# Load menu data
def load_menu():
    menu_file = os.path.join(os.path.dirname(__file__), 'data', 'menu.json')
    try:
        with open(menu_file, 'r') as file:
            return json.load(file)
    except FileNotFoundError:
        return []

@app.route('/')
def home():
    return render_template('index.html')

# Remove the /static/<path:filename> route as Flask handles static files automatically

@app.route('/api/menu')
def get_menu():
    return jsonify(load_menu())

@app.route('/api/contact', methods=['POST'])
def contact():
    data = request.form
    return jsonify({'status': 'success'})

if __name__ == '__main__':
    # Create placeholder images if they don't exist
    image_files = ['cafe-bg.jpg', 'espresso.jpg', 'cappuccino.jpg', 'croissant.jpg']
    for img in image_files:
        img_path = os.path.join('static', 'images', img)
        if not os.path.exists(img_path):
            with open(img_path, 'wb') as f:
                f.write(b'') # Create empty image file as placeholder

    print("Server starting at http://127.0.0.1:5000")
    app.run(debug=True, port=5000)
