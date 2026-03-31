from sqlalchemy import func
from . import db
from flask_login import UserMixin

class Sketch(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_path = db.Column(db.String(150))
    data = db.Column(db.String(10000))
    date = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    likes = db.relationship('Like', backref='sketch', passive_deletes=True)

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120))
    first_name = db.Column(db.String(120))
    notes = db.relationship('Sketch', backref='user')

class Like(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    sketch_id = db.Column(db.Integer, db.ForeignKey('sketch.id'), nullable=False)
