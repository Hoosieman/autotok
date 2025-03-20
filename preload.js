const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electron", {
  // Device connection check
  checkDeviceConnection: (testNumber, type) => {
    ipcRenderer.send("check-device-connection", { testNumber, type })
  },
  onDeviceConnectionUpdate: (callback) => {
    ipcRenderer.on("device-connection-update", callback)
  },

  // Test execution
  runTest: (testNumber, type) => {
    ipcRenderer.send("run-test", { testNumber, type })
  },
  stopTest: (testNumber, type) => {
    ipcRenderer.send("stop-test", { testNumber, type })
  },
  onTestStart: (callback) => {
    ipcRenderer.on("test-start", callback)
  },
  onTestOutput: (callback) => {
    ipcRenderer.on("test-output", callback)
  },
  onTestEnd: (callback) => {
    ipcRenderer.on("test-end", callback)
  },
  onTestError: (callback) => {
    ipcRenderer.on("test-error", callback)
  },
  onTestStopped: (callback) => {
    ipcRenderer.on("test-stopped", callback)
  },

  // Appium control
  startAppium: (testNumber, type) => {
    ipcRenderer.send("start-appium", { testNumber, type })
  },
  stopAppium: (testNumber, type) => {
    ipcRenderer.send("stop-appium", { testNumber, type })
  },
  onAppiumStart: (callback) => {
    ipcRenderer.on("appium-start", callback)
  },
  onAppiumOutput: (callback) => {
    ipcRenderer.on("appium-output", callback)
  },
  onAppiumStop: (callback) => {
    ipcRenderer.on("appium-stop", callback)
  },
  onAppiumError: (callback) => {
    ipcRenderer.on("appium-error", callback)
  },

  // Android screenshot functionality
  requestAndroidScreenshot: (testNumber) => {
    ipcRenderer.send("request-android-screenshot", { testNumber })
  },
  onAndroidScreenshot: (callback) => {
    ipcRenderer.on("android-screenshot", callback)
  },
  onAndroidScreenshotError: (callback) => {
    ipcRenderer.on("android-screenshot-error", callback)
  },
})

