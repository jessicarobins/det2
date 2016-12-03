import React, { Component, PropTypes } from 'react';
import { Button, Alert } from 'react-bootstrap';
// import Typeahead from 'react-bootstrap-typeahead';

export class CreateListForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = { selected: '' };
  }
  
  addPost = () => {
    if (this.verbRef.value && this.state.selected.length) {
      this.props.addPost(this.verbRef.value, this.state.selected);
    }
  };
  
  handleAlertDismiss = () => {
    this.clearFields();
    this.props.toggleAddWarning();
  };
  
  clearFields() {
    this.verbRef.value = '';
    this.refs.typeahead.getInstance().clear();
  }
  
  renderAlert() {
    if (this.props.showAddWarning) {
      return (
        <Alert bsStyle="warning" onDismiss={this.handleAlertDismiss}>
          <h4>No results found for <strong>{this.state.selected}</strong>.</h4>
          <p>
            <Button bsStyle="primary">Create an empty list</Button>
            <span> or </span>
            <Button onClick={this.handleAlertDismiss}>Try again</Button>
          </p>
        </Alert>
      );
    }
  }

  render() {
    return (
      <div>
        <div>
          <form>
            {'I want to '}
            <input ref={this.verbRef} type="text" placeholder="climb" />
            {' every '}
            <input
              ref="typeahead"
              options={this.props.templates}
              placeholder={'mountain'}
              labelKey={'name'}
              allowNew={true}
              newSelectionPrefix={''}
              onInputChange={selected => this.setState({selected})}
            />
            {' '}
            <button onClick={this.addPost}>
              Submit
            </button>
            
          </form>
        </div>
        <div>
          {this.renderAlert()}
        </div>
      </div>
    );
  }
}

CreateListForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  showAddPost: PropTypes.bool.isRequired,
  templates: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired
  })).isRequired,
  showAddWarning: PropTypes.bool.isRequired,
  toggleAddWarning: PropTypes.func.isRequired,
};

export default CreateListForm;
