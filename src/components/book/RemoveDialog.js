import React from 'react';
import {Modal, Button} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSquare, faCheckSquare} from '@fortawesome/free-solid-svg-icons';
import bookService from '../../services/book';

export default class RemoveDialogComponent extends React.Component {
  constructor (props) {
    super (props);
    this.state = {sure: false};
  }

  handleRemove () {
    bookService.remove (this.props.bookId).then (() => {
      this.props.removed ();
    });
  }

  render () {
    const {show, handleClose} = this.props;
    const {sure} = this.state;
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Remove book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          If you proceed this action this element will be permenantly deleted from the system! Are you sure?&nbsp;
          <FontAwesomeIcon
            onClick={() => this.setState ({sure: !sure})}
            icon={sure ? faCheckSquare : faSquare}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            disabled={!sure}
            onClick={() => this.handleRemove ()}
          >
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}