// RUNS IN APPLICATION
//------------------------------------------------------------------------------

onload = () => {
  const {app, BrowserWindow} = require('electron').remote
  const webview = document.querySelector('#main-view')

  webview.addEventListener('new-window', (e) => {
    const protocol = require('url').parse(e.url).protocol

    if (protocol === 'http:' || protocol === 'https:') {
      //shell.openExternal(e.url)
      let win = new BrowserWindow({width: 1280, height: 960, center: true, title:"Grepolis Desktop", nodeIntegration:false})
      win.loadURL(e.url)

      win.webContents.on('dom-ready', () => {
        //console.log("win is ready!")
        win.webContents.insertCSS("#globalWrapper {overflow: hidden !important;}")
      })

    }
  })

  //Displays loading indicator, when webview is loading
  const indicator = document.querySelector('#loading-indicator')
  const loadstart = () => {
    indicator.style.opacity = "1";
  }
  const loadstop = () => {
    indicator.style.opacity = "0";
  }
  webview.addEventListener( 'did-start-loading', loadstart )
  webview.addEventListener( 'did-stop-loading' ,  loadstop )
}
