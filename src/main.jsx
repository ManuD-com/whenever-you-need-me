import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Heart, Music2, Volume2, VolumeX, Sparkles, LockKeyhole, ArrowLeft, X, Play, Pause, Camera, Mic, Video, Stars, MailOpen, Moon, Gift, Smile, ChevronRight } from 'lucide-react';
import './styles.css';

const LETTERS = [
  { id:'sad', title:"Open when you're sad", emoji:'🥺', tint:'rose', tag:'a soft place to land', text:[
    "Hey, you. Come here for a second. Take a breath. You don't have to explain the heaviness, make it smaller, or pretend you're okay with me.",
    "I wish I could sit beside you right now, bring you your favourite something, and let the world be quiet for a while. Since I can't always do that in person, let these words sit with you: you are loved. You matter more than you know. And one difficult day will never change that.",
    "You have made so many days brighter just by being in them. Please give yourself the same gentleness you give everyone else. Drink a little water, unclench your shoulders, and take this one tiny moment at a time.",
    "You are not a burden. You are not alone. I'm always in your corner. Even on the days you can't see your own light, I can."
  ], photo:'Add a favourite photo of us here', icon:'♡' },
  { id:'laugh', title:'Open when you need to laugh', emoji:'😂', tint:'peach', tag:'emergency silliness department', text:[
    "URGENT ANNOUNCEMENT: you have been selected for a mandatory giggle break. Please put down the serious thoughts. This is not a drill.",
    "Remember that time we thought we were being normal and absolutely were not? Honestly, if anyone ever made a documentary about our decisions, it would be filed under comedy, mystery, and mild public concern.",
    "If laughter is medicine, our shared memories are an entire pharmacy. I hope you laugh so hard your cheeks hurt. And if you don't, I will personally send you the most embarrassing picture I can find."
  ], photo:'Add the most embarrassing photo evidence', gallery:true },
  
{
  id: 'miss',
  title: 'Im Sorry, My Person 🥺',
  emoji: '🫂',
  tint: 'lilac',
  tag: 'a hug, in letter form',
  text: [
    "Hey you,",
    "I know I haven't behaved the way I should have. I have shouted, argued, gone against you, and sometimes let my anger speak louder than my feelings.",
    "I know that my behaviour might have hurt you, and honestly, I'm sorry.",
    "You didn't deserve to be spoken to that way. I may not always agree with you, and I may not always understand things immediately, but that doesn't mean I should hurt you or make you feel like your feelings don't matter.",
    "Sometimes I react without thinking. I let my ego and anger take over, and later I realise that I could have handled things so much better.",
    "I'm not writing this to justify anything or to make you forget what happened. I just want you to know that I recognise where I went wrong, and I genuinely regret it.",
    "I can't promise that I'll never make a mistake again, but I can promise to try harder, listen more, communicate better, and think before I react.",
    "You mean a lot to me, and I never want my behaviour to make you question that.",
    "I'm sorry for the times I made things difficult when I could have simply understood you.",
    "No excuses. No blaming you. Just a genuine sorry from my heart.",
    "And whenever you're ready, I'd really like us to be okay again. ❤️",
    "I'm sorry. Truly."
  ],
  photo: 'Add a little photo gallery of our favourite days',
  audio: 'Add your voice note file at /media/voice-note.mp3'
},

  { id:'enough', title:"Open when you feel you're not enough", emoji:'🫶🏻', tint:'sage', tag:'a reminder of who you are', text:[
    "I need you to borrow my eyes for a moment, because yours are being unfair to you right now.",
    "You are thoughtful in ways you don't even notice. You keep showing up. You care deeply. You make people feel seen. You have a kind of strength that isn't loud, and a heart that keeps choosing kindness even when life gets complicated.",
    "You do not have to achieve something today to deserve love. You don't need to be the best, the brightest, or the easiest person to understand. You are already worthy, exactly as you are.",
    "Please don't measure your whole story by one hard chapter. I am so proud of the person you are becoming — and I hope you are, too."
  ], reasons:['Your kindness makes people feel safe','You keep trying, even when it is hard','Your laugh is genuinely contagious','You make ordinary moments feel special','You are wonderfully, unmistakably you'] },
  { id:'sleep', title:"Open when you can't sleep", emoji:'🌙', tint:'blue', tag:'a quieter kind of night', text:[
    "It's late, and the world has finally turned its volume down. Let your thoughts loosen their grip for a little while.",
    "Unclench your jaw. Let your shoulders fall. Breathe in slowly… and breathe out even slower. You do not need to solve tomorrow tonight. Nothing important about your worth is waiting on the other side of this sleepless night.",
    "Imagine a soft blanket, a cool pillow, and the gentlest rain outside. I hope your mind feels a little less crowded. If sleep takes its time, that's okay. Resting is still resting."
  ], audio:'Add a calming audio file at /media/night-audio.mp3' },
  { id:'angry', title:"Open when you're angry at me", emoji:'😭', tint:'butter', tag:'official apology department', text:[
    "First of all: fair. Second of all: I would like to submit this tiny envelope as Exhibit A in my defence.",
    "I may be dramatic, occasionally silly, and sometimes operating with exactly two brain cells. But I care about you a ridiculous amount, and I never want you to feel unheard.",
    "If I messed up, I'm sorry. The jokes are here to make you smile, not to dodge a real apology. You deserve honesty, care, and an actual conversation whenever you're ready.",
    "P.S. I am willing to negotiate peace terms involving snacks."
  ], forgive:true },
  { id:'motivation', title:'Open when you need motivation', emoji:'✨', tint:'lavender', tag:'your little pep talk', text:[
    "Look how far you've already come. I know it can feel like you're standing still when you're focused on the distance left to travel, but please turn around and notice how much ground is behind you.",
    "You have figured things out before. You have survived days you thought would swallow you whole. You have learned, grown, started again, and kept going. That counts. Every small step counts.",
    "You don't need the whole plan today. Just the next step. Do it imperfectly. Take a break when you need one. Ask for help. Begin again tomorrow if you have to.",
    "I believe in you — not because I expect you to never struggle, but because I know you can meet the struggle and still find your way."
  ] },
  { id:'memories', title:'Open when you want to remember us', emoji:'📸', tint:'rose', tag:'little moments, forever kept', text:[
    "Some of my favourite memories aren't big events. They're the random conversations, the laughing at absolutely nothing, the tiny traditions, and the moments I didn't know would become memories.",
    "Here's to all the versions of us we've been so far — and all the lovely ones still waiting."
  ], timeline:true, gallery:true }
];

