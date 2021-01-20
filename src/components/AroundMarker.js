import React from 'react';
import  {Marker,InfoWindow} from "react-google-maps";
import {LOC_SHAKE} from "../constants";

export class AroundMarker extends React.Component{
    constructor(props) {
        super(props);
        this.state={isOpen:false,};
    }
    toggleOpen=()=>{
     //   this.setState({isOpen:(preState=>{return !preState;})()});//onmouse over ok but not out
     //   this.setState({isOpen:(preState=>{return !preState;})}); //onmouse over ok but not out
     //   this.setState(preState=>{return {isOpen: !preState}}); //onmouse not showing any
          this.setState(preState=>{return {isOpen: !preState.isOpen}}); //ok
     //   this.setState((preState=>{return {isOpen: !preState.isOpen}})()); //error
      //  this.setState(preState=>{return {isOpen: !preState}}); //hover not working
      //    this.setState({isOpen:(preState=>{return !preState.isOpen})}); //hover ok out not ok
     //   this.setState({isOpen:(preState=>{return !preState.isOpen})()}); //error

    }
    render(){
    //    const { location:{lat, lon:lng}, User:user, message,url}=this.props.postinfo;
    //    const latitude = lat + 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
    //    const longitude = lng + 2*Math.random()*LOC_SHAKE - LOC_SHAKE;
        //position={{lat:latitude,lng:longitude}} within <Marker />

        const { User:user, message,url}=this.props.postinfo;
     //   console.log(this.props);
        return ( //remove onClick={this.toggleOpen} from inside Marker
            <Marker
                position={{lati:this.props.latitude,lng:this.props.longitude}}
                onMouseOver={this.toggleOpen}
                onMouseOut={this.toggleOpen}
                onClick={this.toggleOpen}
            >
                {this.state.isOpen?
                    <InfoWindow onCloseClick={this.toggleOpen}>
                        <div>
                            <img src={url} alt={message} className="around-marker-image" />
                            <p>{`${user}: ${message}`}</p>
                        </div>
                    </InfoWindow>
                :null}

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