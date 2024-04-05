import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'FirstDecision';

  constructor(private router: Router){}

  goToRoute(route: string|null){
    if(!route) {
      alert('Página em construção!');
      return;
    }
    
    this.router.navigate([route]);
  }

  showMessage(message: string){
    alert(message);
  }
}
