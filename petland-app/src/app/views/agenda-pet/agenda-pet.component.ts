import { AgendaEditComponent } from './../agenda-edit/agenda-edit.component';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PetService } from 'src/app/services/pet.service';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface DialogData {
  pet: {
    nome: string;
    idade: string;
    imagem: string;
    raca: string;
    cuidados: string;
  }
}

@Component({
  selector: 'app-agenda-pet',
  templateUrl: './agenda-pet.component.html',
  styleUrls: ['./agenda-pet.component.css']
})
export class AgendaPetComponent implements OnInit {

 
  constructor(
    @Inject(MAT_DIALOG_DATA) 
    public data: DialogData,
    public modal:MatDialog,
    private service: PetService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AgendaPetComponent>
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  editAgenda() {
    const editarAgenda = this.modal.open(AgendaEditComponent, {data:{pet: this.data.pet}});
  }

  async deletAgenda() {
    let loginStorage = localStorage.getItem('login') as any;
    loginStorage = JSON.parse(loginStorage);
    (await this.service.deletePet(loginStorage.user, this.data.pet.nome)).subscribe(pet => {
      this._snackBar.open(pet.message, '', {
        horizontalPosition: 'center',
        verticalPosition: 'top',
        duration: 2500
      });
      if(pet.success) {
        this.dialogRef.close();
        window.location.reload();
      }
    });
  }
  
}