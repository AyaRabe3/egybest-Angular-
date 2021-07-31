import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {
  
  constructor() { }
  
  ngOnInit(): void {
    let items = document.querySelectorAll('li');
    items.forEach(item => {
      item.addEventListener('click', () => {
         items.forEach(item => item.classList.remove('active'))
          item.classList.add('active')
        
      })
    })
  }

}
