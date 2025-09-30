# Edna Project  

## Introduction  
**Edna Project** is a full-stack web application designed for **environmental DNA (eDNA) analysis**.  
It allows researchers to upload DNA sequence files (`.fasta`), which are processed by a trained deep learning classifier to identify species. The system also provides authentication for users and a modern frontend for data upload, results visualization, and exports.  

---

## Table of Contents  
1. [Features](#features)  
2. [Tech Stack](#tech-stack)  
3. [Project Structure](#project-structure)  
4. [Installation](#installation)  
5. [Backend Usage](#backend-usage)  
6. [Frontend Usage](#frontend-usage)  
7. [Configuration](#configuration)  
8. [API / Example Endpoints](#api--example-endpoints)  
9. [Example Workflow](#example-workflow)  
10. [Troubleshooting](#troubleshooting)  
11. [Contributors](#contributors)  
12. [License](#license)  

---

## Features  
- 🔐 **Authentication**: User login & signup system.  
- 🧬 **DNA Analysis**: Upload `.fasta` files for species classification.  
- 🤖 **ML Model Integration**: Uses a trained TensorFlow/Keras model (`species_classifier_model_robust.h5`).  
- 📊 **Results Dashboard**: View and download processed results.  
- ⚡ **Modern Frontend**: Built with Next.js for fast and responsive UI.  

---

## Tech Stack  
**Backend:** Python (Flask, TensorFlow/Keras, scikit-learn, Flask-Bcrypt, Flask-CORS)  
**Frontend:** Next.js (React, TypeScript, Hooks, CSS/Tailwind)  
**Storage:** Local file storage (`uploads/`) for input FASTA files  
**Models:** Pretrained `.h5` deep learning model with `.pkl` label encoder  

---

## Project Structure 
``` 
Edna-Project/
│
├── backend/
│ ├── analysis.py # DNA analysis and classification service
│ ├── login_signup.py # Authentication service
│ ├── eDNA_testing.fasta # Sample DNA file
│ ├── trained_models/
│ │ ├── species_classifier_model_robust.h5
│ │ └── label_encoder_robust.pkl
│ └── uploads/ # User-uploaded DNA files
│
└── frontend/
├── app/
│ ├── upload-data/ # Upload DNA sequences
│ ├── analysis-results/ # View results
│ └── exports/ # Export reports
├── components/ # Reusable UI components
├── hooks/ # Custom React hooks
├── lib/ # Utility functions
├── public/ # Static assets
├── styles/ # Styling (CSS/Tailwind)
└── .next/ # Next.js build output

```

---

## Installation  

### Prerequisites  
- Python **3.9+**  
- Node.js **18+** & npm/yarn  
- TensorFlow/Keras installed for model inference  

### Backend Setup  
```bash
cd backend
python -m venv venv
source venv/bin/activate    # (Linux/Mac)
venv\Scripts\activate       # (Windows)

pip install -r requirements.txt
# (If requirements.txt doesn’t exist, generate one by listing imports from analysis.py and login_signup.py.)
```
### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
### Backend Usage
Run the authentication service:

```bash
python login_signup.py
# Runs on http://localhost:5000
```
Run the analysis service:

```bash
python analysis.py
# Runs on http://localhost:5001
```
### Frontend Usage
Start the Next.js development server:

```bash

npm run dev
# Then open http://localhost:3000 in your browser.
```
- Upload DNA data under /upload-data

- View processed results in /analysis-results

- Export results via /exports

### Configuration
- Model files must be inside backend/trained_models/

- Uploads go into backend/uploads/ automatically

- Update any backend API URLs in frontend/lib/ if running backend on a custom port
---
## Example Workflow
- User signs up or logs in.
- Uploads a .fasta DNA sequence file.
- Backend stores file in uploads/ and triggers analysis.
- Analysis service simulates or runs ML classification.
- User views results in Results Dashboard.
- User optionally exports data.
---
## Troubleshooting
- TensorFlow not found → Install compatible version with pip install tensorflow==2.x.
- Frontend fails to start → Delete .next/ folder and rerun npm run dev.
- Large model load times → Ensure system has sufficient RAM (~500MB+ for model).
---
## Contributors
- Yajat Gupta – Developer
- Vaishnavi Srivastava - Frontend Developer
- Aeshni Yadav - Backend Developer
- Vipin Yadav - AI/ML Developer
---
## License
This project is licensed under the MIT License.

```sql
MIT License

Copyright (c) 2025 Yajat Gupta

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
