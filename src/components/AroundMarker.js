import React from 'react';
import  {Marker,InfoWindow} from "react-google-maps";
import {LOC_SHAKE} from "../constants";

export class AroundMarker extends React.Component{
    constructor(props) {
        super(props);
        this.state={isOpen:false,};
    }
    toggleOpen=()=>{
        this.setState({isOpen:(preState=>{return !preState;})()});
     //   this.setState({isOpen:(preState=>{return !preState;})});
    //    this.setState(preState=>{return {isOpen: !preState}});
    }
    render(){
        const { location:{lat, lon:lng}, User:user, message,url}=this.props.postinfo;
        const latitude = lat + 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
        const longitude = lng + 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
        return (
            <Marker
                position={{lat:latitude,lng:longitude}}
                onMouseOver={this.toggleOpen}
                onMouseOut={this.toggleOpen}
            >
                <InfoWindow>
                    <div>
                        <img src={url} alt={message} className="around-marker-image" />
                        {`${user}: ${message}`}
                    </div>
                </InfoWindow>
            </Marker>
        );
        //position={{lat,lng}}
        //const { lat,lon:lng}=this.props.postinfo.location;
        //const { location:{lat,lon:lng}, User:User}=this.props.postinfo;
        //const { location:{lat,lon:lng}, User}=this.props.postinfo;
        //position={{lat:lat,lng:lng}}
        //<div>this.props.postinfo.User</div>
        //<Marker />
        // <div>{user}</div>
        //div straight follow inforwindow
    }
}