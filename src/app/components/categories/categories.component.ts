import { CategoryListModel } from './../../models/category.model';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/core/services/category.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categoryList: CategoryListModel[] = [];

  filterList: CategoryListModel[] = [];

  deleteModal: boolean = false;
  selectedCategory!: CategoryListModel;
  errorMessage!: string;
  successMessage!: string;

  categoryForm!: FormGroup;
  addEditModal: boolean = false;
  modalHeader: string = 'Add Category';
  isFavoriteList: boolean = false;

  start: number = 1;
  stop: number = 10;
  itemsPerPage: number = 10;
  count!: number;

  constructor(
    private readonly categoryService: CategoryService,
    private readonly toastr: ToastrService,
    private readonly spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.fetchAllCategories();
  }

  buildForm() {
    this.categoryForm = new FormGroup({
      name: new FormControl(this.selectedCategory?.name || '', [
        Validators.required,
      ]),
      isFavorite: new FormControl(this.selectedCategory?.isFavorite || false, [
        Validators.required,
      ]),
    });
  }

  submitCategory() {
    this.modalHeader === 'Add Category'
      ? this.createCategory()
      : this.editCategory();
  }

  createCategory() {
    this.spinner.show();
    let payload = this.categoryForm.value;
    this.categoryService.categoryCreate(payload).subscribe(
      (response) => {
        this.spinner.hide();
        this.toggleAddEditModal('close');
        this.fetchAllCategories();
        this.toastr.success('Category Added Successfully');
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(error.error.msg);
      }
    );
  }

  editCategory() {
    this.spinner.show();
    let payload = this.categoryForm.value;
    this.categoryService
      .categoryEdit(payload, this.selectedCategory?.id)
      .subscribe(
        (response) => {
          this.spinner.hide();
          this.toggleAddEditModal('close');
          this.fetchAllCategories();
          this.toastr.success('Category Edited Successfully');
        },
        (error) => {
          this.spinner.hide();
          this.toastr.error(error.error.msg);
        }
      );
  }

  fetchAllCategories() {
    this.isFavoriteList = false;
    this.spinner.show();
    this.categoryService.categoryList().subscribe(
      (response) => {
        this.spinner.hide();
        this.categoryList = response;
        this.categoryList.forEach((element) => {
          element.dropdownOpen = false;
        });

        this.filterList = this.categoryList;
        this.count = this.filterList.length;
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(error.error.msg);
      }
    );
  }

  deleteCategory() {
    this.categoryService.categoryDelete(this.selectedCategory?.id).subscribe(
      (response) => {
        this.toastr.success('Category Deleted Successfully');
        this.fetchAllCategories();
        this.toggleDeleteModal();
      },
      (error) => {
        this.toastr.error(error.error.msg);
      }
    );
  }

  onCheckChange() {
    this.categoryForm.patchValue({
      isFavorite: !this.categoryForm.value.isFavorite,
    });
  }

  toggleDropdown(category: CategoryListModel, action?: string) {
    category.dropdownOpen = !category.dropdownOpen;

    this.categoryList[
      this.categoryList.findIndex((element) => element.id === category.id)
    ] = category;

    this.selectedCategory = category;

    action === 'delete'
      ? this.toggleDeleteModal()
      : action === 'edit'
      ? this.toggleAddEditModal(action)
      : null;
  }

  toggleDeleteModal() {
    this.deleteModal = !this.deleteModal;
  }

  toggleAddEditModal(action: string) {
    this.modalHeader = action === 'edit' ? 'Edit Category' : 'Add Category';
    this.buildForm();
    this.addEditModal = !this.addEditModal;
  }

  filterListMethod() {
    this.isFavoriteList = !this.isFavoriteList;

    if (this.isFavoriteList) {
      this.filterList = this.categoryList.filter(function (element) {
        return element.isFavorite === true;
      });
    } else {
      this.filterList = this.categoryList;
    }
  }

  paginationHandler(pagePassed: number): void {
    this.start = (pagePassed - 1) * 10 + 1;
    this.stop = pagePassed * 10;
  }
}
