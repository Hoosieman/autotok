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
        
        // If switching to engage tab, check device connections for engage
        if (tabId === 'engage') {
            checkAllDeviceConnections('test');
        }
        
        // If switching to doom tab, check device connections for doom
        if (tabId === 'doom') {
            checkAllDeviceConnections('doom');
        }
    });
});

// Get all button and container elements for Engage tab
const runTest1Button = document.getElementById("runTest1Button")
const runTest2Button = document.getElementById("runTest2Button")
const runTest3Button = document.getElementById("runTest3Button")

const stopTest1Button = document.getElementById("stopTest1Button")
const stopTest2Button = document.getElementById("stopTest2Button")
const stopTest3Button = document.getElementById("stopTest3Button")

const startAppium1Button = document.getElementById("startAppium1Button")
const startAppium2Button = document.getElementById("startAppium2Button")
const startAppium3Button = document.getElementById("startAppium3Button")

const stopAppium1Button = document.getElementById("stopAppium1Button")
const stopAppium2Button = document.getElementById("stopAppium2Button")
const stopAppium3Button = document.getElementById("stopAppium3Button")

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

// Get all button and container elements for Doom tab
const runDoom1Button = document.getElementById("runDoom1Button")
const runDoom2Button = document.getElementById("runDoom2Button")
const runDoom3Button = document.getElementById("runDoom3Button")

const stopDoom1Button = document.getElementById("stopDoom1Button")
const stopDoom2Button = document.getElementById("stopDoom2Button")
const stopDoom3Button = document.getElementById("stopDoom3Button")

const startDoomAppium1Button = document.getElementById("startDoomAppium1Button")
const startDoomAppium2Button = document.getElementById("startDoomAppium2Button")
const startDoomAppium3Button = document.getElementById("startDoomAppium3Button")

const stopDoomAppium1Button = document.getElementById("stopDoomAppium1Button")
const stopDoomAppium2Button = document.getElementById("stopDoomAppium2Button")
const stopDoomAppium3Button = document.getElementById("stopDoomAppium3Button")

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

// Set up device refresh buttons for Engage tab
refreshDevice1.addEventListener("click", () => window.electron.checkDeviceConnection(1, 'test'))
refreshDevice2.addEventListener("click", () => window.electron.checkDeviceConnection(2, 'test'))
refreshDevice3.addEventListener("click", () => window.electron.checkDeviceConnection(3, 'test'))

// Set up device refresh buttons for Doom tab
refreshDoomDevice1.addEventListener("click", () => window.electron.checkDeviceConnection(1, 'doom'))
refreshDoomDevice2.addEventListener("click", () => window.electron.checkDeviceConnection(2, 'doom'))
refreshDoomDevice3.addEventListener("click", () => window.electron.checkDeviceConnection(3, 'doom'))

// Function to check all device connections
function checkAllDeviceConnections(type = 'test') {
    if (type === 'test') {
        window.electron.checkDeviceConnection(1, 'test')
        window.electron.checkDeviceConnection(2, 'test')
        window.electron.checkDeviceConnection(3, 'test')
    } else if (type === 'doom') {
        window.electron.checkDeviceConnection(1, 'doom')
        window.electron.checkDeviceConnection(2, 'doom')
        window.electron.checkDeviceConnection(3, 'doom')
    }
}

// Handle device connection updates
window.electron.onDeviceConnectionUpdate((event, data) => {
    const { testNumber, connected, deviceId, type } = data
    
    if (type === 'test') {
        const deviceStatusElement = document.getElementById(`deviceStatus${testNumber}`)
        
        if (connected) {
            deviceStatusElement.className = "device-status device-connected"
            deviceStatusElement.querySelector("span").textContent = `Device: Connected (${deviceId})`
        } else {
            deviceStatusElement.className = "device-status device-disconnected"
            deviceStatusElement.querySelector("span").textContent = "Device: Not connected"
        }
    } else if (type === 'doom') {
        const deviceStatusElement = document.getElementById(`doomDeviceStatus${testNumber}`)
        
        if (connected) {
            deviceStatusElement.className = "device-status device-connected"
            deviceStatusElement.querySelector("span").textContent = `Device: Connected (${deviceId})`
        } else {
            deviceStatusElement.className = "device-status device-disconnected"
            deviceStatusElement.querySelector("span").textContent = "Device: Not connected"
        }
    }
})

