from flask import Flask, send_from_directory
from flask_cors import CORS
from backend.models import db, ClothingItem
from backend.routes import clothing_bp
from backend.utils import seed_database
import os


def create_app():
    """Application factory for creating Flask app."""
    app = Flask(__name__, static_folder='frontend', static_url_path='')

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///instance/clothing_store.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = 'dev-secret-key-change-in-production'

    db.init_app(app)
    CORS(app)

    app.register_blueprint(clothing_bp)

    @app.route('/')
    def index():
        return send_from_directory('frontend', 'index.html')

    @app.route('/admin')
    def admin():
        return send_from_directory('frontend', 'admin.html')

    with app.app_context():
        os.makedirs('instance', exist_ok=True)
        db.create_all()

        if ClothingItem.query.count() == 0:
            print("Database is empty, seeding with sample data...")
            seed_database()

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(debug=True, host='0.0.0.0', port=5000)
