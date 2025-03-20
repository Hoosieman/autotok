// Tab functionality
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

// Set default active tab
document.querySelector('.tab[data-tab="home"]').classList.add('active');
document.getElementById('home').classList.add('active');

// Add click event listeners to tabs
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab and corresponding content
        tab.classList.add('active');
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
        
        // Check device connections based on the active tab
        switch (tabId) {
            case 'roku':
                checkAllDeviceConnections('test');
                break;
            case 'android':
                checkAllDeviceConnections('doom');
                break;
            case 'ios':
                checkAllDeviceConnections('ios');
                break;
            case 'ott':
                checkAllDeviceConnections('ott');
                break;
            case 'web':
                checkAllDeviceConnections('web');
                break;
        }
    });
});

// Replace the existing button references with the new toggle buttons
// For example, replace these lines:
// const runTest1Button = document.getElementById("runTest1Button")
// const runTest2Button = document.getElementById("runTest2Button")
// const runTest3Button = document.getElementById("runTest3Button")

// const stopTest1Button = document.getElementById("stopTest1Button")
// const stopTest2Button = document.getElementById("stopTest2Button")
// const stopTest3Button = document.getElementById("stopTest3Button")

// const startAppium1Button = document.getElementById("startAppium1Button")
// const startAppium2Button = document.getElementById("startAppium2Button")
// const startAppium3Button = document.getElementById("startAppium3Button")

// const stopAppium1Button = document.getElementById("stopAppium1Button")
// const stopAppium2Button = document.getElementById("stopAppium2Button")
// const stopAppium3Button = document.getElementById("stopAppium3Button")

// With these:
const toggleTest1Button = document.getElementById("toggleTest1Button")
const toggleTest2Button = document.getElementById("toggleTest2Button")
const toggleTest3Button = document.getElementById("toggleTest3Button")

const toggleAppium1Button = document.getElementById("toggleAppium1Button")
const toggleAppium2Button = document.getElementById("toggleAppium2Button")
const toggleAppium3Button = document.getElementById("toggleAppium3Button")

// Similarly for Android buttons:
// const runDoom1Button = document.getElementById("runDoom1Button")
// const runDoom2Button = document.getElementById("runDoom2Button")
// const runDoom3Button = document.getElementById("runDoom3Button")

// const stopDoom1Button = document.getElementById("stopDoom1Button")
// const stopDoom2Button = document.getElementById("stopDoom2Button")
// const stopDoom3Button = document.getElementById("stopDoom3Button")

// const startDoomAppium1Button = document.getElementById("startDoomAppium1Button")
// const startDoomAppium2Button = document.getElementById("startDoomAppium2Button")
// const startDoomAppium3Button = document.getElementById("startDoomAppium3Button")

// const stopDoomAppium1Button = document.getElementById("stopDoomAppium1Button")
// const stopDoomAppium2Button = document.getElementById("stopDoomAppium2Button")
// const stopDoomAppium3Button = document.getElementById("stopDoomAppium3Button")

// Replace with:
const toggleDoom1Button = document.getElementById("toggleDoom1Button")
const toggleDoom2Button = document.getElementById("toggleDoom2Button")
const toggleDoom3Button = document.getElementById("toggleDoom3Button")

const toggleDoomAppium1Button = document.getElementById("toggleDoomAppium1Button")
const toggleDoomAppium2Button = document.getElementById("toggleDoomAppium2Button")
const toggleDoomAppium3Button = document.getElementById("toggleDoomAppium3Button")

// Similarly for iOS buttons:
const toggleIos1Button = document.getElementById("toggleIos1Button")
const toggleIos2Button = document.getElementById("toggleIos2Button")
const toggleIos3Button = document.getElementById("toggleIos3Button")

const toggleIosAppium1Button = document.getElementById("toggleIosAppium1Button")
const toggleIosAppium2Button = document.getElementById("toggleIosAppium2Button")
const toggleIosAppium3Button = document.getElementById("toggleIosAppium3Button")

// Similarly for OTT buttons:
const toggleOtt1Button = document.getElementById("toggleOtt1Button")
const toggleOtt2Button = document.getElementById("toggleOtt2Button")
const toggleOtt3Button = document.getElementById("toggleOtt3Button")

const toggleOttAppium1Button = document.getElementById("toggleOttAppium1Button")
const toggleOttAppium2Button = document.getElementById("toggleOttAppium2Button")
const toggleOttAppium3Button = document.getElementById("toggleOttAppium3Button")

// Similarly for Web buttons:
const toggleWeb1Button = document.getElementById("toggleWeb1Button")
const toggleWeb2Button = document.getElementById("toggleWeb2Button")
const toggleWeb3Button = document.getElementById("toggleWeb3Button")

const toggleWebAppium1Button = document.getElementById("toggleWebAppium1Button")
const toggleWebAppium2Button = document.getElementById("toggleWebAppium2Button")
const toggleWebAppium3Button = document.getElementById("toggleWebAppium3Button")

const appiumStatus1 = document.getElementById("appiumStatus1")
const appiumStatus2 = document.getElementById("appiumStatus2")
const appiumStatus3 = document.getElementById("appiumStatus3")

const logsContainer1 = document.getElementById("logsContainer1")
const logsContainer2 = document.getElementById("logsContainer2")
const logsContainer3 = document.getElementById("logsContainer3")

const status1Element = document.getElementById("status1")
const status2Element = document.getElementById("status2")
const status3Element = document.getElementById("status3")

const deviceStatus1 = document.getElementById("deviceStatus1")
const deviceStatus2 = document.getElementById("deviceStatus2")
const deviceStatus3 = document.getElementById("deviceStatus3")

const refreshDevice1 = document.getElementById("refreshDevice1")
const refreshDevice2 = document.getElementById("refreshDevice2")
const refreshDevice3 = document.getElementById("refreshDevice3")

// Get all button and container elements for Android tab
const doomAppiumStatus1 = document.getElementById("doomAppiumStatus1")
const doomAppiumStatus2 = document.getElementById("doomAppiumStatus2")
const doomAppiumStatus3 = document.getElementById("doomAppiumStatus3")

