import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { GetLocationService } from 'app/get-location.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,private getLocationService:GetLocationService) { }
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
      
    });
  }

}
