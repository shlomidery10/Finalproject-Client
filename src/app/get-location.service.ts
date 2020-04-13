import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetLocationService {
baseUrl:string='http://localhost:3000/'

httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin':'*'
    
  })
}

  constructor(private http: HttpClient) { }
  apiKey="AIzaSyBcoXqhPVQPu-07dFLCxDYO-HKfjeqplJc"
 
getAutoComplete(str:String)
{
  console.log("getAutoComplete");
//  let url=`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${str}&types=(cities)&key=${this.apiKey}`;
//  let header={Access-Control-Allow-Origin: "*"}

  return this.http.get(this.baseUrl+`GetAutoComplete?autoComplete=${str}`)
}


GetNearbyPlacesDetails(str:string,activities)
{
  console.log("url",this.baseUrl+`GetNearbyPlacesDetails?place=${str}&activities=${activities}`);
  
  return this.http.get(this.baseUrl+`GetNearbyPlacesDetails?place=${str}&activities=${activities}`)
}

getUserTrips()
{
  return this.http.get(this.baseUrl+`getUserTrips?username=${localStorage.getItem("username")}`);
}


saveTrip(trip: Array<any>,tripName:string)
{
  console.log("service savetrip");
  console.log(trip);
  console.log(tripName);

  let item = { "trip":trip,"username":localStorage.getItem("username"),"tripName":tripName};

return this.http.post(this.baseUrl+'saveTrip',item,this.httpOptions);
}

GetPlacesPhoto(photoPreference:string)
{
  // return this.http.get(this.baseUrl+`Getphotoreference?photoreference=${photoPreference}}`)
    return this.http.get("https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CmRaAAAAmmdVhuR923hpchhfuCnsGBxdpGwJmmxfJ9UXNeAE5o3FtpKj19kRWg8DviRPh3plLrTtGV08p23Wz24YcwpSCxGyTIiMY6z8YUOlR6DvdvC3dLRJymfJj_-tdvgHagiCEhDSk3IHb5IVNOgIBGZCC6TjGhSjwAlSG6CjDJ4RDNxMBJVQBJOEAg&key=AIzaSyCW4b9s7kSCjsGCwOcQ3pza0AvMXgsf-V0")

}
login(UserName,Password)
{
  let item = { "UserName":UserName,"Password":Password};
  return this.http.post(this.baseUrl+'login',item,this.httpOptions);
}
register(username,password,firstName,lastName)
{
  let item = { "UserName":username,"Password":password,"firstName":firstName,"lastName":lastName};

  return this.http.post(this.baseUrl+'register',item,this.httpOptions);

}

getPlaceDetails(placeId:string)
{


  return this.http.get(this.baseUrl+`getPlaceDetails?placeId=${placeId}`,this.httpOptions);

}




}
