import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { HttpService } from '../../shared-service/http.service';

export interface IBike {
  id?: number;
  image: string;
  price: number;
  quantity: number;
  description: string;
}

@Component({
  selector: 'top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.css']
})
export class TopComponent implements OnInit {

  bikes: Array<IBike> = [];
  myName = '';
  tops = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService,
    private http: HttpService
  ) { }

  async ngOnInit() {
    await this.refresh();
    // this.createCar('car', { make: 'Tesla', model: 'X'});
    // this.updateCar('car/id/1', { make: 'Fordobe', model: 'Probate'});
  }

  async refresh() {
    this.tops = await this.getTops('top');
  }
  // getCars('car');
  async getTops(path: string) {
    const resp = await this.http.get(path);
    console.log('resp from getTops()', resp);
    return resp;
  }

  async createTop() {
    const top = {
      make: null,
      model: null,
      year: null
    };
    const resp = await this.http.post('top', top);
    console.log('from createTop resp: ', resp);
    if(resp) {
      // this.refresh();
      this.tops.unshift(resp);
    } else {
      this.toastService.showToast('danger', 3000, 'Top create failed!');
    }
    return resp;
  }

 async updateTop(top: any) {
   console.log('from updateTop top: ', top);
   const resp = await this.http.put(`top/id/${top.id}`, top);
   if(resp) {
     this.toastService.showToast('success', 3000, 'Top updated successfully!');
   }
   return resp;
 }

 async removeTop(top: any, index: number) {
  console.log('from removeTop...', index);
  // this.tops.splice(index, 1);
  const resp = await this.http.delete(`top/id/${top.id}`);
  console.log('resp from removeTop...', resp);
  if (resp) {
    this.refresh();
  } else {
    this.toastService.showToast('danger', 3000, 'Delete top failed!');

  }
}
}
