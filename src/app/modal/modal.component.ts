import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GetLocationService } from 'app/get-location.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,private getLocationService:GetLocationService,private router:Router) { }
  @Input() name;
  @Input() placesToShow;

  values:string;
  ngOnInit() {
  }
  onKey(event: any) { // without type info
   this.values=event.target.value;
  }



  saveTrip()
  {

    this.getLocationService.saveTrip(this.placesToShow,this.values).subscribe(res=>{
      alert(location.origin+'/#/app/my-plans')
      // this.router.navigateByUrl(location.origin+'/#/app/my-plans');
      window.open(location.origin+'/#/app/my-plans');
      this.router.navigate(['app'])
      // window.location.href = location.origin+'app/my_plans'

    });
  }

}
