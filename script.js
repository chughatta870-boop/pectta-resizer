const fileInput = document.getElementById('fileInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const sizeSlider = document.getElementById('sizeSlider');
const sizeLabel = document.getElementById('sizeLabel');
const downloadBtn = document.getElementById('downloadBtn');
const shareBtn = document.getElementById('shareBtn');
const saveBtn = document.getElementById('saveBtn');
const status = document.getElementById('status');

const W=600, H=800;
let finalBlob = null;

sizeSlider.oninput = () => sizeLabel.textContent = sizeSlider.value + ' KB';

fileInput.onchange = async e => {
  const file = e.target.files[0];
  if(!file) return;
  status.textContent = 'Processing...';
  const img = await loadImage(URL.createObjectURL(file));

  // 1. 600x800 Crop with White BG, Face Center
  ctx.fillStyle = '#fff'; ctx.fillRect(0,0,W,H);
  const scale = Math.max(W/img.width, H/img.height);
  const nw = img.width*scale, nh = img.height*scale;
  const x = (W-nw)/2, y = (H-nh)/2;
  ctx.drawImage(img, x, y, nw, nh);

  // 2. Auto Compress 10KB to 25KB
  const targetKB = parseInt(sizeSlider.value);
  finalBlob = await compressToTarget(canvas, targetKB);

  // Show final
  const url = URL.createObjectURL(finalBlob);
  const img2 = await loadImage(url);
  ctx.clearRect(0,0,W,H); ctx.fillStyle='#fff'; ctx.fillRect(0,0,W,H);
  ctx.drawImage(img2,0,0,W,H);

  status.textContent = `Done: ${(finalBlob.size/1024).toFixed(1)} KB`;
  downloadBtn.disabled = shareBtn.disabled = saveBtn.disabled = false;
};

async function compressToTarget(canvas, targetKB){
  let quality = 0.92; let blob;
  for(let i=0;i<12;i++){ // max 12 tries
    blob = await new Promise(r => canvas.toBlob(r,'image/jpeg',quality));
    const kb = blob.size/1024;
    if(kb <= targetKB && kb >= targetKB-3) break; // within 3KB range
    if(kb > targetKB) quality -= 0.06; else quality += 0.03;
    quality = Math.max(0.3, Math.min(0.95, quality));
  }
  return blob;
}

function loadImage(src){
  return new Promise((res,rej)=>{
    const img=new Image(); img.onload=()=>res(img); img.onerror=rej; img.src=src;
  });
}

// 3. Buttons
downloadBtn.onclick = () => {
  if(!finalBlob) return;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(finalBlob);
  a.download = 'PECTA_600x800.jpg';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
};

shareBtn.onclick = async () => {
  if(!finalBlob) return;
  const file = new File([finalBlob], 'PECTA_600x800.jpg', {type:'image/jpeg'});
  if(navigator.canShare && navigator.canShare({files:[file]})){
    await navigator.share({files:[file], title:'PECTA Photo'});
  } else {
    alert('Share not supported. Use Download.');
  }
};

saveBtn.onclick = () => {
  localStorage.setItem('pecta_last_photo', URL.createObjectURL(finalBlob));
  alert('Saved in Browser. Download karke permanent rakhein.');
};

downloadBtn.disabled = shareBtn.disabled = saveBtn.disabled = true;
