cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-sqlite-storage/www/SQLitePlugin.js",
        "id": "cordova-sqlite-storage.SQLitePlugin",
        "clobbers": [
            "SQLitePlugin"
        ]
    },
    {
        "file": "plugins/cordova-plugin-geolocation/www/android/geolocation.js",
        "id": "cordova-plugin-geolocation.geolocation",
        "clobbers": [
            "navigator.geolocation"
        ]
    },
    {
        "file": "plugins/cordova-plugin-geolocation/www/PositionError.js",
        "id": "cordova-plugin-geolocation.PositionError",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraConstants.js",
        "id": "cordova-plugin-camera.Camera",
        "clobbers": [
            "Camera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverOptions.js",
        "id": "cordova-plugin-camera.CameraPopoverOptions",
        "clobbers": [
            "CameraPopoverOptions"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/Camera.js",
        "id": "cordova-plugin-camera.camera",
        "clobbers": [
            "navigator.camera"
        ]
    },
    {
        "file": "plugins/cordova-plugin-camera/www/CameraPopoverHandle.js",
        "id": "cordova-plugin-camera.CameraPopoverHandle",
        "clobbers": [
            "CameraPopoverHandle"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-sqlite-storage": "0.8.4-dev",
    "cordova-plugin-geolocation": "2.1.0",
    "cordova-plugin-camera": "2.1.1"
}
// BOTTOM OF METADATA
});