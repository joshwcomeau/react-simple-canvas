import { stub } from 'sinon';


export class MockContext {
  constructor() {
    // Methods used in the <Svg> class, for general Canvas processing
    this.translate = stub();
    this.clearRect = stub();

    // Methods used by children components
    this.beginPath = stub();
    this.moveTo = stub();
    this.lineTo = stub();
    this.rect = stub();
    this.stroke = stub();
    this.fill = stub();
    this.lineWidth = stub();
    this.strokeStyle = stub();
    this.lineCap = stub();
    this.globalAlpha = stub();
    this.setLineDash = stub();
    this.lineDashOffset = stub();
  }
}
