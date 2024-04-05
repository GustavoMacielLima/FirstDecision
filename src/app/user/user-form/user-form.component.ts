import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserModel } from 'src/app/service/user/user.model';
import { UserService } from 'src/app/service/user/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  user: UserModel;
  userCountry: any;
  countryList: Array<any> = [{
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9odmN0oTnXho1ldt-pNAXnqid1cBnq2tontGAcPxObw&s',
    prefix: '+55',
    country: 'BRAZIL',
    countryName: 'Brasil',
    mask: '(00) 0 0000-0000'
  }, {
    image: 'https://static.mundoeducacao.uol.com.br/mundoeducacao/2022/05/bandeira-estados-unidos.jpg',
    prefix: '+1',
    country: 'USA',
    countryName: 'Estados Unidos',
    mask: '(000) 000-0000'
  }]

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserModel,
    private snackBar: MatSnackBar,
    private userService: UserService
  ) {
    this.user = data ?? new UserModel();
    if (!this.user.id) {
      this.user.contatoPreferencial = 'TODOS';
      this.user.idioma = 'PT_BR';
      this.userCountry = this.countryList[0];
    } else {
      this.userCountry = this.countryList.find(country => {
        return country.country === this.user.pais;
      }) ?? this.countryList[0];
    }
  }

  removeProfile(profile: string){
    this.user.perfil = this.user.perfil.filter((perfil: string) => {
      return perfil !== profile;
    });
  }
  
  saveUser(){
    let message = '';
    this.user.pais = this.userCountry.country;
    if (!this.user.id){
      this.userService.create(this.user);
      message = 'Usuário criado com sucesso'
    } else {
      this.userService.update(this.user);
      message = 'Usuário alterado com sucesso'
    }
    this.snackBar.open(message, undefined, {
      duration: 10000,
    });
    this.dialogRef.close();
  }

  close(): void {
    this.dialogRef.close();
  }
}
