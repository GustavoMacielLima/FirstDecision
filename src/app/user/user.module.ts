import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { UserService } from '../service/user/user.service';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
  declarations: [UserComponent],
  exports: [UserComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
    MatSelectModule,
    MatIconModule,
    MatMenuModule,
    MatSnackBarModule
  ],
  providers:[UserService],
})
export class UserModule { }
