import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PetService {

  constructor(
    private http: HttpClient
  ) { }

  async getPets(login: String): Promise<Observable<any>> {
    return this.http.get<any>(`https://petland-l7je9nqon-camilams27.vercel.app/pets/${login}`)
  }

  async createPet(pet: any, login: String): Promise<Observable<any>> {
    return this.http.post<any>(`https://petland-l7je9nqon-camilams27.vercel.app/pets/${login}`, pet)
  }

  async updatePet(login: String, pet: any ): Promise<Observable<any>> {
    return this.http.put<any>(`https://petland-l7je9nqon-camilams27.vercel.app/pets/${login}`, pet)
  }

  async deletePet(login: String, nome: String ): Promise<Observable<any>> {
    return this.http.delete<any>(`https://petland-l7je9nqon-camilams27.vercel.app/pets/${login}/${nome}`)
  }
}
