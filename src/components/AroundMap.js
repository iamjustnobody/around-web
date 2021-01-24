import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import {AroundMarker} from "./AroundMarker";
import {LOC_SHAKE} from "../constants";

class NormalAroundMap extends React.Component{
    /*
    constructor(props) {
        super(props);
        console.log(this.props.poststuff.location); //this.props.poststuff -> array //undefined
        this.state={
            //  lantitd1:0, //m
            lantitd1: this.props.poststuff.location.lat + 2*Math.random()*LOC_SHAKE - LOC_SHAKE, //s
            //   longitd1:0, //m
            longitd1: this.props.poststuff.location.lon+2*Math.random()*LOC_SHAKE - LOC_SHAKE, //s
        };
    }
*/
    //this constructor & getitudes methods could be in home.js as well
    // (array using mapping) - orig array + random --- new posts[] array  //or loop through
    // or directly within loadnearby funct
    getMapRef = (mapIns) =>{
        this.mapmap=mapIns;
        console.log(this.mapmap);
        const mapcenter=this.mapmap.getCenter();
        if(mapcenter){
            console.log(this.mapmap.getCenter().lat(),this.mapmap.getCenter().lng());
        }
    }
    getCenter =()=>{ //console.log("v-center: "+this.mapmap.getCenter()); //same as mapcenter
        return {
            vlat:this.mapmap.getCenter().lat(),
            vlong:this.mapmap.getCenter().lng(),
        }
    }
    getRadius =()=>{
        const mapcenter=this.mapmap.getCenter(); //if using this.getCenter()?
        console.log("center: "+mapcenter);
        const mapbounds=this.mapmap.getBounds(); //4 corners coord
        if(mapcenter && mapbounds){
            const ne=mapbounds.getNorthEast();
            const right=new window.google.maps.LatLng(mapcenter.lat(),ne.lng());//mapbounds.lng() wrong
            console.log("right: "+right);
            const r=window.google.maps.geometry.spherical.computeDistanceBetween(mapcenter,right);
            console.log("radius: "+r);
            return 0.001*r;
            //same weidu lantitude
            //what difference between right, mapcenter(=this.mapmap.getCenter()), this.getCenter()
        }
    }
    reloadMarker = ()=> {console.log("how many: "+this.props.poststuff.length);  //prev length as this console is before loadlocalpost(new center&range)
        const vcenter=this.getCenter(); //NOT this.mapmap.getCenter() but could incorporate this.getCenter() within reloadmarker
        console.log("vcenter: "+vcenter);
        const vradius=this.getRadius();
        console.log(vcenter,vradius);
        this.props.loadlocalposts(vcenter,vradius);
        //if(this.props.topic==="around"){this.props.loadlocalposts(vcenter,vradius);}else{this.props.globalfaceposts();}
    } //this func can be defined in Home.js then pass onto aroundmap.js
    //here loadnearbyposts defined in home.js then passonto aroundmap.js
    // then define reloadmarker with loadnearbyposts with parameters in aroundmap.js

    /*
    //use func props{lat lon}+random to return {lat lng}; or random +props =state
    getitude1=()=>{
        this.state.lantitd1=this.props.poststuff.location.lat + 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
        this.state.longitd1=this.props.poststuff.location.lon + 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
        return {lat:this.state.lantitd1,lng:this.state.longitd1};
    }
    getitude12=()=>{
        const lan12=this.props.poststuff.location.lat + 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
        const long12=this.props.poststuff.location.lon + 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
        return {lat:lan12, lng:long12};
    }
     */

    render ()  {
        const geoloc = JSON.parse(localStorage.getItem("POS_KEY"));
        const {lat,lon} = JSON.parse(localStorage.getItem("POS_KEY"));
        // const {lat,lon: lng} such that position={{lat,lng}}

    //    const variation= 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
        //{this.props.poststuff.map(eachpost => <AroundMarker key={eachpost.url} postinfo={eachpost}/>)}
        //latitude={eachpost.lat+variation} longitude={eachpost.lon+variation}
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{lat:geoloc.lat,lng:lon}}
                ref={this.getMapRef}
                onDragEnd={this.reloadMarker}
                onZoomChanged={this.reloadMarker}
                >
                {
                    this.props.poststuff.map( eachpost =>
                        <AroundMarker key={eachpost.url} postinfo={eachpost}
                                    //  latitude={eachpost.location.lat+2*Math.random()*LOC_SHAKE - LOC_SHAKE} //a in marker.js
                                    //  longitude={eachpost.location.lon+2*Math.random()*LOC_SHAKE - LOC_SHAKE}  //a in marker.js
                            //or the above two mapped within postinfo/eachpost: orgin post.lat/lon + random = new postinfo/eachpost
                             // lantitd1={this.state.lantitd1} longitd1={this.state.longitd1} //wrong its array  //array of postinfo/eachpost is poststuff
                        />)
                }

            </GoogleMap>
        );
        //<GoogleMap></GoogleMap> <AroundMarker />
    }
}
export const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));