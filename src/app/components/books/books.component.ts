import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BookListModel } from './../../models/book.model';
import { BookService } from './../../core/services/book.service';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss'],
  providers: [DatePipe],
})
export class BooksComponent implements OnInit {
  bookList: BookListModel[] = [];

  filterList: BookListModel[] = [];

  deleteModal: boolean = false;
  selectedBook!: BookListModel;
  errorMessage!: string;
  successMessage!: string;

  bookForm!: FormGroup;
  addEditModal: boolean = false;
  modalHeader: string = 'Add Book';
  isFavoriteList: boolean = false;

  start: number = 1;
  stop: number = 10;
  itemsPerPage: number = 10;
  count!: number;

  constructor(
    private readonly bookService: BookService,
    private readonly toastr: ToastrService,
    private readonly spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    this.fetchAllBooks();
  }

  buildForm() {
    this.bookForm = new FormGroup({
      name: new FormControl(this.selectedBook?.name || '', [
        Validators.required,
      ]),
      isFavorite: new FormControl(this.selectedBook?.isFavorite || false, [
        Validators.required,
      ]),
    });
  }

  submitBook() {
    this.modalHeader === 'Add Book' ? this.createBook() : this.editBook();
  }

  createBook() {
    this.spinner.show();
    let payload = this.bookForm.value;
    this.bookService.bookCreate(payload).subscribe(
      (response) => {
        this.spinner.hide();
        this.toggleAddEditModal('close');
        this.fetchAllBooks();
        this.toastr.success('Book Added Successfully');
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(error.error.msg);
      }
    );
  }

  editBook() {
    this.spinner.show();
    let payload = this.bookForm.value;
    this.bookService.bookEdit(payload, this.selectedBook?.id).subscribe(
      (response) => {
        this.spinner.hide();
        this.toggleAddEditModal('close');
        this.fetchAllBooks();
        this.toastr.success('Book Edited Successfully');
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(error.error.msg);
      }
    );
  }

  fetchAllBooks() {
    this.isFavoriteList = false;
    this.spinner.show();
    this.bookService.bookList().subscribe(
      (response) => {
        this.spinner.hide();
        this.bookList = response;
        this.bookList.forEach((element) => {
          element.dropdownOpen = false;
        });

        this.filterList = this.bookList;
        this.count = this.filterList.length;
      },
      (error) => {
        this.spinner.hide();
        this.toastr.error(error.error.msg);
      }
    );
  }

  deleteBook() {
    this.bookService.bookDelete(this.selectedBook?.id).subscribe(
      (response) => {
        this.toastr.success('Book Deleted Successfully');
        this.fetchAllBooks();
        this.toggleDeleteModal();
      },
      (error) => {
        this.toastr.error(error.error.msg);
      }
    );
  }

  onCheckChange() {
    this.bookForm.patchValue({
      isFavorite: !this.bookForm.value.isFavorite,
    });
  }

  toggleDropdown(book: BookListModel, action?: string) {
    book.dropdownOpen = !book.dropdownOpen;

    this.bookList[
      this.bookList.findIndex((element) => element.id === book.id)
    ] = book;

    this.selectedBook = book;

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
    this.modalHeader = action === 'edit' ? 'Edit Book' : 'Add Book';
    this.buildForm();
    this.addEditModal = !this.addEditModal;
  }

  filterListMethod() {
    this.isFavoriteList = !this.isFavoriteList;

    if (this.isFavoriteList) {
      this.filterList = this.bookList.filter(function (element) {
        return element.isFavorite === true;
      });
    } else {
      this.filterList = this.bookList;
    }
  }

  paginationHandler(pagePassed: number): void {
    this.start = (pagePassed - 1) * 10 + 1;
    this.stop = pagePassed * 10;
  }
}
