# Quick Start Guide

## Get Started in 3 Steps

### 1. Install Dependencies

```bash
pip install -r requirements.txt
```

### 2. Run the Application

```bash
python app.py
```

Or use the convenience scripts:
- **Linux/Mac**: `./run.sh`
- **Windows**: `run.bat`

### 3. Open Your Browser

- **Shop Page**: http://localhost:5000/
- **Admin Panel**: http://localhost:5000/admin

## That's It!

The database will be automatically created and populated with sample products on first run.

## What You Can Do

### As a Shopper (Main Page)
- Browse clothing items
- Filter by category, size, or color
- Click items to see detailed information
- Check stock availability

### As an Admin (Admin Page)
- Add new products
- Edit existing products
- Delete products
- Manage inventory

## API Access

The REST API is available at `http://localhost:5000/api/clothing/`

Example:
```bash
curl http://localhost:5000/api/clothing/
```

For full documentation, see [README.md](README.md)
