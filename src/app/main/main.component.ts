import { Component } from '@angular/core';
import { Router, RouterEvent, RouterLink } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor( private router: Router ) {}

  public goToUser(){
    this.router.navigate(['/user']);
  }

}
