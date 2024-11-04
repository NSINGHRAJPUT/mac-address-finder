Electron App with MAC Address Authentication
This Electron-based desktop application serves as a template for projects that require MAC address-based authentication for access. The application retrieves the system's MAC address upon launch and compares it to a predefined, allowed MAC address. If the MAC address does not match the specified address, the application will automatically quit.

Features
MAC Address Authentication: Only allows the application to open if the system's MAC address matches the predefined allowed address.
Secure Preload Script: Uses a preload.js script to securely communicate between the main and renderer processes, ensuring the renderer process is isolated.
Responsive UI Window: Opens the main application window at 800x600 pixels and maximizes it automatically for a seamless user experience.
Prerequisites
Ensure you have Node.js installed, as Electron is built on Node.js.

Setup Instructions
Clone the repository:

bash
Copy code
git clone <repository-url>
cd <repository-folder>
Install the dependencies:

bash
Copy code
npm install
Add your preload.js file to enable secure communication between the main and renderer processes.

Update the allowed MAC address in main.js:

javascript
Copy code
const allowedMacAddress = "your-mac-address-here";
Running the Application
To start the Electron application, run:

bash
Copy code
npm start
The application will compare the device's MAC address with the specified allowedMacAddress. If the addresses match, the application window will open; otherwise, the app will quit.

Project Structure
main.js: Contains the main process code, initializes the application window, and performs MAC address validation.
preload.js: Serves as the intermediary between the main and renderer processes with contextIsolation enabled.
index.html: Entry HTML file for the application UI.
Code Overview
Main Process (Electron Initialization)
The Electron main.js file sets up the following:

MAC Address Retrieval: Uses Node.js' os module to get the system's MAC address.
MAC Address Validation: Compares the retrieved MAC address to the allowed MAC address, stored as allowedMacAddress.
Window Creation: Creates and manages the main application window if authentication is successful.
Preload Script (preload.js)
The preload.js script runs in an isolated context, ensuring the main process and renderer process communicate securely. This script exposes secure APIs for inter-process communication.
