import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="not-found">
      <h1>404</h1>
      <p>Page not found</p>
      <a routerLink="/lessons" class="home-btn">Back to Lessons</a>
    </div>
  `,
  styles: [`
    .not-found {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 50vh;
      text-align: center;
    }

    h1 {
      font-size: 4rem;
      color: #58cc02;
      margin: 0;
    }

    .home-btn {
      padding: 1rem 2rem;
      background: #58cc02;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      margin-top: 2rem;
    }
  `]
})
export class NotFoundComponent {}