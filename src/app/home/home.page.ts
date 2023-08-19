import { Component, OnInit } from '@angular/core';
import { TaskService } from '../shared/services/tasks.service';
import { Observable, map, take } from 'rxjs';
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
    this.tasks$ = this.taskService.getTasks()
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
  onCheck(event: any, i: number) {
    this.tasks$.pipe(
      take(1),
      map((tasks)=>{
        const updatedTasks = [...tasks]
        updatedTasks[i].isChecked = event.detail.checked
        return updatedTasks[i]
      })
    ).subscribe((updatedTasks)=>{
      this.taskService.updateTask(updatedTasks,i)
    })
  }

  deleteTask(i: number) {
   this.taskService.deleteTask(i).subscribe({
    next:taks=>console.log('delete')
   })
  }



}
