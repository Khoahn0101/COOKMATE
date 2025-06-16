from pydantic import BaseModel
from typing import List

class Recipe(BaseModel):
    id: int
    title: str
    time: str
    difficulty: str
    image: str
    ingredients: List[str]
    directions: List[str]
    nutrition: dict
