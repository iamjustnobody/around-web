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
        console.log(this.mapmap.getCenter().lat(),this.mapmap.getCenter().lng());
    }
    render () {
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
                >
                {
                    this.props.poststuff.map( eachpost =>
                        <AroundMarker key={eachpost.url} postinfo={eachpost}
                                      latitude={eachpost.location.lat+2*Math.random()*LOC_SHAKE - LOC_SHAKE}
                                      longitude={eachpost.location.lon+2*Math.random()*LOC_SHAKE - LOC_SHAKE}
                        />)
                }

            </GoogleMap>
        );
        //<GoogleMap></GoogleMap> <AroundMarker />
    }
}
export const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));