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
 
    getMapRef = (mapIns) =>{
        this.mapmap=mapIns;
        console.log(this.mapmap);
        const mapcenter=this.mapmap.getCenter();
        if(mapcenter){
            console.log(this.mapmap.getCenter().lat(),this.mapmap.getCenter().lng());
        }
    }
    getCenter =()=>{ 
        return {
            vlat:this.mapmap.getCenter().lat(),
            vlong:this.mapmap.getCenter().lng(),
        }
    }
    getRadius =()=>{
        const mapcenter=this.mapmap.getCenter(); 
        
        const mapbounds=this.mapmap.getBounds(); //4 corners coord
        if(mapcenter && mapbounds){
            const ne=mapbounds.getNorthEast();
            const right=new window.google.maps.LatLng(mapcenter.lat(),ne.lng());//not mapbounds.lng()
            
            const r=window.google.maps.geometry.spherical.computeDistanceBetween(mapcenter,right);
            
            return 0.001*r;
        }
    }
    reloadMarker = ()=> {
        const vcenter=this.getCenter(); //NOT this.mapmap.getCenter() but could include this.getCenter() in reloadmarker
        
        const vradius=this.getRadius();
       
        this.props.loadlocalposts(vcenter,vradius);

    } 

    render ()  {
        const geoloc = JSON.parse(localStorage.getItem("POS_KEY"));
        const {lat,lon} = JSON.parse(localStorage.getItem("POS_KEY"));
        
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
                        />)
                }

            </GoogleMap>
        );

    }
}
export const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));
