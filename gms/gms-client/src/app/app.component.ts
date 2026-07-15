import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  template: `
    <div class="container">
      <header class="header">
      <h1 class="header_title">Gardening Management System</h1>
      </header>
      <nav class="navbar">
        <ul class="navbar_list">
          <li class="navbar_item"><a class="navbar_link" routerLink="/"><i class="fas fa-home"></i>Home</a></li>
          <li class="navbar_item"><a class="navbar_link" routerLink="/gardens"><i class="fas fa-seedling"></i>Gardens</a></li>
          <li class="navbar_item"><a class="navbar_link" routerLink="/plants">< i class="fas fa-leaf"></i>Plants</a></li>
        </ul>
      </nav>
      <main class="main">
        <section class="main_section">
          <router-outlet></router-outlet>
        </section>
      </main>
      <footer class="footer">
        <p class="footer_text">&copy; 2024 MEAN Stack Project</p>
      </footer>
    </div>

  `,
  styles: `
    .container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      width: 65%;
      padding: 0;
      margin: 0 auto;
    }

    .header, .footer {
      background-color: #563d7c;
      color: #fff;
      padding: 10px 0;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .header {
      min-height: 60px;
    }
    
    .header_title {
      margin: 0;
    }

    .navbar {
      text-align: center;
      margin-top: 20px;
    }

    .navbar_list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      justify-content: center;
    }

    .navbar_item {
      margin: 0 10px;
    }

    .navbar_link {
      text-decoration: none;
      color: #6c757d;
      padding: 10px 15px;
      border-radius: 5px;
      transition: color 0.3s;
    }

    .navbar_link:hover {
      color: #000;
    }

    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .main_section {
      flex: 1;
    }
  `
})
export class AppComponent {
  title = 'gms-client';
}
