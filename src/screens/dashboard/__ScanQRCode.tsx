// // // import React from 'react';
// // // import {Animated, Platform, StyleSheet} from 'react-native';
// // // import P from '../../components/Text/P';
// // // import {Camera, useCameraDevices} from 'react-native-vision-camera';

// import React, {useRef} from 'react';
// import {Button, StyleSheet} from 'react-native';
// import {
//   useCameraDevices,
//   Camera,
//   useFrameProcessor,
// } from 'react-native-vision-camera';
// import P from '../../components/Text/P';
// import {View} from 'react-native';
// import styles from '../../lib/styles';
// import QrScanner from 'qr-scanner';

// // // const PERMISSION_AUTHORIZED = 'authorized';
// // // const CAMERA_PERMISSION = 'camera';

// // // export default function ScanQRCode() {
// // //   const [state, setState] = React.useState({
// // //     scanning: false,
// // //     fadeInOpacity: new Animated.Value(0),
// // //     isAuthorized: false,
// // //     isAuthorizationChecked: false,
// // //     disableVibrationByUser: false,
// // //   });

// // //   const devices = useCameraDevices('wide-angle-camera');
// // //   const device = devices.back;

// // //   React.useEffect(() => {
// // //     if (Platform.OS === 'ios') {
// // //       Permissions.request(CAMERA_PERMISSION).then(response => {
// // //         this.setState({
// // //           isAuthorized: response === PERMISSION_AUTHORIZED,
// // //           isAuthorizationChecked: true,
// // //         });
// // //       });
// // //     } else if (
// // //       Platform.OS === 'android' &&
// // //       this.props.checkAndroid6Permissions
// // //     ) {
// // //       PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
// // //         title: this.props.permissionDialogTitle,
// // //         message: this.props.permissionDialogMessage,
// // //       }).then(granted => {
// // //         const isAuthorized =
// // //           Platform.Version >= 23
// // //             ? granted === PermissionsAndroid.RESULTS.GRANTED
// // //             : granted === true;

// // //         this.setState({ isAuthorized, isAuthorizationChecked: true });
// // //       });
// // //     } else {
// // //       this.setState({ isAuthorized: true, isAuthorizationChecked: true });
// // //     }
// // //   }, []);
// // //   if (device == null) {
// // //     return <P>Loading</P>;
// // //   }
// // //   return (
// // //     <Camera style={StyleSheet.absoluteFill} device={device} isActive={true} />
// // //   );
// // // }

// // import * as React from 'react';

// // // import {StyleSheet} from 'react-native';
// // // import {useCameraDevices, useFrameProcessor} from 'react-native-vision-camera';
// // // import {Camera} from 'react-native-vision-camera';
// // // import {Worklets} from 'react-native-worklets-core';

// // // const checkCameraPermission = async () => {
// // //   let status = await Camera.getCameraPermissionStatus();
// // //   if (status !== 'authorized') {
// // //     await Camera.requestCameraPermission();
// // //     status = await Camera.getCameraPermissionStatus();
// // //     if (status === 'denied') {
// // //       showToast(
// // //         'You will not be able to scan if you do not allow camera access',
// // //       );
// // //     }
// // //   }
// // // };

// // export default function ScanQRCode() {
// //   const [hasPermission, setHasPermission] = React.useState(false);
// //   const devices = useCameraDevices();
// //   const device = devices.back;

// //   // const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
// //   //   checkInverted: true,
// //   // });

// //   const onQRCodeDetected = Worklets.createRunInJsFn((qrCode: string) => {
// //     // navigation.push("ProductPage", { productId: qrCode })
// //     console.log(qrCode);
// //   });

// //   // Alternatively you can use the underlying function:
// //   //
// //   // const frameProcessor = useFrameProcessor((frame) => {
// //   //   'worklet';
// //   //   const detectedBarcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE], { checkInverted: true });
// //   //   runOnJS(setBarcodes)(detectedBarcodes);
// //   // }, []);

// //   React.useEffect(() => {
// //     (async () => {
// //       const status = await Camera.requestCameraPermission();
// //       setHasPermission(status === 'authorized');
// //     })();
// //   }, []);

// //   return (
// //     device != null &&
// //     hasPermission && (
// //       <>
// //         <Camera
// //           style={StyleSheet.absoluteFill}
// //           device={device}
// //           isActive={true}
// //           frameProcessor={frameProcessor}
// //           frameProcessorFps={5}
// //         />
// //         {/* {barcodes.map((barcode, idx) => (
// //           <Text key={idx} style={styles.barcodeTextURL}>
// //             {barcode.displayValue}
// //           </Text>
// //         ))} */}
// //       </>
// //     )
// //   );
// // }

// // // const styles = StyleSheet.create({
// // //   barcodeTextURL: {
// // //     fontSize: 20,
// // //     color: 'white',
// // //     fontWeight: 'bold',
// // //   },
// // // });

// const style = StyleSheet.create({
//   ...styles,
//   overlay: {
//     overlayColor: 'black',
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//   },
// });

// export default function ScanQRCode() {
//   const [hasPermission, setHasPermission] = React.useState(false);
//   const devices = useCameraDevices('wide-angle-camera');
//   const device = devices.back;
//   const camera = useRef<Camera>(null);

//   const model = useTensorflowModel(require('object_detection.tflite'));

//   const frameProcessor = useFrameProcessor(
//     frame => {
//       'worklet';
//       if (model.state !== 'loaded') {
//         return;
//       }

//       const data = frame.toArrayBuffer();
//       // do RGB conversion if the Frame is not already in RGB Format
//       const outputs = model.model.runSync([data]);

//       const detection_boxes = outputs[0];
//       const detection_classes = outputs[1];
//       const detection_scores = outputs[2];
//       const num_detections = outputs[3];
//       console.log(`Detected ${num_detections[0]} objects!`);

//       for (let i = 0; i < detection_boxes.length; i += 4) {
//         const confidence = detection_scores[i / 4];
//         if (confidence > 0.7) {
//           // Draw a red box around the object!
//           const left = detection_boxes[i];
//           const top = detection_boxes[i + 1];
//           const right = detection_boxes[i + 2];
//           const bottom = detection_boxes[i + 3];
//           const rect = SkRect.Make(left, top, right, bottom);
//           frame.drawRect(rect, SkColors.Red);
//         }
//       }
//     },
//     [model],
//   );

//   // const takePhoto = async () => {
//   //   const photo = await camera.current?.takePhoto();

//   //   if (!photo) return;
//   //   console.log(photo.path);
//   // };

//   // const scan = async () => {
//   //   const qr = await QrScanner.scanImage(image);
//   //   console.log(qr);
//   // }

//   // const frameProcessor = useFrameProcessor(frame => {
//   //   'worklet';
//   //   // const qrCodes = scanQRCodes(frame);
//   //   console.log(frame);
//   //   // if (qrCodes.length > 0) {
//   //   //   onQRCodeDetected(qrCodes[0]);
//   //   // }
//   // }, []);

//   React.useEffect(() => {
//     (async () => {
//       const status = await Camera.requestCameraPermission();
//       setHasPermission(status === 'authorized');
//     })();
//   }, []);

//   if (device == null && !hasPermission) {
//     return <P> Loading... </P>;
//   }
//   return (
//     <View style={styles.wrapper}>
//       <View style={style.overlay} />
//       <Camera
//         ref={camera}
//         style={StyleSheet.absoluteFill}
//         frameProcessor={frameProcessor}
//         // frameProcessor={frameProcessor}
//         photo={true}
//         device={device!}
//         isActive={true}
//       />
//       <Button title="Capture" />
//     </View>
//   );
// }
