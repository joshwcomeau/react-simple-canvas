import { stub } from 'sinon';


export class MockContext {
  constructor() {
    this.beginPath = stub();
    this.closePath = stub();
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
    this.translate = stub();
    this.clearRect = stub();
  }
}
