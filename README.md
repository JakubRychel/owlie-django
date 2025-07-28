# Owlie‑Django

A Django-based web application focused on language learning, featuring flashcards and dictionaries.

## 🚀 Features

- **Dictionary** app: look up and manage vocabulary entries (wip)
- **Flashcards** app: review words with spaced repetition (wip)
- **User management**: registration, login, and profile handling
- **Modern frontend** built with JavaScript / SCSS for dynamic UI

## 🧩 Project Structure

```
owlie-django/
├── dictionary/       # Models and views for vocabulary lookup
├── flashcards/       # Flashcard generation and review logic
├── users/            # Authentication, user profiles and permissions
├── frontend/         # JavaScript, SCSS, and UI assets
├── manage.py         # Django CLI entrypoint
└── requirements.txt  # Python dependencies
```

## 📦 Getting Started

### Prerequisites

- Python 3.8+  
- Django 4.x  
- PostgreSQL (or the database of your choice)  
- npm / Node.js (for frontend asset building)

### Installation

```bash
git clone https://github.com/JakubRychel/owlie-django.git
cd owlie-django
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Set environment variables
cp .env.example .env
# Edit .env to set DATABASE_URL, SECRET_KEY, etc.

python manage.py migrate
python manage.py collectstatic
npm install
npm run build

python manage.py runserver
```

## 🛠️ Usage

- Access the web UI at `http://localhost:8000/`