const doomLogsContainer1 = document.getElementById("doomLogsContainer1")
const doomLogsContainer2 = document.getElementById("doomLogsContainer2")
const doomLogsContainer3 = document.getElementById("doomLogsContainer3")

const doomStatus1Element = document.getElementById("doomStatus1")
const doomStatus2Element = document.getElementById("doomStatus2")
const doomStatus3Element = document.getElementById("doomStatus3")

const doomDeviceStatus1 = document.getElementById("doomDeviceStatus1")
const doomDeviceStatus2 = document.getElementById("doomDeviceStatus2")
const doomDeviceStatus3 = document.getElementById("doomDeviceStatus3")

const refreshDoomDevice1 = document.getElementById("refreshDoomDevice1")
const refreshDoomDevice2 = document.getElementById("refreshDoomDevice2")
const refreshDoomDevice3 = document.getElementById("refreshDoomDevice3")

// Android device screen elements
const doomDeviceScreen1 = document.getElementById("doomDeviceScreen1")
const doomDeviceScreen2 = document.getElementById("doomDeviceScreen2")
const doomDeviceScreen3 = document.getElementById("doomDeviceScreen3")

const doomDeviceInfo1 = document.getElementById("doomDeviceInfo1")
const doomDeviceInfo2 = document.getElementById("doomDeviceInfo2")
const doomDeviceInfo3 = document.getElementById("doomDeviceInfo3")

const doomScreenshotButton1 = document.getElementById("doomScreenshotButton1")
const doomScreenshotButton2 = document.getElementById("doomScreenshotButton2")
const doomScreenshotButton3 = document.getElementById("doomScreenshotButton3")

// Get all button and container elements for iOS tab
const iosAppiumStatus1 = document.getElementById("iosAppiumStatus1")
const iosAppiumStatus2 = document.getElementById("iosAppiumStatus2")
const iosAppiumStatus3 = document.getElementById("iosAppiumStatus3")

const iosLogsContainer1 = document.getElementById("iosLogsContainer1")
const iosLogsContainer2 = document.getElementById("iosLogsContainer2")
const iosLogsContainer3 = document.getElementById("iosLogsContainer3")

const iosStatus1Element = document.getElementById("iosStatus1")
const iosStatus2Element = document.getElementById("iosStatus2")
const iosStatus3Element = document.getElementById("iosStatus3")

const iosDeviceStatus1 = document.getElementById("iosDeviceStatus1")
const iosDeviceStatus2 = document.getElementById("iosDeviceStatus2")
const iosDeviceStatus3 = document.getElementById("iosDeviceStatus3")

const refreshIosDevice1 = document.getElementById("refreshIosDevice1")
const refreshIosDevice2 = document.getElementById("refreshIosDevice2")
const refreshIosDevice3 = document.getElementById("refreshIosDevice3")

// Get all button and container elements for OTT tab
const ottAppiumStatus1 = document.getElementById("ottAppiumStatus1")
const ottAppiumStatus2 = document.getElementById("ottAppiumStatus2")
const ottAppiumStatus3 = document.getElementById("ottAppiumStatus3")

const ottLogsContainer1 = document.getElementById("ottLogsContainer1")
const ottLogsContainer2 = document.getElementById("ottLogsContainer2")
const ottLogsContainer3 = document.getElementById("ottLogsContainer3")

const ottStatus1Element = document.getElementById("ottStatus1")
const ottStatus2Element = document.getElementById("ottStatus2Element")
const ottStatus3Element = document.getElementById("ottStatus3Element")

const ottDeviceStatus1 = document.getElementById("ottDeviceStatus1")
const ottDeviceStatus2 = document.getElementById("ottDeviceStatus2")
const ottDeviceStatus3 = document.getElementById("ottDeviceStatus3")

const refreshOttDevice1 = document.getElementById("refreshOttDevice1")
const refreshOttDevice2 = document.getElementById("refreshOttDevice2")
const refreshOttDevice3 = document.getElementById("refreshOttDevice3")

// Get all button and container elements for Web tab
const webAppiumStatus1 = document.getElementById("webAppiumStatus1")
const webAppiumStatus2 = document.getElementById("webAppiumStatus2")
const webAppiumStatus3 = document.getElementById("webAppiumStatus3")

const webLogsContainer1 = document.getElementById("webLogsContainer1")
const webLogsContainer2 = document.getElementById("webLogsContainer2")
const webLogsContainer3 = document.getElementById("webLogsContainer3")

const webStatus1Element = document.getElementById("webStatus1")
const webStatus2Element = document.getElementById("webStatus2Element")
const webStatus3Element = document.getElementById("webStatus3Element")

const webDeviceStatus1 = document.getElementById("webDeviceStatus1")
const webDeviceStatus2 = document.getElementById("webDeviceStatus2")
const webDeviceStatus3 = document.getElementById("webDeviceStatus3")

const refreshWebDevice1 = document.getElementById("refreshWebDevice1")
const refreshWebDevice2 = document.getElementById("refreshWebDevice2")
const refreshWebDevice3 = document.getElementById("refreshWebDevice3")

// Set up device refresh buttons for Roku tab
refreshDevice1.addEventListener("click", () => window.electron.checkDeviceConnection(1, 'test'))
refreshDevice2.addEventListener("click", () => window.electron.checkDeviceConnection(2, 'test'))
refreshDevice3.addEventListener("click", () => window.electron.checkDeviceConnection(3, 'test'))

// Set up device refresh buttons for Android tab
refreshDoomDevice1.addEventListener("click", () => window.electron.checkDeviceConnection(1, 'doom'))
refreshDoomDevice2.addEventListener("click", () => window.electron.checkDeviceConnection(2, 'doom'))
refreshDoomDevice3.addEventListener("click", () => window.electron.checkDeviceConnection(3, 'doom'))

