import { Component } from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <div class="loader-container">
      <img src="assets/images/logo-green.png" alt="Natours logo" class="logo" />

      <p class="loading-text">Loading...</p>

      <div class="progress-bar">
        <div class="progress"></div>
      </div>
    </div>
  `,
  styles: `
    @use 'functions' as *;

    .loader-container {
      position: fixed;
      inset: 0;
      background: var(--color-gray-1);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .logo {
      width: 220px;
      margin-bottom: 20px;
      animation: fadeIn 0.6s ease-in-out;
    }

    .loading-text {
      color: var(--color-gray-70);
      margin-bottom: 15px;
      font-size: 13px;
      letter-spacing: 2px;
      animation: blink 1.4s infinite;
    }

    .progress-bar {
      width: 220px;
      height: 6px;
      background: #e5e7eb;
      border-radius: 10px;
      overflow: hidden;
    }

    .progress {
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, #22c55e, #4ade80);
      animation: loading 2.2s ease-in-out infinite;
    }

    @keyframes loading {
      0% {
        width: 0%;
      }
      50% {
        width: 75%;
      }
      100% {
        width: 100%;
      }
    }

    @keyframes blink {
      0%,
      100% {
        opacity: 0.4;
      }
      50% {
        opacity: 1;
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `,
})
export class SpinnerComponent {}
