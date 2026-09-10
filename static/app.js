let state=null, sound=true, wheelRotation=0, audioCtx=null, spinTimer=null;
const $=id=>document.getElementById(id);
async function api(url,opts={}){
  let r;
  try { r = await fetch(url,opts); }
  catch (e) { throw Error("Tidak dapat terhubung ke server."); }
  const type = r.headers.get("content-type") || "";
  let d;
  if (type.includes("application/json")) {
    d = await r.json();
  } else {
    await r.text();
    if (r.status === 413) throw Error("File terlalu besar. Maksimal 10 MB.");
    if (r.status >= 500) throw Error("Server gagal memproses permintaan. Periksa terminal tempat app.py dijalankan.");
    throw Error(`Server mengembalikan respons yang tidak valid (HTTP ${r.status}).`);
  }
  if (!r.ok) throw Error(d.error || "Gagal");
  return d;
}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
async function load(){state=await api("/api/state");render()}
function render(){
  const {participants:p,prizes,winners,stats}=state;
  $("sParticipants").textContent=stats.participants;$("sEligible").textContent=stats.eligible;
  $("sWinners").textContent=stats.winners;$("sPrizes").textContent=stats.remaining_prizes;
  $("pCount").textContent=p.length;$("prizeCount").textContent=stats.remaining_prizes;
  $("participants").innerHTML=p.map((x,i)=>`<tr><td>${i+1}</td><td><b>${esc(x.ticket||"-")}</b></td><td>${esc(x.name||"-")}</td><td>${esc(x.department||"-")}</td><td>${esc(x.phone||"-")}</td><td>${x.attendance_status==='HADIR'?'<span class="badge success">HADIR</span>':'<span class="badge">BELUM HADIR</span>'}</td><td><button class="x" onclick="delP(${x.id})">✕</button></td></tr>`).join("")||'<tr><td colspan="7">Belum ada peserta.</td></tr>';
  $("prizes").innerHTML=prizes.map(x=>`<div class="row"><span>🎁 ${esc(x.name)} <small>×${x.remaining}/${x.quantity}</small></span><button class="x" onclick="delPrize(${x.id})">✕</button></div>`).join("")||"<small>Belum ada hadiah.</small>";
  $("prizeSelect").innerHTML='<option value="">Tanpa hadiah</option>'+prizes.filter(x=>x.remaining>0).map(x=>`<option value="${x.id}">${esc(x.name)} — ${x.remaining} tersisa</option>`).join("");
  $("winners").innerHTML=winners.map(w=>`<div class="row winner-row"><div><strong>🏆 ${esc(w.name)}</strong><small>${w.prize?`🎁 ${esc(w.prize)}`:"Doorprize"} ${w.ticket?`• #${esc(w.ticket)}`:""}</small></div><small>${new Date(w.drawn_at).toLocaleString("id-ID")}</small></div>`).join("")||"<small>Belum ada pemenang.</small>";
}
$("participantForm").onsubmit=async e=>{e.preventDefault();try{await api("/api/participants",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:$("name").value,ticket:$("ticket").value,department:$("department").value,phone:$("phone").value})});e.target.reset();load()}catch(e){toast(e.message)}};
$("prizeForm").onsubmit=async e=>{e.preventDefault();try{await api("/api/prizes",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:$("prizeName").value,quantity:$("quantity").value})});e.target.reset();$("quantity").value=1;load()}catch(e){toast(e.message)}};
$("excel").onchange=async e=>{
  let f=e.target.files[0];
  if(!f)return;
  if(!/\.(xlsx|xlsm)$/i.test(f.name)){
    toast("Format tidak didukung. Gunakan file Excel .xlsx atau .xlsm.");
    e.target.value="";
    return;
  }
  if(f.size > 10*1024*1024){
    toast("File terlalu besar. Maksimal 10 MB.");
    e.target.value="";
    return;
  }
  let fd=new FormData();
  fd.append("file",f);
  toast("Mengimpor Excel...");
  try{
    let d=await api("/api/import-excel",{method:"POST",body:fd});
    toast(`${d.inserted} peserta berhasil diimpor`);
    await load();
  }catch(x){
    toast(x.message);
  }finally{
    e.target.value="";
  }
};
async function delP(id){if(confirm("Hapus peserta?")){await api("/api/participants/"+id,{method:"DELETE"});load()}}
$("prizeExcel").onchange=async e=>{
  const f=e.target.files[0];
  if(!f)return;
  if(!/\.(xlsx|xlsm)$/i.test(f.name)){
    toast("Format tidak didukung. Gunakan file Excel .xlsx atau .xlsm.");
    e.target.value=""; return;
  }
  if(f.size>10*1024*1024){
    toast("File terlalu besar. Maksimal 10 MB.");
    e.target.value=""; return;
  }
  const fd=new FormData(); fd.append("file",f);
  toast("Mengimpor hadiah...");
  try{
    const d=await api("/api/import-prizes",{method:"POST",body:fd});
    toast(d.message || `${d.inserted} hadiah berhasil diimpor`);
    await load();
  }catch(err){ toast(err.message); }
  finally{ e.target.value=""; }
};

