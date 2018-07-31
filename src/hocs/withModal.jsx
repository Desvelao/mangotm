import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

const withModal = (Component) =>
  class ModalExample extends React.Component {
    constructor(props) {
      super(props);
      console.log('MODALEXAMPLE',this.props);
      this.state = {
        modal: true
      };

      this.toggle = this.toggle.bind(this);
    }

    toggle() {
      this.setState({
        modal: !this.state.modal
      });
    }

    // <Button color="danger" onClick={this.toggle}>{this.props.buttonLabel}</Button>
    // <ModalFooter>
    //   <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
    //     <Button color="secondary" onClick={this.toggle}>Cancel</Button>
    //   </ModalFooter>
    //
    render() {
      const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={() => this.props.onClickClose()}>&times;</button>;
      return (
        <div>
          <Modal isOpen={this.state.modal} toggle={() => this.props.onClickClose()} className={this.props.className} external={externalCloseBtn}>
            <ModalHeader toggle={() => this.props.onClickClose()}>{this.props.title}</ModalHeader>
            <ModalBody>
              <Component data={this.props.data}/>
            </ModalBody>
          </Modal>
        </div>
      );
    }
  }

export default withModal;
