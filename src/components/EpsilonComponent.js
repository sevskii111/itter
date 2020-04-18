import React, { Component } from "react";
import { Row, Col, Form, FormGroup, Input } from "reactstrap";

class EpsilonComponent extends Component {
  constructor(props) {
    super(props);

    this.handleInput = this.handleInput.bind(this);
  }

  handleInput({ target }) {
    let { name, value } = target;
    this.props.handleEpsChange({ ...this.state, [name]: value });
  }

  render() {
    return (
      <Row className="text-left">
        <Col xs={{ size: 12 }} md={{ size: "auto" }}>
          <h2>Введите желаему точность(ε):</h2>
        </Col>
        <Col xs={11} md={3} className="mt-1">
          <Form>
            <FormGroup row>
              <Col>
                <Input
                  type="number"
                  placeholder={0.001}
                  name="eps"
                  value={this.props.eps}
                  onChange={this.handleInput}
                  min={0.00000001}
                />
              </Col>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default EpsilonComponent;
