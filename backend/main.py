from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pyodbc
import os
from typing import List
from dotenv import load_dotenv
import json

load_dotenv()

from models import Recipe

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 🔑 Kết nối DB từ ENV (Azure sẽ giữ secret)
DB_SERVER = os.getenv("DB_SERVER")
DB_NAME = os.getenv("DB_NAME")
DB_USER = os.getenv("DB_USER")
DB_PASSWORD = os.getenv("DB_PASSWORD")

conn_str = (
    f"DRIVER={{ODBC Driver 17 for SQL Server}};"
    f"SERVER={DB_SERVER};DATABASE={DB_NAME};UID={DB_USER};PWD={DB_PASSWORD}"
)
print(conn_str)
# ⏬ Hàm get_all_recipes() từ DB
@app.get("/recipes", response_model=List[Recipe])
def get_all_recipes():
    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM dbo.recipes")

    rows = cursor.fetchall()
    recipes = []
    for row in rows:
        recipes.append({
            "id": row.id,
            "title": row.title,
            "image_url": row.image_url,
            "rating": float(row.rating),
            "reviews": row.reviews,
            "prep_time": int(row.prep_time),
            "cooking_time": int(row.cooking_time),
            "difficulty": row.difficulty,
            "servings": row.servings,
            "tags": row.tags.split(','),  # hoặc xử lý JSON nếu lưu kiểu NVARCHAR
            "description": row.description,
            "ingredients": json.loads(row.ingredients),
            "instructions": row.instructions.split(','),
            "nutrition": json.loads(row.nutrition) if row.nutrition else {}  # Nếu để JSON thì parse
        })
    conn.close()
    return recipes

# ⏬ Hàm get 1 recipe
@app.get("/recipes/{recipe_id}", response_model=Recipe)
def get_recipe(recipe_id: int):
    print(f"🔍 Starting get_recipe() function for recipe_id: {recipe_id}")
    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()
    print(f"📊 Executing SQL query: SELECT * FROM dbo.recipes WHERE id = {recipe_id}")
    cursor.execute("SELECT * FROM dbo.recipes WHERE id = ?", recipe_id)
    row = cursor.fetchone()
    print(f"📄 Raw row data: {row}")
    conn.close()

    if row:
        print(f"✅ Recipe found with id: {recipe_id}")
        return {
            "id": row.id,
            "title": row.title,
            "image_url": row.image_url,
            "rating": float(row.rating),
            "reviews": row.reviews,
            "prep_time": int(row.prep_time),
            "cooking_time": int(row.cooking_time),
            "difficulty": row.difficulty,
            "servings": row.servings,
            "tags": json.loads(row.tags),
            "description": row.description,
            "ingredients": json.loads(row.ingredients),
            "instructions": json.loads(row.instructions),
            "nutrition": json.loads(row.nutrition) if row.nutrition else {}
        }
    print(f"❌ Recipe not found with id: {recipe_id}")
    raise HTTPException(status_code=404, detail="Recipe not found")

# ⏬ Hàm upload recipe
@app.post("/recipes", response_model=Recipe)
def create_recipe(recipe: Recipe):
    print(f"🔍 Starting create_recipe() function")
    print(f"📄 Recipe data received: {recipe}")
    
    conn = pyodbc.connect(conn_str)
    cursor = conn.cursor()
    
    try:
        # Prepare the SQL insert statement
        sql = """
        INSERT INTO dbo.recipes (title, image_url, rating, reviews, prep_time, cooking_time, difficulty, servings, tags, description, ingredients, instructions, nutrition)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """
        
        # Prepare the values
        values = (
            recipe.title,
            recipe.image_url,
            recipe.rating,
            recipe.reviews,
            recipe.prep_time,
            recipe.cooking_time,
            recipe.difficulty,
            recipe.servings,
            ','.join(recipe.tags) if recipe.tags else '',
            recipe.description,
            ','.join(recipe.ingredients) if recipe.ingredients else '',
            ','.join(recipe.instructions) if recipe.instructions else '',
            json.dumps(recipe.nutrition) if recipe.nutrition else '{}'
        )
        
        print(f"📊 Executing SQL insert with values: {values}")
        cursor.execute(sql, values)
        conn.commit()
        
        # Get the inserted recipe ID
        recipe_id = cursor.execute("SELECT @@IDENTITY").fetchone()[0]
        print(f"✅ Recipe created with ID: {recipe_id}")
        
        # Return the created recipe
        return {
            "id": recipe_id,
            "title": recipe.title,
            "image_url": recipe.image_url,
            "rating": recipe.rating,
            "reviews": recipe.reviews,
            "prep_time": recipe.prep_time,
            "cooking_time": recipe.cooking_time,
            "difficulty": recipe.difficulty,
            "servings": recipe.servings,
            "tags": recipe.tags,
            "description": recipe.description,
            "ingredients": recipe.ingredients,
            "instructions": recipe.instructions,
            "nutrition": recipe.nutrition
        }
        
    except Exception as e:
        print(f"❌ Error creating recipe: {e}")
        conn.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to create recipe: {str(e)}")
    finally:
        conn.close()

