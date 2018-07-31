import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'
import routes from '../constants/routes'
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Form, FormGroup, FormText, Label, Button,
  Card, CardImg, CardText, CardBody, CardTitle, CardSubtitle} from 'reactstrap'
import { auth, db } from '../firebase'
import { ButtonsEdit } from '../components/ButtonEditDelete'
import Desvelao from '../img/desvelao.jpg'
import DesvelaoBG from '../img/desvelao-bg.jpg'
import { DESVELAO_PROFILE, DESVELAO_TWITTER, DESVELAO_GITHUB, DESVELAO_STEAM, DESVELAO_REDDIT } from '../constants/links'
// <CardImg top width="50%" src={team.logo} alt={`${team._id}'s logo`}/>
const ProfileCard = (props) => {
    const { data } = props
    // dv-team-card-img
    return (
      <figure className="dv-profile-card">
      	<img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample1.jpg" alt="sample1"/>
      	<div className="icons">
      		<a href="#"><i className="ion-ios-home-outline"></i></a>
      		<a href="#"><i className="ion-ios-email-outline"></i></a>
      		<a href="#"><i className="ion-ios-telephone-outline"></i></a>
      	</div>
      	<figcaption>
      		<h2>Judy <span>Havelock</span></h2>
      		<p>If good things lasted forever, would we appreciate how precious they are?</p>
      	</figcaption>
      </figure>
    )
  }

// style={{background: 'url(' + DesvelaoBG + ') center'}}
const ProfileSocial = (props) => {
  return (
    <div className='dv-profile-social mx-auto'>
      <div className='dv-profile-social-info'>
        <div className='mx-1'>
          <a className='' href={DESVELAO_PROFILE} target='_blank'><img className='' src={Desvelao} alt="sample1"/></a>
        </div>
        <div className='dv-profile-social-name mx-1'>
          <a className='' href={DESVELAO_PROFILE} target='_blank'>Desvelao^^</a>
          <div className='dv-profile-social-name-discriminator mx-2'>#2956</div>
        </div>
      </div>
      <div className='dv-profile-social-links'>
        <a className='mx-1' href={DESVELAO_TWITTER} target='_blank'><i className='fab fa-twitter' id='dv-link-color-twitter'></i></a>
        <a className='mx-1' href={DESVELAO_STEAM} target='_blank'><i className='fab fa-steam' id='dv-link-color-steam'></i></a>
        <a className='mx-1' href={DESVELAO_REDDIT} target='_blank'><i className='fab fa-reddit' id='dv-link-color-reddit'></i></a>
      </div>
    </div>
  )
}
// <a className='mx-1' href={DESVELAO_GITHUB} target='_blank'><i className='fab fa-github' id='dv-link-color-github'></i></a>
// "https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/sq-sample1.jpg"
export { ProfileSocial }

export default ProfileCard
