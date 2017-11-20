// RUNS IN APPLICATION
//------------------------------------------------------------------------------

onload = () => {
  const {app, BrowserWindow} = require('electron').remote
  const webview = document.querySelector('#main-view')

  

  webview.addEventListener('new-window', (e) => {
    const protocol = require('url').parse(e.url).protocol

    if (protocol === 'http:' || protocol === 'https:') {
      //shell.openExternal(e.url)
      let win = new BrowserWindow({width: 800, height: 600, center: true, title:"Grepolis Desktop", nodeIntegration:false})
      win.loadURL(e.url)

      win.webContents.on('dom-ready', () => {
        //console.log("win is ready!")
        win.webContents.insertCSS("#globalWrapper{overflow: hidden !important;}")
      })

    }
  })

  //Displays loading indicator, when webview is loading
  const indicator = document.querySelector('#loading-indicator')
  const loadstart = () => {
    indicator.style.opacity = "1";
    var ww = document.querySelector('webview');
    ww.insertCSS("::-webkit-scrollbar{width:6px;height:6px;background-color:rgb(56, 44, 33)}::-webkit-scrollbar-track{-webkit-border-radius:0;border-radius:0;}::-webkit-scrollbar-thumb{-webkit-border-radius:0;border-radius:0;background:rgb(94, 72, 45)}::-webkit-scrollbar-thumb:window-inactive{background:rgb(94, 72, 45)}");
  }
  const loadstop = () => {
    indicator.style.opacity = "0";
    var ww = document.querySelector('webview');
    ww.insertCSS("::-webkit-scrollbar{width:6px;height:6px;background-color:rgb(56, 44, 33)}::-webkit-scrollbar-track{-webkit-border-radius:0;border-radius:0;}::-webkit-scrollbar-thumb{-webkit-border-radius:0;border-radius:0;background:rgb(94, 72, 45)}::-webkit-scrollbar-thumb:window-inactive{background:rgb(94, 72, 45)}");
  }
  webview.addEventListener( 'did-start-loading', loadstart )
  webview.addEventListener( 'did-stop-loading' ,  loadstop )
}
