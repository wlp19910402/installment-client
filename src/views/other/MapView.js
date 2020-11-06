import React from "react";
import { Map, Marker } from 'react-amap';
import {getGeocode} from '@/store/actions/getDistrictData'

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
    this.state = {
      mapCenter: { longitude: 0, latitude: 0 },
      markerPosition: { longitude: 0, latitude: 0 }
    }
  }
  async componentDidMount () {
    let location = await getGeocode(this.props.match.params.place)
    if (location !== '') {
      let locaArr = location.split(',')
      this.setState({
        markerPosition: {
          longitude: locaArr[ 0 ],
          latitude: locaArr[ 1 ]
        }
      })
      this.changeCenter()
    }
  }
  changeCenter() {
    this.setState({
      mapCenter: this.state.markerPosition
    })
  }

  render() {
    return <div style={{ width: '100%', height: '600px' }}>
      <Map events={this.amapEvents} zoom={15} center={this.state.mapCenter} key="b1b79dacf4aa6fd369f1265848f3c384">
        <Marker position={ this.state.markerPosition } events={ this.markerEvents } />
      </Map>
      <button onClick={() => { this.changeCenter.bind(this) }}>Move Map To A Random Center</button>
    </div>
  }
}

export default App