import { Component, HostListener, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-fullscreen',
  templateUrl: './fullscreen.component.html',
  styleUrls: ['./fullscreen.component.css']
})
export class FullscreenComponent {
  isFullscreen: boolean = false;

  constructor(private renderer: Renderer2) {}

  toggleFullscreen() {
    const doc = window.document.documentElement as any;

    if (!this.isFullscreen) {
      if (doc.requestFullscreen) {
        doc.requestFullscreen();
      } else if (doc.mozRequestFullScreen) {
        doc.mozRequestFullScreen();
      } else if (doc.webkitRequestFullscreen) {
        if (doc.documentElement.webkitRequestFullscreen) {
          doc.documentElement.webkitRequestFullscreen(); // Webkit browsers
        } else {
          doc.webkitRequestFullscreen(); // Safari
        }
      } else if (doc.msRequestFullscreen) {
        doc.msRequestFullscreen();
      }
      this.isFullscreen = true; // Set isFullscreen to true when entering fullscreen mode
    } else {
      this.exitFullscreen();
    }
  }

  exitFullscreen() {
    const doc = window.document as any;

    if (doc.exitFullscreen) {
      doc.exitFullscreen();
    } else if (doc.mozCancelFullScreen) {
      doc.mozCancelFullScreen();
    } else if (doc.webkitExitFullscreen) {
      if (doc.documentElement.webkitExitFullscreen) {
        doc.documentElement.webkitExitFullscreen(); // Webkit browsers
      } else {
        doc.webkitExitFullscreen(); // Safari
      }
    } else if (doc.msExitFullscreen) {
      doc.msExitFullscreen();
    }
    this.isFullscreen = false; // Set isFullscreen to false when exiting fullscreen mode
  }

  @HostListener('document:keydown.escape')
  onEscapeKey() {
    if (this.isFullscreen) {
      this.exitFullscreen();
    }
  }
}