// Set up screenshot buttons for Android tab
doomScreenshotButton1.addEventListener("click", () => window.electron.requestAndroidScreenshot(1))
doomScreenshotButton2.addEventListener("click", () => window.electron.requestAndroidScreenshot(2))
doomScreenshotButton3.addEventListener("click", () => window.electron.requestAndroidScreenshot(3))

// Set up device refresh buttons for iOS tab
refreshIosDevice1.addEventListener("click", () => window.electron.checkDeviceConnection(1, 'ios'))
refreshIosDevice2.addEventListener("click", () => window.electron.checkDeviceConnection(2, 'ios'))
refreshIosDevice3.addEventListener("click", () => window.electron.checkDeviceConnection(3, 'ios'))

// Set up device refresh buttons for OTT tab
refreshOttDevice1.addEventListener("click", () => window.electron.checkDeviceConnection(1, 'ott'))
refreshOttDevice2.addEventListener("click", () => window.electron.checkDeviceConnection(2, 'ott'))
refreshOttDevice3.addEventListener("click", () => window.electron.checkDeviceConnection(3, 'ott'))

// Set up device refresh buttons for Web tab
refreshWebDevice1.addEventListener("click", () => window.electron.checkDeviceConnection(1, 'web'))
refreshWebDevice2.addEventListener("click", () => window.electron.checkDeviceConnection(2, 'web'))
refreshWebDevice3.addEventListener("click", () => window.electron.checkDeviceConnection(3, 'web'))

// Function to check all device connections
function checkAllDeviceConnections(type = 'test') {
    for (let i = 1; i <= 3; i++) {
        window.electron.checkDeviceConnection(i, type)
    }
}

// Handle device connection updates
window.electron.onDeviceConnectionUpdate((event, data) => {
    const { testNumber, connected, deviceId, type } = data
    
    let deviceStatusElement
    let deviceLabel
    let deviceScreenElement
    
    switch (type) {
        case 'test':
            deviceStatusElement = document.getElementById(`deviceStatus${testNumber}`)
            deviceLabel = "Roku Device"
            break
        case 'doom':
            deviceStatusElement = document.getElementById(`doomDeviceStatus${testNumber}`)
            deviceLabel = "Android Device"
            deviceScreenElement = document.getElementById(`doomDeviceScreen${testNumber}`)
            break
        case 'ios':
            deviceStatusElement = document.getElementById(`iosDeviceStatus${testNumber}`)
            deviceLabel = "iOS Device"
            break
        case 'ott':
            deviceStatusElement = document.getElementById(`ottDeviceStatus${testNumber}`)
            deviceLabel = "OTT Device"
            break
        case 'web':
            deviceStatusElement = document.getElementById(`webDeviceStatus${testNumber}`)
            deviceLabel = "Web Browser"
            break
    }
    
    if (deviceStatusElement) {
        if (connected) {
            deviceStatusElement.className = "device-status device-connected"
            deviceStatusElement.querySelector("span").textContent = `${deviceLabel}: Connected (${deviceId})`
            
            // Update Android device screen if applicable
            if (type === 'doom' && deviceScreenElement) {
                deviceScreenElement.textContent = "Device connected. Waiting for test to start..."
            }
        } else {
            deviceStatusElement.className = "device-status device-disconnected"
            deviceStatusElement.querySelector("span").textContent = `${deviceLabel}: Not connected`
            
            // Update Android device screen if applicable
            if (type === 'doom' && deviceScreenElement) {
                deviceScreenElement.textContent = "No device connected"
            }
        }
    }
})

// Handle Android screenshots
window.electron.onAndroidScreenshot((event, data) => {
    const { testNumber, image, timestamp } = data
    const deviceScreenElement = document.getElementById(`doomDeviceScreen${testNumber}`)
    const deviceInfoElement = document.getElementById(`doomDeviceInfo${testNumber}`)
    
    if (deviceScreenElement) {
        // Clear any text content
        deviceScreenElement.textContent = ""
        
        // Check if there's already an image
        let imgElement = deviceScreenElement.querySelector("img")
        
        if (!imgElement) {
            // Create a new image element if one doesn't exist
            imgElement = document.createElement("img")
            deviceScreenElement.appendChild(imgElement)
        }
        
        // Update the image source
        imgElement.src = image
        
        // Update the device info with timestamp
        if (deviceInfoElement) {
            const date = new Date(timestamp)
            deviceInfoElement.textContent = `Last updated: ${date.toLocaleTimeString()}`
        }
    }
})

// Add the error handler to the renderer.mjs file:

// Handle Android screenshot errors
window.electron.onAndroidScreenshotError((event, data) => {
    const { testNumber, error } = data;
    const deviceInfoElement = document.getElementById(`doomDeviceInfo${testNumber}`);
    
    if (deviceInfoElement) {
        deviceInfoElement.textContent = `Screenshot error: ${error}`;
        setTimeout(() => {
            deviceInfoElement.textContent = "Waiting for test to start...";
        }, 3000);
    }
});

// Check device connections when the page loads
document.addEventListener("DOMContentLoaded", () => {
    // Check device connections for the active tab
    const activeTab = document.querySelector('.tab.active').getAttribute('data-tab')
    
    switch (activeTab) {
        case 'roku':
            checkAllDeviceConnections('test')
            break
        case 'android':
            checkAllDeviceConnections('doom')
            break
        case 'ios':
            checkAllDeviceConnections('ios')
            break
        case 'ott':
            checkAllDeviceConnections('ott')
            break
        case 'web':
            checkAllDeviceConnections('web')
            break
    }
    
    // Set up a periodic check every 30 seconds for the active tab
    setInterval(() => {
        const currentActiveTab = document.querySelector('.tab.active').getAttribute('data-tab')
        
        switch (currentActiveTab) {
            case 'roku':
                checkAllDeviceConnections('test')
                break
            case 'android':
                checkAllDeviceConnections('doom')
                break
            case 'ios':
                checkAllDeviceConnections('ios')
                break
            case 'ott':
                checkAllDeviceConnections('ott')
                break
            case 'web':
                checkAllDeviceConnections('web')
                break
        }
    }, 30000)
})

