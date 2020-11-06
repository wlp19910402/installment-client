import React from "react";
import { Map, Marker } from 'react-amap';

const ZoomCtrl = (props) => {
  const map = props.__map__;
  if (!map) {
    console.log('组件必须作为 Map 的子组件使用');
    return;
  }
  const style = {
    position: 'absolute',
    top: '10px',
    left: '10px',
    background: '#fff',
    padding: '10px'
  }
  const zoomIn = () => map.zoomIn();
  const zoomOut = () => map.zoomOut();

  return (<div style={style}>
    <button onClick={zoomIn}>zoom in</button>
    <button onClick={zoomOut}>zoom out</button>
  </div>);
};
const randomPosition = () => ({
  longitude: 116.333089,
  latitude: 39.9692
});
class App extends React.Component {
  constructor() {
    super();
    this.amapEvents = {
      created: (mapInstance) => {
        console.log('高德地图 Map 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
        console.log(mapInstance.getZoom());
      }
    };
    this.markerEvents = {
      created: (markerInstance) => {
        console.log('高德地图 Marker 实例创建成功；如果你要亲自对实例进行操作，可以从这里开始。比如：');
        console.log(markerInstance.getPosition());
      }
    }
    this.markerPosition = { longitude: 116.333089, latitude: 39.9692 };
    this.state = {
      mapCenter: randomPosition()
    }
  }
  changeCenter() {
    this.setState({
      mapCenter: randomPosition()
    })
  }

  render() {
    return <div style={{ width: '100%', height: '400px' }}>
      <Map events={this.amapEvents} zoom={15} center={this.state.mapCenter}>
        <Marker position={ this.markerPosition } events={ this.markerEvents } />
        <ZoomCtrl />
        <button onClick={() => { this.changeCenter() }}>Move Map To A Random Center</button>
      </Map>

    </div>
  }
}

export default App