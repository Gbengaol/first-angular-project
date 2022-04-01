import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
})
export class ShoppingEditComponent implements OnInit {
  constructor(private shoppingListService: ShoppingListService) {}
  shoppingForm: FormGroup;
  subscription: Subscription;
  isEditing: boolean = false;
  editedItemIndex: number;
  editedIngredient: Ingredient;

  ngOnInit(): void {
    this.shoppingForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    });

    this.subscription = this.shoppingListService.onStartEditing.subscribe(
      (index: number) => {
        this.isEditing = true;
        this.editedItemIndex = index;
        this.editedIngredient = this.shoppingListService.getIngredient(index);
        const { name, amount } = this.editedIngredient;
        this.shoppingForm.setValue({
          name,
          amount,
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onAddItem() {
    const { name, amount } = this.shoppingForm.value;

    if (this.isEditing) {
      this.shoppingListService.updateIngredient(
        this.editedItemIndex,
        new Ingredient(name, Number(amount))
      );
    } else {
      this.shoppingListService.onIngredientAdded(
        new Ingredient(name, Number(amount))
      );
    }
    this.isEditing = false;
  }

  onFormReset() {
    this.shoppingForm.reset();
    this.isEditing = false;
  }

  onDelete() {
    this.onFormReset();
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
  }
}
