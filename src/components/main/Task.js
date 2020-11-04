import React from 'react';
import {
  Card, WingBlank, WhiteSpace, ImagePicker, SegmentedControl, Button,
} from 'antd-mobile';
import {
  onDeviceReadyConfirm, onDeviceReadyAlert, cameraCleanup, cameraGetPicture,audioCapture,videoCapture,imageCapture,getPosition,watchPosition,networkInfo
} from '@/plugins/cordovaDro';

const data = [{
  url: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
  id: '2121',
}, {
  url: 'https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg',
  id: '2122',
}];

class Task extends React.Component {
    constructor(...args) {
    super(...args);
    this.state = {
     files: data,
     multiple: false,
   }
  }
  onChange(files, type, index){
    console.log(files, type, index);
    this.setState({
      files,
    });
  }

  onSegChange(e) {
    const index = e.nativeEvent.selectedSegmentIndex;
    this.setState({
      multiple: index === 1,
    });
  }


  render() {
    const { files } = this.state;
    return (
      <div className="qm-fill-width ">
        <WingBlank size="lg">
          <WhiteSpace size="lg" />

          <Card>
            <Card.Header
              title="This is title"
              thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
              extra={<span>任务哦</span>}
            />
            <Card.Body>
              <div>This is content of `Card`</div>
            </Card.Body>
            <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
          </Card>
          <WhiteSpace size="lg" />

          <WingBlank>
            <SegmentedControl
              values={['切换到单选', '切换到多选']}
              selectedIndex={this.state.multiple ? 1 : 0}
              onChange={this.onSegChange.bind(this)}
            />
            <ImagePicker
              files={files}
              onChange={this.onChange}
              onImageClick={(index, fs) => console.log(index, fs)}
              selectable={files.length < 7}
              multiple={this.state.multiple}
            />
          </WingBlank>
          <Button onClick={onDeviceReadyConfirm}>Cordova Dialog Confirm</Button>
          <WhiteSpace size="md" />
          <Button onClick={onDeviceReadyAlert}>Cordova Dialog Alert</Button>
          <WhiteSpace size="md" />
          <Button onClick={ cameraGetPicture }>拍照</Button>
          <img style={ { width: '200px', height: '200px' } } id="myImage" src="#" alt="未知的" />
          <WhiteSpace size="lg" />
          <span id="myImageText">22221</span>

          <WhiteSpace size="md" />
          <Button onClick={cameraCleanup}>Cordova Camera Cleanup</Button>
          <Button onClick={this.onSpan}>点击</Button>
          <Card>
            <Card.Body>
          <Button id = "audioCapture" onClick={audioCapture}>AUDIO音频</Button>
          <Button id = "imageCapture" onClick={imageCapture}>IMAGE图片</Button>
          <Button id = "videoCapture" onClick={videoCapture}>VIDEO视频</Button>
            </Card.Body>
          </Card>
          <WhiteSpace size="lg" />
         <Card>
            <Card.Body>
              <Button id = "getPosition" onClick={getPosition}>CURRENT POSITION 获取位置</Button>
              <Button id = "watchPosition" onClick={watchPosition}>WATCH POSITION 监听位置</Button>
            </Card.Body>
          </Card>
          <p id="getPositionText"></p>
           <WhiteSpace size="lg" />
          <p id="watchPositionText"></p>
          <WhiteSpace size="lg" />
           <WhiteSpace size="lg" />
          <Card>
            <Card.Body>
               <video id="video" controls="controls"  style={ { width: '200px', height: '200px' } }>
                您的浏览器不支持 video 标签。
              </video>

            </Card.Body></Card>
          <WhiteSpace size="lg" />
           <button id = "networkInfo" onClick={networkInfo}>INFO</button>
        </WingBlank>
      </div>
    );
  }
}
export default Task;
