import os
from flask import Blueprint, render_template, request, flash, jsonify, current_app, json
from flask_login import login_required, current_user
from werkzeug.utils import secure_filename
from . import db
from .models import Sketch

views = Blueprint('views', __name__)


@views.route('/', methods=['GET', 'POST'])
@login_required
def home():
    if request.method == 'POST':
        file = request.files.get('sketch_image')

        if file and file.filename != '':
            filename = secure_filename(file.filename)

            # Use this standard way to find your folders
            # This looks for the 'static/uploads' folder relative to this file
            base_dir = os.path.dirname(os.path.abspath(__file__))
            upload_folder = os.path.join(base_dir, 'static', 'uploads')

            if not os.path.exists(upload_folder):
                os.makedirs(upload_folder)

            file_path = os.path.join(upload_folder, filename)
            file.save(file_path)

            new_sketch = Sketch(image_path=filename, user_id=current_user.id)
            db.session.add(new_sketch)
            db.session.commit()
            flash('Image Uploaded!', category='success')
        else:
            flash('No image selected!', category='error')

    # Get all sketches to display on the home page
    all_sketches = Sketch.query.all()
    return render_template("home.html", user=current_user, all_notes=all_sketches)


@views.route('/delete-note', methods=['POST'])
def delete_note():
    # 1. Get the data sent from JavaScript
    data = json.loads(request.data)
    noteId = data['noteId']

    # 2. Find the sketch in the database
    sketch = Sketch.query.get(noteId)

    if sketch:
        # 3. Security Check: Only the owner can delete
        if sketch.user_id == current_user.id:
            # OPTIONAL: Delete the physical file from the folder
            try:
                base_dir = os.path.dirname(os.path.abspath(__file__))
                file_path = os.path.join(base_dir, 'static', 'uploads', sketch.image_path)
                if os.path.exists(file_path):
                    os.remove(file_path)
            except Exception as e:
                print(f"Error deleting file: {e}")

            # 4. Delete from database
            db.session.delete(sketch)
            db.session.commit()

    return jsonify({})  # Return an empty response to tell JS we are done