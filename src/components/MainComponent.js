import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import SizeComponent from "./SizeComponent";
import EpsilonComponent from "./EpsilonComponent";
import MatrixComponent from "./MatrixComponent";
import CheckComponent from "./CheckComponent";
import { solveItter } from "../helpers/math";

class MainComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      width: 5,
      height: 4,
      matrix: [
        [12.59, 4.12, 3.61, 1.94, -3.5],
        [2.14, -5.22, -0.78, -0.36, 28.2],
        [-2.35, -1.03, 12.26, -4.21, -53.63],
        [2.35, -2.37, -0.16, 9, 50.92],
      ],
      solution: null,
      eps: 0.001,
    };

    this.handleSizeChange = this.handleSizeChange.bind(this);
    this.handleEpsChange = this.handleEpsChange.bind(this);
    this.handleMatrixChange = this.handleMatrixChange.bind(this);
    this.handleFill = this.handleFill.bind(this);
  }

  handleSizeChange({ size }) {
    size = +size;
    let oldValues = this.state.matrix;
    let newValues = [];
    for (let i = 0; i < size; i++) {
      newValues.push([]);
      for (let j = 0; j < size + 1; j++) {
        if (oldValues[i]) {
          newValues[i].push(oldValues[i][j] || 0);
        } else {
          newValues[i].push(0);
        }
      }
    }
    this.setState({ width: size + 1, height: size, matrix: newValues });
  }

  handleEpsChange({ eps }) {
    this.setState({
      eps,
    });
  }

  handleMatrixChange(values) {
    this.setState({
      matrix: values,
    });
  }

  handleFill(n) {
    this.handleSizeChange({ size: n });
    let checkMatrix = [];
    for (let i = 0; i < n; i++) {
      checkMatrix.push([]);
      for (let j = 0; j < n; j++) {
        if (i == j) {
          checkMatrix[i].push(6);
        } else {
          checkMatrix[i].push(0);
        }
      }
      checkMatrix[i].push(12);
    }
    this.handleMatrixChange(checkMatrix);
  }

  renderSolution(solution) {
    if (!this.state.matrix) return;
    if (solution) {
      return (
        <div>
          <p key="theta">
            <b>Θ</b> = {solution.theta}
          </p>
          {solution.solution.map((x, i) => (
            <p key={i}>
              <b>
                X<sub>{i + 1}</sub>
              </b>
              ={x}
            </p>
          ))}
        </div>
      );
    } else {
      return <h1 className="text-warning">Не удаётся найти решение</h1>;
    }
  }

  render() {
    let solution;
    if (this.state.matrix) {
      solution = solveItter(
        this.state.matrix.map((x) => [...x]),
        this.state.eps || 0.001
      );
    }
    console.log(solution);
    return (
      <Container fluid>
        <Row>
          <Col xs={{ offset: 1, size: "10" }} className="mt-2">
            <CheckComponent handleFill={this.handleFill} />
            <hr />
            <EpsilonComponent
              handleEpsChange={this.handleEpsChange}
              eps={this.state.eps}
            />
            <SizeComponent
              handleSizeChange={this.handleSizeChange}
              size={this.state.height}
            />
            <MatrixComponent
              width={this.state.width}
              height={this.state.height}
              handleMatrixChange={this.handleMatrixChange}
              saddle={this.state.saddle}
              values={this.state.matrix}
            />
            {this.renderSolution(solution)}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default MainComponent;
