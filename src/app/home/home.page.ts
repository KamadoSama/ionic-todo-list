import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/services/tasks.service';
import { Observable } from 'rxjs';
import { ITask } from '../shared/models/tasks';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  title:string = 'Kamado BG'
  isOpen:boolean = true;
  tasks$!: Observable<ITask[]>
  newTask!:string
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
      this.taskService.getTasks().subscribe({
        next:tasks=>{
          console.log(tasks)
          this.tasks = tasks
        }
      })
  }
  
  // this.taskservice.getTasks().subscribe({
  //   next: task=>{
  //     this.tasks = task
  //   }
  // })

  addNewTask(){

    let task = {
      isChecked:false,
      content:this.newTask
    }
    console.log(task)
    this.newTask = ''
    this.taskService.createTasks(task).subscribe({
      next:task=>console.log('ok')
    })
  }
  onCheck(event:any,i:number){
    this.tasks[i].isChecked = event.detail.checked
  }
  deleteTask(i:number){
    this.tasks.splice(i,1)
  }



}
