from flask import Blueprint, jsonify, request
from backend.models import db, ClothingItem

clothing_bp = Blueprint('clothing', __name__, url_prefix='/api/clothing')


@clothing_bp.route('/', methods=['GET'])
def get_all_clothing():
    """Get all clothing items with optional filtering."""
    category = request.args.get('category')
    size = request.args.get('size')
    color = request.args.get('color')

    query = ClothingItem.query

    if category:
        query = query.filter_by(category=category)
    if size:
        query = query.filter_by(size=size)
    if color:
        query = query.filter_by(color=color)

    items = query.all()
    return jsonify([item.to_dict() for item in items]), 200


@clothing_bp.route('/<int:item_id>', methods=['GET'])
def get_clothing_item(item_id):
    """Get a specific clothing item by ID."""
    item = ClothingItem.query.get(item_id)
    if not item:
        return jsonify({'error': 'Item not found'}), 404
    return jsonify(item.to_dict()), 200


@clothing_bp.route('/', methods=['POST'])
def create_clothing_item():
    """Create a new clothing item."""
    data = request.get_json()

    required_fields = ['name', 'category', 'price', 'size', 'color']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    try:
        item = ClothingItem(
            name=data['name'],
            description=data.get('description', ''),
            category=data['category'],
            price=float(data['price']),
            size=data['size'],
            color=data['color'],
            stock=data.get('stock', 0),
            image_url=data.get('image_url', '')
        )
        db.session.add(item)
        db.session.commit()
        return jsonify(item.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@clothing_bp.route('/<int:item_id>', methods=['PUT'])
def update_clothing_item(item_id):
    """Update an existing clothing item."""
    item = ClothingItem.query.get(item_id)
    if not item:
        return jsonify({'error': 'Item not found'}), 404

    data = request.get_json()

    try:
        if 'name' in data:
            item.name = data['name']
        if 'description' in data:
            item.description = data['description']
        if 'category' in data:
            item.category = data['category']
        if 'price' in data:
            item.price = float(data['price'])
        if 'size' in data:
            item.size = data['size']
        if 'color' in data:
            item.color = data['color']
        if 'stock' in data:
            item.stock = data['stock']
        if 'image_url' in data:
            item.image_url = data['image_url']

        db.session.commit()
        return jsonify(item.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@clothing_bp.route('/<int:item_id>', methods=['DELETE'])
def delete_clothing_item(item_id):
    """Delete a clothing item."""
    item = ClothingItem.query.get(item_id)
    if not item:
        return jsonify({'error': 'Item not found'}), 404

    try:
        db.session.delete(item)
        db.session.commit()
        return jsonify({'message': 'Item deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500


@clothing_bp.route('/categories', methods=['GET'])
def get_categories():
    """Get all unique categories."""
    categories = db.session.query(ClothingItem.category).distinct().all()
    return jsonify([cat[0] for cat in categories]), 200
