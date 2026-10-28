'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, RotateCcw, X, HelpCircle, FileText, Send, Loader2 } from 'lucide-react';
import { useSimStore } from './store';
import { input, resetCarRuntime, clearInput } from './runtime';
import { STATIONS, OFFICE_STATIONS } from './config';
import { sendContactEmail } from '@/app/actions';
import { usePortfolioView } from '../portfolio-view-store';
import styles from './city.module.css';
import CityDialog from './city-dialog';

type DriveKey = 'forward' | 'backward' | 'left' | 'right' | 'brake';
const keys: Record<string, DriveKey> = {KeyW:'forward',ArrowUp:'forward',KeyS:'backward',ArrowDown:'backward',KeyA:'left',ArrowLeft:'left',KeyD:'right',ArrowRight:'right',Space:'brake'};
const releaseControls = clearInput;

export default function SimulatorHUD() {
  const simulatorActive=useSimStore(s=>s.simulatorActive),stop=useSimStore(s=>s.stop);
  const cameraMode=useSimStore(s=>s.cameraMode),exitStation=useSimStore(s=>s.exitStation);
  const speed=useSimStore(s=>s.speedKmh),target=useSimStore(s=>s.autopilotTarget),setAutopilot=useSimStore(s=>s.setAutopilot);
  const help=useSimStore(s=>s.showHelp),setHelp=useSimStore(s=>s.setShowHelp);
  const contactOpen=useSimStore(s=>s.contactOpen),setContactOpen=useSimStore(s=>s.setContactOpen);
  const quality=useSimStore(s=>s.quality),setQuality=useSimStore(s=>s.setQuality);
  const setViewMode=usePortfolioView(s=>s.setViewMode);
  const router=useRouter(),pathname=usePathname();
  const [offices,setOffices]=useState(false);
  const [form,setForm]=useState({name:'',email:'',message:''});
  const [status,setStatus]=useState<'idle'|'sending'|'success'|'error'>('idle');
  const navigate=(id:string)=>{releaseControls();setOffices(false);if(cameraMode==='interior')exitStation();setAutopilot(id);};
  const leave=()=>{releaseControls();stop();setViewMode('portfolio');if(pathname==='/simulator')router.push('/');};
  const resume=()=>{releaseControls();exitStation();};
  const reset=()=>{releaseControls();setAutopilot(null);exitStation();resetCarRuntime();};

  useEffect(()=>{
    if(!simulatorActive)return;
    const down=(event:KeyboardEvent)=>{
      if(event.target instanceof HTMLElement && (event.target.closest('input,textarea,select,button,a')||event.target.isContentEditable))return;
      if(event.code==='Escape'){setHelp(false);setOffices(false);if(contactOpen)setContactOpen(false);else if(cameraMode==='interior')exitStation();return;}
      if(help||contactOpen)return;
      const key=keys[event.code];if(key){input[key]=true;if(useSimStore.getState().autopilotTarget)setAutopilot(null);event.preventDefault();}
      if(event.code==='KeyR'){setAutopilot(null);exitStation();resetCarRuntime();}
    };
    const up=(event:KeyboardEvent)=>{const key=keys[event.code];if(key)input[key]=false;};
    const visibility=()=>{if(document.hidden)releaseControls();};
    window.addEventListener('keydown',down);window.addEventListener('keyup',up);window.addEventListener('blur',releaseControls);document.addEventListener('visibilitychange',visibility);
    return()=>{releaseControls();window.removeEventListener('keydown',down);window.removeEventListener('keyup',up);window.removeEventListener('blur',releaseControls);document.removeEventListener('visibilitychange',visibility);};
  },[simulatorActive,cameraMode,exitStation,setAutopilot,help,contactOpen,setContactOpen,setHelp]);

  const touch=(key:DriveKey)=>({
    onPointerDown:(event:React.PointerEvent<HTMLButtonElement>)=>{event.currentTarget.setPointerCapture(event.pointerId);if(target)setAutopilot(null);input[key]=true;},
    onPointerUp:()=>{input[key]=false;},onPointerCancel:()=>{input[key]=false;},onLostPointerCapture:()=>{input[key]=false;},
  });
  if(!simulatorActive)return null;
  return <div className={styles.hud}>
    <div className={styles.top}>
      <header className={styles.header}>
        <div className={styles.brand}><span>🌴</span><div><strong>Matthias Amire</strong><small><i /> Software engineer </small></div></div>
        <div className={styles.headerActions}><button className={styles.iconButton} aria-label="Reset car" onClick={reset}><RotateCcw size={16}/></button>
          <button className={styles.iconButton} aria-label="Driving help" onClick={()=>{releaseControls();setHelp(!help);}}><HelpCircle size={17}/></button>
          <button className={styles.portfolioButton} onClick={leave}><FileText size={15}/><span>Portfolio</span></button></div>
      </header>
      <nav className={styles.destinations} aria-label="Drive to a destination">
        <button aria-pressed={target==='estate'} onClick={()=>navigate('estate')}>🏡 <span>Estate</span></button>
        <div className={styles.officeGroup}><button aria-expanded={offices} aria-controls="office-destinations" onClick={()=>setOffices(!offices)}>💼 <span>Offices</span> <small>⌄</small></button>
          {offices&&<div id="office-destinations" className={styles.officeMenu}>{OFFICE_STATIONS.map(office=><button key={office.id} onClick={()=>navigate(office.id)}><span style={{background:office.color}}/>{office.label}</button>)}</div>}</div>
        <button aria-pressed={target==='cinema'} onClick={()=>navigate('cinema')}>🎬 <span>Cinema</span></button>
        <button aria-pressed={target==='callcenter'} onClick={()=>navigate('callcenter')}>📞 <span>Contact</span></button>
      </nav>
      <div className={styles.announcement}>{target?<><span>On the way to {STATIONS.find(s=>s.id===target)?.label}</span><button aria-label="Cancel autopilot" onClick={()=>setAutopilot(null)}><X size={12}/></button></>:<span>My portfolio city. A tour of my work.</span>}</div>
    </div>

    <div className={styles.bottom}>
      <div className={styles.speed}><strong>{speed}<small>km/h</small></strong><span>{target?'Autopilot':cameraMode==='interior'?'Parked':'City drive'}</span></div>
      <section className={styles.exploreCard}><p>👋🏾 <strong>Welcome to my neighbourhood.</strong></p><span>Discover the work, the journey, and the person behind it.</span><div><button className={styles.primary} onClick={()=>cameraMode==='interior'?resume():navigate('estate')}>{cameraMode==='interior'?'Resume driving':'Take a tour'} <ArrowRight size={15}/></button><button onClick={leave}>View portfolio</button></div></section>
      <div className={styles.utilities}><button aria-label="Toggle graphics quality" onClick={()=>setQuality(quality==='high'?'low':'high')}>{quality==='low'?'Eco':'Auto'}</button><span>WASD / arrows to drive</span></div>
    </div>
    <div className={styles.touchControls} aria-label="Touch driving controls"><div><button aria-label="Steer left" {...touch('left')}><ArrowLeft/></button><button aria-label="Steer right" {...touch('right')}><ArrowRight/></button></div><div><button aria-label="Accelerate" {...touch('forward')}><ArrowUp/></button><button aria-label="Reverse" {...touch('backward')}><ArrowDown/></button><button aria-label="Brake" {...touch('brake')}>■</button></div></div>

    {help&&<CityDialog labelledBy="driving-help-title" onClose={()=>setHelp(false)}><section className={styles.modal} aria-labelledby="driving-help-title"><button autoFocus className={styles.close} aria-label="Close driving help" onClick={()=>setHelp(false)}><X size={18}/></button><span className={styles.modalEmoji}>🌴</span><h2 id="driving-help-title">Welcome to my City.</h2><p>A city built around my story. Take the wheel, or choose a destination and let autopilot show you around.</p><div className={styles.helpGrid}><div><strong>Make your own way</strong><p>WASD or arrow keys to drive.<br/>Space to brake. R to reset.<br/>Touch controls on mobile.</p></div><div><strong>Pick a destination</strong><p>🏡 Meet me at the Estate<br/>💼 Explore my experience<br/>🎬 Browse projects at the Cinema</p></div></div><button className={styles.primary} onClick={()=>setHelp(false)}>Start Driving <ArrowRight size={16}/></button></section></CityDialog>}

    {contactOpen&&<CityDialog labelledBy="contact-title" onClose={()=>setContactOpen(false)}><section className={styles.modal} aria-labelledby="contact-title"><button className={styles.close} aria-label="Close contact form" onClick={()=>setContactOpen(false)}><X size={18}/></button><span className={styles.modalEmoji}>📬</span><h2 id="contact-title">Let’s build something.</h2><p>A project, a role, or a tricky problem. I’d love to hear about it.</p>{status==='success'?<p role="status" className={styles.success}>Message sent. Thanks for stopping by!</p>:<form onSubmit={async event=>{event.preventDefault();setStatus('sending');try{const result=await sendContactEmail({...form,subject:'Inquiry via Portfolio City Drive'});setStatus(result.success?'success':'error');if(result.success)setForm({name:'',email:'',message:''});}catch{setStatus('error');}}}><label>Your name<input autoFocus required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Email address<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label><label>Message<textarea required rows={4} value={form.message} onChange={e=>setForm({...form,message:e.target.value})}/></label>{status==='error'&&<p role="alert">Could not send. Please email support@matthiasamire.com.</p>}<button className={styles.primary} disabled={status==='sending'}>{status==='sending'?<Loader2 className="animate-spin" size={16}/>:<Send size={16}/>} Send message</button></form>}</section></CityDialog>}
  </div>;
}
