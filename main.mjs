import { app, BrowserWindow, ipcMain } from "electron"
import path from "path"
import { spawn } from "child_process"
import http from "http"
import { networkInterfaces } from "os"
import { exec } from "child_process"
import fs from "fs"

// Workaround for __dirname in ES Modules
const __dirname = path.dirname(new URL(import.meta.url).pathname)

// Store running test processes
const runningProcesses = {
  test: {
    1: null,
    2: null,
    3: null,
  },
  doom: {
    1: null,
    2: null,
    3: null,
  },
  ios: {
    1: null,
    2: null,
    3: null,
  },
  ott: {
    1: null,
    2: null,
    3: null,
  },
  web: {
    1: null,
    2: null,
    3: null,
  }
}

// Store running Appium processes
const runningAppiumProcesses = {
  test: {
    1: null,
    2: null,
    3: null,
  },
  doom: {
    1: null,
    2: null,
    3: null,
  },
  ios: {
    1: null,
    2: null,
    3: null,
  },
  ott: {
    1: null,
    2: null,
    3: null,
  },
  web: {
    1: null,
    2: null,
    3: null,
  }
}

// Store Appium ports
const appiumPorts = {
  test: {
    1: 4723, // Default port
    2: 4724,
    3: 4725,
  },
  doom: {
    1: 4726,
    2: 4727,
    3: 4728,
  },
  ios: {
    1: 4729,
    2: 4730,
    3: 4731,
  },
  ott: {
    1: 4732,
    2: 4733,
    3: 4734,
  },
  web: {
    1: 4735,
    2: 4736,
    3: 4737,
  }
}

// Map test numbers to specific device UDIDs for Android
// These are preferred devices, but we'll fall back to any available device if needed
const androidDeviceMap = {
  1: "R58N932FBKY", // Specific UDID for Android test 1
  2: "R5CXC0LYQ5F", // Specific UDID for Android test 2
  3: "R5CXC0LY81P", // Specific UDID for Android test 3
}

// Map test numbers to specific Roku device IPs
const rokuDeviceMap = {
  1: "192.168.1.100", // Example IP for Roku device 1 - replace with your actual Roku IPs
  2: "192.168.1.101", // Example IP for Roku device 2
  3: "192.168.1.102", // Example IP for Roku device 3
}

// Map test numbers to specific iOS device UDIDs
const iosDeviceMap = {
  1: "00008030-000D58A40E40802E", // Example UDID for iOS device 1 - replace with your actual iOS UDIDs
  2: "00008030-000D58A40E40803F", // Example UDID for iOS device 2
  3: "00008030-000D58A40E40804A", // Example UDID for iOS device 3
}

// Map test numbers to specific OTT device IPs
const ottDeviceMap = {
  1: "192.168.1.110", // Example IP for OTT device 1 - replace with your actual OTT device IPs
  2: "192.168.1.111", // Example IP for OTT device 2
  3: "192.168.1.112", // Example IP for OTT device 3
}

// Map test numbers to specific web browsers
const webBrowserMap = {
  1: "chrome", // Browser for web test 1
  2: "firefox", // Browser for web test 2
  3: "safari", // Browser for web test 3
}

// Store connected Android device IDs
const connectedAndroidDevices = {
  1: null,
  2: null,
  3: null
}

// Directory for storing screenshots
const screenshotDir = path.join(app.getPath("temp"), "byutv-test-screenshots")

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 900,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  })

  win.loadFile("index.html")

  // Uncomment to open DevTools automatically
  // win.webContents.openDevTools();

  return win
}

