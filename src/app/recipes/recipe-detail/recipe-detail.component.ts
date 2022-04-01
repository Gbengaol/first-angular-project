import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ShoppingListService } from '../../shopping-list/shopping-list.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
})
export class RecipeDetailComponent implements OnInit {
  recipeDetails?: Recipe;
  id: number;
  constructor(
    private shoppingListService: ShoppingListService,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = Number(params['id']);
      this.recipeDetails = this.recipeService.getARecipe(this.id);
    });
  }

  onAddToShoppingList() {
    this.recipeDetails?.ingredients &&
      this.shoppingListService.addIngredientsToShoppingList(
        this.recipeDetails?.ingredients
      );
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(Number(this.id));
    this.router.navigate(['/recipes']);
  }
}
