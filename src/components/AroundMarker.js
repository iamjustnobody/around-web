import React from 'react';
import  {Marker,InfoWindow} from "react-google-maps";
import {LOC_SHAKE} from "../constants";
import bluemarkerURLrandomvariablename from "../assets/images/blue-marker.svg"

export class AroundMarker extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            isOpen:false,
            lantitd2:0, 
            longitd2:0, 
            location2:this.getitude22(), 
        };
    }
    toggleOpen=()=>{
          this.setState(preState=>{return {isOpen: !preState.isOpen}}); 
    }
    //use func props{lat lon}+random to return {lat lng}; or random +props =state
    getitude2=()=>{
        this.state.lantitd2=this.props.postinfo.location.lat + 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
        this.state.longitd2=this.props.postinfo.location.lon + 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
        return {lat:this.state.lantitd2,lng:this.state.longitd2};
    } 
    getitude22=()=>{
        const lan22=this.props.postinfo.location.lat + 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
        const long22=this.props.postinfo.location.lon + 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
        return {lat:lan22, lng:long22};
    } 
    getitude23=()=>{
        this.setState({
            lantitd2:this.props.postinfo.location.lat + 2*Math.random()*LOC_SHAKE - LOC_SHAKE,
            longitd2:this.props.postinfo.location.lon + 2*Math.random()*LOC_SHAKE - LOC_SHAKE,
        })
    } 

    render(){
        const { User:user, message,url,location:{lat:lat,lon:lng,}}=this.props.postinfo; 
        const whichicon=(this.props.postinfo.type==='image'?null:({
            url:bluemarkerURLrandomvariablename,
            scaledSize: new window.google.maps.Size(26,41),
        }));
        return ( 
            <Marker
                position={this.state.location2} 
                onMouseOver={this.toggleOpen}
                onMouseOut={this.toggleOpen}
                onClick={this.toggleOpen} 
                icon={whichicon}
            >
                {this.state.isOpen?
                    <InfoWindow onCloseClick={this.toggleOpen}>
                        <div>
                            {
                                this.props.postinfo.type==='image'?
                                    (
                                        <video src={url} controls className="around-marker-video" />
                                    ):
                                    (
                                        <img src={url} alt={message} className="around-marker-image" />
                                       
                                    )
                            }
                            <p>{`${user}: ${message}`}</p>
                        </div>
                    </InfoWindow>
                :null}

            </Marker>
        );

    }
}
