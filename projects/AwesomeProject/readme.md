Connect andriod to usb

## Then on Windows 11
usbipd wsl attach -b 5-2

## Then on WSL
lsusb
npx expo start --tunnel


---
##  History 
exit
 5180  npx expo start --tunnel
 5181  lsusb
 5182  npx expo start
 5183  adb connect 127.0.0.1:58526
 5184  adb connect 127.0.0.1
 5185  adb devices
 5186  adb connect 127.0.0.1:58526
 5187  adb connect 172.27.208.1:58526
 5188  adb devices
 5189  godev
 5190  cd projects
 5191  lsd
 5192  ls
 5193  cd AwesomeProject
 5194  npx expo start -a
 5195  sdkmanager "platform-tools"
 5196  adb version
 5197  exit
 5198  godev
 5199  cd projects/AwesomeProject
 5200  react-native start
 5201  npx expo start
 5202  cd gh-kirbymark/kirbyware.io/projects/AwesomeProject
 5203  npx expo start -a
 5204* history
 5205* echo $WSL_HOST_IP
 5206* tail -1 /etc/resolv.conf | cut -d' ' -f2
 5207* export WSL_HOST=$(tail -1 /etc/resolv.conf | cut -d' ' -f2)
 5208* export ADB_SERVER_SOCKET=tcp:$WSL_HOST:5037
 5209* adb devices
 5210* npx expo start -a
 5211* adb connect
 5212* echo $ADB_SERVER_SOCKET
 5213* adb connect 172.27.208.1:5037
 5214  npx expo start -a