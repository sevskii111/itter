import React, { Component } from "react";
import { Row, Col, Form, FormGroup, Input, Button } from "reactstrap";

class CheckComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      n: 100,
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleFill = this.handleFill.bind(this);
  }

  handleInput({ target }) {
    let { name, value } = target;
    if (value <= 0) {
      value = "";
    }
    this.setState({ [name]: value });
  }

  handleFill() {
    this.props.handleFill(this.state.n);
  }

  render() {
    return (
      <Row className="text-left">
        <Col xs={{ size: 12 }} md={{ size: "auto" }}>
          <p>
            АВТОМАТИЧЕСКОЕ ЗАПОЛНЕНИЕ МАТРИЦЫ: Введите порядок матрицы для
            автоматического заплнения:
          </p>
        </Col>
        <Col xs={11} md={3} className="mt-1">
          <Form>
            <FormGroup row>
              <Col>
                <Input
                  type="number"
                  placeholder={1}
                  name="n"
                  value={this.state.n}
                  onChange={this.handleInput}
                  min={1}
                />
              </Col>
              <Button onClick={this.handleFill}>Заполнить</Button>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default CheckComponent;
