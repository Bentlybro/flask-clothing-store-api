from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


class ClothingItem(db.Model):
    """Model for clothing items in the store."""

    __tablename__ = 'clothing_items'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=True)
    category = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    size = db.Column(db.String(10), nullable=False)
    color = db.Column(db.String(50), nullable=False)
    stock = db.Column(db.Integer, default=0)
    image_url = db.Column(db.String(255), nullable=True)

    def to_dict(self):
        """Convert model instance to dictionary."""
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'category': self.category,
            'price': self.price,
            'size': self.size,
            'color': self.color,
            'stock': self.stock,
            'image_url': self.image_url
        }

    def __repr__(self):
        return f'<ClothingItem {self.name}>'