// Check device connections when the page loads
document.addEventListener("DOMContentLoaded", () => {
    // If the engage tab is active on load, check device connections
    if (document.getElementById('engage').classList.contains('active')) {
        checkAllDeviceConnections('test');
    }
    
    // If the doom tab is active on load, check device connections
    if (document.getElementById('doom').classList.contains('active')) {
        checkAllDeviceConnections('doom');
    }
    
    // Set up a periodic check every 30 seconds for the active tab
    setInterval(() => {
        if (document.getElementById('engage').classList.contains('active')) {
            checkAllDeviceConnections('test');
        } else if (document.getElementById('doom').classList.contains('active')) {
            checkAllDeviceConnections('doom');
        }
    }, 30000);
})

// Helper function to set up each test button for Engage tab
function setupTestButton(runButton, stopButton, testNumber, logsContainer, statusElement) {
  runButton.addEventListener("click", () => {
    // Clear previous logs
    logsContainer.textContent = ""
    statusElement.textContent = `Running test ${testNumber}...`
    statusElement.className = "status running"

    // Disable run button and enable stop button
    runButton.disabled = true
    stopButton.disabled = false

    // Send message to main process with test number
    window.electron.runTest(testNumber, 'test')
  })

  stopButton.addEventListener("click", () => {
    statusElement.textContent = `Stopping test ${testNumber}...`
    window.electron.stopTest(testNumber, 'test')

    // Disable the stop button while stopping
    stopButton.disabled = true
  })
}

// Helper function to set up each doom button for Doom tab
function setupDoomButton(runButton, stopButton, testNumber, logsContainer, statusElement) {
  runButton.addEventListener("click", () => {
    // Clear previous logs
    logsContainer.textContent = ""
    statusElement.textContent = `Running doom ${testNumber}...`
    statusElement.className = "status running"

    // Disable run button and enable stop button
    runButton.disabled = true
    stopButton.disabled = false

    // Send message to main process with test number
    window.electron.runTest(testNumber, 'doom')
  })

  stopButton.addEventListener("click", () => {
    statusElement.textContent = `Stopping doom ${testNumber}...`
    window.electron.stopTest(testNumber, 'doom')

    // Disable the stop button while stopping
    stopButton.disabled = true
  })
}

// Helper function to set up each Appium button for Engage tab
function setupAppiumButtons(startButton, stopButton, testNumber, statusElement, logsContainer) {
  startButton.addEventListener("click", () => {
    // Clear previous logs
    logsContainer.textContent = ""
    statusElement.textContent = `Starting Appium for test ${testNumber}...`
    statusElement.className = "status running"

    // Disable start button and enable stop button
    startButton.disabled = true
    stopButton.disabled = false

    // Update Appium status
    const appiumStatusElement = document.getElementById(`appiumStatus${testNumber}`)
    appiumStatusElement.textContent = "Appium: Starting..."
    appiumStatusElement.className = "appium-status appium-running"

    // Send message to main process with test number
    window.electron.startAppium(testNumber, 'test')
  })

  stopButton.addEventListener("click", () => {
    statusElement.textContent = `Stopping Appium for test ${testNumber}...`
    window.electron.stopAppium(testNumber, 'test')

    // Disable the stop button while stopping
    stopButton.disabled = true
  })
}

// Helper function to set up each Appium button for Doom tab
function setupDoomAppiumButtons(startButton, stopButton, testNumber, statusElement, logsContainer) {
  startButton.addEventListener("click", () => {
    // Clear previous logs
    logsContainer.textContent = ""
    statusElement.textContent = `Starting Appium for doom ${testNumber}...`
    statusElement.className = "status running"

    // Disable start button and enable stop button
    startButton.disabled = true
    stopButton.disabled = false

    // Update Appium status
    const appiumStatusElement = document.getElementById(`doomAppiumStatus${testNumber}`)
    appiumStatusElement.textContent = "Appium: Starting..."
    appiumStatusElement.className = "appium-status appium-running"

    // Send message to main process with test number
    window.electron.startAppium(testNumber, 'doom')
  })

  stopButton.addEventListener("click", () => {
    statusElement.textContent = `Stopping Appium for doom ${testNumber}...`
    window.electron.stopAppium(testNumber, 'doom')

    // Disable the stop button while stopping
    stopButton.disabled = true
  })
}

