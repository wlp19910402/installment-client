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

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
// document.addEventListener('deviceready', onDeviceReady, false);

export const  onDeviceReadyConfirm=()=>{
    navigator.notification.confirm(
      '我是测试8下cordova-plugin-dialogs', // message
      onConfirm, // callback
      '测试DIALOGS',  // title
      ['确定','取消'] // buttonName
  );
}

export const  onDeviceReadyAlert=()=>{
  navigator.notification.alert(
    '我是测试下cordova-plugin-dialogs',  // message
    onConfirm,         // callback
    '测试DIALOGS',            // title
    '我知道了' // buttonName
);
}

const onConfirm=(buttonIndex)=> {
  // 点击按钮后的回调
  if(buttonIndex===1){
    alert('我点击的按钮是' + buttonIndex);
  }
  console.log(buttonIndex)
}

/**
 *
 */

export const cameraGetPicture=()=>{
  navigator.camera.getPicture(onSuccess, onFail, { quality: 50,targetWidth:500,targetHeight:500});
}

function onSuccess(imageURI) {
  var image = document.getElementById('myImage');
  image.src = imageURI;
}

function onFail(message) {
  alert('getPicture Failed because: ' + message);
}


export const cameraCleanup=()=>{
  navigator.camera.cleanup(onSuccess1, onFail1);
}



function onSuccess1() {
    console.log("cleanup")
}

function onFail1(message) {
    alert(' cleanup Failed because: ' + message);
}