import { Component, OnInit } from '@angular/core';
import { GetLocationService } from 'app/get-location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'app/modal/modal.component';
import { CommentsModalComponent } from 'app/comments-modal/comments-modal.component';
@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {
  numOfDays:number=3;
  comments:boolean=false;
  days:number;
  commentsList:Array<any>;
  placeName:string='';
places:Array<any>=[];
placesToShow:Array<any>=[];
acticities:string;
photoUrl="https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&key=AIzaSyCW4b9s7kSCjsGCwOcQ3pza0AvMXgsf-V0&photoreference="
acticitiesList:Array<string>=[];
map:Map<string,Array<any>>=new Map();
mapToShow:Map<string,Array<any>>=new Map();
chosenDay:number=0;
resturents:Array<any>=[];
  constructor(private getLocationService:GetLocationService,private activatedRoute: ActivatedRoute,private route:ActivatedRoute,private modalService: NgbModal) 
  {

    this.acticities=this.route.snapshot.paramMap.get('activities');
    this.days=+this.route.snapshot.paramMap.get('days');

    let words:string=this.activatedRoute.snapshot.params.travelName
    let word=words.split(' ');
    word.splice(1,2);
    for (let index = 1; index  < word.length; index++) {
      this.placeName += word[index];
    }
    this.acticitiesList=this.acticities.split(',');
   }

   placeDetails(placeId)
   {
     console.log("placeId",placeId);
     
this.getLocationService.getPlaceDetails(placeId).subscribe(res=>{
  this.comments=true;
  this.commentsList=res['result']['reviews'];
  console.log("commentsList",this.commentsList);
  
  console.log(res['result']);
  console.log("res");
  // console.log( this.places.find(x=>x.place_id==placeId));
  
  // var foundIndex=this.places.findIndex(x=>x.place_id==placeId);
  // this.places[foundIndex].adr_address=res['result'].adr_address;
  // console.log(this.places);
  this.commentModal();

// this.places.find(x=>x.place_id==placeId).adr_address=res['result']['adr_address'];

// console.log("places after filter ",this.places);



});
   }

  ngOnInit() {
  

    for (let index = 0; index < this.acticitiesList.length; index++) {

      this.getLocationService.GetNearbyPlacesDetails(this.placeName,this.acticitiesList[index]).subscribe((res:Array<any>)=>{
        for(let k=0;k<15;k++)
        {
this.places.push(res[k])
        }
        // this.places.push(res.slice(0,15));
        // this.places.forEach(element => {
        //   element.adr_address="";
        // });
      
        // this.mapToShow.set(this.acticitiesList[index],[this.places]);
      });
    
      
    }




        // console.log("map",this.map);
        // this.mapToShow.set(this.acticitiesList[index],[this.places[0]]);
  
        // this.placesToShow.push(this.places);
    



        this.getLocationService.GetNearbyPlacesDetails(this.placeName,"restaurants").subscribe((res:Array<any>)=>{
          
          this.resturents=res;
      
for(let i=0,j=0;i<this.days;i++)
{




  this.placesToShow.push(this.places[j]);
  this.placesToShow.push(this.resturents[j]);
  this.placesToShow.push(this.places[j+1]);
  this.placesToShow.push(this.places[j+2]);
  this.placesToShow.push(this.resturents[j+1]);
j=j+3;
}    
 console.log("hereeeeeeeeeeeeeeeeeeeeeee",this.placesToShow);







        });

   
      







        

}
closeComments()
{
  this.comments=false;
}
deleteTrip(item){
console.log(item);
let index=this.placesToShow.indexOf(item);
console.log(this.placesToShow.indexOf(item));

this.getLocationService.GetNearbyPlacesDetails(this.placeName,item['types'][0]).subscribe((res:Array<any>)=>{
console.log(res);
var y = Math.floor((Math.random() * 15));
console.log(y);

this.placesToShow[index]=res[y];

});

}
  choosenDay()
  {
    this.chosenDay=this.chosenDay+1;
    this.placesToShow=this.places.slice(this.chosenDay-1,this.chosenDay);
  }
   
  loopOverMap(){

    return this.map.keys();
  }

  nextDay()
  {
    this.chosenDay++;
    Array.from(this.map.keys()).map(key => {

        this.placesToShow.push(this.map.get(key)[this.chosenDay]);
        
        if(((this.placesToShow.length-1)%5)==0)
        {
          
          this.placesToShow.push(this.resturents[this.chosenDay]);

        }
        if(((this.placesToShow.length+1)%5)==0)
        {
          this.placesToShow.push(this.resturents[this.chosenDay+2]);

        }

      });
    



  }
  saveTrip()
  {
    const modalRef = this.modalService.open(ModalComponent);
    modalRef.componentInstance.name = 'World';
    modalRef.componentInstance.placesToShow = this.placesToShow;

  }
  commentModal()
  {
    const modalRef = this.modalService.open(CommentsModalComponent);
    modalRef.componentInstance.commentsList = this.commentsList;


  }


}
