:root{--blue:#1565C0;--bg:#E3F2FD}
*{box-sizing:border-box;font-family:Segoe UI,Roboto}
body{background:var(--bg);margin:0;display:grid;place-items:center;min-height:100vh;padding:16px}
.wrap{background:#fff;padding:20px;border-radius:16px;box-shadow:0 6px 20px rgba(0,0,0,.1);max-width:420px;width:100%;text-align:center}
h2{margin:0 0 10px;color:var(--blue)} h2 span{display:block;font-size:12px;color:#555}
input[type=file]{margin:12px 0}
.preview{margin:12px auto;border:2px dashed var(--blue);border-radius:12px;overflow:hidden}
canvas{background:#fff;display:block;margin:auto;max-width:100%;height:auto}
.controls{margin:12px 0} input[type=range]{width:100%}
.btns{display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-top:12px}
button{padding:12px;border:0;border-radius:10px;background:var(--blue);color:#fff;font-weight:600;cursor:pointer}
button:disabled{background:#aaa;cursor:not-allowed}
#status{font-size:12px;margin-top:8px;color:#333;min-height:18px}
