import os
import uuid
from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename

# ------------------------------
# Initialize Flask for analysis
# ------------------------------
app = Flask(__name__)
# The analysis backend needs its own CORS config
CORS(app, supports_credentials=True)

# Folder to store uploaded files
app.config['UPLOAD_FOLDER'] = 'uploads'
# Ensure the upload folder exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# ------------------------------
# Helper Function to Check Directory
# ------------------------------
def is_directory_empty(dir_path):
    """
    Checks if the given directory path is empty or doesn't exist.
    Returns True if empty, False otherwise.
    """
    if not os.path.exists(dir_path):
        return True
    
    # We use os.listdir to get a list of files in the directory.
    # The 'not' operator checks if the list is empty.
    return not os.listdir(dir_path)

# ------------------------------
# New API Endpoint to Check Directory Status
# ------------------------------
@app.route('/check-uploads', methods=['GET'])
def check_uploads_status():
    """
    Returns a JSON response indicating whether the uploads directory is empty.
    """
    is_empty = is_directory_empty(app.config['UPLOAD_FOLDER'])
    return jsonify({"is_empty": is_empty}), 200

# ------------------------------
# Analysis Route
# ------------------------------
@app.route('/analyze', methods=['POST'])
def analyze():
    # In a real app, you would validate the user here (e.g., via a token)
    # For this example, we'll assume the request is valid.
    
    # Check if files were uploaded in the request
    if 'fasta_files' not in request.files:
        return jsonify({'message': 'No files were uploaded.'}), 400
    
    files_list = request.files.getlist('fasta_files')
    if not files_list:
        return jsonify({'message': 'No files selected.'}), 400

    uploaded_files = []
    
    try:
        for file in files_list:
            # Secure the filename
            filename = secure_filename(file.filename)
            # Generate a unique ID to prevent overwrites
            unique_filename = str(uuid.uuid4()) + "_" + filename

            # Save the file to the uploads folder
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], unique_filename)
            file.save(file_path)
            uploaded_files.append(file_path)
            print(f"File saved: {file_path}")

        # --- Your AI integration will go here ---
        # You can now access the saved files at uploaded_files
        print("Simulating AI analysis...")
        
        # Return a success message and a URL for the frontend to redirect to
        return jsonify({
            'message': 'Analysis request received. Processing...',
            'files_processed': [os.path.basename(f) for f in uploaded_files],
            'redirect_url': '/analysis-results'
        }), 200
    
    except Exception as e:
        print(f"Analysis error: {e}")
        return jsonify({'message': 'An internal server error occurred during analysis.'}), 500

# ------------------------------
# Run the app
# ------------------------------
if __name__ == '__main__':
    # Run on a different port (e.g., 5001) to avoid conflict with login_signup.py
    app.run(host='0.0.0.0', port=5001, debug=True)