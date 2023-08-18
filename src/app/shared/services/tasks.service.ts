import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError,tap,map } from "rxjs/operators";




@Injectable()

export class TaskService{
  private readonly TASKS_API_URL = "http://localhost:3000/Tasks"

  constructor(private http:HttpClient){}
 
  public getTasks():Observable<Task[]>{
    return this.http.get<Task[]>(this.TASKS_API_URL).pipe(
      tap(task =>console.log(task))
    )
  }

  public createTasks(task:Task ):Observable<any[]>{
    console.log(`Task ${task.content}`)
    return this.http.post<Task[]>(this.TASKS_API_URL,task).pipe(
      tap(tasks=>console.log(tasks)),
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse){
    let errorMessage: string
    if(error.error instanceof ErrorEvent){
      console.error(`Il a une erreur: ${error.error.message}`)
      errorMessage= `Il a une erreur: ${error.error.message}`
    } else{
      console.error(
        `Backend returned code ${error.status}` +
        `body was: ${error.error}`
      )
      errorMessage=        `Backend returned code : ${error.status}` +
      `body was: ${error.error}`
    }
    return throwError(
      'Something bad happened; please try again later.' + '\n' + errorMessage
    )
  }
} 