// Replace the setupTestButton and setupAppiumButtons functions with new toggle functions
// Delete these functions:
// function setupTestButton(runButton, stopButton, testNumber, logsContainer, statusElement, type, testName) {
//   // ...
// }

// function setupAppiumButtons(startButton, stopButton, testNumber, statusElement, logsContainer, type) {
//   // ...
// }

// And replace with these new toggle functions:
function setupToggleTestButton(toggleButton, testNumber, logsContainer, statusElement, type, testName) {
  let isRunning = false;
  
  toggleButton.addEventListener("click", () => {
    if (!isRunning) {
      // Start the test
      logsContainer.textContent = "";
      statusElement.textContent = `Running ${testName}...`;
      statusElement.className = "status running";
      
      // Update button appearance
      toggleButton.textContent = `Stop ${testName}`;
      toggleButton.classList.remove("run-button");
      toggleButton.classList.add("stop-button");
      
      // For Android tests, update the device screen
      if (type === 'doom') {
        const deviceInfoElement = document.getElementById(`doomDeviceInfo${testNumber}`);
        if (deviceInfoElement) {
          deviceInfoElement.textContent = `Running ${testName}...`;
        }
      }
      
      // Send message to main process with test number
      window.electron.runTest(testNumber, type);
      isRunning = true;
    } else {
      // Stop the test
      statusElement.textContent = `Stopping ${testName}...`;
      window.electron.stopTest(testNumber, type);
      
      // Temporarily disable the button while stopping
      toggleButton.disabled = true;
      
      // We'll re-enable and reset the button when we receive the test-stopped event
    }
  });
  
  // Handle test completion
  window.electron.onTestEnd((event, data) => {
    if (data.testNumber === testNumber && data.type === type) {
      resetTestButton();
      
      if (data.exitCode === 0) {
        statusElement.textContent = `${testName} completed successfully!`;
        statusElement.className = "status success";
        
        // Update device info for Android tests
        if (type === 'doom') {
          const deviceInfoElement = document.getElementById(`doomDeviceInfo${testNumber}`);
          if (deviceInfoElement) {
            deviceInfoElement.textContent = `${testName} completed successfully!`;
          }
        }
      } else {
        statusElement.textContent = `${testName} failed with exit code: ${data.exitCode}`;
        statusElement.className = "status error";
        
        // Update device info for Android tests
        if (type === 'doom') {
          const deviceInfoElement = document.getElementById(`doomDeviceInfo${testNumber}`);
          if (deviceInfoElement) {
            deviceInfoElement.textContent = `${testName} failed with exit code: ${data.exitCode}`;
          }
        }
      }
    }
  });
  
  // Handle test errors
  window.electron.onTestError((event, data) => {
    if (data.testNumber === testNumber && data.type === type) {
      resetTestButton();
      
      const errorLine = document.createElement("div");
      errorLine.textContent = `Error: ${data.error}`;
      errorLine.style.color = "#f44336";
      logsContainer.appendChild(errorLine);
      
      statusElement.textContent = `Error running ${testName}`;
      statusElement.className = "status error";
      
      // Update device info for Android tests
      if (type === 'doom') {
        const deviceInfoElement = document.getElementById(`doomDeviceInfo${testNumber}`);
        if (deviceInfoElement) {
          deviceInfoElement.textContent = `Error running test: ${data.error}`;
        }
      }
    }
  });
  
  // Handle test stopped
  window.electron.onTestStopped((event, data) => {
    if (data.testNumber === testNumber && data.type === type) {
      resetTestButton();
      
      const stoppedLine = document.createElement("div");
      stoppedLine.textContent = `${testName} was manually stopped.`;
      stoppedLine.style.color = "#ff9800";
      logsContainer.appendChild(stoppedLine);
      
      statusElement.textContent = `${testName} stopped`;
      statusElement.className = "status";
      
      // Update device info for Android tests
      if (type === 'doom') {
        const deviceInfoElement = document.getElementById(`doomDeviceInfo${testNumber}`);
        if (deviceInfoElement) {
          deviceInfoElement.textContent = `${testName} was manually stopped.`;
        }
      }
    }
  });
  
  function resetTestButton() {
    toggleButton.textContent = `Run ${testName}`;
    toggleButton.classList.remove("stop-button");
    toggleButton.classList.add("run-button");
    toggleButton.disabled = false;
    isRunning = false;
  }
}

function setupToggleAppiumButton(toggleButton, testNumber, statusElement, logsContainer, type) {
  let isRunning = false;
  
  toggleButton.addEventListener("click", () => {
    if (!isRunning) {
      // Start Appium
      logsContainer.textContent = "";
      statusElement.textContent = `Starting Appium for test ${testNumber}...`;
      statusElement.className = "status running";
      
      // Update button appearance
      toggleButton.textContent = "Stop Appium";
      toggleButton.classList.remove("appium-button");
      toggleButton.classList.add("stop-button");
      
      // Update Appium status
      const appiumStatusElement = document.getElementById(`${type === 'test' ? '' : type}AppiumStatus${testNumber}`);
      appiumStatusElement.textContent = "Appium: Starting...";
      appiumStatusElement.className = "appium-status appium-running";
      
      // Send message to main process with test number
      window.electron.startAppium(testNumber, type);
      isRunning = true;
    } else {
      // Stop Appium
      statusElement.textContent = `Stopping Appium for test ${testNumber}...`;
      window.electron.stopAppium(testNumber, type);
      
      // Temporarily disable the button while stopping
      toggleButton.disabled = true;
      
      // We'll re-enable and reset the button when we receive the appium-stop event
    }
  });
  
  // Handle Appium start
  window.electron.onAppiumStart((event, data) => {
    if (data.testNumber === testNumber && data.type === type) {
      const appiumStatusElement = document.getElementById(`${type === 'test' ? '' : type}AppiumStatus${testNumber}`);
      appiumStatusElement.textContent = `Appium: Running on port ${data.port}`;
      appiumStatusElement.className = "appium-status appium-running";
      
      statusElement.textContent = `Appium server started on port ${data.port}`;
      statusElement.className = "status success";
    }
  });
  
  // Handle Appium stop
  window.electron.onAppiumStop((event, data) => {
    if (data.testNumber === testNumber && data.type === type) {
      resetAppiumButton();
      
      const appiumStatusElement = document.getElementById(`${type === 'test' ? '' : type}AppiumStatus${testNumber}`);
      appiumStatusElement.textContent = "Appium: Stopped";
      appiumStatusElement.className = "appium-status appium-stopped";
      
      const stoppedLine = document.createElement("div");
      stoppedLine.textContent = "Appium server stopped.";
      stoppedLine.style.color = "#ff9800";
      logsContainer.appendChild(stoppedLine);
      
      statusElement.textContent = "Appium server stopped";
      statusElement.className = "status";
    }
  });
  
  // Handle Appium errors
  window.electron.onAppiumError((event, data) => {
    if (data.testNumber === testNumber && data.type === type) {
      resetAppiumButton();
      
      const appiumStatusElement = document.getElementById(`${type === 'test' ? '' : type}AppiumStatus${testNumber}`);
      appiumStatusElement.textContent = "Appium: Error";
      appiumStatusElement.className = "appium-status appium-stopped";
      
      const errorLine = document.createElement("div");
      errorLine.textContent = `Error: ${data.error}`;
      errorLine.style.color = "#f44336";
      logsContainer.appendChild(errorLine);
      
      statusElement.textContent = "Error starting Appium server";
      statusElement.className = "status error";
    }
  });
  
  function resetAppiumButton() {
    toggleButton.textContent = "Start Appium";
    toggleButton.classList.remove("stop-button");
    toggleButton.classList.add("appium-button");
    toggleButton.disabled = false;
    isRunning = false;
  }
}

