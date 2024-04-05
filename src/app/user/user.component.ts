import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './user-form/user-form.component';
import { UserModel } from '../service/user/user.model';
import { UserService } from '../service/user/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  displayedColumns = ['usuario', 'status', 'dataCriacao', 'ultimoAcesso', 'ferramentas'];
  searchtext: string = '';
  users: Array<UserModel> = new Array<UserModel>;
  pagination: number = 1;
  rows: number = 10;
  totalPages: Array<number> = [];
  paginationRowOptions: Array<number> = [5, 10, 20, 50, 100];
  filter: Array<string> = new Array<string>();
  
  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {
    this.users = this.getUserList();
    this.totalPages = this.getTotalPages();
  }
  
  previousPage(){
    if(this.pagination > 1)
    this.pagination = this.pagination - 1;
    this.users = this.getUserList();
  }

  nextPage(){
    if(this.pagination < this.totalPages.length + 1)
    this.pagination = this.pagination + 1;
    this.users = this.getUserList();
  }

  gotToPage(page: number){
    if(this.pagination > 0)
    this.pagination = page;
    this.users = this.getUserList();
  }

  changeFilter() {
    this.pagination = 1;
    this.users = this.getUserList();
    this.totalPages = this.getTotalPages();
  }

  getUserList(){
    return this.userService.get(this.pagination, this.rows, this.filter, this.searchtext);
  }

  getTotalPages(){
    const pages: number = this.userService.getTotalPages(this.rows);
    const totalPages: Array<number> = new Array<number>();
    for (let index = 0; index < pages; index++) {
      totalPages.push(index + 1);
    }
    return totalPages;
  }

  getDate(date: string){
    return new Date(date).toLocaleDateString();
  }

  createUser(): void {
    const userFormDialog = this.dialog.open(UserFormComponent, {
      height:'50vh',
      width: '60vw'
    });

    userFormDialog.afterClosed().subscribe(()  => {
      this.pagination = 1;
      this.rows = 10;
      this.users = this.getUserList();
    });
  }

  editUser(user: UserModel): void {
    const userFormDialog = this.dialog.open(UserFormComponent, {
      data: user,
      height:'50vh',
      width: '60vw'
    });

    userFormDialog.afterClosed().subscribe(()  => {
      this.pagination = 1;
      this.rows = 10;
      this.users = this.getUserList();
    });
  }
  
  deleteUser(user: UserModel): void {
    this.userService.delete(user);
    this.snackBar.open('Usuário deletado com sucesso', undefined, {
      duration: 10000
    });
    this.changeFilter();
  }

  stringToHslColor(name: string) {
    var hash = 0;
    for (var i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let colour = '#'
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xff
      colour += value.toString(16).padStart(2, '0')
    }
    return colour
  }
}