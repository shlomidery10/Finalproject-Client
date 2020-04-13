import { Component, OnInit } from '@angular/core';
import { GetLocationService } from 'app/get-location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'app/modal/modal.component';

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.scss']
})
export class RouteComponent implements OnInit {
  numOfDays:number=3;
  days:number;
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

    
    // for (let index = 0; index <  this.acticities.length-1; index++) {
      
      
    // }
    console.log(this.acticities);
    
    let words:string=this.activatedRoute.snapshot.params.travelName
    let word=words.split(' ');

    console.log(word);
    word.splice(1,2);
    console.log(word);
    // this.days = word[0];
    for (let index = 1; index  < word.length; index++) {
      this.placeName += word[index];
      
    }
    console.log(this.days);
    console.log(this.placeName);
    
 
    this.acticitiesList=this.acticities.split(',');
    console.log("Sss",this.acticitiesList);
   }

   placeDetails(placeId)
   {
     console.log("placeId",placeId);
     
this.getLocationService.getPlaceDetails(placeId).subscribe(res=>{
  console.log(res['result']);
  console.log("res");
  // console.log( this.places.find(x=>x.place_id==placeId));
  
  var foundIndex=this.places.findIndex(x=>x.place_id==placeId);
  this.places[foundIndex].adr_address=res['result'].adr_address;
  console.log(this.places);
  
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
    
      console.log("this.places!!!!",this.places);
      
    }
    console.log("places",this.places);
    console.log("sds",this.resturents);



        // console.log("map",this.map);
        // this.mapToShow.set(this.acticitiesList[index],[this.places[0]]);
  
        // this.placesToShow.push(this.places);
    



        this.getLocationService.GetNearbyPlacesDetails(this.placeName,"restaurants").subscribe((res:Array<any>)=>{
          console.log("res",res);
          
          this.resturents=res;
          console.log("after",this.resturents);
          console.log("aaaaaaaaaaa",this.places);
          
          

console.log(this.placesToShow);


      // this.placesToShow[j]=(this.places[i]);
      // this.placesToShow[j+1]=(this.resturents[i]);
      // this.placesToShow[j+2]=(this.places[k]);
      // this.placesToShow[j+3]=(this.resturents[i+1]);
      // this.placesToShow[j+4]=(this.places[30]);
      // console.log("asssss",this.placesToShow);
      console.log(this.days);
      console.log(this.resturents);
      console.log(this.places);
        
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

deleteTrip(){

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


}