async function delPrize(id){if(confirm("Hapus hadiah?")){await api("/api/prizes/"+id,{method:"DELETE"});load()}}
function toggleSound(){sound=!sound;$("soundBtn").textContent=sound?"🔊 Suara ON":"🔇 Suara OFF";$("soundBtn").classList.toggle("on",sound);if(sound)startAudio()}
function startAudio(){if(!sound)return;if(!audioCtx)audioCtx=new (window.AudioContext||window.webkitAudioContext)();if(audioCtx.state==="suspended")audioCtx.resume()}
function tone(freq,dur,type="sine",gain=.05,delay=0){if(!sound)return;startAudio();let o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=type;o.frequency.value=freq;g.gain.setValueAtTime(.0001,audioCtx.currentTime+delay);g.gain.exponentialRampToValueAtTime(gain,audioCtx.currentTime+delay+.02);g.gain.exponentialRampToValueAtTime(.0001,audioCtx.currentTime+delay+dur);o.connect(g);g.connect(audioCtx.destination);o.start(audioCtx.currentTime+delay);o.stop(audioCtx.currentTime+delay+dur+.03)}
function drumroll(){if(!sound)return;startAudio();let n=0;clearInterval(spinTimer);spinTimer=setInterval(()=>{tone(110+Math.random()*80,.055,"triangle",.025);n++;if(n>42)clearInterval(spinTimer)},65)}
function fanfare(){[523,659,784,1046].forEach((f,i)=>tone(f,.28,"sine",.07,i*.13))}
async function draw(){
  if(!state.stats.eligible){toast("Tidak ada peserta yang eligible.");return}
  $("drawBtn").disabled=true; $("winnerCard").classList.add("hidden");$("rolling").classList.remove("hidden");$("rolling").classList.add("spin");$("rolling").textContent="MENENTUKAN...";
  startAudio();drumroll();
  const turns=6+Math.floor(Math.random()*3), offset=Math.random()*360;
  wheelRotation+=turns*360+offset;$("wheel").style.transform=`rotate(${wheelRotation}deg)`;
  let candidates=state.participants.filter(x=>!x.is_winner && x.attendance_status==='HADIR'), i=0;
  const interval=setInterval(()=>{$("rolling").textContent=candidates[i++%candidates.length].name},80);
  try{
    const r=await api("/api/draw",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({prize_id:$("prizeSelect").value||null})});
    setTimeout(()=>{clearInterval(interval);clearInterval(spinTimer);$("rolling").classList.remove("spin");$("rolling").classList.add("hidden");
      $("winnerName").textContent=r.participant.name;
      $("winnerMeta").textContent=[r.participant.ticket&&`Tiket: ${r.participant.ticket}`,r.participant.department].filter(Boolean).join(" • ");
      $("winnerPrize").textContent=r.prize?`🎁 ${r.prize.name}`:"🎉 Pemenang Doorprize";
      $("winnerCard").classList.remove("hidden");fanfare();confetti();load();$("drawBtn").disabled=false;
    },900);
  }catch(e){clearInterval(interval);clearInterval(spinTimer);toast(e.message);$("drawBtn").disabled=false}
}
function confetti(){for(let i=0;i<70;i++){let s=document.createElement("span");s.textContent=["🎉","✨","🎊","⭐","◆"][Math.floor(Math.random()*5)];s.style.position="fixed";s.style.left=Math.random()*100+"vw";s.style.top="-30px";s.style.zIndex=999;s.style.fontSize=(14+Math.random()*25)+"px";s.style.transition="transform 2.4s linear,opacity 2.4s";document.body.appendChild(s);requestAnimationFrame(()=>{s.style.transform=`translate(${(Math.random()-.5)*260}px,${innerHeight+80}px) rotate(${Math.random()*1000}deg)`;s.style.opacity=0});setTimeout(()=>s.remove(),2500)}}
async function resetDraws(){if(confirm("Reset semua hasil undian? Peserta akan kembali eligible dan stok hadiah dipulihkan.")){await api("/api/reset",{method:"POST"});$("winnerCard").classList.add("hidden");load()}}
async function resetAll(){if(confirm("HAPUS SEMUA PESERTA, HADIAH, DAN RIWAYAT?")){await api("/api/reset-all",{method:"POST"});closeSettings();load()}}
function openSettings(){let s=state.settings;$("setName").value=s.event_name;$("setSubtitle").value=s.event_subtitle;$("settingsModal").classList.remove("hidden")}
function closeSettings(){$("settingsModal").classList.add("hidden")}
async function saveSettings(){
  await api("/api/settings",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({event_name:$("setName").value,event_subtitle:$("setSubtitle").value})});
  let f=$("logoFile").files[0];if(f){let fd=new FormData();fd.append("logo",f);await api("/api/logo",{method:"POST",body:fd})}
  closeSettings();load()
}
function toggleFullscreen(){if(!document.fullscreenElement)document.documentElement.requestFullscreen().catch(()=>toast("Fullscreen ditolak browser"));else document.exitFullscreen()}
function toast(t){$("toast").textContent=t;$("toast").classList.add("show");setTimeout(()=>$("toast").classList.remove("show"),2600)}
load();

