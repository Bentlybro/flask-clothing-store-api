# Flask Clothing Store API

A simple Flask-backed REST API with an HTML/CSS/JS frontend for browsing and managing clothing items in an online clothing store.

## Features

### Backend (Flask API)
- RESTful API endpoints for CRUD operations on clothing items
- SQLite database with SQLAlchemy ORM
- Filtering by category, size, and color
- Automatic database seeding with sample data
- CORS enabled for frontend integration

### Frontend
- **Shop Page**: Browse all clothing items with filtering options
- **Admin Page**: Add, edit, and delete products
- Responsive design with modern CSS
- Modal dialogs for detailed product views
- Real-time stock status indicators

## Project Structure

```
flask-clothing-store-api/
├── app.py                      # Main Flask application
├── config.py                   # Configuration settings
├── requirements.txt            # Python dependencies
├── backend/
│   ├── models/
│   │   ├── __init__.py
│   │   └── clothing_item.py   # ClothingItem database model
│   ├── routes/
│   │   ├── __init__.py
│   │   └── clothing_routes.py # API routes
│   └── utils/
│       ├── __init__.py
│       └── seed_data.py       # Database seeding utility
├── frontend/
│   ├── index.html             # Main shop page
│   ├── admin.html             # Admin management page
│   ├── css/
│   │   └── styles.css         # All styling
│   └── js/
│       ├── app.js             # Shop page JavaScript
│       └── admin.js           # Admin page JavaScript
└── instance/
    └── clothing_store.db      # SQLite database (auto-generated)
```

## API Endpoints

### Clothing Items

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/clothing/` | Get all clothing items (supports filtering) |
| GET | `/api/clothing/<id>` | Get a specific clothing item |
| POST | `/api/clothing/` | Create a new clothing item |
| PUT | `/api/clothing/<id>` | Update a clothing item |
| DELETE | `/api/clothing/<id>` | Delete a clothing item |
| GET | `/api/clothing/categories` | Get all unique categories |

### Query Parameters for Filtering

- `category`: Filter by category (e.g., `?category=Shirts`)
- `size`: Filter by size (e.g., `?size=M`)
- `color`: Filter by color (e.g., `?color=Blue`)

### Example Requests

```bash
# Get all items
curl http://localhost:5000/api/clothing/

# Get items filtered by category
curl http://localhost:5000/api/clothing/?category=Shirts

# Get a specific item
curl http://localhost:5000/api/clothing/1

# Create a new item
curl -X POST http://localhost:5000/api/clothing/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Blue T-Shirt",
    "description": "Comfortable cotton t-shirt",
    "category": "Shirts",
    "price": 24.99,
    "size": "L",
    "color": "Blue",
    "stock": 30,
    "image_url": "https://example.com/image.jpg"
  }'

# Update an item
curl -X PUT http://localhost:5000/api/clothing/1 \
  -H "Content-Type: application/json" \
  -d '{"stock": 45}'

# Delete an item
curl -X DELETE http://localhost:5000/api/clothing/1
```

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- pip (Python package manager)

### Installation

1. Clone or navigate to the project directory:
   ```bash
   cd flask-clothing-store-api
   ```

2. Create a virtual environment (recommended):
   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```

4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

### Running the Application

1. Start the Flask server:
   ```bash
   python app.py
   ```

2. The application will be available at:
   - Shop page: `http://localhost:5000/`
   - Admin page: `http://localhost:5000/admin`
   - API base URL: `http://localhost:5000/api/clothing/`

3. On first run, the database will be created automatically and seeded with sample data.

## Usage

### Shopping (Main Page)

1. Browse all available clothing items
2. Use filters to narrow down products by:
   - Category
   - Size
   - Color
3. Click on any product card to view detailed information
4. See real-time stock availability

### Admin Panel

1. Navigate to `/admin` to access the management interface
2. Add new products using the form at the top
3. View all existing products in the list below
4. Edit products by clicking the "Edit" button
5. Delete products by clicking the "Delete" button

## Database Model

### ClothingItem

| Field | Type | Description |
|-------|------|-------------|
| id | Integer | Primary key (auto-generated) |
| name | String | Product name (required) |
| description | Text | Product description |
| category | String | Product category (required) |
| price | Float | Product price (required) |
| size | String | Product size (required) |
| color | String | Product color (required) |
| stock | Integer | Available stock quantity |
| image_url | String | URL to product image |

## Customization

### Adding New Features

The project is designed to be modular and easy to extend:

1. **New Models**: Add new model files in `backend/models/`
2. **New Routes**: Create new route blueprints in `backend/routes/`
3. **Frontend Pages**: Add new HTML pages in `frontend/` and corresponding JS in `frontend/js/`
4. **Styling**: Modify or extend `frontend/css/styles.css`

### Configuration

Edit `config.py` to customize:
- Database URI
- Secret key
- Debug mode
- Environment-specific settings

### Seed Data

Modify `backend/utils/seed_data.py` to change the initial sample products.

## Development Notes

- The application uses SQLite for simplicity and portability
- CORS is enabled by default for development
- Database migrations are not included but can be added using Flask-Migrate
- Images use placeholder URLs by default (can be replaced with actual image hosting)

## Production Deployment

For production deployment:

1. Change the secret key in `config.py`
2. Set environment variables:
   ```bash
   export FLASK_ENV=production
   export SECRET_KEY=your-secure-secret-key
   export DATABASE_URL=your-production-database-url
   ```
3. Use a production WSGI server like Gunicorn:
   ```bash
   pip install gunicorn
   gunicorn app:app
   ```
4. Consider using PostgreSQL instead of SQLite
5. Disable CORS or configure it for specific domains
6. Implement proper authentication and authorization
7. Add input validation and sanitization
8. Set up proper error logging

## License

This project is open source and available for educational and commercial use.

## Contributing

Feel free to fork this project and add your own features! Some ideas for expansion:

- User authentication and accounts
- Shopping cart functionality
- Order management system
- Payment integration
- Product reviews and ratings
- Image upload functionality
- Search functionality
- Pagination for large product lists
- Email notifications
- Inventory management
- Sales analytics dashboard
