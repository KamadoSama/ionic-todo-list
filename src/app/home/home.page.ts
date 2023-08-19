import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  title:string = 'Kamado BG'
  isOpen:boolean = true;
  tasks: any[] = []
  newTask!:string
  constructor() {}
  addNewTask(){
    let task = {
      isChecked:false,
      content:this.newTask
    }
    this.newTask = ''
    this.tasks.push(task)
  }
  onCheck(event:any,i:number){
    this.tasks[i].isChecked = event.detail.checked
  }
  deleteTask(i:number){
    this.tasks.splice(i,1)
  }
}
