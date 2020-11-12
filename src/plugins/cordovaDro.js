/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

/*
 * Wait for the deviceready event before using any of Cordova's device APIs.
 * See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
 * document.addEventListener('deviceready', onDeviceReady, false);
 */

export const onDeviceReadyConfirm = () => {
  navigator.notification.confirm(
    "我是测试8下cordova-plugin-dialogs", // message
    onConfirm, // callback
    "测试DIALOGS", // title
    ["确定", "取消"] // buttonName
  );
};

export const onDeviceReadyAlert = () => {
  navigator.notification.alert(
    "我是测试下cordova-plugin-dialogs", // message
    onConfirm, // callback
    "测试DIALOGS", // title
    "我知道了" // buttonName
  );
};

const onConfirm = (buttonIndex) => {
  // 点击按钮后的回调
  if (buttonIndex === 1) {
    alert(`我点击的按钮是${buttonIndex}`);
  }
  console.log(buttonIndex);
};

/**
 *
 */

export const cameraGetPicture = () => {
  navigator.camera.getPicture(onSuccess, onFail, {
    quality: 50,
    targetWidth: 100,
    targetHeight: 1000,
    destinationType: 1, //0 返回base64编码字符串,1 返回图片文件URI,2 返回图片本机URI
    sourceType: 1, //0 打开照片库,1 打开本机相机,2 打开已保存的相册
    // mediaType: 1,//0 仅允许选择图片,1 仅允许视频选择,2 允许选择所有媒体类型
    cameraDirection: 0, //0 前置摄像头,1 后置摄像头
    allowEdit: true, //允许图像编辑
  });
};

function onSuccess(imageURI) {
  const image = document.getElementById("myImage");
  image.src = imageURI;
  document.getElementById("myImageText").innerHTML = "地址是：" + imageURI;
}

function onFail(message) {
  // alert(`getPicture Failed because: ${ message }`);
  document.getElementById("myImageText").innerHTML = "错误信息：" + message;
}

export const cameraCleanup = () => {
  navigator.camera.cleanup(onSuccess1, onFail1);
};

function onSuccess1() {
  console.log("cleanup");
}

function onFail1(message) {
  alert(` cleanup Failed because: ${message}`);
}

//音频
export function audioCapture() {
  var options = {
    limit: 1,
    duration: 10,
  };

  navigator.device.capture.captureAudio(onSuccess, onError, options);
  function onSuccess(mediaFiles) {
    var i, path, len;

    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
      path = mediaFiles[i].fullPath;
      console.log(mediaFiles);
      alert("音频：" + path);
      console.log("音频：" + path);
    }
  }

  function onError(error) {
    navigator.notification.alert("Error code: " + error.code, null, "Capture Error");
  }
}
//图片
export function imageCapture() {
  var options = {
    limit: 1,
  };

  navigator.device.capture.captureImage(onSuccess, onError, options);

  function onSuccess(mediaFiles) {
    var i, path, len;

    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
      path = mediaFiles[i].fullPath;
      console.log(mediaFiles);
      alert("图片：" + path);
      console.log("图片：" + path);
    }
  }

  function onError(error) {
    navigator.notification.alert("Error code: " + error.code, null, "Capture Error");
  }
}
//视频
export function videoCapture() {
  var options = {
    limit: 1,
    duration: 10,
  };

  navigator.device.capture.captureVideo(onSuccess, onError, options);
  function onSuccess(mediaFiles) {
    var i, path, len;
    for (i = 0, len = mediaFiles.length; i < len; i += 1) {
      path = mediaFiles[i].fullPath;
      console.log(mediaFiles);
      alert("视频：" + path);
      console.log("视频：" + path);
      document.getElementById("video").src = path;
    }
  }

  function onError(error) {
    navigator.notification.alert("Error code: " + error.code, null, "Capture Error");
  }
}

//获取当前位置 用于查看位置。
export function getPosition() {
  var options = {
    enableHighAccuracy: true,
    maximumAge: 3600000,
  };
  navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

  function onSuccess(position) {
    let retua =
      "Latitude: " +
      position.coords.latitude +
      "\n" +
      "Longitude: " +
      position.coords.longitude +
      "\n" +
      "Altitude: " +
      position.coords.altitude +
      "\n" +
      "Accuracy: " +
      position.coords.accuracy +
      "\n" +
      "Altitude Accuracy: " +
      position.coords.altitudeAccuracy +
      "\n" +
      "Heading: " +
      position.coords.heading +
      "\n" +
      "Speed: " +
      position.coords.speed +
      "\n" +
      "Timestamp: " +
      position.timestamp +
      "\n";
    alert(retua);

    document.getElementById("getPositionText").innerHTML = retua;
  }

  function onError(error) {
    alert("code: " + error.code + "\nmessage:" + error.message + "\n");
  }
}

export function watchPosition() {
  var options = {
    maximumAge: 3600000,
    timeout: 3000,
    enableHighAccuracy: true,
  };
  navigator.geolocation.watchPosition(onSuccess, onError, options);

  function onSuccess(position) {
    let positionT =
      "Latitude: " +
      position.coords.latitude +
      "\n" +
      "Longitude: " +
      position.coords.longitude +
      "\n" +
      "Altitude: " +
      position.coords.altitude +
      "\n" +
      "Accuracy: " +
      position.coords.accuracy +
      "\n" +
      "Altitude Accuracy: " +
      position.coords.altitudeAccuracy +
      "\n" +
      "Heading: " +
      position.coords.heading +
      "\n" +
      "Speed: " +
      position.coords.speed +
      "\n" +
      "Timestamp: " +
      position.timestamp +
      "\n";
    alert(positionT);
    document.getElementById("watchPositionText").innerHTML = positionT;
  }
  function onError(error) {
    alert("code: " + error.code + "\nmessage: " + error.message + "\n");
  }
}

//获取网络
export function networkInfo() {
  var networkState = navigator.connection.effectiveType;
  console.log(navigator.connection);
  //  var states = {};

  //  states[Connection.UNKNOWN]  = 'Unknown connection';
  //  states[Connection.ETHERNET] = 'Ethernet connection';
  //  states[Connection.WIFI]     = 'WiFi connection';
  //  states[Connection.CELL_2G]  = 'Cell 2G connection';
  //  states[Connection.CELL_3G]  = 'Cell 3G connection';
  //  states[Connection.CELL_4G]  = 'Cell 4G connection';
  //  states[Connection.CELL]     = 'Cell generic connection';
  //  states[Connection.NONE]     = 'No network connection';

  alert("Connection type: ", +networkState);
}

// function onOffline() {
//    alert('You are now offline!');
// }

// function onOnline() {
//    alert('You are now online!');
// }
