from backend.models import db, ClothingItem


def seed_database():
    """Seed the database with sample clothing items."""
    sample_items = [
        {
            'name': 'Classic White T-Shirt',
            'description': 'Comfortable cotton t-shirt perfect for everyday wear',
            'category': 'Shirts',
            'price': 19.99,
            'size': 'M',
            'color': 'White',
            'stock': 50,
            'image_url': 'https://via.placeholder.com/300x400?text=White+T-Shirt'
        },
        {
            'name': 'Blue Denim Jeans',
            'description': 'Classic fit denim jeans with a modern twist',
            'category': 'Pants',
            'price': 59.99,
            'size': 'L',
            'color': 'Blue',
            'stock': 30,
            'image_url': 'https://via.placeholder.com/300x400?text=Blue+Jeans'
        },
        {
            'name': 'Black Leather Jacket',
            'description': 'Premium leather jacket for a stylish look',
            'category': 'Jackets',
            'price': 149.99,
            'size': 'M',
            'color': 'Black',
            'stock': 15,
            'image_url': 'https://via.placeholder.com/300x400?text=Leather+Jacket'
        },
        {
            'name': 'Red Summer Dress',
            'description': 'Light and breezy summer dress',
            'category': 'Dresses',
            'price': 45.99,
            'size': 'S',
            'color': 'Red',
            'stock': 25,
            'image_url': 'https://via.placeholder.com/300x400?text=Red+Dress'
        },
        {
            'name': 'Gray Hoodie',
            'description': 'Cozy hoodie for cold days',
            'category': 'Hoodies',
            'price': 39.99,
            'size': 'L',
            'color': 'Gray',
            'stock': 40,
            'image_url': 'https://via.placeholder.com/300x400?text=Gray+Hoodie'
        },
        {
            'name': 'Navy Blue Blazer',
            'description': 'Professional blazer for formal occasions',
            'category': 'Jackets',
            'price': 89.99,
            'size': 'M',
            'color': 'Navy',
            'stock': 20,
            'image_url': 'https://via.placeholder.com/300x400?text=Navy+Blazer'
        },
        {
            'name': 'White Sneakers',
            'description': 'Comfortable casual sneakers',
            'category': 'Shoes',
            'price': 69.99,
            'size': '10',
            'color': 'White',
            'stock': 35,
            'image_url': 'https://via.placeholder.com/300x400?text=White+Sneakers'
        },
        {
            'name': 'Black Yoga Pants',
            'description': 'Stretchy and comfortable yoga pants',
            'category': 'Pants',
            'price': 34.99,
            'size': 'M',
            'color': 'Black',
            'stock': 45,
            'image_url': 'https://via.placeholder.com/300x400?text=Yoga+Pants'
        }
    ]

    for item_data in sample_items:
        item = ClothingItem(**item_data)
        db.session.add(item)

    db.session.commit()
    print(f"Successfully seeded database with {len(sample_items)} items!")