app.whenReady().then(() => {
  // Create screenshot directory if it doesn't exist
  if (!fs.existsSync(screenshotDir)) {
    fs.mkdirSync(screenshotDir, { recursive: true })
  }

  const mainWindow = createWindow()

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  // Handle device connection check
  ipcMain.on("check-device-connection", (event, data) => {
    const { testNumber, type } = data
    const sender = event.sender
    
    switch (type) {
      case 'doom':
        // For Android devices, use ADB
        checkAndroidDeviceConnection(testNumber, sender)
        break
      case 'test':
        // For Roku devices, use network check
        checkRokuDeviceConnection(testNumber, sender)
        break
      case 'ios':
        // For iOS devices, use xcrun
        checkIosDeviceConnection(testNumber, sender)
        break
      case 'ott':
        // For OTT devices, use network check similar to Roku
        checkOttDeviceConnection(testNumber, sender)
        break
      case 'web':
        // For Web browsers, check if they're installed
        checkWebBrowserConnection(testNumber, sender)
        break
      default:
        console.error(`Unknown device type: ${type}`)
    }
  })

  // Function to check Android device connection using ADB
  function checkAndroidDeviceConnection(testNumber, sender) {
    // Use adb devices to check for connected devices
    const adbProcess = spawn("adb", ["devices"], {
      shell: true,
    })
    
    let output = ""
    
    adbProcess.stdout.on("data", (data) => {
      output += data.toString()
    })
    
    adbProcess.stderr.on("data", (data) => {
      console.error(`ADB Error: ${data}`)
    })
    
    adbProcess.on("close", (code) => {
      if (code === 0) {
        // Parse the output to find connected devices
        const lines = output.split("\n").filter(line => line.trim() !== "" && !line.includes("List of devices attached"))
        const devices = lines.map(line => {
          const parts = line.trim().split("\t")
          return {
            id: parts[0],
            status: parts[1]
          }
        }).filter(device => device.status === "device") // Only include fully connected devices
        
        if (devices.length > 0) {
          // First, check if the preferred device for this test is connected
          const expectedDeviceId = androidDeviceMap[testNumber]
          const preferredDevice = devices.find(device => device.id === expectedDeviceId)
          
          if (preferredDevice) {
            // Preferred device is connected
            connectedAndroidDevices[testNumber] = preferredDevice.id
            sender.send("device-connection-update", {
              testNumber,
              connected: true,
              deviceId: preferredDevice.id,
              type: 'doom'
            })
          } else {
            // Preferred device not found, but we have at least one device
            // Use the first available device
            connectedAndroidDevices[testNumber] = devices[0].id
            sender.send("device-connection-update", {
              testNumber,
              connected: true,
              deviceId: devices[0].id,
              type: 'doom'
            })
          }
        } else {
          // No devices connected
          connectedAndroidDevices[testNumber] = null
          sender.send("device-connection-update", {
            testNumber,
            connected: false,
            deviceId: null,
            type: 'doom'
          })
        }
      } else {
        // ADB command failed
        connectedAndroidDevices[testNumber] = null
        sender.send("device-connection-update", {
          testNumber,
          connected: false,
          deviceId: null,
          type: 'doom'
        })
      }
    })
  }

  // Function to check Roku device connection using HTTP request
  function checkRokuDeviceConnection(testNumber, sender) {
    const rokuIp = rokuDeviceMap[testNumber]
    
    if (!rokuIp) {
      sender.send("device-connection-update", {
        testNumber,
        connected: false,
        deviceId: null,
        type: 'test'
      })
      return
    }
    
    // Try to connect to the Roku device's ECP (External Control Protocol) endpoint
    const req = http.get(`http://${rokuIp}:8060/query/device-info`, (res) => {
      if (res.statusCode === 200) {
        // Device is connected and responding
        sender.send("device-connection-update", {
          testNumber,
          connected: true,
          deviceId: rokuIp,
          type: 'test'
        })
      } else {
        // Device responded but with an error
        sender.send("device-connection-update", {
          testNumber,
          connected: false,
          deviceId: null,
          type: 'test'
        })
      }
    })
    
    req.on('error', (error) => {
      console.error(`Error connecting to Roku device at ${rokuIp}: ${error.message}`)
      sender.send("device-connection-update", {
        testNumber,
        connected: false,
        deviceId: null,
        type: 'test'
      })
    })
    
    // Set a timeout for the request
    req.setTimeout(3000, () => {
      req.abort()
      console.error(`Connection to Roku device at ${rokuIp} timed out`)
      sender.send("device-connection-update", {
        testNumber,
        connected: false,
        deviceId: null,
        type: 'test'
      })
    })
  }

  // Function to check iOS device connection using xcrun
  function checkIosDeviceConnection(testNumber, sender) {
    // Use xcrun to list connected iOS devices
    exec("xcrun xctrace list devices", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error checking iOS devices: ${error.message}`)
        sender.send("device-connection-update", {
          testNumber,
          connected: false,
          deviceId: null,
          type: 'ios'
        })
        return
      }
      
      // Parse the output to find connected devices
      const lines = stdout.split("\n").filter(line => 
        line.includes("iPhone") || 
        line.includes("iPad") || 
        line.includes("iPod")
      )
      
      const devices = lines.map(line => {
        // Extract device ID (UDID) from the line
        const match = line.match(/$$([a-zA-Z0-9-]+)$$/)
        return match ? match[1] : null
      }).filter(id => id !== null)
      
      if (devices.length > 0) {
        // First, check if the preferred device for this test is connected
        const expectedDeviceId = iosDeviceMap[testNumber]
        const preferredDeviceIndex = devices.indexOf(expectedDeviceId)
        
        if (preferredDeviceIndex >= 0) {
          // Preferred device is connected
          sender.send("device-connection-update", {
            testNumber,
            connected: true,
            deviceId: expectedDeviceId,
            type: 'ios'
          })
        } else {
          // Preferred device not found, but we have at least one device
          // Use the first available device
          sender.send("device-connection-update", {
            testNumber,
            connected: true,
            deviceId: devices[0],
            type: 'ios'
          })
        }
      } else {
        // No devices connected
        sender.send("device-connection-update", {
          testNumber,
          connected: false,
          deviceId: null,
          type: 'ios'
        })
      }
    })
  }

  // Function to check OTT device connection using HTTP request (similar to Roku)
  function checkOttDeviceConnection(testNumber, sender) {
    const ottIp = ottDeviceMap[testNumber]
    
    if (!ottIp) {
      sender.send("device-connection-update", {
        testNumber,
        connected: false,
        deviceId: null,
        type: 'ott'
      })
      return
    }
    
    // Try to ping the OTT device to see if it's on the network
    const req = http.get(`http://${ottIp}:8080`, (res) => {
      // Any response means the device is reachable
      sender.send("device-connection-update", {
        testNumber,
        connected: true,
        deviceId: ottIp,
        type: 'ott'
      })
    })
    
    req.on('error', (error) => {
      console.error(`Error connecting to OTT device at ${ottIp}: ${error.message}`)
      sender.send("device-connection-update", {
        testNumber,
        connected: false,
        deviceId: null,
        type: 'ott'
      })
    })
    
    // Set a timeout for the request
    req.setTimeout(3000, () => {
      req.abort()
      console.error(`Connection to OTT device at ${ottIp} timed out`)
      sender.send("device-connection-update", {
        testNumber,
        connected: false,
        deviceId: null,
        type: 'ott'
      })
    })
  }

  // Function to check Web browser availability
  function checkWebBrowserConnection(testNumber, sender) {
    const browser = webBrowserMap[testNumber]
    
    // For web browsers, we'll just check if they're installed
    // This is a simplified check - in a real app, you might want to check if the browser can be launched
    let checkCommand
    
    if (process.platform === 'win32') {
      // Windows
      switch (browser) {
        case 'chrome':
          checkCommand = 'where chrome'
          break
        case 'firefox':
          checkCommand = 'where firefox'
          break
        case 'safari':
          checkCommand = 'where safari'
          break
        default:
          checkCommand = 'where chrome'
      }
    } else {
      // macOS/Linux
      switch (browser) {
        case 'chrome':
          checkCommand = 'which google-chrome || which chrome'
          break
        case 'firefox':
          checkCommand = 'which firefox'
          break
        case 'safari':
          checkCommand = 'which safari'
          break
        default:
          checkCommand = 'which google-chrome || which chrome'
      }
    }
    
    exec(checkCommand, (error, stdout, stderr) => {
      if (error) {
        // Browser not found
        sender.send("device-connection-update", {
          testNumber,
          connected: false,
          deviceId: null,
          type: 'web'
        })
      } else {
        // Browser found
        sender.send("device-connection-update", {
          testNumber,
          connected: true,
          deviceId: browser,
          type: 'web'
        })
      }
    })
  }

  // Function to capture Android screenshot
  function captureAndroidScreenshot(deviceId, testNumber) {
    if (!deviceId) {
        console.log(`No device ID available for Android test ${testNumber}, skipping screenshot`);
        return Promise.resolve(null);
    }
    
    const timestamp = Date.now();
    const screenshotPath = path.join(screenshotDir, `android_${testNumber}_${timestamp}.png`);
    
    return new Promise((resolve, reject) => {
        // Use ADB to capture screenshot
        const adbProcess = spawn("adb", ["-s", deviceId, "exec-out", "screencap -p"], {
            shell: true
        });
        
        const chunks = [];
        
        adbProcess.stdout.on("data", (data) => {
            chunks.push(data);
        });
        
        adbProcess.stderr.on("data", (data) => {
            console.error(`ADB Screenshot Error: ${data}`);
        });
        
        adbProcess.on("close", (code) => {
            if (code === 0 && chunks.length > 0) {
                const buffer = Buffer.concat(chunks);
                fs.writeFile(screenshotPath, buffer, (err) => {
                    if (err) {
                        console.error(`Error saving screenshot: ${err.message}`);
                        reject(err);
                    } else {
                        resolve({
                            path: screenshotPath,
                            timestamp: timestamp,
                            testNumber: testNumber
                        });
                    }
                });
            } else {
                console.error(`Failed to capture screenshot, exit code: ${code}`);
                reject(new Error(`Failed to capture screenshot, exit code: ${code}`));
            }
        });
    });
}

  // Handle screenshot request
  ipcMain.on("request-android-screenshot", (event, data) => {
    const { testNumber } = data;
    const deviceId = connectedAndroidDevices[testNumber];
    const sender = event.sender;
    
    if (!deviceId) {
        console.log(`No device ID available for Android test ${testNumber}, cannot take screenshot`);
        // Optionally send a message back to the renderer
        sender.send("android-screenshot-error", {
            testNumber: testNumber,
            error: "No device connected"
        });
        return;
    }
    
    captureAndroidScreenshot(deviceId, testNumber)
        .then(screenshotInfo => {
            if (screenshotInfo) {
                // Read the file and convert to base64
                fs.readFile(screenshotInfo.path, (err, data) => {
                    if (err) {
                        console.error(`Error reading screenshot file: ${err.message}`);
                        return;
                    }
                    
                    const base64Image = `data:image/png;base64,${data.toString('base64')}`;
                    
                    sender.send("android-screenshot", {
                        testNumber: testNumber,
                        image: base64Image,
                        timestamp: screenshotInfo.timestamp
                    });
                });
            }
        })
        .catch(error => {
            console.error(`Error capturing screenshot: ${error.message}`);
            sender.send("android-screenshot-error", {
                testNumber: testNumber,
                error: error.message
            });
        });
});

  // Handle test execution
  ipcMain.on("run-test", (event, data) => {
    const { testNumber, type } = data
    const sender = event.sender

    // Get the appropriate test command based on test number and type
    const testCommand = getTestCommand(testNumber, type)

    // Notify that test is starting
    sender.send("test-start", { testNumber, type })

    // Use spawn instead of exec to get real-time output
    const testProcess = spawn("npm", ["run", testCommand], {
      shell: true,
    })

    // Store the process reference
    runningProcesses[type][testNumber] = testProcess

    // For Android tests, set up screenshot capture interval
    let screenshotInterval = null;
    if (type === 'doom') {
      // Capture screenshots every 2 seconds
      screenshotInterval = setInterval(() => {
        const deviceId = connectedAndroidDevices[testNumber];
        if (deviceId) {  // Only try to capture if we have a device ID
          captureAndroidScreenshot(deviceId, testNumber)
            .then(screenshotInfo => {
              if (screenshotInfo) {  // Check if we got valid screenshot info
                // Read the file and convert to base64
                fs.readFile(screenshotInfo.path, (err, data) => {
                  if (err) {
                    console.error(`Error reading screenshot file: ${err.message}`);
                    return;
                  }
                  
                  const base64Image = `data:image/png;base64,${data.toString('base64')}`;
                  
                  sender.send("android-screenshot", {
                    testNumber: testNumber,
                    image: base64Image,
                    timestamp: screenshotInfo.timestamp
                  });
                });
              }
            })
            .catch(error => {
              console.error(`Error capturing screenshot: ${error.message}`);
            });
        }
      }, 2000);
    }

    // Stream stdout to renderer
    testProcess.stdout.on("data", (data) => {
      sender.send("test-output", {
        testNumber,
        output: data.toString(),
        type
      })
    })

    // Stream stderr to renderer
    testProcess.stderr.on("data", (data) => {
      sender.send("test-output", {
        testNumber,
        output: data.toString(),
        type
      })
    })

    // Handle process completion
    testProcess.on("close", (code) => {
      // Clear the process reference
      runningProcesses[type][testNumber] = null

      // Clear screenshot interval if it exists
      if (screenshotInterval) {
        clearInterval(screenshotInterval);
      }

      sender.send("test-end", {
        testNumber,
        exitCode: code,
        type
      })
    })

    // Handle process errors
    testProcess.on("error", (error) => {
      // Clear the process reference
      runningProcesses[type][testNumber] = null

      // Clear screenshot interval if it exists
      if (screenshotInterval) {
        clearInterval(screenshotInterval);
      }

      sender.send("test-error", {
        testNumber,
        error: error.message,
        type
      })
    })
  })

  // Handle test stopping
  ipcMain.on("stop-test", (event, data) => {
    const { testNumber, type } = data
    const sender = event.sender
    const process = runningProcesses[type][testNumber]

    if (process) {
      // On Windows, we need to send SIGINT to properly terminate the process
      // This is equivalent to pressing Ctrl+C in the terminal
      if (process.pid) {
        try {
          // For Windows
          if (process.platform === "win32") {
            // Use taskkill to send Ctrl+C signal
            spawn("taskkill", ["/pid", process.pid, "/T", "/F"])
          } else {
            // For macOS and Linux, send SIGINT signal
            process.kill("SIGINT")
          }

          // Notify that the test was stopped
          sender.send("test-stopped", { testNumber, type })

          // Clear the process reference
          runningProcesses[type][testNumber] = null
        } catch (error) {
          console.error(`Error stopping ${type} ${testNumber}:`, error)

          // Try force kill as a fallback
          try {
            process.kill("SIGKILL")
            sender.send("test-stopped", { testNumber, type })
            runningProcesses[type][testNumber] = null
          } catch (killError) {
            console.error(`Error force killing ${type} ${testNumber}:`, killError)
          }
        }
      }
    }
  })

  // Handle Appium start
  ipcMain.on("start-appium", (event, data) => {
    const { testNumber, type } = data
    const sender = event.sender
    const port = appiumPorts[type][testNumber]

    // Build the Appium command based on the test number
    const appiumArgs = ["appium"]

    // Add port argument
    appiumArgs.push("-p", port.toString())

    // Notify that Appium is starting
    sender.send("appium-output", {
      testNumber,
      output: `Starting Appium server on port ${port}...`,
      type
    })

    // Start the Appium server
    const appiumProcess = spawn("npx", appiumArgs, {
      shell: true,
    })

    // Store the process reference
    runningAppiumProcesses[type][testNumber] = appiumProcess

    // Stream stdout to renderer
    appiumProcess.stdout.on("data", (data) => {
      sender.send("appium-output", {
        testNumber,
        output: data.toString(),
        type
      })

      // Check if Appium has started successfully
      const output = data.toString()
      if (output.includes("Appium REST http interface listener started")) {
        sender.send("appium-start", {
          testNumber,
          port,
          type
        })
      }
    })

    // Stream stderr to renderer
    appiumProcess.stderr.on("data", (data) => {
      sender.send("appium-output", {
        testNumber,
        output: data.toString(),
        type
      })
    })

    // Handle process completion
    appiumProcess.on("close", (code) => {
      // Clear the process reference
      runningAppiumProcesses[type][testNumber] = null

      // Only send stop event if it wasn't already sent by the stop-appium handler
      if (code !== null) {
        sender.send("appium-stop", { testNumber, type })
      }
    })

    // Handle process errors
    appiumProcess.on("error", (error) => {
      // Clear the process reference
      runningAppiumProcesses[type][testNumber] = null

      sender.send("appium-error", {
        testNumber,
        error: error.message,
        type
      })
    })
  })

  // Handle Appium stop
  ipcMain.on("stop-appium", (event, data) => {
    const { testNumber, type } = data
    const sender = event.sender
    const process = runningAppiumProcesses[type][testNumber]

    if (process) {
      if (process.pid) {
        try {
          // For Windows
          if (process.platform === "win32") {
            // Use taskkill to send Ctrl+C signal
            spawn("taskkill", ["/pid", process.pid, "/T", "/F"])
          } else {
            // For macOS and Linux, send SIGINT signal
            process.kill("SIGINT")
          }

          // Notify that Appium was stopped
          sender.send("appium-stop", { testNumber, type })

          // Clear the process reference
          runningAppiumProcesses[type][testNumber] = null
        } catch (error) {
          console.error(`Error stopping Appium for ${type} ${testNumber}:`, error)

          // Try force kill as a fallback
          try {
            process.kill("SIGKILL")
            sender.send("appium-stop", { testNumber, type })
            runningAppiumProcesses[type][testNumber] = null
          } catch (killError) {
            console.error(`Error force killing Appium for ${type} ${testNumber}:`, killError)
          }
        }
      }
    }
  })
})

