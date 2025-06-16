from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from models import Recipe
from data import recipes
# from typing import List
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # chỉnh lại nếu cần
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/recipes", response_model=list[Recipe])
def get_all_recipes():
    return recipes

@app.get("/recipes/{recipe_id}", response_model=Recipe)
def get_recipe(recipe_id: int):
    for r in recipes:
        if r["id"] == recipe_id:
            return r
    raise HTTPException(status_code=404, detail="Recipe not found")
