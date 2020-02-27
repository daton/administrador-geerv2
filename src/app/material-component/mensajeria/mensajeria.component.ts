import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensajeria',
  templateUrl: './mensajeria.component.html',
  styleUrls: ['./mensajeria.component.css']
})
export class MensajeriaComponent {
  them;
  user;
  sidePanelOpened = true;

  // MESSAGE
  selectedMessage: any;
  messages: Object[] = [{
      from: 'Juan Perez',
      photo: 'assets/images/users/1.jpg',
      subject: 'Hola, como estas?',
    }, {
      from: 'Ana Lopez',
      photo: 'assets/images/users/2.jpg',
      subject: 'Dudas existenciales',
    }, {
      from: 'Pedro Martinez',
      photo: 'assets/images/users/3.jpg',
      subject: 'Gracias',
    }, {
      from: 'Irma Sanchez',
      photo: 'assets/images/users/4.jpg',
      subject: 'Alta de alumnos',
    }];

  constructor() {
    this.selectedMessage = this.messages[1];
  }

  isOver(): boolean {
    return window.matchMedia(`(max-width: 960px)`).matches;
  }

  onSelect(message: Object[]): void {
    this.selectedMessage = message;
  }

}
