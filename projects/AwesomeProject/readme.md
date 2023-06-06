

## To run on personal android device

1. Connect the andriod to usb cable

2. Then on Windows 11
    ```
    usbipd wsl list
    usbipd wsl attach -b 1-2
    ```

3. Then on WSL
    ```
    lsusb
    adb devices
    npx expo start --tunnel
    ```


## To run on wsl emulator
    ```
    npx expo start --android
    ```


## To run web version
    ```
    npx expo start --web
    ```