// Replace the button setup calls with the new toggle button setup
// Delete these lines:
// Set up each test button for Roku tab
// setupTestButton(runTest1Button, stopTest1Button, 1, logsContainer1, status1Element, 'test', "Roku Home Page")
// setupTestButton(runTest2Button, stopTest2Button, 2, logsContainer2, status2Element, 'test', "Roku Shows Page")
// setupTestButton(runTest3Button, stopTest3Button, 3, logsContainer3, status3Element, 'test', "Roku Player")

// // Set up each test button for Android tab
// setupTestButton(runDoom1Button, stopDoom1Button, 1, doomLogsContainer1, doomStatus1Element, 'doom', "Android Home Page")
// setupTestButton(runDoom2Button, stopDoom2Button, 2, doomLogsContainer2, doomStatus2Element, 'doom', "Android Shows Page")
// setupTestButton(runDoom3Button, stopDoom3Button, 3, doomLogsContainer3, doomStatus3Element, 'doom', "Android Player")

// // Set up each test button for iOS tab
// setupTestButton(runIos1Button, stopIos1Button, 1, iosLogsContainer1, iosStatus1Element, 'ios', "iOS Home Page")
// setupTestButton(runIos2Button, stopIos2Button, 2, iosLogsContainer2, iosStatus2Element, 'ios', "iOS Shows Page")
// setupTestButton(runIos3Button, stopIos3Button, 3, iosLogsContainer3, iosStatus3Element, 'ios', "iOS Player")

// // Set up each test button for OTT tab
// setupTestButton(runOtt1Button, stopOtt1Button, 1, ottLogsContainer1, ottStatus1Element, 'ott', "OTT Home Page")
// setupTestButton(runOtt2Button, stopOtt2Button, 2, ottLogsContainer2, ottStatus2Element, 'ott', "OTT Shows Page")
// setupTestButton(runOtt3Button, stopOtt3Button, 3, ottLogsContainer3, ottStatus3Element, 'ott', "OTT Player")

// // Set up each test button for Web tab
// setupTestButton(runWeb1Button, stopWeb1Button, 1, webLogsContainer1, webStatus1Element, 'web', "Web Home Page")
// setupTestButton(runWeb2Button, stopWeb2Button, 2, webLogsContainer2, webStatus2Element, 'web', "Web Shows Page")
// setupTestButton(runWeb3Button, stopWeb3Button, 3, webLogsContainer3, webStatus3Element, 'web', "Web Player")

// // Set up each Appium button for Roku tab
// setupAppiumButtons(startAppium1Button, stopAppium1Button, 1, status1Element, logsContainer1, 'test')
// setupAppiumButtons(startAppium2Button, stopAppium2Button, 2, status2Element, logsContainer2, 'test')
// setupAppiumButtons(startAppium3Button, stopAppium3Button, 3, status3Element, logsContainer3, 'test')

// // Set up each Appium button for Android tab
// setupAppiumButtons(startDoomAppium1Button, stopDoomAppium1Button, 1, doomStatus1Element, doomLogsContainer1, 'doom')
// setupAppiumButtons(startDoomAppium2Button, stopDoomAppium2Button, 2, doomStatus2Element, doomLogsContainer2, 'doom')
// setupAppiumButtons(startDoomAppium3Button, stopDoomAppium3Button, 3, doomStatus3Element, doomLogsContainer3, 'doom')

// // Set up each Appium button for iOS tab
// setupAppiumButtons(startIosAppium1Button, stopIosAppium1Button, 1, iosStatus1Element, iosLogsContainer1, 'ios')
// setupAppiumButtons(startIosAppium2Button, stopIosAppium2Button, 2, iosStatus2Element, iosLogsContainer2, 'ios')
// setupAppiumButtons(startIosAppium3Button, stopIosAppium3Button, 3, iosStatus3Element, iosLogsContainer3, 'ios')

// // Set up each Appium button for OTT tab
// setupAppiumButtons(startOttAppium1Button, stopOttAppium1Button, 1, ottStatus1Element, ottLogsContainer1, 'ott')
// setupAppiumButtons(startOttAppium2Button, stopOttAppium2Button, 2, ottStatus2Element, ottLogsContainer2, 'ott')
// setupAppiumButtons(startOttAppium3Button, stopOttAppium3Button, 3, ottStatus3Element, ottLogsContainer3, 'ott')

