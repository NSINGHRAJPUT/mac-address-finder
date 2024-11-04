const { contextBridge, ipcRenderer } = require("electron");

// Expose IPC method to get MAC address
contextBridge.exposeInMainWorld("api", {
  getMacAddress: () => ipcRenderer.invoke("get-mac-address"),
});
