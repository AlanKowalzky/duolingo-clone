import { Component, inject, signal, computed } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly router = inject(Router);
  
  title = 'duolingo-clone';
  
  readonly isLoggedIn = computed(() => {
    return localStorage.getItem('user-token') !== null;
  });
  
  logout(): void {
    localStorage.removeItem('user-token');
    localStorage.removeItem('user-progress');
    this.router.navigate(['/login']);
  }
}
