# Farm mobile

## Installation

```shell
npm install
```

## start server

```shell
ionic serve
```

## create project with ionic angular

```shell
ionic start "project_name" blank --type=angular
```

## Thêm ứng dụng android

```shell
ionic cap add android
```

## Build production version in /www

```shell
ionic build --prod
```

## Sync the native project from the build folder (/www)

```shell
npx cap sync
```

## custom icon

```shell
cordova-res
```

```shell
cordova-res android --skip-config --copy
```

## Create the native project in Android Studio

```shell
npx cap open android
```

## Tạo file apk trong android studio

Build -> Build bundle (APK) -> Build APK

### `File apk ở tại => farm-app\android\app\build\outputs\apk\debug\app-debug.apk`

## generate

```shell
ionic generate
ionic generate page
ionic generate page contact
ionic generate component contact/form
ionic generate component login-form --change-detection=OnPush
ionic generate directive ripple --skip-import
ionic generate service api/user
```
