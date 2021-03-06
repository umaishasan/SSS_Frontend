import { Component, OnInit } from '@angular/core';
import { ForSaveService } from '../service/for-save';
import { NetworkService } from '../service/network.service';
import { ToastedService } from '../service/toasted.service';

interface Classe {
  id: string,
  name: string
}
@Component({
  selector: 'app-check-annoucement',
  templateUrl: './check-annoucement.page.html',
  styleUrls: ['./check-annoucement.page.scss'],
})
export class CheckAnnoucementPage implements OnInit {
  id: number;
  annouceA: any;
  annouceS: any;
  sc: any;
  showAnno: boolean = false;
  showSche: boolean = false;
  annoucement: any;
  classe: Classe[] = [{ id: "1", name: 'Class1' },{ id: "2", name: 'Class2' },{ id: "3", name: 'Class3' },
  { id: "4", name: 'Class4' },{ id: "5", name: 'Class5' },{ id: "6", name: 'Class6' },{ id: "7", name: 'Class7' },
  { id: "8", name: 'Class8' },{ id: "9", name: 'Class9' },{ id: "10", name: 'Class10' }];
  
  constructor(private network: NetworkService,private toast: ToastedService,private saveData: ForSaveService) {
    this.id = this.saveData.pid;
    this.network.getDataById('annoucements',0).then(data =>{
      this.annouceA = data;
    });
    this.network.getDataById('teachers',this.id).then(data =>{
      console.log(data);
      this.annouceS= data;
    });
  }

  ngOnInit() { }

  goToAnnoucement(){
    this.toast.loadControlShow(3000);
    var id = this.sc;
    var task = {id: id,annoucement: this.annoucement};
    this.network.putData('annoucements',this.sc,task,'Sending Error','Please try again!').then(data =>{
      console.log(data);
      this.toast.showToast("Announcement send successfully!");
    });
  }

}