// // Set up each Appium button for Web tab
// setupAppiumButtons(startWebAppium1Button, stopWebAppium1Button, 1, webStatus1Element, webLogsContainer1, 'web')
// setupAppiumButtons(startWebAppium2Button, stopWebAppium2Button, 2, webStatus2Element, webLogsContainer2, 'web')
// setupAppiumButtons(startWebAppium3Button, stopWebAppium3Button, 3, webStatus3Element, webLogsContainer3, 'web')

// And replace with:
// Set up each toggle button for Roku tab
setupToggleTestButton(toggleTest1Button, 1, logsContainer1, status1Element, 'test', "Roku Home Page");
setupToggleTestButton(toggleTest2Button, 2, logsContainer2, status2Element, 'test', "Roku Shows Page");
setupToggleTestButton(toggleTest3Button, 3, logsContainer3, status3Element, 'test', "Roku Player");

setupToggleAppiumButton(toggleAppium1Button, 1, status1Element, logsContainer1, 'test');
setupToggleAppiumButton(toggleAppium2Button, 2, status2Element, logsContainer2, 'test');
setupToggleAppiumButton(toggleAppium3Button, 3, status3Element, logsContainer3, 'test');

// Set up each toggle button for Android tab
setupToggleTestButton(toggleDoom1Button, 1, doomLogsContainer1, doomStatus1Element, 'doom', "Android Home Page");
setupToggleTestButton(toggleDoom2Button, 2, doomLogsContainer2, doomStatus2Element, 'doom', "Android Shows Page");
setupToggleTestButton(toggleDoom3Button, 3, doomLogsContainer3, doomStatus3Element, 'doom', "Android Player");

setupToggleAppiumButton(toggleDoomAppium1Button, 1, doomStatus1Element, doomLogsContainer1, 'doom');
setupToggleAppiumButton(toggleDoomAppium2Button, 2, doomStatus2Element, doomLogsContainer2, 'doom');
setupToggleAppiumButton(toggleDoomAppium3Button, 3, doomStatus3Element, doomLogsContainer3, 'doom');

// Set up each toggle button for iOS tab
setupToggleTestButton(toggleIos1Button, 1, iosLogsContainer1, iosStatus1Element, 'ios', "iOS Home Page");
setupToggleTestButton(toggleIos2Button, 2, iosLogsContainer2, iosStatus2Element, 'ios', "iOS Shows Page");
setupToggleTestButton(toggleIos3Button, 3, iosLogsContainer3, iosStatus3Element, 'ios', "iOS Player");

setupToggleAppiumButton(toggleIosAppium1Button, 1, iosStatus1Element, iosLogsContainer1, 'ios');
setupToggleAppiumButton(toggleIosAppium2Button, 2, iosStatus2Element, iosLogsContainer2, 'ios');
setupToggleAppiumButton(toggleIosAppium3Button, 3, iosStatus3Element, iosLogsContainer3, 'ios');

// Set up each toggle button for OTT tab
setupToggleTestButton(toggleOtt1Button, 1, ottLogsContainer1, ottStatus1Element, 'ott', "OTT Home Page");
setupToggleTestButton(toggleOtt2Button, 2, ottLogsContainer2, ottStatus2Element, 'ott', "OTT Shows Page");
setupToggleTestButton(toggleOtt3Button, 3, ottLogsContainer3, ottStatus3Element, 'ott', "OTT Player");

setupToggleAppiumButton(toggleOttAppium1Button, 1, ottStatus1Element, ottLogsContainer1, 'ott');
setupToggleAppiumButton(toggleOttAppium2Button, 2, ottStatus2Element, ottLogsContainer2, 'ott');
setupToggleAppiumButton(toggleOttAppium3Button, 3, ottLogsContainer3, 'ott');

// Set up each toggle button for Web tab
setupToggleTestButton(toggleWeb1Button, 1, webLogsContainer1, webStatus1Element, 'web', "Web Home Page");
setupToggleTestButton(toggleWeb2Button, 2, webLogsContainer2, webStatus2Element, 'web', "Web Shows Page");
setupToggleTestButton(toggleWeb3Button, 3, webLogsContainer3, webStatus3Element, 'web', "Web Player");

setupToggleAppiumButton(toggleWebAppium1Button, 1, webStatus1Element, webLogsContainer1, 'web');
setupToggleAppiumButton(toggleWebAppium2Button, 2, webLogsContainer2, 'web');
setupToggleAppiumButton(toggleWebAppium3Button, 3, webLogsContainer3, 'web');

