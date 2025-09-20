from flask import Flask, request, jsonify, session
from flask_bcrypt import Bcrypt
from flask_cors import CORS

# ------------------------------
# Initialize Flask
# ------------------------------
app = Flask(__name__)
app.config['SECRET_KEY'] = 'a_very_secret_key'  # for sessions
CORS(app, supports_credentials=True)  # allow frontend to talk to backend with cookies

# Initialize Bcrypt
bcrypt = Bcrypt(app)

# In-memory database (resets on server restart)
users_db = {}

# ------------------------------
# Routes
# ------------------------------
@app.route('/', methods=['GET'])
def home():
    return "Welcome! Use POST /signup to register or POST /login to log in."

# ------------------------------
# Signup
# ------------------------------
@app.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        confirm_password = data.get('confirm_password')

        if not email or not password or not confirm_password:
            return jsonify({'message': 'All fields are required.'}), 400

        if password != confirm_password:
            return jsonify({'message': 'Passwords do not match.'}), 400

        if email in users_db:
            return jsonify({'message': 'User with that email already exists.'}), 409

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        users_db[email] = {'email': email, 'password_hash': hashed_password}

        print(f"User {email} successfully signed up!")
        return jsonify({'message': 'User created successfully!'}), 201

    except Exception as e:
        print(f"Signup error: {e}")
        return jsonify({'message': 'An internal server error occurred.'}), 500

# ------------------------------
# Login
# ------------------------------
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')

        if not email or not password:
            return jsonify({'message': 'Email and password are required.'}), 400

        user = users_db.get(email)
        if not user:
            return jsonify({'message': 'User does not exist. Please sign up first.'}), 404

        if not bcrypt.check_password_hash(user['password_hash'], password):
            return jsonify({'message': 'Incorrect password.'}), 401

        session['user_email'] = email
        return jsonify({'message': 'Login successful! Proceed to file upload page.'}), 200

    except Exception as e:
        print(f"Login error: {e}")
        return jsonify({'message': 'An internal server error occurred.'}), 500

# ------------------------------
# Upload page (protected)
# ------------------------------
@app.route('/upload', methods=['GET'])
def upload_page():
    if 'user_email' not in session:
        return jsonify({'message': 'Please login first.'}), 401
    return jsonify({'message': 'You can now upload CSV and FASTQ files here.'}), 200

# ------------------------------
# Logout
# ------------------------------
@app.route('/logout', methods=['GET'])
def logout():
    session.pop('user_email', None)
    return jsonify({'message': 'Logged out successfully.'}), 200

# ------------------------------
# Run the app
# ------------------------------
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
