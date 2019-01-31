import React, { Component } from 'react'
import classnames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class InputForm extends Component {
    state = {
        id: '',
        tvid: '',
        tvname: '',
        showtype: '',
        pid: '',
        tvfrom: '',
        tvto: '',
        link: '',
        remark: '',
        errors: {}
    };

    getTvid(){
      const { items } = this.props;
      if (items) {
        return items[items.length-1].tvid;
      }
    }

    onChange = (e) => this.setState({ [e.target.name]: e.target.value});

    onSubmit = (e) => {
        e.preventDefault();
        
        const { tvid, tvname, showtype, pid, tvfrom, tvto, link, remark} = this.state;

        if (tvid === '' ){
          this.setState({errors: {tvid: 'TVID is required'}});
          return;
        }
        if (tvname === ''){
          this.setState({errors: {tvname: 'TVName is required'}});
          return;
        }
        if (showtype === ''){
          this.setState({errors: {showtype: 'ShowType is required'}});
          return;
        }
        if (link === ''){
          this.setState({errors: {link: 'Link is required'}});
          return;
        }
        if (pid === ''){
          this.setState({errors: {pid: 'Pid is required'}});
          return;
        }
        if (tvfrom === ''){
          this.setState({errors: {tvfrom: 'TVFrom is required'}});
          return;
        }
        if (tvto === ''){
          this.setState({errors: {tvto: 'TVTo is required'}});
          return;
        }

        const newItem = {
          tvid: parseInt(tvid),
          tvname: tvname,
          showtype: showtype,
          places: [pid+" "+tvfrom+" "+tvto],
          link: link,
          remarks: remark,
        }
        const { firestore, history } = this.props;
        firestore.add({collection: 'tvdb'}, newItem).then(() => history.push('/'));
        
        this.setState ({
          id: '',
          tvid: '',
          tvname: '',
          showtype: '',
          pid: '',
          tvfrom: '',
          tvto: '',
          link: '',
          remark: '',
          errors: {}
        });

    }
    render() {
        const { tvid, tvname, showtype, pid, tvfrom, tvto, link, remark, errors } = this.state;
        return (
          <div className="container">
            <div className="container mt-2">
                <h1 className="text-center" style={{textShadow: '0 1px 3px rgba(0,0,0,.5)',color: 'white'}}>Insert Records</h1>
            </div>
            <div className="jumbotron bg-dark mt-4 pt-3 pb-1">
              <form onSubmit={this.onSubmit}>
                <div className="row form-group">
                  <div className="col-md-2">
                    <input type="number" className={classnames('form-control', {'is-invalid': errors.tvid})} placeholder="TVID" name="tvid" value={tvid} onChange={this.onChange}/>
                    {errors.tvid && <div className="invalid-feedback">{errors.tvid}</div>}
                  </div>
                  <div className="col-md-7">
                    <input type="text" className={classnames('form-control', {'is-invalid': errors.tvname})} placeholder="TVName" name="tvname" value={tvname} onChange={this.onChange}/>
                    {errors.tvname && <div className="invalid-feedback">{errors.tvname}</div>}
                  </div>
                  <div className="col-md-3">
                    <select className={classnames('form-control', {'is-invalid': errors.showtype})} name="showtype" value={showtype} onChange={this.onChange}>
                      <option value='' disabled>Select ShowType</option>
                      <option value='Completed'>Completed</option>
                      <option value='Airing'>Airing</option>
                      <option value='Break'>Break</option>
                    </select>
                    {errors.showtype && <div className="invalid-feedback">{errors.showtype}</div>}
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-6">
                    <input type="text" className={classnames('form-control', {'is-invalid': errors.link})} placeholder="Wikipedia Link" name="link" value={link} onChange={this.onChange}/>
                    {errors.link && <div className="invalid-feedback">{errors.link}</div>}
                  </div>
                  <div className="col-md-2">
                    <select className={classnames('form-control', {'is-invalid': errors.pid})} name="pid" value={pid} onChange={this.onChange}>
                        <option value='' disabled>Select Pid</option>
                        <option value='b1'>b1</option>
                        <option value='b2'>b2</option>
                        <option value='b3'>b3</option>
                        <option value='b4'>b4</option>
                        <option value='b5'>b5</option>
                        <option value='l'>l</option>
                        <option value='p'>p</option>
                      </select>
                      {errors.pid && <div className="invalid-feedback">{errors.pid}</div>}
                  </div>
                  <div className="col-md-2">
                    <input type="text" className={classnames('form-control', {'is-invalid': errors.tvfrom})} placeholder="TVFrom" name="tvfrom" value={tvfrom} onChange={this.onChange}/>
                    {errors.tvfrom && <div className="invalid-feedback">{errors.tvfrom}</div>}
                  </div>
                  <div className="col-md-2">
                    <input type="text" className={classnames('form-control', {'is-invalid': errors.tvto})} placeholder="TVTo" name="tvto" value={tvto} onChange={this.onChange}/>
                    {errors.tvto && <div className="invalid-feedback">{errors.tvto}</div>}
                  </div>
                </div>
                <div className="row form-group">
                  <div className="col-md-2">
                    <input type="submit" value="Insert New Record" className="btn btn-success"/>
                  </div>
                  <div className="col-md-6">
                    <input type="text" className="form-control" placeholder="Remarks" name="remark" value={remark} onChange={this.onChange}/>
                  </div>
                  <div className="col-md-2"><label className="form-control bg-info border-info text-dark">Last TVID</label></div>
                  <div className="col-md-2">
                    <input type="text" className="form-control" placeholder="Fetching..." defaultValue={this.getTvid()} name="lasttvid" disabled/>
                  </div>
                </div>
              </form>
            </div>
          </div>
        );
    }
}

InputForm.propTypes = {
  firestore: PropTypes.object.isRequired,
  items: PropTypes.array
};

export default compose(
  firestoreConnect([{ collection: 'tvdb' }]),
  connect((state, props) => ({
      items: state.firestore.ordered.tvdb
  }))
)(InputForm);