const COMPLIMENTS = [
  "You make the world softer just by being in it. 💗",
  "Your heart is one of your best superpowers.",
  "You are someone's favourite notification. (Mine, obviously.)",
  "You deserve the same kindness you give away so freely.",
  "You are doing better than your brain is telling you.",
  "The world got a little luckier when you showed up."
];

function App() {
  const [page, setPage] = useState('home');
  const [active, setActive] = useState(null);
  const [opened, setOpened] = useState(() => JSON.parse(localStorage.getItem('wym-opened') || '[]'));
  const [secretUnlocked, setSecretUnlocked] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [compliment, setCompliment] = useState('');
  const [forgiven, setForgiven] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [muted, setMuted] = useState(false);
  const [randomNote, setRandomNote] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => { localStorage.setItem('wym-opened', JSON.stringify(opened)); }, [opened]);
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.muted = muted;
    if (musicOn) audio.play().catch(() => setMusicOn(false));
    else audio.pause();
  }, [musicOn, muted]);

  const openLetter = (letter, random=false) => {
    setActive(letter);
    setPage('letter');
    setRandomNote(random);
    setForgiven(false);
    setOpened(prev => prev.includes(letter.id) ? prev : [...prev, letter.id]);
    window.scrollTo({top:0, behavior:'smooth'});
  };
  const backToLetters = () => { setPage('letters'); setActive(null); setRandomNote(false); window.scrollTo({top:0, behavior:'smooth'}); };
  const chooseRandom = () => {
    const letter = LETTERS[Math.floor(Math.random() * LETTERS.length)];
    setRandomNote(true);
    openLetter(letter, true);
  };
  const unlock = (e) => {
    e.preventDefault();
    const expected = (import.meta.env.VITE_SECRET_PASSWORD || 'ourlittleuniverse').trim().toLowerCase();
    if (password.trim().toLowerCase() === expected) {
      setSecretUnlocked(true); setPasswordError('');
      setOpened(prev => prev.includes('secret') ? prev : [...prev, 'secret']);
    } else setPasswordError('Not quite, lovely. Try your special little secret again. 💌');
  };
  const showCompliment = () => {
    let next = COMPLIMENTS[Math.floor(Math.random()*COMPLIMENTS.length)];
    if (COMPLIMENTS.length > 1 && next === compliment) next = COMPLIMENTS[(COMPLIMENTS.indexOf(next)+1)%COMPLIMENTS.length];
    setCompliment(next);
  };

  return <div className="app-shell">
    <audio ref={audioRef} src="/media/background.mp3" loop />
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <div className="floaties" aria-hidden="true">{['♡','✧','♡','✦','·','♡','✧','♡'].map((s,i)=><span key={i} style={{'--i':i}}>{s}</span>)}</div>
    <header className="topbar">
      <button className="brand" onClick={()=>{setPage('home');setActive(null)}}><span className="brand-mark">♡</span> a little love letter</button>
      <div className="top-actions">
        <span className="opened-count"><Heart size={14} fill="currentColor"/> {opened.length} letters opened</span>
        <button className="icon-btn" aria-label={musicOn?'Pause music':'Play music'} onClick={()=>setMusicOn(!musicOn)}>{musicOn?<Pause size={17}/>:<Music2 size={17}/>}</button>
        <button className="icon-btn" aria-label={muted?'Unmute':'Mute'} onClick={()=>setMuted(!muted)}>{muted?<VolumeX size={17}/>:<Volume2 size={17}/>}</button>
      </div>
    </header>

    {page==='home' && <main className="hero page-enter">
      <div className="eyebrow"><span/> A LITTLE SOMETHING, JUST FOR YOU <span/></div>
      <div className="mailbox-scene">
        <div className="orbit orbit-a">✧</div><div className="orbit orbit-b">♡</div><div className="mailbox">
          <div className="mailbox-flag"/><div className="mailbox-top"/><div className="mailbox-body"><span className="mail-heart">♡</span><span className="mail-slot"/></div>
          <div className="mailbox-post"/>
        </div>
        <div className="mini-envelope">💌</div><div className="sparkle s1">✦</div><div className="sparkle s2">✧</div><div className="sparkle s3">✦</div>
      </div>
      <h1>Whenever You<br/><em>Need Me</em> <span className="title-heart">♡</span></h1>
      <p className="hero-subtitle">A little place filled with words, memories,<br className="desktop-break"/> and love, just for you.</p>
      <div className="intro-card"><span className="quote-mark">“</span><p>I couldn't always be there at the exact moment you needed me, so I made this little place for you. Whenever life feels overwhelming, whenever you miss me, whenever you need a laugh, or whenever you just need a reminder of how special you are... there's a little piece of me waiting here.</p><span className="quote-sign">— always, me ♡</span></div>
      <button className="primary-btn" onClick={()=>setPage('letters')}>Open Your Little Mailbox <MailOpen size={17}/></button>
      <p className="tiny-note">made with a whole lot of love <Heart size={11} fill="currentColor"/></p>
      <button className="text-link" onClick={chooseRandom}>or… surprise me with a letter <ChevronRight size={14}/></button>
    </main>}

    {page==='letters' && <main className="dashboard page-enter">
      <div className="section-heading"><div className="eyebrow"><span/> YOUR LITTLE COLLECTION <span/></div><h2>For every kind of day.</h2><p>Pick the envelope that feels like you right now.</p></div>
      <div className="letter-grid">{LETTERS.map((letter,i)=><button className={`envelope-card ${letter.tint}`} key={letter.id} onClick={()=>openLetter(letter)} style={{'--delay':`${i*55}ms`}}>
        <span className="card-number">0{i+1}</span><span className="envelope-emoji">{letter.emoji}</span><span className="envelope-graphic"><span className="env-flap"/><span className="env-heart">♡</span></span><strong>{letter.title}</strong><small>{letter.tag}</small><span className="card-open">{opened.includes(letter.id)?'opened with love':'tap to open'} <ChevronRight size={13}/></span>
        {opened.includes(letter.id)&&<span className="read-dot"><Heart size={10} fill="currentColor"/></span>}
      </button>)}</div>
      <div className="secret-teaser"><div className="secret-lock"><LockKeyhole size={20}/></div><div><span className="eyebrow">A LITTLE SECRET</span><h3>One last letter is waiting…</h3><p>For when you've wandered through every little envelope.</p></div><button className="outline-btn" onClick={()=>setPage('secret')}>Find the key <ChevronRight size={15}/></button></div>
      <div className="dashboard-bottom"><button className="primary-btn" onClick={chooseRandom}>I need something right now <span>🥹</span></button><button className="love-btn" onClick={showCompliment}><Heart size={16} fill="currentColor"/> You are loved</button></div>
      {compliment&&<div className="compliment-pop"><Sparkles size={15}/>{compliment}<button onClick={()=>setCompliment('')} aria-label="Close"><X size={14}/></button></div>}
    </main>}

    {page==='letter' && active && <main className="letter-view page-enter">
      <button className="back-link" onClick={backToLetters}><ArrowLeft size={16}/> Back to envelopes</button>
      {randomNote&&<div className="random-note"><Sparkles size={15}/> A little message found its way to you. Take what you need. ♡</div>}
      <div className={`letter-paper ${active.tint}`}>
        <div className="paper-top"><span>JUST FOR YOU</span><span>♡ &nbsp; WITH LOVE</span></div>
        <div className="letter-icon">{active.emoji}</div>
        <h2>{active.title}</h2><p className="letter-kicker">{active.tag}</p>
        <div className="letter-copy">{active.text.map((p,i)=><p key={i} style={{'--delay':`${i*180}ms`}}>{p}</p>)}</div>

{active.photo && (
  <div className="personal-photo">
    <img
      src={`/media/${active.id === 'sad'
        ? 'sad-photo.png'
        : 'funny-photo.png'}`}
      alt="Our special memory"
    />
    <p>A little memory of us ♡</p>
  </div>
)}


{active.gallery && (
  <div className="gallery-row">
    <div className="memory-photo">
      <img src="/media/memory-1.png" alt="Memory 1" />
      <p>Memory 01 ♡</p>
    </div>

    <div className="memory-photo">
      <img src="/media/memory-2.png" alt="Memory 2" />
      <p>Memory 02 ♡</p>
    </div>

    <div className="memory-photo">
      <img src="/media/memory-3.png" alt="Memory 3" />
      <p>Memory 03 ♡</p>
    </div>
  </div>
)}
        
{active.audio && (
  <div className="audio-box">
    <p>🎧 A little message from me</p>
    <audio
      controls
      src={active.id === 'miss'
        ? '/media/voicenote.mp3'
        : '/media/night audio.mp3'}
    />
  </div>
)}

        {active.reasons&&<div className="reasons"><h3>Little things I hope you never forget</h3>{active.reasons.map((r,i)=><div key={r}><span>0{i+1}</span>{r}<Heart size={13}/></div>)}</div>}
        {active.forgive&&<div className="forgive-box"><div className={`forgive-face ${forgiven?'happy':''}`}>{forgiven?'🥹':'🥺'}</div><button className="primary-btn" onClick={()=>setForgiven(true)}>{forgiven?'YAY!! PEACE HAS BEEN RESTORED 💗':'Okay, I forgive you (maybe)'}</button>{forgiven&&<p className="forgive-response">*dramatically throws confetti* I knew you had excellent taste. Sending hugs. 🫂</p>}</div>}
        {active.timeline&&<div className="timeline"><h3>Our little timeline</h3>{['The beginning — when a hello became a favourite','That one day we still talk about','A tiny moment that means everything','All the memories still waiting for us'].map((m,i)=><div className="timeline-item" key={m}><span className="timeline-dot"/><small>MEMORY 0{i+1}</small><p>{m}</p><em>✎ add your date & personal caption</em></div>)}</div>}
        <div className="letter-signoff">always in your corner,<br/><span>your person ♡</span></div>
      </div>
      <button className="primary-btn bottom-back" onClick={backToLetters}>Back to all envelopes <ArrowLeft size={16}/></button>
    </main>}

    {page==='secret' && <main className="secret-page page-enter">
      <button className="back-link" onClick={backToLetters}><ArrowLeft size={16}/> Back to envelopes</button>
      {!secretUnlocked ? <div className="secret-card"><div className="secret-big-lock"><LockKeyhole size={30}/><span>✦</span></div><div className="eyebrow"><span/> THE LAST LITTLE SECRET <span/></div><h2>Open only when<br/><em>you've read everything</em> 🔐</h2><p>Some things are just between us. What's the little secret that only you would know?</p><form onSubmit={unlock}><input value={password} onChange={e=>setPassword(e.target.value)} placeholder="Our little secret…" aria-label="Secret password"/><button className="primary-btn" type="submit">Unlock my letter <LockKeyhole size={16}/></button></form>{passwordError&&<p className="error-msg">{passwordError}</p>}<small className="hint">A hint: it's something only we would know. ♡</small></div>
      : <div className="letter-paper secret-paper page-enter"><div className="unlock-burst">✧　♡　✦　♡　✧</div><div className="letter-icon">💗</div><div className="eyebrow">YOU FOUND IT</div><h2>My most important letter.</h2><p className="letter-kicker">the words I hope stay with you</p><div className="letter-copy"><p>If you've made it all the way here, I hope you've felt even a fraction of how much you mean to me.</p><p>Thank you for being part of my story. Thank you for the laughs that made my stomach hurt, the conversations that made hard days lighter, and the ordinary moments that somehow became my favourites.</p><p>I hope life is gentle with you. I hope you chase the things that make your eyes light up. I hope you never shrink yourself to fit somewhere you were meant to outgrow.</p><p>And on the days you forget how loved you are, come back here. Read this again. Imagine me reminding you, as many times as it takes.</p></div><MediaPlaceholder icon={<Video size={20}/>} title="A video message, just for you" hint="Add your video as /public/media/final-message.mp4 and embed it here."/><div className="final-message">“If there's one thing I hope you never forget, it's that no matter where life takes us, you'll always have a little place in my heart that belongs only to you.”</div><div className="letter-signoff">all my love,<br/><span>always ♡</span></div><button className="primary-btn" onClick={backToLetters}>Keep this close <Heart size={16} fill="currentColor"/></button></div>}
    </main>}

    <footer className="footer"><span>♡</span> a little corner of the universe, made just for you <span>♡</span></footer>
    <button className="floating-love" onClick={showCompliment} aria-label="You are loved"><Heart size={18} fill="currentColor"/></button>
    {compliment&&page!=='letters'&&<div className="compliment-pop global-compliment"><Sparkles size={15}/>{compliment}<button onClick={()=>setCompliment('')} aria-label="Close"><X size={14}/></button></div>}
  </div>;
}

function MediaPlaceholder({icon,title,hint}) {
  return <div className="media-placeholder"><span className="media-icon">{icon}</span><div><strong>{title}</strong><small>{hint}</small></div></div>;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App/></React.StrictMode>);
