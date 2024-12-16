from flask import Flask, render_template, request, jsonify
from werkzeug.utils import secure_filename
import os
import PyPDF2
from docx import Document

app = Flask(__name__)

# Folder to save uploaded files
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

def allowed_file(filename):
    """Check if the uploaded file has an allowed extension."""
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def parse_pdf(file_path):
    """Extract text from a PDF file."""
    text = ""
    with open(file_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        for page in reader.pages:
            text += page.extract_text()
    return text

def parse_docx(file_path):
    """Extract text from a Word document."""
    document = Document(file_path)
    return '\n'.join([paragraph.text for paragraph in document.paragraphs])

def extract_fields_from_resume(text):
    """Simple function to parse resume text and extract fields."""
    # For demo purposes, this is a basic placeholder implementation.
    fields = {
        "personal_information": {
            "full_name": "",  # Extracted name logic here
            "email": "",      # Extracted email logic here
            "mobile": ""      # Extracted phone logic here
        },
        "address_information": {
            "address": "",  # Extracted address logic here
            "city": "",
            "state": "",
            "zip_code": "",
            "country": ""
        }
    }
    # Sample extraction logic (you can use regex or NLP for better accuracy)
    if "Rohit Sharma" in text:
        fields["personal_information"]["full_name"] = "Rohit Sharma"
    if "rohit@mail.com" in text:
        fields["personal_information"]["email"] = "rohit@mail.com"
    if "9876543210" in text:
        fields["personal_information"]["mobile"] = "9876543210"
    return fields

@app.route('/', methods=['GET', 'POST'])
def upload_resume():
    if request.method == 'POST':
        if 'resume' not in request.files:
            return jsonify({"error": "No file part"})

        file = request.files['resume']
        if file.filename == '':
            return jsonify({"error": "No selected file"})

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)

            # Parse the file
            if filename.endswith('.pdf'):
                text = parse_pdf(file_path)
            elif filename.endswith(('.doc', '.docx')):
                text = parse_docx(file_path)
            else:
                return jsonify({"error": "Unsupported file type"})

            # Extract fields from parsed text
            fields = extract_fields_from_resume(text)

            # Return fields as JSON
            return jsonify(fields)

    return render_template('upload.html')

if __name__ == '__main__':
    app.run(debug=True)
