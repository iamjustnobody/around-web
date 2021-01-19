import React from 'react';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";
import {AroundMarker} from "./AroundMarker";

class NormalAroundMap extends React.Component{
    render () {
        const geoloc = JSON.parse(localStorage.getItem("POS_KEY"));
        const {lat,lon} = JSON.parse(localStorage.getItem("POS_KEY"));
        // const {lat,lon: lng} such that position={{lat,lng}}
        return (
            <GoogleMap
                defaultZoom={8}
                defaultCenter={{lat:geoloc.lat,lng:lon}}
                >
                {
                    this.props.poststuff.map( eachpost =>
                        <AroundMarker key={eachpost.url} postinfo={eachpost}/>)
                }

            </GoogleMap>
        );
        //<GoogleMap></GoogleMap> <AroundMarker />
    }
}
export const AroundMap = withScriptjs(withGoogleMap(NormalAroundMap));