// Set up each test button for Engage tab
setupTestButton(runTest1Button, stopTest1Button, 1, logsContainer1, status1Element)
setupTestButton(runTest2Button, stopTest2Button, 2, logsContainer2, status2Element)
setupTestButton(runTest3Button, stopTest3Button, 3, logsContainer3, status3Element)

// Set up each doom button for Doom tab
setupDoomButton(runDoom1Button, stopDoom1Button, 1, doomLogsContainer1, doomStatus1Element)
setupDoomButton(runDoom2Button, stopDoom2Button, 2, doomLogsContainer2, doomStatus2Element)
setupDoomButton(runDoom3Button, stopDoom3Button, 3, doomLogsContainer3, doomStatus3Element)

// Set up each Appium button for Engage tab
setupAppiumButtons(startAppium1Button, stopAppium1Button, 1, status1Element, logsContainer1)
setupAppiumButtons(startAppium2Button, stopAppium2Button, 2, status2Element, logsContainer2)
setupAppiumButtons(startAppium3Button, stopAppium3Button, 3, status3Element, logsContainer3)

// Set up each Appium button for Doom tab
setupDoomAppiumButtons(startDoomAppium1Button, stopDoomAppium1Button, 1, doomStatus1Element, doomLogsContainer1)
setupDoomAppiumButtons(startDoomAppium2Button, stopDoomAppium2Button, 2, doomStatus2Element, doomLogsContainer2)
setupDoomAppiumButtons(startDoomAppium3Button, stopDoomAppium3Button, 3, doomStatus3Element, doomLogsContainer3)

// Get the appropriate elements based on test number and type
function getElementsForTest(testNumber, type = 'test') {
  if (type === 'test') {
    switch (testNumber) {
      case 1:
        return {
          runButton: runTest1Button,
          stopButton: stopTest1Button,
          startAppiumButton: startAppium1Button,
          stopAppiumButton: stopAppium1Button,
          appiumStatusElement: appiumStatus1,
          logsContainer: logsContainer1,
          statusElement: status1Element,
        }
      case 2:
        return {
          runButton: runTest2Button,
          stopButton: stopTest2Button,
          startAppiumButton: startAppium2Button,
          stopAppiumButton: stopAppium2Button,
          appiumStatusElement: appiumStatus2,
          logsContainer: logsContainer2,
          statusElement: status2Element,
        }
      case 3:
        return {
          runButton: runTest3Button,
          stopButton: stopTest3Button,
          startAppiumButton: startAppium3Button,
          stopAppiumButton: stopAppium3Button,
          appiumStatusElement: appiumStatus3,
          logsContainer: logsContainer3,
          statusElement: status3Element,
        }
      default:
        return {
          runButton: runTest1Button,
          stopButton: stopTest1Button,
          startAppiumButton: startAppium1Button,
          stopAppiumButton: stopAppium1Button,
          appiumStatusElement: appiumStatus1,
          logsContainer: logsContainer1,
          statusElement: status1Element,
        }
    }
  } else if (type === 'doom') {
    switch (testNumber) {
      case 1:
        return {
          runButton: runDoom1Button,
          stopButton: stopDoom1Button,
          startAppiumButton: startDoomAppium1Button,
          stopAppiumButton: stopDoomAppium1Button,
          appiumStatusElement: doomAppiumStatus1,
          logsContainer: doomLogsContainer1,
          statusElement: doomStatus1Element,
        }
      case 2:
        return {
          runButton: runDoom2Button,
          stopButton: stopDoom2Button,
          startAppiumButton: startDoomAppium2Button,
          stopAppiumButton: stopDoomAppium2Button,
          appiumStatusElement: doomAppiumStatus2,
          logsContainer: doomLogsContainer2,
          statusElement: doomStatus2Element,
        }
      case 3:
        return {
          runButton: runDoom3Button,
          stopButton: stopDoom3Button,
          startAppiumButton: startDoomAppium3Button,
          stopAppiumButton: stopDoomAppium3Button,
          appiumStatusElement: doomAppiumStatus3,
          logsContainer: doomLogsContainer3,
          statusElement: doomStatus3Element,
        }
      default:
        return {
          runButton: runDoom1Button,
          stopButton: stopDoom1Button,
          startAppiumButton: startDoomAppium1Button,
          stopAppiumButton: stopDoomAppium1Button,
          appiumStatusElement: doomAppiumStatus1,
          logsContainer: doomLogsContainer1,
          statusElement: doomStatus1Element,
        }
    }
  }
}

