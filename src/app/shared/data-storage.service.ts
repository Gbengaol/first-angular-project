import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap, take, exhaustMap } from 'rxjs/operators';
import { AuthService } from '../auth/auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    return this.http.put(
      'https://angular-recipe-app-3d8bb-default-rtdb.firebaseio.com/recipes.json',
      recipes
    );
  }

  fetchRecipes() {
    return this.http
      .get<Array<Recipe>>(
        'https://angular-recipe-app-3d8bb-default-rtdb.firebaseio.com/recipes.json'
      )
      .pipe(
        map((recipes: Array<Recipe>) => {
          return recipes.map((recipe) => {
            return {
              ...recipe,
            };
          });
        }),
        tap((recipes) => {
          return this.recipeService.setRecipes(recipes);
        })
      );
  }
}
