import React, {useEffect, useState, useContext} from 'react'
import {UserContext} from '../App'

const Settings=() => {


    //use context to get access to user state
    const {state, dispatch}=useContext(UserContext)

    //States
    const [name, setName]=useState("")
    const [email, setEmail]=useState("")
    //Function to handle MenuButton Click

    return (
        <div className="container">
            <div className="row" style={{marginTop: '40px'}}>
                <div className="col s12 m4 13" style={{backgroundColor: 'gray'}}>
                    <div className="collection">
                        <a href="#!" className="collection-item">Alvin</a>
                        <a href="#!" className="collection-item active">Alvin</a>
                        <a href="#!" className="collection-item">Alvin</a>
                        <a href="#!" className="collection-item">Alvin</a>
                    </div>
                </div>
                <div className="col s12 m8 19">
                    <div className="container">
                        <div className="row">

                            <div className="col s12">
                                <div className="card-panel">
                                    {/* Profile Details and picture */}
                                    <div className=" row valign-wrapper" style={{borderBottom: '1px solid'}}>
                                        <div className="col s2" style={{width: '80%', marginBottom: '10px'}}>
                                            <img src={state? state.profilePicture:'loading'} style={{width: "80px", height: "80px", borderRadius: "80px"}} className="circle responsive-img" />
                                        </div>
                                        <div className="col s10" style={{width: '200%', marginBottom: '10px'}}>
                                            <h4 style={{fontSize: '30px'}}>
                                                {state? state.name:"loading user"}
                                            </h4>
                                            <a className="blue-text text-lighten-2" onClick={null}>Change Profile Photo</a>
                                        </div>
                                    </div>

                                    {/* Name Change */}
                                    <div className="row valign-wrapper" style={{borderBottom: '1px solid'}}>
                                        <div className="col s2">
                                            <h6 style={{fontWeight: 'bold'}} >Name</h6>
                                        </div>
                                        <div className="col input-field s10">
                                            <input type="text" placeholder={state ? state.name : 'Loading Name'} value={name} onChange={(event) => setName(event.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings