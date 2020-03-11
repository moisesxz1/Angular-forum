import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input()  nombre: string; // recibir los datos del componente padre con Input
  @Input()  size: string;

  constructor() { }

  ngOnInit() {
  }

}
