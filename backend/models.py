from pydantic import BaseModel
from typing import List, Optional

class Recipe(BaseModel):
    id: int
    title: str
    image_url: str  # đổi cho khớp DB
    rating: Optional[float] = None
    reviews: Optional[int] = 0
    prep_time: str
    cooking_time: str
    difficulty: str
    servings: Optional[int] = 1
    tags: Optional[List[str]] = []
    description: Optional[str] = ""
    ingredients: List[str]
    instructions: List[str]  # đổi tên cho khớp return
    nutrition: Optional[dict] = {}