// Update the getElementsForTest function to use the new toggle buttons
function getElementsForTest(testNumber, type = 'test') {
  switch (type) {
      case 'test':
          switch (testNumber) {
              case 1:
                  return {
                      toggleButton: toggleTest1Button,
                      toggleAppiumButton: toggleAppium1Button,
                      appiumStatusElement: appiumStatus1,
                      logsContainer: logsContainer1,
                      statusElement: status1Element,
                  }
              case 2:
                  return {
                      toggleButton: toggleTest2Button,
                      toggleAppiumButton: toggleAppium2Button,
                      appiumStatusElement: appiumStatus2,
                      logsContainer: logsContainer2,
                      statusElement: status2Element,
                  }
              case 3:
                  return {
                      toggleButton: toggleTest3Button,
                      toggleAppiumButton: toggleAppium3Button,
                      appiumStatusElement: appiumStatus3,
                      logsContainer: logsContainer3,
                      statusElement: status3Element,
                  }
              default:
                  return {
                      toggleButton: toggleTest1Button,
                      toggleAppiumButton: toggleAppium1Button,
                      appiumStatusElement: appiumStatus1,
                      logsContainer: logsContainer1,
                      statusElement: status1Element,
                  }
          }
      case 'doom':
          switch (testNumber) {
              case 1:
                  return {
                      toggleButton: toggleDoom1Button,
                      toggleAppiumButton: toggleDoomAppium1Button,
                      appiumStatusElement: doomAppiumStatus1,
                      logsContainer: doomLogsContainer1,
                      statusElement: doomStatus1Element,
                      deviceScreenElement: doomDeviceScreen1,
                      deviceInfoElement: doomDeviceInfo1
                  }
              case 2:
                  return {
                      toggleButton: toggleDoom2Button,
                      toggleAppiumButton: toggleDoomAppium2Button,
                      appiumStatusElement: doomAppiumStatus2,
                      logsContainer: doomLogsContainer2,
                      statusElement: doomStatus2Element,
                      deviceScreenElement: doomDeviceScreen2,
                      deviceInfoElement: doomDeviceInfo2
                  }
              case 3:
                  return {
                      toggleButton: toggleDoom3Button,
                      toggleAppiumButton: toggleDoomAppium3Button,
                      appiumStatusElement: doomAppiumStatus3,
                      logsContainer: doomLogsContainer3,
                      statusElement: doomStatus3Element,
                      deviceScreenElement: doomDeviceScreen3,
                      deviceInfoElement: doomDeviceInfo3
                  }
              default:
                  return {
                      toggleButton: toggleDoom1Button,
                      toggleAppiumButton: toggleDoomAppium1Button,
                      appiumStatusElement: doomAppiumStatus1,
                      logsContainer: doomLogsContainer1,
                      statusElement: doomStatus1Element,
                      deviceScreenElement: doomDeviceScreen1,
                      deviceInfoElement: doomDeviceInfo1
                  }
          }
      case 'ios':
          switch (testNumber) {
              case 1:
                  return {
                      toggleButton: toggleIos1Button,
                      toggleAppiumButton: toggleIosAppium1Button,
                      appiumStatusElement: iosAppiumStatus1,
                      logsContainer: iosLogsContainer1,
                      statusElement: iosStatus1Element,
                  }
              case 2:
                  return {
                      toggleButton: toggleIos2Button,
                      toggleAppiumButton: toggleIosAppium2Button,
                      appiumStatusElement: iosAppiumStatus2,
                      logsContainer: iosLogsContainer2,
                      statusElement: iosStatus2Element,
                  }
              case 3:
                  return {
                      toggleButton: toggleIos3Button,
                      toggleAppiumButton: toggleIosAppium3Button,
                      appiumStatusElement: iosAppiumStatus3,
                      logsContainer: iosLogsContainer3,
                      statusElement: iosStatus3Element,
                  }
              default:
                  return {
                      toggleButton: toggleIos1Button,
                      toggleAppiumButton: toggleIosAppium1Button,
                      appiumStatusElement: iosAppiumStatus1,
                      logsContainer: iosLogsContainer1,
                      statusElement: iosStatus1Element,
                  }
          }
      case 'ott':
          switch (testNumber) {
              case 1:
                  return {
                      toggleButton: toggleOtt1Button,
                      toggleAppiumButton: toggleOttAppium1Button,
                      appiumStatusElement: ottAppiumStatus1,
                      logsContainer: ottLogsContainer1,
                      statusElement: ottStatus1Element,
                  }
              case 2:
                  return {
                      toggleButton: toggleOtt2Button,
                      toggleAppiumButton: toggleOttAppium2Button,
                      appiumStatusElement: ottAppiumStatus2,
                      logsContainer: ottLogsContainer2,
                      statusElement: ottStatus2Element,
                  }
              case 3:
                  return {
                      toggleButton: toggleOtt3Button,
                      toggleAppiumButton: toggleOttAppium3Button,
                      appiumStatusElement: ottAppiumStatus3,
                      logsContainer: ottLogsContainer3,
                      statusElement: ottStatus3Element,
                  }
              default:
                  return {
                      toggleButton: toggleOtt1Button,
                      toggleAppiumButton: toggleOttAppium1Button,
                      appiumStatusElement: ottAppiumStatus1,
                      logsContainer: ottLogsContainer1,
                      statusElement: ottStatus1Element,
                  }
          }
      case 'web':
          switch (testNumber) {
              case 1:
                  return {
                      toggleButton: toggleWeb1Button,
                      toggleAppiumButton: toggleWebAppium1Button,
                      appiumStatusElement: webAppiumStatus1,
                      logsContainer: webLogsContainer1,
                      statusElement: webStatus1Element,
                  }
              case 2:
                  return {
                      toggleButton: toggleWeb2Button,
                      toggleAppiumButton: toggleWebAppium2Button,
                      appiumStatusElement: webAppiumStatus2,
                      logsContainer: webLogsContainer2,
                      statusElement: webStatus2Element,
                  }
              case 3:
                  return {
                      toggleButton: toggleWeb3Button,
                      toggleAppiumButton: toggleWebAppium3Button,
                      appiumStatusElement: webAppiumStatus3,
                      logsContainer: webLogsContainer3,
                      statusElement: webStatus3Element,
                  }
              default:
                  return {
                      toggleButton: toggleWeb1Button,
                      toggleAppiumButton: toggleWebAppium1Button,
                      appiumStatusElement: webAppiumStatus1,
                      logsContainer: webLogsContainer1,
                      statusElement: webStatus1Element,
                  }
          }
      default:
          return {
              toggleButton: toggleTest1Button,
              toggleAppiumButton: toggleAppium1Button,
              appiumStatusElement: appiumStatus1,
              logsContainer: logsContainer1,
              statusElement: status1Element,
          }
  }
}

// Handle test start
window.electron.onTestStart((event, data) => {
    const { testNumber, type } = data
    const { statusElement, deviceInfoElement } = getElementsForTest(testNumber, type)
    
    const testNames = {
        'test': {
            1: "Roku Home Page",
            2: "Roku Shows Page",
            3: "Roku Player"
        },
        'doom': {
            1: "Android Home Page",
            2: "Android Shows Page",
            3: "Android Player"
        },
        'ios': {
            1: "iOS Home Page",
            2: "iOS Shows Page",
            3: "iOS Player"
        },
        'ott': {
            1: "OTT Home Page",
            2: "OTT Shows Page",
            3: "OTT Player"
        },
        'web': {
            1: "Web Home Page",
            2: "Web Shows Page",
            3: "Web Player"
        }
    }
    
    statusElement.textContent = `Running ${testNames[type][testNumber] || `${type} ${testNumber}`}...`
    statusElement.className = "status running"
    
    // Update device info for Android tests
    if (type === 'doom' && deviceInfoElement) {
        deviceInfoElement.textContent = `Running ${testNames[type][testNumber]}...`
    }
})

