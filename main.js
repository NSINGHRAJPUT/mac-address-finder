const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const os = require("os");

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
    },
  });

  win.loadFile("index.html");
  win.maximize();

  ipcMain.handle("get-mac-address", () => {
    return getMacAddress();
  });
}

// Function to get the system MAC address
function getMacAddress() {
  const networkInterfaces = os.networkInterfaces();
  let macAddress = "Not found";
  Object.keys(networkInterfaces).forEach((interfaceName) => {
    const networkInterface = networkInterfaces[interfaceName];
    networkInterface.forEach((iface) => {
      if (iface.mac && iface.mac !== "00:00:00:00:00:00") {
        macAddress = iface.mac;
      }
    });
  });
  return macAddress;
}

app.whenReady().then(() => {
  const macAddress = getMacAddress();
  const allowedMacAddress = "e0:2b:e9:27:af:29"; // Specify the allowed MAC address here

  if (macAddress.toLowerCase() === allowedMacAddress.toLowerCase()) {
    // Create the application window if MAC matches
    createWindow();
  } else {
    // Quit the application if MAC does not match
    console.log(
      `Unauthorized MAC address: ${macAddress}. Closing the application.`
    );
    app.quit(); // This will close the application
  }

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});