/* QR scanner reliability fallback: use native BarcodeDetector when the external scanner library is unavailable. */
let nativeQRScanner=null;
async function startScanner(){
  if(qrScanner || nativeQRScanner) return;
  const box=$("qr-reader");
  if(!box){ toast("Area scanner QR tidak ditemukan."); return; }
  if(window.Html5Qrcode){
    qrScanner=new Html5Qrcode("qr-reader");
    try{
      await qrScanner.start({facingMode:"environment"},{fps:10,qrbox:{width:250,height:250}},text=>{
        qrScanner.pause(true);
        checkinToken(text).finally(()=>setTimeout(()=>{try{qrScanner.resume()}catch(e){}},1200));
      },()=>{});
      toast("Scanner QR aktif");
      return;
    }catch(e){ try{await qrScanner.clear()}catch(_){} qrScanner=null; }
  }
  if(!window.BarcodeDetector){
    toast("Scanner QR tidak tersedia. Gunakan Chrome/Edge terbaru atau Nomor Tiket.");
    return;
  }
  if(!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia){
    toast("Browser tidak mengizinkan akses kamera."); return;
  }
  try{
    const detector=new BarcodeDetector({formats:["qr_code"]});
    const video=document.createElement("video");
    video.autoplay=true; video.muted=true; video.playsInline=true;
    video.style.width="100%"; video.style.minHeight="280px"; video.style.objectFit="cover";
    box.innerHTML=""; box.appendChild(video);
    const stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:"environment"}},audio:false});
    video.srcObject=stream;
    nativeQRScanner={stream,video,stopped:false,detector,busy:false};
    const scan=async()=>{
      if(!nativeQRScanner || nativeQRScanner.stopped) return;
      if(!nativeQRScanner.busy){
        try{
          const codes=await detector.detect(video);
          if(codes.length && codes[0].rawValue){
            nativeQRScanner.busy=true;
            await checkinToken(codes[0].rawValue);
            setTimeout(()=>{if(nativeQRScanner)nativeQRScanner.busy=false;},1000);
          }
        }catch(e){}
      }
      requestAnimationFrame(scan);
    };
    requestAnimationFrame(scan);
    toast("Scanner QR aktif");
  }catch(e){
    nativeQRScanner=null;
    toast("Kamera tidak dapat dibuka. Izinkan akses kamera.");
  }
}
async function stopScanner(){
  if(qrScanner){try{await qrScanner.stop()}catch(e){}try{await qrScanner.clear()}catch(e){}qrScanner=null;return;}
  if(nativeQRScanner){
    nativeQRScanner.stopped=true;
    try{nativeQRScanner.stream.getTracks().forEach(t=>t.stop())}catch(e){}
    try{nativeQRScanner.video.remove()}catch(e){}
    nativeQRScanner=null;
    const box=$("qr-reader"); if(box)box.innerHTML="";
  }
}


function bindAttendanceControls(){
  const start=$('startScanner'), stop=$('stopScanner'), manual=$('manualCheckin'), input=$('manualTicket');
  if(start) start.addEventListener('click', async ()=>{
    start.disabled=true;
    try{ await startScanner(); } finally { if(!qrScanner && !nativeQRScanner) start.disabled=false; }
  });
  if(stop) stop.addEventListener('click', async ()=>{
    await stopScanner();
    if(start) start.disabled=false;
    toast('Scanner dihentikan');
  });
  if(manual) manual.addEventListener('click', async ()=>{
    const ticket=(input?.value||'').trim();
    if(!ticket){toast('Nomor tiket belum diisi.'); input?.focus(); return;}
    manual.disabled=true;
    try{
      const d=await api('/api/attendance/checkin',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({ticket})});
      showAttendance(d.participant,d.message,d.already);
      if(input) input.value='';
    }catch(e){toast(e.message)}
    finally{manual.disabled=false;}
  });
  if(input) input.addEventListener('keydown',e=>{if(e.key==='Enter') manual?.click()});
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',()=>{bindAttendanceControls();loadAttendance();});
}else{
  bindAttendanceControls(); loadAttendance();
}