// Handle test output (stdout/stderr)
window.electron.onTestOutput((event, data) => {
    const { testNumber, output, type } = data
    const { logsContainer } = getElementsForTest(testNumber, type)

    // Append new output to logs container
    const outputLine = document.createElement("div")
    outputLine.textContent = output
    logsContainer.appendChild(outputLine)

    // Auto-scroll to bottom
    logsContainer.scrollTop = logsContainer.scrollHeight
})

// Handle test completion
window.electron.onTestEnd((event, data) => {
    const { testNumber, exitCode, type } = data
    const { toggleButton, deviceInfoElement } = getElementsForTest(testNumber, type)

    const testNames = {
        'test': {
            1: "Roku Home Page",
            2: "Roku Shows Page",
            3: "Roku Player"
        },
        'doom': {
            1: "Android Home Page",
            2: "Android Shows Page",
            3: "Android Player"
        },
        'ios': {
            1: "iOS Home Page",
            2: "iOS Shows Page",
            3: "iOS Player"
        },
        'ott': {
            1: "OTT Home Page",
            2: "OTT Shows Page",
            3: "OTT Player"
        },
        'web': {
            1: "Web Home Page",
            2: "Web Shows Page",
            3: "Web Player"
        }
    }

    if (exitCode === 0) {
        // Update device info for Android tests
        if (type === 'doom' && deviceInfoElement) {
            deviceInfoElement.textContent = `${testNames[type][testNumber]} completed successfully!`
        }
    } else {
        // Update device info for Android tests
        if (type === 'doom' && deviceInfoElement) {
            deviceInfoElement.textContent = `${testNames[type][testNumber]} failed with exit code: ${exitCode}`
        }
    }
})

// Handle test errors
window.electron.onTestError((event, data) => {
    const { testNumber, error, type } = data
    const { toggleButton, logsContainer, deviceInfoElement } = getElementsForTest(testNumber, type)

    const errorLine = document.createElement("div")
    errorLine.textContent = `Error: ${error}`
    errorLine.style.color = "#f44336"
    logsContainer.appendChild(errorLine)

    // Update device info for Android tests
    if (type === 'doom' && deviceInfoElement) {
        deviceInfoElement.textContent = `Error running test: ${error}`
    }
})

// Handle test stopped
window.electron.onTestStopped((event, data) => {
    const { testNumber, type } = data
    const { toggleButton, logsContainer, deviceInfoElement } = getElementsForTest(testNumber, type)

    const testNames = {
        'test': {
            1: "Roku Home Page",
            2: "Roku Shows Page",
            3: "Roku Player"
        },
        'doom': {
            1: "Android Home Page",
            2: "Android Shows Page",
            3: "Android Player"
        },
        'ios': {
            1: "iOS Home Page",
            2: "iOS Shows Page",
            3: "iOS Player"
        },
        'ott': {
            1: "OTT Home Page",
            2: "OTT Shows Page",
            3: "OTT Player"
        },
        'web': {
            1: "Web Home Page",
            2: "Web Shows Page",
            3: "Web Player"
        }
    }

    const stoppedLine = document.createElement("div")
    stoppedLine.textContent = `${testNames[type][testNumber] || `${type} ${testNumber}`} was manually stopped.`
    stoppedLine.style.color = "#ff9800"
    logsContainer.appendChild(stoppedLine)

    // Update device info for Android tests
    if (type === 'doom' && deviceInfoElement) {
        deviceInfoElement.textContent = `${testNames[type][testNumber]} was manually stopped.`
    }
})

// Handle Appium start
window.electron.onAppiumStart((event, data) => {
    const { testNumber, port, type } = data
    const { toggleAppiumButton, appiumStatusElement, statusElement } = getElementsForTest(testNumber, type)

    appiumStatusElement.textContent = `Appium: Running on port ${port}`
    appiumStatusElement.className = "appium-status appium-running"

    statusElement.textContent = `Appium server started on port ${port}`
    statusElement.className = "status success"
})

// Handle Appium output
window.electron.onAppiumOutput((event, data) => {
    const { testNumber, output, type } = data
    const { logsContainer } = getElementsForTest(testNumber, type)

    // Append new output to logs container
    const outputLine = document.createElement("div")
    outputLine.textContent = output
    logsContainer.appendChild(outputLine)

    // Auto-scroll to bottom
    logsContainer.scrollTop = logsContainer.scrollHeight
})

// Handle Appium stop
window.electron.onAppiumStop((event, data) => {
    const { testNumber, type } = data
    const { toggleAppiumButton, appiumStatusElement, logsContainer, statusElement } =
        getElementsForTest(testNumber, type)

    appiumStatusElement.textContent = "Appium: Stopped"
    appiumStatusElement.className = "appium-status appium-stopped"

    const stoppedLine = document.createElement("div")
    stoppedLine.textContent = "Appium server stopped."
    stoppedLine.style.color = "#ff9800"
    logsContainer.appendChild(stoppedLine)

    statusElement.textContent = "Appium server stopped"
    statusElement.className = "status"
})

// Handle Appium errors
window.electron.onAppiumError((event, data) => {
    const { testNumber, error, type } = data
    const { toggleAppiumButton, appiumStatusElement, logsContainer, statusElement } =
        getElementsForTest(testNumber, type)

    appiumStatusElement.textContent = "Appium: Error"
    appiumStatusElement.className = "appium-status appium-stopped"

    const errorLine = document.createElement("div")
    errorLine.textContent = `Error: ${error}`
    errorLine.style.color = "#f44336"
    logsContainer.appendChild(errorLine)

    statusElement.textContent = "Error starting Appium server"
    statusElement.className = "status error"
})

