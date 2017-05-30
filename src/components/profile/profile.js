import React, {Component} from 'react';

import {Thumbnail, Col, Row, Grid} from 'react-bootstrap';
import C3Chart from 'react-c3js';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import ExerciseCardList from './exerciseCardList';
import 'c3/c3.css';
import mathew from '../../assets/img/matthew.png';
import {loadPastExercisesData} from '../../actions';
import Table from '../Table/table';
import musicNoteMusic from '../../assets/img/music-note.jpg';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { BarGroupTooltip } from 'react-d3-tooltip'

const mapStateToProps = (state, ownProps) => ({user: state.loginReducer, graphData: state.graphDataReducer});

const mapDispatchToProps = dispatch => bindActionCreators({
  loadPastExercisesData
}, dispatch);

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = { userID: localStorage.getItem('userId' };
  }

  handleClick(e) {
    return () => this.props.loadPastExercisesData(this.state.userID);
  }
  graph = () => {
    if (this.props.graphData !== "The user has not sung this exercise before.") {
      return <div className="center-warning">
        {/* <div id="chart"></div> */}
        <C3Chart data={ {columns: this.props.graphData.columns} } axis={{axis:this.props.graphData.axis}}/>
      </div>
    } else {
      return <div className="center-warning">
        <a href='#' className="thumbnail" style={{'background': '#e6ecff' }} >
          <h3>Cannot find scores for current exercise. &nbsp; 😄 &nbsp; Go back to the interface page and Sing!
          </h3>
        </a>
      </div>
    }
  }

  uploadFile(e){
    // e.preventDefault();
    // cloudinary.openUploadWidget(
    //   { cloud_name: 'kevinawesome',
    //     upload_preset: 'musicapp',
    //     theme: 'minimal' },
    //   (error, imageInfo) => {
    //     if(error === null){
    //       let cloud_url=imageInfo[0].url;
    //       this.setState({image:cloud_url});
    //     }
    //   });
  }

  render() {
    if (this.state.userID === undefined) {
      return (
        <div className="container-fluid">
          <div className="row">

            <div className="col-md-2"/>
            <div className="col-md-8">
              <div className="alert alert alert-info" role="alert"> Please Log Into Your Account to in order to use this feature.
              </div>
              <div>
                <img src={musicNoteMusic} height={400} width={800} alt={''}/>
              </div>
            </div>

            <div className="col-md-2"/>
          </div>
        </div>
      );
    } else {
      return (
        <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2" >
              <div className="thumbnailSection">

                <div className="thumbnail">
                  <img src={mathew} alt=".."/>
                  <div className="caption">
                    <h3>{this.props.user.firstName} {this.props.user.lastName}</h3>
                  </div>
                </div>
                <div>
                  <button onClick={this.handleClick()} className="btn btn-danger">
                    Check Past Exercises
                  </button>
                </div>
                {/* <input type="file" onClick={this.uploadFile}>
                  <img src={this.state.image}></img>
                </input> */}
                {/* <div>
                  ImageDropping Area
                <Dropzone onDrop={ this.uploadFile.bind(this) }/>
                </div> */}
              </div>
            </div>
            <div className="col-md-8">
              <div className="pastExercise">


            </div>
              <div>
                <Table/>
              </div>

            <br/>
              {/* <div/> */}


            </div>
            <div className="col-md-2 "></div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            {this.graph()}
          </div>
          <div className="col-md-6">

          </div>

        </div>
        <div className="profileBottom row">
          <div className="col-md-4">
            <div>
              <section>
                <h3><span>Read more about us here</span></h3>
              </section>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <section>
                <h3><span>Read more about us here</span></h3>
              </section>
            </div>
          </div>
          <div className="col-md-4">
            <div>
              <section>
                <h3><span>Read more about us here</span></h3>
              </section>
            </div>
          </div>

        </div>
      </div>
      );
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
