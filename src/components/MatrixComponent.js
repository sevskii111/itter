import React, { Component } from "react";
import { Table, Row, Col } from "reactstrap";

class MatrixComponent extends Component {
  constructor(props) {
    super(props);
    if (!this.props.values) {
      for (let i = 0; i < this.props.height; i++) {
        this.props.values.push([]);
        for (let j = 0; j < this.props.width; j++) {
          this.props.values[i].push(0);
        }
      }
    }
    this.handleInput = this.handleInput.bind(this);
  }

  componentDidUpdate() {}

  componentDidMount() {
    if (!this.props.readonly) {
      this.props.handleMatrixChange(this.props.values);
    }
  }

  handleInput(x, y) {
    return ({ target }) => {
      const { value } = target;

      let oldValues = this.props.values;
      let newValues = [];
      for (let i = 0; i < this.props.height; i++) {
        newValues.push([]);
        for (let j = 0; j < this.props.width; j++) {
          if (oldValues[i]) {
            newValues[i].push(oldValues[i][j] || 0);
          } else {
            newValues[i].push(0);
          }
        }
      }
      newValues[x][y] = Number(value);
      this.props.handleMatrixChange(newValues);
    };
  }

  renderTable() {
    const calcBg = (i, j) => {
      if (!this.props.saddle) return "";
      if (i === this.props.saddle.y && j === this.props.saddle.x) {
        return "highlight";
      } else if (i === this.props.saddle.y || j === this.props.saddle.x) {
        return "semi-highlight";
      } else {
        return "";
      }
    };
    let columns = [];
    columns.push(
      <tr key="0c">
        {this.props.values[0].map((v, i) => (
          <th className="bg-light" key={`-${i}`}>
            {i === this.props.values[0].length - 1 ? (
              <p>Y</p>
            ) : (
              <p>
                X<sub>{i + 1}</sub>
              </p>
            )}
          </th>
        ))}
      </tr>
    );
    let maxs = [];
    for (let i = 0; i < this.props.height; i++) {
      let rows = [];
      let min = this.props.values[i][0];
      for (let j = 0; j < this.props.width; j++) {
        const val = this.props.values[i][j];
        min = Math.min(min, val);
        if (!maxs[j] || maxs[j] < val) {
          maxs[j] = val;
        }
        rows.push(
          <td key={`${i}-${j}`} className={calcBg(i, j)}>
            <input
              type="number"
              value={val || ""}
              placeholder="0"
              className={`table-input`}
              onChange={this.handleInput(i, j)}
              key={`${i}-${j}`}
              readOnly={this.props.readonly}
            />
          </td>
        );
      }
      columns.push(<tr key={i}>{rows}</tr>);
    }

    return columns;
  }

  render() {
    return (
      <>
        <Row>
          <Col xs={12} md="auto">
            <Table bordered className="text-center" responsive>
              <tbody>{this.renderTable()}</tbody>
            </Table>
          </Col>
        </Row>
      </>
    );
  }
}

export default MatrixComponent;