// Handle test start
window.electron.onTestStart((event, data) => {
  const { testNumber, type } = data
  const { statusElement } = getElementsForTest(testNumber, type)
  
  if (type === 'test') {
    statusElement.textContent = `Running test ${testNumber}...`
  } else {
    statusElement.textContent = `Running doom ${testNumber}...`
  }
  
  statusElement.className = "status running"
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
  const { runButton, stopButton, statusElement } = getElementsForTest(testNumber, type)

  runButton.disabled = false
  stopButton.disabled = true

  if (exitCode === 0) {
    if (type === 'test') {
      statusElement.textContent = `Test ${testNumber} completed successfully!`
    } else {
      statusElement.textContent = `Doom ${testNumber} completed successfully!`
    }
    statusElement.className = "status success"
  } else {
    if (type === 'test') {
      statusElement.textContent = `Test ${testNumber} failed with exit code: ${exitCode}`
    } else {
      statusElement.textContent = `Doom ${testNumber} failed with exit code: ${exitCode}`
    }
    statusElement.className = "status error"
  }
})

// Handle test errors
window.electron.onTestError((event, data) => {
  const { testNumber, error, type } = data
  const { runButton, stopButton, logsContainer, statusElement } = getElementsForTest(testNumber, type)

  runButton.disabled = false
  stopButton.disabled = true

  const errorLine = document.createElement("div")
  errorLine.textContent = `Error: ${error}`
  errorLine.style.color = "#f44336"
  logsContainer.appendChild(errorLine)

  if (type === 'test') {
    statusElement.textContent = `Error running test ${testNumber}`
  } else {
    statusElement.textContent = `Error running doom ${testNumber}`
  }
  statusElement.className = "status error"
})

// Handle test stopped
window.electron.onTestStopped((event, data) => {
  const { testNumber, type } = data
  const { runButton, stopButton, logsContainer, statusElement } = getElementsForTest(testNumber, type)

  runButton.disabled = false
  stopButton.disabled = true

  const stoppedLine = document.createElement("div")
  if (type === 'test') {
    stoppedLine.textContent = `Test ${testNumber} was manually stopped.`
  } else {
    stoppedLine.textContent = `Doom ${testNumber} was manually stopped.`
  }
  stoppedLine.style.color = "#ff9800"
  logsContainer.appendChild(stoppedLine)

  if (type === 'test') {
    statusElement.textContent = `Test ${testNumber} stopped`
  } else {
    statusElement.textContent = `Doom ${testNumber} stopped`
  }
  statusElement.className = "status"
})

// Handle Appium start
window.electron.onAppiumStart((event, data) => {
  const { testNumber, port, type } = data
  const { startAppiumButton, stopAppiumButton, appiumStatusElement, statusElement } = getElementsForTest(testNumber, type)

  startAppiumButton.disabled = true
  stopAppiumButton.disabled = false

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
  const { startAppiumButton, stopAppiumButton, appiumStatusElement, logsContainer, statusElement } =
    getElementsForTest(testNumber, type)

  startAppiumButton.disabled = false
  stopAppiumButton.disabled = true

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
  const { startAppiumButton, stopAppiumButton, appiumStatusElement, logsContainer, statusElement } =
    getElementsForTest(testNumber, type)

  startAppiumButton.disabled = false
  stopAppiumButton.disabled = true

  appiumStatusElement.textContent = "Appium: Error"
  appiumStatusElement.className = "appium-status appium-stopped"

  const errorLine = document.createElement("div")
  errorLine.textContent = `Error: ${error}`
  errorLine.style.color = "#f44336"
  logsContainer.appendChild(errorLine)

  statusElement.textContent = "Error starting Appium server"
  statusElement.className = "status error"
})