// Helper function to get the appropriate test command
function getTestCommand(testNumber, type) {
  switch (type) {
    case 'test':
      switch (testNumber) {
        case 1:
          return "roku-home-page"
        case 2:
          return "roku-shows-page"
        case 3:
          return "roku-player"
        default:
          return "roku-home-page"
      }
    case 'doom':
      switch (testNumber) {
        case 1:
          return "android-home-page"
        case 2:
          return "android-shows-page"
        case 3:
          return "android-player"
        default:
          return "android-home-page"
      }
    case 'ios':
      switch (testNumber) {
        case 1:
          return "ios-home-page"
        case 2:
          return "ios-shows-page"
        case 3:
          return "ios-player"
        default:
          return "ios-home-page"
      }
    case 'ott':
      switch (testNumber) {
        case 1:
          return "ott-home-page"
        case 2:
          return "ott-shows-page"
        case 3:
          return "ott-player"
        default:
          return "ott-home-page"
      }
    case 'web':
      switch (testNumber) {
        case 1:
          return "web-home-page"
        case 2:
          return "web-shows-page"
        case 3:
          return "web-player"
        default:
          return "web-home-page"
      }
    default:
      return "unknown-test"
  }
}

app.on("window-all-closed", () => {
  // Kill any running test processes before quitting
  Object.keys(runningProcesses).forEach((type) => {
    Object.keys(runningProcesses[type]).forEach((testNumber) => {
      const process = runningProcesses[type][testNumber]
      if (process) {
        try {
          process.kill("SIGKILL")
        } catch (error) {
          console.error(`Error killing ${type} process ${testNumber} during app close:`, error)
        }
      }
    })
  })

  // Kill any running Appium processes before quitting
  Object.keys(runningAppiumProcesses).forEach((type) => {
    Object.keys(runningAppiumProcesses[type]).forEach((testNumber) => {
      const process = runningAppiumProcesses[type][testNumber]
      if (process) {
        try {
          process.kill("SIGKILL")
        } catch (error) {
          console.error(`Error killing Appium process for ${type} ${testNumber} during app close:`, error)
        }
      }
    })
  })

  // Clean up screenshot directory
  try {
    if (fs.existsSync(screenshotDir)) {
      const files = fs.readdirSync(screenshotDir);
      for (const file of files) {
        fs.unlinkSync(path.join(screenshotDir, file));
      }
    }
  } catch (error) {
    console.error(`Error cleaning up screenshot directory: ${error.message}`);
  }

  if (process.platform !== "darwin") {
    app.quit()
  }
})

