import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
  constructor(private shoppingListService: ShoppingListService) {}
  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This is for test',
      'https://preppykitchen.com/wp-content/uploads/2021/07/Vanilla-Cake-Recipe-new-copy.jpg',
      [new Ingredient('Meat', 10), new Ingredient('French Fries', 20)]
    ),
    new Recipe(
      'Another test recipe',
      'This is for test',
      'https://preppykitchen.com/wp-content/uploads/2021/07/Vanilla-Cake-Recipe-new-copy.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 1)]
    ),
  ];

  recipeChanged = new Subject<Recipe[]>();

  recipeSelected = new Subject<Recipe>();

  getRecipes() {
    return this.recipes.slice();
  }

  getARecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredientsToShoppingList(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
