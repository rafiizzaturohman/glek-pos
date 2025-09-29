// main.ts

// Perhatikan penambahan import baru ini
import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url"; // <-- Tambahkan import ini
import isDev from "electron-is-dev";

// Baris ini adalah solusinya: membuat __dirname di lingkungan ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
  const win = new BrowserWindow({
    width: 1980,
    height: 1080,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"), // <-- __dirname sekarang sudah didefinisikan
    },
  });

  const url = isDev
    ? "http://localhost:3000"
    : `file://${path.join(__dirname, "../out/index.html")}`; // <-- __dirname sekarang sudah didefinisikan

  win.loadURL(url);

  if (isDev) {
    win.webContents.openDevTools();
  }
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
