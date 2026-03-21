// ── PWA ───────────────────────────────────────────────────────
let deferredPrompt;
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;document.getElementById('install-bar').classList.remove('hidden');});
document.getElementById('install-now')?.addEventListener('click',async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;document.getElementById('install-bar').classList.add('hidden');});
document.getElementById('install-dismiss')?.addEventListener('click',()=>document.getElementById('install-bar').classList.add('hidden'));
window.addEventListener('appinstalled',()=>document.getElementById('install-bar').classList.add('hidden'));
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{}));

const CC={Intimacy:'#c9a96e',Flirtation:'#d4687a',Emotional:'#8b7bb5',Confidence:'#5a9a8a',Surprise:'#c96e8f',Sensuality:'#d4687a',Playful:'#8bc4b5',Bold:'#c9a96e',Daring:'#d4687a',Intimate:'#8b7bb5',Desire:'#d4687a',Elegance:'#c9a96e',Power:'#8b7bb5',Connection:'#5a9a8a',Wellbeing:'#8bc4b5',Identity:'#c96e8f'};
const col=c=>CC[c]||'#c9a96e';

const PROMPTS=[
  "Describe the most beautiful moment you and your husband have shared recently. What made it feel so good?",
  "Write about three things your husband does that make you feel loved — big or small. Sit with each one.",
  "Who is the woman you are becoming? Describe her — how she carries herself, how she loves, how she lives.",
  "What does your husband do that still makes you smile even after everything? Write about it in detail.",
  "Describe your dream day with your husband — from morning to night. Every detail. Make it vivid.",
  "What is one quality you love about yourself as a wife? Give yourself full credit for it today.",
  "Write about a time your husband looked at you in a way that made you feel truly seen. What was happening?",
  "What are five things about your marriage that you are genuinely grateful for right now?",
  "Describe the version of yourself you are growing into. What does she do, feel, and believe about herself?",
  "What is one beautiful thing about your husband's character that the world does not see enough of?",
  "Write about a moment when you felt completely magnetic and alive. What created that feeling in you?",
  "What does a deeply connected marriage feel like to you? Write it as if you are already living it.",
  "List ten things you love about yourself — your mind, your body, your heart, your way of moving through the world.",
  "Write about the last time you laughed deeply with your husband. What were you both laughing about?",
  "Describe the woman you want any young woman watching you to see in your marriage.",
  "What is one romantic or intimate thing you did recently that you are proud of? How did it feel?",
  "Write a love letter to your marriage — not to fix it, just to appreciate what it already is.",
  "What is one thing about your body that you are learning to love? Write about it with kindness.",
  "Describe a moment this week when you felt genuinely beautiful — inside or outside. What created it?",
  "Write about what makes you an extraordinary woman. Not what you do — who you are.",
  "What is your favourite thing about how your husband loves you? Describe it in full detail.",
  "Describe the energy you want to bring into your home every day. What does that feel like to inhabit?",
  "Write about something you have done recently that made you feel proud of the wife you are becoming.",
  "What are three words you want your husband to use to describe you — and how are you already becoming her?",
  "Write about the life you are building. Not what is missing — what is already beautiful and worth celebrating."
];

const DAILY_TIPS=[
  {category:'Flirtation',emoji:'💌',tip:'Send him one text today with no logistics — just something that made you think of him.'},
  {category:'Flirtation',emoji:'👀',tip:'Catch his eye from across the room today and hold it one second longer than usual. Say nothing.'},
  {category:'Flirtation',emoji:'💋',tip:'Kiss him today like you have somewhere to be — not a peck, a real kiss, then walk away.'},
  {category:'Flirtation',emoji:'🌹',tip:'Tell him one specific thing you find irresistible about him. Not general — specific.'},
  {category:'Flirtation',emoji:'📱',tip:'Send him a voice note instead of a text. Let him hear your voice in the middle of his day.'},
  {category:'Flirtation',emoji:'😊',tip:'Smile at him from across the room when he is not expecting it. Just because.'},
  {category:'Flirtation',emoji:'💌',tip:'Text him "I was just thinking about you" with nothing else. No explanation needed.'},
  {category:'Flirtation',emoji:'🎵',tip:'Send him a song that makes you think of him with no explanation. Let him figure out why.'},
  {category:'Flirtation',emoji:'👗',tip:'Wear something today specifically because you know he loves it on you. Tell him that is why.'},
  {category:'Flirtation',emoji:'✍️',tip:'Write him a two-line note about something you love about him. Leave it on his pillow.'},
  {category:'Flirtation',emoji:'😘',tip:'Walk past him today and touch the back of his neck softly. Keep walking. Say nothing.'},
  {category:'Flirtation',emoji:'💌',tip:'Tell him one memory from early in your relationship that still makes you smile.'},
  {category:'Flirtation',emoji:'🌙',tip:'When he comes home today, stop what you are doing and go to him first.'},
  {category:'Flirtation',emoji:'💋',tip:'Whisper something in his ear today that is just for him. In public if you can.'},
  {category:'Flirtation',emoji:'😏',tip:'Compliment something specific about his body today. His hands. His shoulders. Say it like you mean it.'},
  {category:'Flirtation',emoji:'💌',tip:'Tell him what you were thinking about him the last time he was not home. Be honest and warm.'},
  {category:'Flirtation',emoji:'👀',tip:'Let him catch you looking at him admiringly. When he notices, do not look away.'},
  {category:'Flirtation',emoji:'💋',tip:'Kiss him goodbye today like it is the last time. Make it count.'},
  {category:'Flirtation',emoji:'😊',tip:'Laugh at something he says today — really laugh, fully, without holding back.'},
  {category:'Flirtation',emoji:'💌',tip:'Tell him what he looked like the first time you knew you were in love with him.'},
  {category:'Flirtation',emoji:'✨',tip:'Dress up slightly more than usual today with no special occasion. Just because you felt like it.'},
  {category:'Flirtation',emoji:'🌹',tip:'Recall a specific date or moment from early in your relationship and bring it up today.'},
  {category:'Flirtation',emoji:'😘',tip:'Touch his face intentionally today — a hand on his cheek, briefly, warmly.'},
  {category:'Flirtation',emoji:'💌',tip:'Tell him one thing about your future together that you are genuinely excited about.'},
  {category:'Flirtation',emoji:'👗',tip:'Put on his favourite scent today and say nothing about it. See if he notices.'},
  {category:'Flirtation',emoji:'💋',tip:'End today with one genuine, warm, unhurried kiss. Not a peck. A real one.'},
  {category:'Flirtation',emoji:'😏',tip:'Tell him one thing he does that you find irresistibly attractive. The more specific the better.'},
  {category:'Flirtation',emoji:'💌',tip:'Tell him what you find most attractive about his mind — not his body, his mind.'},
  {category:'Flirtation',emoji:'👀',tip:'During a conversation today, give him your complete undivided attention. No phone, no distraction.'},
  {category:'Flirtation',emoji:'😊',tip:'Tease him about something today — gently, warmly, the way only someone who loves him would.'},
  {category:'Intimacy',emoji:'🔥',tip:'Initiate physical closeness tonight — not necessarily sex, just closeness. Reach for him first.'},
  {category:'Intimacy',emoji:'🕯️',tip:'Create a sensory moment tonight — candles, music, no phones. Even thirty minutes counts.'},
  {category:'Intimacy',emoji:'🤝',tip:'Hold his hand today somewhere you normally would not. In the car, walking, sitting beside each other.'},
  {category:'Intimacy',emoji:'🔥',tip:'Tell him what you love about being physically close to him. Say it out loud, directly.'},
  {category:'Intimacy',emoji:'🛌',tip:'Put your phone on the other side of the room tonight and be fully present in the bedroom.'},
  {category:'Intimacy',emoji:'💆',tip:'Offer to give him a shoulder or back rub tonight with no agenda attached.'},
  {category:'Intimacy',emoji:'🔥',tip:'Tell him you want him. Simply, directly, without performing it. Just say the words.'},
  {category:'Intimacy',emoji:'🕯️',tip:'Tonight, slow everything down. Eat slowly, move slowly, speak slowly. Let the evening breathe.'},
  {category:'Intimacy',emoji:'🤝',tip:'Sit beside him tonight and lean into him while you watch something together.'},
  {category:'Intimacy',emoji:'🔥',tip:'Initiate something intimate today that you have not initiated in a while. Surprise him.'},
  {category:'Intimacy',emoji:'🛌',tip:'Go to bed at the same time tonight. Not separately. Together, at the same time.'},
  {category:'Intimacy',emoji:'💆',tip:'Run a bath for him tonight without being asked. Have it ready when he needs it.'},
  {category:'Intimacy',emoji:'🔥',tip:'Make eye contact during a moment of physical closeness today — do not look away.'},
  {category:'Intimacy',emoji:'🕯️',tip:'Cook something he loves tonight. Set the table properly. Make it feel like an occasion.'},
  {category:'Intimacy',emoji:'🤝',tip:'Touch him in passing today — his arm, his back, his hand — without it leading anywhere.'},
  {category:'Intimacy',emoji:'🔥',tip:'Tell him one specific physical thing you love about him that you have never said out loud.'},
  {category:'Intimacy',emoji:'🛌',tip:'Tonight before sleep, reach for him first. A hand on his chest. A leg across his. Just warmth.'},
  {category:'Intimacy',emoji:'💆',tip:'Ask him how his body is feeling today — tired, tense, okay. Actually listen to the answer.'},
  {category:'Intimacy',emoji:'🔥',tip:'Dress intentionally for bed tonight. For the atmosphere you want to create.'},
  {category:'Intimacy',emoji:'🕯️',tip:'Light a candle tonight in whatever room you are together. Change the light in the space.'},
  {category:'Intimacy',emoji:'🔥',tip:'Kiss him slowly tonight. Not urgently. Slowly. Like you have all the time in the world.'},
  {category:'Intimacy',emoji:'🛌',tip:'Tell him something in the dark tonight that you have been carrying. The dark makes honesty easier.'},
  {category:'Intimacy',emoji:'💆',tip:'Give him your full physical presence for one hour tonight — no phone, no distraction, just there.'},
  {category:'Intimacy',emoji:'🔥',tip:'Be present during intimacy today — not managing how you look, not somewhere else. Just there.'},
  {category:'Intimacy',emoji:'🛌',tip:'Say goodnight tonight with a real embrace — not a quick hug, a full, slow one.'},
  {category:'Intimacy',emoji:'🔥',tip:'Tonight, be completely present — not thinking about tomorrow, not processing today. Just here.'},
  {category:'Intimacy',emoji:'🕯️',tip:'Put on music tonight that creates a mood. Not background noise — intentional music.'},
  {category:'Intimacy',emoji:'🤝',tip:'When he sits down beside you tonight, move closer to him rather than staying where you are.'},
  {category:'Intimacy',emoji:'🔥',tip:'Wear something to bed tonight that makes you feel beautiful. Not for him — for yourself first.'},
  {category:'Intimacy',emoji:'🛌',tip:'Turn off all screens an hour before bed tonight. See what fills the space instead.'},
  {category:'Emotional',emoji:'💬',tip:'Ask him one real question today — not about logistics. What is on his mind that he has not said?'},
  {category:'Emotional',emoji:'🫂',tip:'Tell him one specific thing you appreciate about who he is as a man — not what he does, who he is.'},
  {category:'Emotional',emoji:'💬',tip:'Listen today to respond less and understand more. Just receive what he says without fixing it.'},
  {category:'Emotional',emoji:'🌟',tip:'Celebrate something he did recently that you noticed but never acknowledged out loud.'},
  {category:'Emotional',emoji:'💬',tip:'Ask him what the hardest part of his week has been. Then just listen. Do not solve it.'},
  {category:'Emotional',emoji:'🫂',tip:'Tell him one way he has made your life better that you take for granted and forget to say.'},
  {category:'Emotional',emoji:'💬',tip:'Bring up a good memory today — something from your relationship that made you both happy.'},
  {category:'Emotional',emoji:'🌟',tip:'Tell him you are proud of him for something specific. Not general — name the exact thing.'},
  {category:'Emotional',emoji:'💬',tip:'Ask him what he is looking forward to this week. Be genuinely interested in his answer.'},
  {category:'Emotional',emoji:'💬',tip:'Share something vulnerable with him today — something you have been feeling that you have not said.'},
  {category:'Emotional',emoji:'🌟',tip:'Thank him for something he does consistently that you have stopped noticing. Be specific.'},
  {category:'Emotional',emoji:'💬',tip:'Ask him how he is really doing. Not as a formality. Ask like you actually want to know.'},
  {category:'Emotional',emoji:'🫂',tip:'Validate something he is going through today without turning it into advice or comparison.'},
  {category:'Emotional',emoji:'💬',tip:'Tell him one dream or goal you have that you have not shared with him yet.'},
  {category:'Emotional',emoji:'🌟',tip:'Acknowledge something he handled well this week. Tell him you noticed and it impressed you.'},
  {category:'Emotional',emoji:'💬',tip:'Have dinner with no phones tonight. Talk about something that has nothing to do with children or work.'},
  {category:'Emotional',emoji:'💬',tip:'Ask him what he needs from you this week. Then actually try to give it.'},
  {category:'Emotional',emoji:'🌟',tip:'Write down three things you love about your husband tonight. Then tell him one of them.'},
  {category:'Emotional',emoji:'💬',tip:'Share something that made you laugh today. Let him into your world even in small moments.'},
  {category:'Emotional',emoji:'🫂',tip:'Tell him you feel safe with him. Those four words mean more than most things you could say.'},
  {category:'Emotional',emoji:'💬',tip:'Ask him what his favourite memory of the two of you is. Share yours too.'},
  {category:'Emotional',emoji:'🌟',tip:'Remind him today why you chose him. Not why you stay — why you chose him specifically.'},
  {category:'Emotional',emoji:'🫂',tip:'If he is stressed today, do not add to it. Just be a calm, warm presence beside him.'},
  {category:'Emotional',emoji:'🌟',tip:'Name one thing your husband is better at than anyone you know. Tell him. Specifically. Today.'},
  {category:'Emotional',emoji:'💬',tip:'Tell him one thing about his character that you admire and have never put into words before.'},
  {category:'Emotional',emoji:'🫂',tip:'Tell him "I see how hard you are working" — and mean it. Men need to hear this more than we realise.'},
  {category:'Emotional',emoji:'🌟',tip:'Tell him specifically what kind of husband he is. Men need to hear this from their wives.'},
  {category:'Emotional',emoji:'💬',tip:'Ask him what he misses most and share what you miss too. No judgment, just closeness.'},
  {category:'Emotional',emoji:'🫂',tip:'Apologise today for something small you got wrong recently. Clean, direct, no justification.'},
  {category:'Confidence',emoji:'✨',tip:'Wear something today that makes you feel like the most beautiful version of yourself. Dress for you.'},
  {category:'Confidence',emoji:'💪',tip:'Do one thing today that is just for you — not for the family, not for work. Just for you.'},
  {category:'Confidence',emoji:'✨',tip:'Stand tall today. Shoulders back, chin up, slow your walk. Your posture changes how you feel.'},
  {category:'Confidence',emoji:'📚',tip:'Read or listen to something that feeds your mind today. Even fifteen minutes counts.'},
  {category:'Confidence',emoji:'✨',tip:'Say something you actually think today — an opinion, a preference — without softening it first.'},
  {category:'Confidence',emoji:'💪',tip:'Do something today that makes you feel capable. Cook, create, exercise, build — something real.'},
  {category:'Confidence',emoji:'✨',tip:'Look in the mirror today and find one thing you genuinely love about what you see.'},
  {category:'Confidence',emoji:'📚',tip:'Spend thirty minutes on your business or a personal goal today. Protect that time fiercely.'},
  {category:'Confidence',emoji:'✨',tip:'Speak your mind today in a moment where you would normally stay quiet. Just once.'},
  {category:'Confidence',emoji:'💪',tip:'Move your body today in a way that feels good — not punishing. Dance, walk, stretch, swim.'},
  {category:'Confidence',emoji:'✨',tip:'Buy yourself one small beautiful thing today — a flower, a good coffee, something that pleases you.'},
  {category:'Confidence',emoji:'📚',tip:'Listen to a podcast or audiobook today that expands your thinking. Feed your mind.'},
  {category:'Confidence',emoji:'✨',tip:'Moisturise slowly today. Take care of your skin as an act of self-respect, not vanity.'},
  {category:'Confidence',emoji:'💪',tip:'Finish one thing today that you have been putting off. The satisfaction will carry into the evening.'},
  {category:'Confidence',emoji:'✨',tip:'Dress your hair or skin intentionally today. Because you deserve to feel good.'},
  {category:'Confidence',emoji:'📚',tip:'Write down one goal you are working toward. Look at it. Remind yourself why it matters.'},
  {category:'Confidence',emoji:'💪',tip:'Pursue something today that is just yours — a hobby, a skill, a creative outlet. Even briefly.'},
  {category:'Confidence',emoji:'✨',tip:'Tell yourself one true, kind thing today. Out loud if you can. Your mind is listening.'},
  {category:'Confidence',emoji:'📚',tip:'Call or message a friend today who makes you feel like yourself. Invest in that connection.'},
  {category:'Confidence',emoji:'✨',tip:'Eat something today that nourishes you and tastes extraordinary. Pleasure and health together.'},
  {category:'Confidence',emoji:'💪',tip:'Do something brave today — small is fine. Courage is a muscle. Use it even in tiny ways.'},
  {category:'Confidence',emoji:'✨',tip:'Wear your good perfume today. Not for a special occasion. Today is the occasion.'},
  {category:'Confidence',emoji:'📚',tip:'Spend time in silence today — no music, no podcast, no scrolling. Just you and your thoughts.'},
  {category:'Confidence',emoji:'✨',tip:'Make a decision today without asking for anyone else\'s opinion first. Trust yourself.'},
  {category:'Confidence',emoji:'💪',tip:'Rest without guilt today. Lie down, sit still, do nothing. Rest is not laziness. It is maintenance.'},
  {category:'Confidence',emoji:'✨',tip:'Acknowledge something you did well this week. Say it to yourself. You are allowed to notice.'},
  {category:'Confidence',emoji:'📚',tip:'Write in your journal today — even three sentences. Check in with yourself honestly.'},
  {category:'Confidence',emoji:'✨',tip:'Take a photo of yourself today that you like. Not for social media. Just to see yourself clearly.'},
  {category:'Confidence',emoji:'💪',tip:'Protect your energy today. Before you give it to anyone, give some to yourself first.'},
  {category:'Confidence',emoji:'✨',tip:'Do not apologise for taking up space today. In conversation, in the room, in the relationship. Just be.'},
  {category:'Surprise',emoji:'🎁',tip:'Do something for him today that he is not expecting and that requires you to have been paying attention.'},
  {category:'Surprise',emoji:'🌹',tip:'Plan a date for this week — even a simple one. Do not tell him where you are going until you arrive.'},
  {category:'Surprise',emoji:'🎁',tip:'Cook his absolute favourite meal tonight with no special occasion. Just because you wanted to.'},
  {category:'Surprise',emoji:'✉️',tip:'Write him a proper love letter today. On paper. By hand. Leave it somewhere he will find it.'},
  {category:'Surprise',emoji:'🎁',tip:'Order or buy something small he has mentioned wanting. Do not make a big deal of it. Just give it.'},
  {category:'Surprise',emoji:'🌹',tip:'Suggest something spontaneous today — a different restaurant, a drive somewhere, a walk somewhere new.'},
  {category:'Surprise',emoji:'🎁',tip:'Set up the bedroom beautifully tonight before he comes in — candles, music, something intentional.'},
  {category:'Surprise',emoji:'✉️',tip:'Leave a voice note on his phone tonight to wake up to. Something warm, something just for him.'},
  {category:'Surprise',emoji:'🎁',tip:'Get dressed up tonight for no reason. When he asks why, say "for you."'},
  {category:'Surprise',emoji:'🌹',tip:'Plan something to look forward to together — book it, suggest it, make it concrete. Give him anticipation.'},
  {category:'Surprise',emoji:'🎁',tip:'Do one of his chores without being asked and without mentioning it. Just do it and say nothing.'},
  {category:'Surprise',emoji:'✉️',tip:'Send him a specific compliment today that shows you have been paying attention to something he does.'},
  {category:'Surprise',emoji:'🎁',tip:'Put on a playlist tonight that you know he loves. Have it playing when he gets home.'},
  {category:'Surprise',emoji:'🌹',tip:'Suggest trying something neither of you has done before this month — a new food, place, or experience.'},
  {category:'Surprise',emoji:'🎁',tip:'Make him breakfast in bed or bring him coffee exactly the way he likes it without being asked.'},
  {category:'Surprise',emoji:'✉️',tip:'Text him a specific memory today that you love — something he might have forgotten that you never did.'},
  {category:'Surprise',emoji:'🎁',tip:'Arrange childcare and plan an evening that is just the two of you. Even two hours counts.'},
  {category:'Surprise',emoji:'🌹',tip:'Do something creative for him today — even small. Something that required thought and effort.'},
  {category:'Surprise',emoji:'✉️',tip:'Tell him one thing today that you have been meaning to say for a while but kept forgetting to.'},
  {category:'Surprise',emoji:'🎁',tip:'Make his favourite drink and bring it to him while he is working or resting.'},
  {category:'Surprise',emoji:'🌹',tip:'Recreate something from early in your relationship — a place you went, a thing you did, a meal you ate.'},
  {category:'Surprise',emoji:'🎁',tip:'Buy him a book you think he would love. Write a personal note inside the front cover.'},
  {category:'Surprise',emoji:'✉️',tip:'Record a short video message for him today telling him something you love about him.'},
  {category:'Surprise',emoji:'🎁',tip:'This week, do one grand and one tiny romantic gesture. Both matter. Both land differently.'},
  {category:'Surprise',emoji:'🌹',tip:'Write him a list of ten reasons you love being his wife. Leave it where he will find it.'},
  {category:'Surprise',emoji:'✉️',tip:'Send him a message today that says exactly what you feel — unfiltered, unperformed, just true.'},
  {category:'Surprise',emoji:'🎁',tip:'Create a playlist for him tonight of songs that remind you of your relationship. Press play when he arrives.'},
  {category:'Surprise',emoji:'🌹',tip:'Plan a trip — even a one-night getaway — and present him with the idea tonight.'},
  {category:'Surprise',emoji:'🎁',tip:'Take over something he normally handles today so he gets a break without having to ask for one.'},
  {category:'Surprise',emoji:'✉️',tip:'Write down five things you are grateful for in your marriage and share them with him today.'},
  {category:'Sensuality',emoji:'🌸',tip:'Put on your favourite scent today — not for him, for how it makes you feel in your own body.'},
  {category:'Sensuality',emoji:'🕯️',tip:'Slow down one ordinary moment today — eating, bathing, walking — and actually feel it.'},
  {category:'Sensuality',emoji:'🌸',tip:'Wear fabric that feels extraordinary against your skin today. Dressing for sensation counts.'},
  {category:'Sensuality',emoji:'🕯️',tip:'Take a proper bath tonight with oils and scent and slow attention. Reclaim it as a ritual.'},
  {category:'Sensuality',emoji:'🌸',tip:'Eat something today with full attention — taste it, enjoy it, be present with it completely.'},
  {category:'Sensuality',emoji:'🕯️',tip:'Put on music that changes your body chemistry tonight. Let it move through you.'},
  {category:'Sensuality',emoji:'🌸',tip:'Touch something with full attention today — fabric, skin, bark, water. Feel it properly.'},
  {category:'Sensuality',emoji:'🕯️',tip:'Moisturise slowly and deliberately tonight. Every part of your body deserves care and attention.'},
  {category:'Sensuality',emoji:'🌸',tip:'Walk somewhere beautiful today and look at what you are actually walking through.'},
  {category:'Sensuality',emoji:'🕯️',tip:'Dim the lights tonight and change the atmosphere of your home. Light is a mood and you control it.'},
  {category:'Sensuality',emoji:'🌸',tip:'Wear beautiful lingerie today — because you deserve to feel luxurious against your own skin.'},
  {category:'Sensuality',emoji:'🕯️',tip:'Cook something tonight that fills the kitchen with an extraordinary scent. Cook as a sensory act.'},
  {category:'Sensuality',emoji:'🌸',tip:'Stretch your body this morning with slow attention — feel each movement, each release.'},
  {category:'Sensuality',emoji:'🕯️',tip:'Light a candle with a scent you love today. Let it fill the room. Create atmosphere deliberately.'},
  {category:'Sensuality',emoji:'🌸',tip:'Put fresh sheets on the bed today. Notice how different it feels to slide into clean, cool linen.'},
  {category:'Sensuality',emoji:'🕯️',tip:'Sit outside today if you can — feel the air, the temperature, the sounds. Be present in the world.'},
  {category:'Sensuality',emoji:'🌸',tip:'Buy fresh flowers today. Put them where you will see them. Beauty in the home matters.'},
  {category:'Sensuality',emoji:'🕯️',tip:'Take your coffee or tea today and drink it slowly, standing still, tasting every sip.'},
  {category:'Sensuality',emoji:'🌸',tip:'Dance alone today — even for two minutes, even in the kitchen. Let your body move for joy.'},
  {category:'Sensuality',emoji:'🕯️',tip:'Read something beautiful tonight — a poem, a passage, something that stirs something in you.'},
  {category:'Sensuality',emoji:'🌸',tip:'Notice what your husband smells like today. Really notice. File it away in your memory deliberately.'},
  {category:'Sensuality',emoji:'🕯️',tip:'Take a shower tonight and let the water be the right temperature and stay a little longer than usual.'},
  {category:'Sensuality',emoji:'🌸',tip:'Wear your hair differently today. Something small changes how you carry yourself entirely.'},
  {category:'Sensuality',emoji:'🕯️',tip:'Set the table properly tonight — even for a simple meal. Create the experience of an occasion.'},
  {category:'Sensuality',emoji:'🌸',tip:'Put lotion on your hands slowly today and actually feel the sensation. Presence in small moments.'},
  {category:'Sensuality',emoji:'🕯️',tip:'Open a window today and actually breathe the outside air in. Feel it enter your body.'},
  {category:'Sensuality',emoji:'🌸',tip:'Wear colour today — something vivid, something that changes your energy. Colour is a mood.'},
  {category:'Sensuality',emoji:'🕯️',tip:'Create a scent ritual tonight — your bedroom should smell like somewhere you want to be.'},
  {category:'Sensuality',emoji:'🌸',tip:'Move slowly through your home today. Unhurried. As if you have all the time you need.'},
  {category:'Sensuality',emoji:'🕯️',tip:'Put on something that makes you feel like yourself tonight before your husband comes home.'},
];

const SPICE_IDEAS=[
  {intensity:'Playful',emoji:'🎲',title:'The Decision Jar',description:'Write 10 activities on paper — restaurants, experiences, things to try — fold them and put them in a jar. Tonight he picks one blind. Whatever comes out, you do this week. No vetoes.'},
  {intensity:'Intimate',emoji:'🕯️',title:'The Phone-Free Evening',description:'Both phones in another room from 7pm. Candles, music, whatever conversation or closeness fills the space. No agenda — just each other with no escape route.'},
  {intensity:'Bold',emoji:'💋',title:'The First Date Replay',description:'Go back to where you had your first date or somewhere that felt like the beginning. Dress like you were trying to impress. Flirt like you have not already won each other.'},
  {intensity:'Playful',emoji:'🍽️',title:'Blind Taste Night',description:'Blindfold him and feed him five different things. Let his other senses take over. Keep it playful or let it get intimate — either way it will be memorable.'},
  {intensity:'Intimate',emoji:'✉️',title:'The Love Letter Exchange',description:'Both of you write a letter to each other tonight — handwritten, honest, specific. No phones, no interruptions. Then exchange them and read in silence.'},
  {intensity:'Daring',emoji:'🌙',title:'Midnight Drive',description:'After the children are asleep, get in the car and drive somewhere — no destination, just music and movement. Talk or do not talk. Being in motion together changes things.'},
  {intensity:'Playful',emoji:'🎮',title:'The Bet Game',description:'Make a bet on anything — a sport, a prediction, a silly challenge. Winner gets to choose the plans for an evening with no questions asked.'},
  {intensity:'Intimate',emoji:'🛌',title:'The Early Night',description:'Get everything done by 8pm tonight. Put the children down. Get into bed ridiculously early with nothing to do but be with each other. No phones. No purpose. Just time.'},
  {intensity:'Bold',emoji:'👗',title:'Dressed for Him',description:'Wear exactly what he has told you he loves most on you. Tell him that is why when he notices. Watch what that one sentence does to the evening.'},
  {intensity:'Playful',emoji:'🍳',title:'Cook Together',description:'Pick a recipe neither of you has made. Cook it together tonight — music on, no rushing, wine or mocktails. The point is the chaos and closeness of creating something together.'},
  {intensity:'Intimate',emoji:'💆',title:'The Full Body Exchange',description:'Take turns giving each other a proper massage tonight. Thirty minutes each. No rushing. No agenda. Just hands and trust and presence.'},
  {intensity:'Daring',emoji:'📸',title:'The Photo Session',description:'Take photos of each other tonight — not for social media. Just beautiful, private, honest images of each other right now. Keep them. Look at them in ten years.'},
  {intensity:'Playful',emoji:'🎵',title:'The Playlist Duel',description:'Each of you makes a playlist of songs that represent your relationship. Play them for each other and explain why each song made the cut. Deeply revealing, often hilarious.'},
  {intensity:'Intimate',emoji:'🌹',title:'The Appreciation Night',description:'Sit facing each other. Take turns saying one specific thing you love about the other — back and forth, ten times each. No generalities. Specifics only.'},
  {intensity:'Bold',emoji:'🏨',title:'One Night Away',description:'Book a hotel room for one night this month — even in your own city. Leave the house. Leave the roles. Just be two people in a room with nothing else required of them.'},
  {intensity:'Playful',emoji:'🎭',title:'Roleplay Strangers',description:'Meet somewhere — a bar, a café — and pretend you are strangers meeting for the first time. Flirt. Discover each other again from scratch. Drive home together.'},
  {intensity:'Intimate',emoji:'🕯️',title:'The Candlelit Bath',description:'Draw a bath together tonight. Candles, oils, music. No phones within reach. Two people in warm water with nowhere else to be. Simple and transformative.'},
  {intensity:'Daring',emoji:'💌',title:'The Fantasy Exchange',description:'Each of you writes down one thing you have always wanted to try or experience together. Fold it. Exchange. No judgment — just conversation about what you both actually want.'},
  {intensity:'Playful',emoji:'🎬',title:'Movie Marathon Night',description:'Pick three films — one each and one you both choose together. Build a proper nest on the sofa. Snacks he loves. Stay up later than you should. Just be in it together.'},
  {intensity:'Intimate',emoji:'✍️',title:'The Memory Book Night',description:'Go through old photos together tonight. Talk about the memories. Laugh, feel things, remember who you were before all the responsibilities arrived.'},
  {intensity:'Bold',emoji:'🚗',title:'The Surprise Trip',description:'Plan a day trip for next weekend and tell him nothing except what to wear and when to be ready. Take him somewhere he has mentioned wanting to go. Anticipation is everything.'},
  {intensity:'Playful',emoji:'🍷',title:'Wine and Truth',description:'Open a bottle of wine or a nice drink. Take turns asking each other questions you have never asked before. Real questions. Things you actually want to know.'},
  {intensity:'Intimate',emoji:'🌙',title:'The Stargazing Night',description:'Drive somewhere dark tonight and lie on a blanket and look at the stars together. Bring something warm to drink. Say very little. Let the scale of the sky do the work.'},
  {intensity:'Daring',emoji:'💃',title:'The Dance Night',description:'Clear the living room. Put on music that moves your body. Dance together — badly, beautifully, whatever comes. Physical playfulness is its own form of intimacy.'},
  {intensity:'Playful',emoji:'🎁',title:'The Gift Without Occasion',description:'Buy him something completely unexpected this week — something small that shows you have been paying attention to what he loves. Leave it with a note that has no explanation.'},
  {intensity:'Intimate',emoji:'🔥',title:'The Slow Morning',description:'Set your alarm an hour earlier one morning this week. No children yet, no rush. Use that hour just for the two of you. What you do with it is entirely up to you.'},
  {intensity:'Bold',emoji:'👠',title:'The Dress Up Night',description:'Both of you get properly dressed — as if you are going somewhere significant. Then have dinner at home. The formality changes the atmosphere completely.'},
  {intensity:'Playful',emoji:'🌊',title:'The Outdoor Adventure',description:'Do something physical together this weekend — a hike, a swim, a cycle. Shared physical experience creates bonding that conversation alone cannot replicate.'},
  {intensity:'Intimate',emoji:'💬',title:'The Deep Question Night',description:'Take turns asking each other the deepest questions you can think of — dreams, fears, hopes. No phones. No judgment. Just two people becoming more known to each other.'},
  {intensity:'Daring',emoji:'🎨',title:'The Creative Night',description:'Do something creative together tonight — paint, draw, cook something ambitious, build something. Create something together that did not exist before tonight.'},
  {intensity:'Playful',emoji:'🌹',title:'The Flower Moment',description:'Buy him flowers or a plant this week. Men are rarely given beautiful things. Watch his face when you hand them to him with no explanation.'},
  {intensity:'Intimate',emoji:'🛌',title:'The No Agenda Night',description:'Tonight you have no plan. No activity chosen, no movie queued. Just see what emerges between two people with no script and no obligations.'},
  {intensity:'Bold',emoji:'💋',title:'The Midday Surprise',description:'If possible, visit him at work or send something to him there this week. Show up in the middle of his ordinary day with something unexpected. The disruption is the gift.'},
  {intensity:'Playful',emoji:'🏠',title:'The Home Picnic',description:'Lay a blanket on your bedroom floor tonight. Pack a picnic properly — good food, good drinks. Eat on the floor like children. Change the setting, change the feeling.'},
  {intensity:'Intimate',emoji:'🕯️',title:'The Gratitude Night',description:'Tonight, both of you share five things you are grateful for in each other and in your marriage. Say them slowly. Receive them fully. Let it land.'},
  {intensity:'Bold',emoji:'👗',title:'The Lingerie Reveal',description:'Buy something beautiful for yourself this week. Wear it. Let him discover it. Say nothing about it. Let the moment speak entirely for itself.'},
  {intensity:'Playful',emoji:'🎲',title:'The Challenge List',description:'Make a list of ten experiences you both want to have together before the end of the year. Print it. Put it on the wall. Start ticking things off this week.'},
  {intensity:'Intimate',emoji:'✉️',title:'The Future Letters',description:'Both write a letter to yourselves about your marriage — to be opened in five years. Seal them. Store them somewhere together. You are writing your future into existence.'},
  {intensity:'Daring',emoji:'🌍',title:'The Spontaneous Yes',description:'This week, say yes to the first thing he suggests — however unexpected. Go wherever he proposes without negotiation. Let him lead something completely.'},
  {intensity:'Playful',emoji:'🎤',title:'The Karaoke Night',description:'At home, pick songs, take turns performing for each other. The silliness is the point. Couples who can be ridiculous together have something rare and precious.'},
];


const BOOKS=[
{emoji:'🌹',title:'The Art of Seduction',category:'Desire',tagline:'Make him unable to think of anyone else.',pages:[
{h:'The First Law',b:'Seduction is never about desperation — it is about abundance. The woman who truly seduces does not chase; she creates conditions so irresistible that he comes to her willingly. Move through the world as if you already have everything you need, and he will want to be part of that world.'},
{h:'Mystery Is Your Asset',b:'Never reveal everything at once. Leave sentences unfinished. Have opinions you do not fully explain. Mystery is not coldness — it is depth. And depth is endlessly attractive to a man who wants to feel like he is still discovering you years into the marriage.'},
{h:'The Power of Withdrawal',b:'Presence is powerful, but strategic withdrawal is more powerful. When you pull back slightly — become absorbed in your own world, your own projects — he will lean in. The woman who has her own orbit pulls him into her gravity without trying.'},
{h:'Seduce His Mind First',b:'Physical attraction fades if the mind is not engaged. Ask him questions that make him think. Challenge his ideas gently. The man who feels truly understood by a woman — not just loved, but intellectually seen — becomes profoundly devoted. The mind is the longest erogenous zone.'},
{h:'The Scent Anchor',b:'Choose a signature scent and wear it consistently in intimate moments. The brain links scent to emotion more powerfully than any other sense. Over time, your scent becomes inseparable from the feeling of desire and warmth. That association is yours to build deliberately.'},
{h:'The Art of Suggestion',b:'What is implied is more powerful than what is stated. A glance held a moment too long. A sentence that trails off suggestively. A touch that stops before it should. Suggestion activates the imagination — and the imagination, once engaged, does more seductive work than any direct action ever could.'},
{h:'Make Him Feel Like a Discovery',b:'Show him sides of yourself that the world does not get to see. Let him be the one who knows you at your most unguarded, most playful, most complex. When a man feels he has access to something rare and exclusive, his investment deepens enormously.'},
{h:'The Seductive Environment',b:'Your home, your presence, your way of being in the world — these are environments you create. A home that is beautiful and sensory, a manner that is warm and unhurried, an atmosphere of ease and pleasure — communicate that being near you feels better than being anywhere else.'},
{h:'Timing Is Everything',b:'The right word at the wrong moment falls flat. Seduction requires attunement — to his mood, his energy, his needs in this particular moment. The woman who reads the room and acts in alignment with it seems almost magical. She gets what she wants because she offers what is actually needed.'},
{h:'Embody What You Want to Attract',b:'If you want passion, be passionate — about your life, your work, your ideas. If you want depth, cultivate depth. You cannot attract what you do not embody. The seductive woman is not performing a role — she is living a rich life that makes others want to enter it.'},
{h:'The Power of the Look',b:'Practice a gaze that is warm but direct — not coy, not flinching, but steady and present. The woman who can meet a man\'s eyes without deflecting communicates confidence and depth simultaneously. Let your eyes speak before your mouth does.'},
{h:'Seduce Through Absence',b:'Let there be evenings that are yours alone. Projects that absorb you completely. This absence — handled warmly and without coldness — creates the condition for missing. And missing is the precursor to appreciation and renewed desire.'},
{h:'Never Stop the Seduction',b:'Seduction in a long marriage is subtler, deeper, and more meaningful — because it is chosen, not automatic. The woman who continues to seduce her husband after years together is the woman he considers himself profoundly lucky to have.'},
{h:'Seduction Is Daily',b:'Seduction is not saved for special occasions. It lives in the ordinary — in the way you dress for a Tuesday, in the text sent at noon with no agenda. The great marriages are built from the daily practice of choosing to be irresistible.'},
{h:'The Final Secret',b:'The deepest seduction is about being so genuinely, fully, unapologetically yourself — so alive and interesting and at home in your own skin — that being near you feels like an expansion of life. Become that woman. Everything else follows naturally.'},
]},
{emoji:'👑',title:'The High-Value Woman',category:'Elegance',tagline:'She knows exactly what she is worth.',pages:[
{h:'What High Value Actually Means',b:'High value is not about wealth, beauty, or status. It is about the relationship a woman has with herself — the degree to which she knows her worth, acts from that knowing, and refuses to compromise it for approval or comfort. A high-value woman is not cold or difficult. She is simply certain.'},
{h:'Composure Is Currency',b:'A high-value woman does not raise her voice to be heard. She does not panic publicly, does not complain without purpose. Composure is the quiet confidence of a woman who knows she does not need to perform distress to be taken seriously.'},
{h:'Standards Without Ultimatums',b:'She knows what she will and will not accept — and she communicates this with warmth rather than aggression. Standards are not threats. They are the quiet architecture of a life built with integrity. They are expressed through her choices, not her words.'},
{h:'She Does Not Over-Explain',b:'When she makes a decision, she does not require others to agree with it or understand it. She does not lecture, justify, or convince. This restraint signals confidence — the kind that does not depend on external validation to feel legitimate.'},
{h:'Gratitude as a Practice',b:'Entitlement repels. Genuine gratitude attracts. A high-value woman notices what is done for her and acknowledges it specifically. This quality of noticing makes the people around her feel seen — and people give more to those who see them.'},
{h:'The Art of Speaking Less',b:'Speak with intention. Say less than you think. Let silences breathe. A woman who speaks thoughtfully is taken more seriously than one who fills every space with words. When you do speak, the room shifts — because it has learned that what you say will be worth hearing.'},
{h:'Emotional Availability Without Dependency',b:'She is warm, open, and genuinely present with the people she loves. But her emotional stability does not depend on their behaviour. She feels things deeply — and she manages those feelings herself before bringing them into a relationship.'},
{h:'She Invests in Herself Consistently',b:'Not as self-indulgence, but as self-respect. She reads. She moves her body. She cultivates skills. She nurtures her friendships. These investments compound over time into a woman who is richer, more interesting, and more grounded with every passing year.'},
{h:'Discretion as Sophistication',b:'A high-value woman keeps her marriage private, her conflicts private, her plans private. What is sacred is protected. This is not secrecy — it is the understanding that not everything needs an audience, and that privacy is itself a form of power.'},
{h:'How She Handles Conflict',b:'She does not attack. She does not retreat into silence. She addresses conflict directly, specifically, and without cruelty. She fights for the relationship rather than against her husband. And when the conflict is resolved, she lets it be resolved completely.'},
{h:'She Does Not Compete',b:'The high-value woman is not threatened by other women. She does not compare herself or compete for attention. Her security comes from within. This absence of competition signals an abundance mindset that is rare and deeply attractive.'},
{h:'Consistency Is Her Signature',b:'A high-value woman is the same person in public and in private. Her values do not shift with the audience. Her warmth is not performed. Her standards do not fluctuate with her mood. This consistency is deeply trustworthy.'},
{h:'How She Enters a Room',b:'She slows down before entering. She takes a breath. She makes eye contact before she smiles. She moves without appearing to rush. This is the physical expression of a woman who knows she has arrived somewhere worth arriving.'},
{h:'She Knows When to Walk Away',b:'Not dramatically, not as a threat, but as a natural expression of her self-respect. From conversations that go nowhere. From environments that diminish her. The woman who knows when to disengage preserves her energy for what genuinely deserves it.'},
{h:'She Keeps Becoming',b:'The high-value woman is not a finished product. She is a woman in motion — growing, evolving, shedding what no longer serves her, and building what she wants to become. This quality of ongoing growth means she is never boring and always worth investing in.'},
]},
{emoji:'🔥',title:'Keeping Passion Alive',category:'Desire',tagline:'Long-term passion is a daily choice.',pages:[
{h:'Passion Requires a Decision',b:'Passion in a long-term relationship does not maintain itself. It requires a daily decision to prioritise it. The couples who remain passionate after ten, twenty, thirty years are not lucky. They are deliberate. Passion is a practice, not a feeling that happens to you.'},
{h:'Date Nights Are Non-Negotiable',b:'Not optional. Not when we have time. Scheduled, protected, non-negotiable. Date nights communicate: we are still choosing each other over everything else competing for our attention.'},
{h:'Initiate More',b:'Initiation is a gift. When you reach for him — physically, emotionally, romantically — you give him the experience of being wanted. Being wanted by the person you love is one of the most powerful experiences available to a human being.'},
{h:'Novelty as Fuel',b:'Try things you have never tried together. Go somewhere neither of you has been. Have a conversation about a topic you have never discussed. These small novelties reactivate the brain\'s reward system and create the neurological conditions for renewed attraction.'},
{h:'Desire Needs Oxygen',b:'Desire cannot breathe in an atmosphere of resentment, contempt, or unresolved conflict. Keep the relational atmosphere clean. Address resentments before they calcify. The emotional air quality of your marriage is the environment in which desire either flourishes or dies.'},
{h:'Keep Some Mystery',b:'Keep some thoughts to yourself. Have pursuits he is not entirely familiar with. Maintain an interior life that surfaces in conversation selectively. The woman who is not completely known remains interesting.'},
{h:'The Physical Baseline',b:'The frequency and quality of physical intimacy shapes the emotional tone of everything else in the marriage. Prioritise physical connection consistently, even when life is busy and exhausting. The couple who maintains a physical baseline builds toward each other.'},
{h:'Fantasy and Imagination',b:'Keep your imagination active in the context of your marriage. Think about him during the day in ways that are not logistical. Share fantasies. Ask about his. The imagination, when engaged, keeps desire present and alive.'},
{h:'Adventure Is Bonding',b:'Shared experiences that are genuinely novel and slightly challenging — travel, physical challenges, learning something new together — create a bonding that routine cannot. Make it a habit to keep having firsts.'},
{h:'The Weekly Check-In',b:'Once a week, create the space for an honest conversation about the state of the marriage — what is working, what needs attention, what each person needs more of. Marriages that have regular honest conversations stay aligned.'},
{h:'After Children',b:'The couples who survive parenthood with passion intact are the ones who protected the marriage with the same ferocity they brought to the parenting. The marriage is not less important than the children. It is the foundation on which the children stand.'},
{h:'Passion After Conflict',b:'The most passionate moments in many marriages come after genuine conflict and repair. The vulnerability of an honest fight, followed by genuine reconnection, creates an intimacy that comfortable periods rarely touch.'},
{h:'Dress for It',b:'Occasionally — not always, but deliberately — dress in a way that signals desire. Not for a special occasion, but for a random Wednesday. Tell him why. Watch what that one sentence does to the evening.'},
{h:'The Real Welcome Home',b:'How you greet him when he comes home shapes the marriage\'s daily emotional temperature. A real embrace. Eye contact before the hug ends. Something said with genuine feeling. These fifteen-second moments, practised daily, accumulate into a marriage where both people feel genuinely wanted.'},
{h:'Choose It Again Today',b:'The decision to keep a marriage passionate is made not once but every day, in small choices: the phone put down, the touch initiated, the date planned, the compliment given, the conflict repaired. Make the choice today.'},
]},
{emoji:'🦋',title:'Reclaiming Your Identity',category:'Identity',tagline:'The woman he fell for is still in you.',pages:[
{h:'Who Were You Before?',b:'Before wife. Before mother. Before all the roles accumulated around you — who were you? What made you laugh without thinking? What did you want to become? She is still there. She did not disappear. She went quiet. And she is waiting for you to come back.'},
{h:'The Woman He Fell For',b:'Think about who you were when he chose you. She was more spontaneous. More confident in her opinions. More playful. More absorbed in her own becoming. She was not less — she was more. She did not shrink to fit. He fell in love with that fullness. She is not gone. Dig her out.'},
{h:'Ambition Is Attractive',b:'A woman with goals is a woman worth watching. You do not need to be building an empire — but you should be building something. A skill you are developing. A project that engages you. The woman who is becoming something is endlessly more compelling.'},
{h:'Stop Shrinking',b:'Notice every time you make yourself smaller — quieter than you want to be, less certain than you feel — to manage someone else\'s comfort. Stop. Take up the space you are entitled to. Share the opinion. Smallness is a habit that can be unlearned. Unlearn it.'},
{h:'Your Interests Are Non-Negotiable',b:'The things you love — the music, the books, the hobbies, the creative outlets — are not luxuries. They are the materials from which your identity is constructed. Protect your interests with the same vigour you protect everyone else\'s needs.'},
{h:'Friendship as Fuel',b:'The woman who has her own friendships has something that no marriage can fully provide: the experience of being known and loved purely as herself. Invest in your friendships. They are maintenance for the self the marriage needs.'},
{h:'The Permission You Are Waiting For',b:'You are waiting for permission to take up more space, want more things, pursue more of yourself. The permission is not coming from outside. You grant it to yourself. Today. By deciding that who you are and what you want matters.'},
{h:'Pursue Something Hard',b:'The pursuit of something genuinely difficult — that costs you comfort and requires growth — builds a quality of self-respect that nothing else can replicate. And self-respect, visible in a woman, is one of the most attractive qualities her husband can witness.'},
{h:'Reclaim Your Ambitions',b:'Whatever you put on hold — the career pivot, the business idea, the creative project — it is not too late. Your ambitions did not expire when you got married or had children. They went underground. Bring them back up. Even in small doses. Even imperfectly.'},
{h:'You Are Not Just a Mother',b:'Motherhood is one of the most profound identities a woman can inhabit — but it is not the only one. You are a woman who is also a mother. Hold both. The distinction saves you — and ultimately serves your children better.'},
{h:'Friendship as Fuel',b:'The woman who has her own friendships — real ones, not just mutual couple friendships — has something that no marriage can fully provide: the experience of being known and loved purely as herself, not in the context of her roles. These friendships are not a luxury. They are essential.'},
{h:'Your Appearance Is Yours',b:'How you look and present yourself is not vanity — it is identity. Invest in your appearance not to please others, but as an act of claiming yourself. The woman who looks the way she wants to look walks differently.'},
{h:'Rest Is Part of Identity',b:'You cannot know who you are if you are always exhausted. Exhaustion collapses the self into function — you become what you do rather than who you are. Rest is the space in which the self reconstitutes. Take it without guilt.'},
{h:'Identity Is Daily Work',b:'Reclaiming your identity is a daily practice of small choices: the morning that begins with something for you, the opinion shared instead of swallowed, the project worked on for thirty minutes before the day\'s demands begin.'},
{h:'You Are the Main Character',b:'You are not a supporting character. You are the protagonist of your own life, and he is the protagonist of his, and you have chosen to share the stage. Reclaim the centre of your own story. The most magnetic wives are the ones who brought all of themselves to it.'},
]},
{emoji:'💌',title:'The Language of Love',category:'Connection',tagline:'Words that build permanent devotion.',pages:[
{h:'Words Are Architecture',b:'Every word you speak in your marriage either builds or erodes. The accumulated weight of your language shapes the entire structure of what you share. Speak the way you would want to be spoken to. Every day, in the ordinary moments, choose words that build.'},
{h:'Speak His Love Language',b:'Every person receives love in a particular language — through words, touch, acts of service, gifts, or quality time. Study him. Learn which language actually reaches him. Then speak it fluently, deliberately, and often.'},
{h:'The Specific Compliment',b:'Generic praise is forgotten. Specific praise is treasured. Not "you are amazing" — but "the way you handled that situation showed me exactly who you are, and I am so proud of you." Specificity signals observation. And observation is one of the deepest forms of love.'},
{h:'The Text That Changes His Day',b:'One message sent in the middle of an ordinary day with no agenda and no logistics — just "I was thinking about you and wanted to say so." The woman who makes him feel thought about outside the house is the woman he rushes home to.'},
{h:'Desire Said Out Loud',b:'Tell him you want him. Not hinted, not implied — said simply and directly. "I want you" are three of the most powerful words in a long-term marriage. Men who feel desired by their wives become devoted.'},
{h:'The Power of Noticing',b:'Notice things out loud. "I noticed how patient you were today." "I noticed you remembered what I said last month." Noticing is the most fundamental act of love — it says you are not background to me. You are seen.'},
{h:'Gratitude That Lands',b:'"Thank you for fixing that without me having to ask — it meant a lot" is specific, warm, and lasting. Gratitude that lands sees the act, names it, and expresses the feeling it created. This level of specificity takes thirty seconds and creates the feeling of being truly appreciated.'},
{h:'Words of Reassurance',b:'"I am happy with us" or "you are a good husband" — these are words most men rarely hear and desperately need. Offer reassurance without being asked. It creates the emotional security from which a man becomes his best self.'},
{h:'Ask Before Assuming',b:'Most relationship conflicts begin with an assumption mistaken for a fact. Before you decide what he meant, ask. "Help me understand what you meant." This simple practice dissolves conflicts before they form.'},
{h:'The Language of Repair',b:'After conflict, the words of repair matter enormously. Not "I am sorry you felt that way" — but "I am sorry I said that. It was not fair and you did not deserve it." Clean, specific, undefended. Then let it be done.'},
{h:'Speak Well of Him to Others',b:'What you say about your husband when he is not in the room eventually reaches him. Speak of him with warmth to your friends and family. The woman who speaks well of her husband builds a reputation for the marriage as something she is proud of.'},
{h:'The Question That Opens Everything',b:'Not "how was your day" — the answer to which is always fine. But "what was the hardest part of today?" or "what is something you are thinking about that you have not told me yet?" These questions create the space for real conversation.'},
{h:'Silence as Language',b:'The quality of your silence — whether it is warm or cold, present or withdrawn — speaks. Sitting beside him without speaking, reading in the same room, driving without the need to fill the space — these are expressions of comfort and trust.'},
{h:'The Love Letter',b:'Write him a letter. Not an email — a letter. On paper, by hand, in your own handwriting. Tell him what he means to you in specific, vivid terms. A letter like this is kept. Returned to. It becomes part of the mythology of your love.'},
{h:'Speak Love Every Day',b:'Not in grand declarations — in the ordinary moments. In the passing comment. The thank you said with eye contact. The "I am glad you are home." The hand touched in passing. Love is a practice maintained daily in small choices of language and attention.'},
]},
{emoji:'🎭',title:'Emotional Intelligence in Marriage',category:'Connection',tagline:'The smarter you love, the deeper it goes.',pages:[
{h:'What Emotional Intelligence Is',b:'Emotional intelligence is the ability to recognise and regulate your own emotional states, to read others accurately, and to use emotional information in the service of connection. In marriage, it is the most important form of intelligence available.'},
{h:'Regulation Before Response',b:'When you are flooded with emotion — hurt, anger, fear — your prefrontal cortex goes partially offline. The most important skill in marriage is learning to pause before responding. To breathe. To give yourself the time to return to the part of yourself that speaks from values rather than wounds.'},
{h:'The Feeling Beneath the Feeling',b:'The emotion that comes out first is rarely the deepest one. Anger is often fear or grief dressed in armour. The emotionally intelligent woman learns to ask — of herself first — what is underneath this? Getting to the real feeling changes the entire conversation.'},
{h:'Hear What He Is Not Saying',b:'The ability to hear what is not said — to feel the feeling beneath the words — is one of the most profound gifts one partner can offer another. When a man says "I\'m fine" in a tone that is clearly not fine, the response "I notice you seem tired — do you want to talk?" is a form of seeing him.'},
{h:'Repair Is the Most Important Skill',b:'It is not the presence of conflict but the quality of the repair that predicts relationship longevity. A good repair is specific, warm, and undefended. It acknowledges the impact without excessive self-punishment. It returns to connection.'},
{h:'Validation Before Solutions',b:'When he shares a problem, what is almost always needed first is to feel understood. Validate before you fix. "That sounds genuinely frustrating." Then ask: "do you want to think through this together, or did you mainly need to say it?"'},
{h:'Take Responsibility Cleanly',b:'The emotionally intelligent woman can own her part in a conflict without requiring the other person to own theirs first. She can say "I was short with you and I am sorry" without adding "but you provoked me." This clean ownership breaks cycles of mutual blame.'},
{h:'Manage Your Own States',b:'Your emotional states are your responsibility. Not to suppress — but to manage. The emotionally intelligent woman has strategies for returning to regulation when she is flooded. This self-management frees the marriage from exhausting emotional maintenance.'},
{h:'Curiosity Over Certainty',b:'The most damaging assumption in marriage is the certainty that you already know what your husband meant, felt, or intended. Approach his behaviour with curiosity. "What did you mean by that?" asked with genuine openness dissolves more conflicts than any other single phrase.'},
{h:'Name What You Feel',b:'The ability to name your emotional state with precision — not just "I am upset" but "I feel overlooked and it is making me pull away" — is a form of self-knowledge that dramatically improves communication. When you can name it, you can speak about it rather than from it.'},
{h:'Empathy as Connection',b:'Empathy is the ability to feel what they are feeling without losing yourself. The practice of genuine empathy — attempting to understand his emotional experience from the inside rather than evaluating it from the outside — creates a quality of intimacy that logic cannot reach.'},
{h:'Emotional Bids',b:'Couples make thousands of small emotional bids for connection every day — a comment that invites response, a touch that invites reciprocation. The marriage that responds to these bids with presence builds an enormous reservoir of goodwill and connection over time.'},
{h:'Forgiveness as Intelligence',b:'Forgiveness is not excusing the thing that happened. It is releasing yourself from the obligation to carry it. Holding a grievance is expensive — it costs energy and keeps you attached to a past moment that has already occurred. The emotionally intelligent woman forgives genuinely.'},
{h:'The Four Patterns to Avoid',b:'Research identifies four communication patterns that predict relationship failure: criticism of character rather than behaviour, contempt, defensiveness, and stonewalling. Learning to recognise these in yourself — before they have done their damage — is the most protective work available.'},
{h:'Emotional Intelligence Grows',b:'Emotional intelligence is not fixed. It is a skill set that develops through practice, feedback, and the willingness to learn from what does not work. The marriage itself is the best classroom available. Every conflict is a lesson. Every repair is practice.'},
]},
{emoji:'🍷',title:'Sensuality: The Slow Art',category:'Sensuality',tagline:'Pleasure is not a reward. It is a practice.',pages:[
{h:'What Sensuality Actually Is',b:'Sensuality is not performance. It is the quality of being fully present in your body — aware of temperature, texture, scent, taste, and sound in each moment. A woman who is genuinely in her body is naturally sensual. The practice is to stop fleeing the present moment.'},
{h:'Slow Everything Down',b:'Sensuality lives in slowness. The woman who moves through the world quickly, always on to the next thing, is in her head — not her body. Slow down your eating, your walking, your way of touching things. When you slow down, you arrive in the present.'},
{h:'The Body as Home',b:'Many women inhabit their bodies as tools rather than as homes. The sensual woman feels her body from the inside. She notices when she is holding tension. She responds to pleasure. Inhabiting your body fully — rather than using it — is the foundation of all sensuality.'},
{h:'Create a Sensory Environment',b:'The home is a sensory experience and you are its curator. Candlelight instead of overhead lights. Music that feels like warmth. Fresh flowers chosen for their scent. Sheets that feel luxurious against skin. These details create the conditions in which desire can arise naturally.'},
{h:'Dress for Sensation',b:'Before you dress for anyone else, dress for your own nervous system. Choose fabric that feels extraordinary against your skin. A colour that changes how you carry yourself. Dressing as an act of sensory pleasure is a daily practice of inhabiting yourself.'},
{h:'Water as Ritual',b:'A bath or shower taken slowly, with attention — with good oil, good scent, the right temperature — is one of the most accessible sensual experiences available. Reclaim it as a ritual. The woman who takes her bath seriously takes herself seriously.'},
{h:'The Sensual Mind',b:'Sensuality begins in the imagination. Read things that move you. Listen to music that changes your body chemistry. Keep your inner world rich, stimulated, and alive. A woman with a vivid inner life brings something to every physical encounter that cannot be manufactured.'},
{h:'Pleasure Without Guilt',b:'Pleasure is not a reward. It is a birthright. A woman who can receive pleasure without guilt — who can simply enjoy — has a quality of ease that is profoundly attractive and deeply rare. Release the need to earn your pleasure before you take it.'},
{h:'Your Own Pleasure First',b:'A woman who does not know what gives her pleasure cannot effectively share pleasure with another. Know your body. Know what you like. This self-knowledge is the prerequisite for genuine intimacy. You cannot give what you do not have.'},
{h:'Touch as a Practice',b:'Touch as many things as possible with real attention — the bark of a tree, the texture of a fabric, the warmth of a mug. This is a recalibration of the nervous system toward presence. The more you practise conscious touch, the more naturally present you become.'},
{h:'The Sensuality of Attention',b:'The most sensual thing you can offer another person is your full, undivided attention. The real thing — eyes on him, mind present, body oriented toward him. This quality of attention, given fully, creates an intimacy that no technique can replicate.'},
{h:'Scent as Memory',b:'Use scent deliberately. Have a scent for your bedroom. A scent for your body after a bath. A scent for intimate evenings. Over time, these scents become inseparable from specific emotional states — and you can use them to create those states on demand.'},
{h:'The Sensual Morning',b:'Coffee drunk slowly, tasted rather than consumed. Stretching that is attentive to the body rather than mechanical. Skin moisturised with care. These small morning pleasures are the practice of a woman who has decided that her days are worth experiencing.'},
{h:'Sensuality in the Bedroom',b:'The woman who brings full sensory presence to intimacy — who is actually there, actually feeling, actually responding rather than managing how she appears — transforms the experience for both people. Presence is the most powerful thing you can bring into the bedroom.'},
{h:'Sensuality Is a Lifelong Practice',b:'The woman who cultivates sensuality at thirty is more sensual at fifty. Not despite time, but because of it. Sensuality does not fade with age for women who practise it. It matures. And matured sensuality is one of the most extraordinary things a woman can possess.'},
]},
{emoji:'💎',title:'Self-Worth as a Foundation',category:'Confidence',tagline:'You cannot pour from an empty crown.',pages:[
{h:'Your Worth Is Not Earned',b:'You do not earn your worth by being useful enough, agreeable enough, or beautiful enough. Your worth is intrinsic — it existed before you performed anything for anyone, and it will remain when all the performances are over. A woman who knows this carries herself differently.'},
{h:'Standards Are Attractive',b:'A woman with clear standards — for how she is spoken to, how her time is used, how she is treated — is compelling rather than difficult. Standards are not demands. They are a reflection of self-knowledge, and self-knowledge is one of the most attractive things a human being can possess.'},
{h:'Stop Seeking Approval',b:'Every time you seek approval before trusting your own judgment, you communicate that your instincts are not reliable. They are reliable. Make decisions. Have preferences. Disagree sometimes. The woman who needs no permission is endlessly more interesting than the one who waits for it.'},
{h:'The Danger of Over-Giving',b:'Women with low self-worth often over-give — believing that their value is located in their usefulness to others. But generosity given from depletion is not truly generous; it is strategic survival. True generosity comes from abundance. Fill yourself first.'},
{h:'Receiving as a Practice',b:'A woman who does not believe she deserves good things has difficulty receiving them. Practise receiving. Let the compliment land. Accept the help graciously. Allow yourself to be given to. Each act of graceful receiving builds the neural pathway that says: good things are appropriate for me.'},
{h:'Boundaries Are Love',b:'A boundary is not a wall. It is a door with a lock — you choose who gets in, and under what conditions. Boundaries protect the relationship by protecting the self. They are the most loving thing you can maintain — for yourself and for the marriage.'},
{h:'The Body and Self-Worth',b:'How you treat your body is one of the most legible expressions of your self-worth. Not your size or shape — but whether you feed yourself well, move with care, rest enough, present yourself with intention. The woman who tends to her body with respect is practising self-worth physically.'},
{h:'Know Your Non-Negotiables',b:'A woman who knows what she will and will not accept — and holds to it with warmth rather than aggression — commands respect. Non-negotiables are the quiet architecture of a life lived with integrity.'},
{h:'Self-Worth in the Bedroom',b:'The woman who approaches intimacy from a place of genuine self-worth is not passive or apologetic. She is present, communicative, and embodied. She knows what she wants and asks for it. This confidence is not aggressive — it is one of the most attractive things she possesses.'},
{h:'Compare Yourself Only to Yourself',b:'The moment you begin measuring your worth against another woman\'s appearance, success, or marriage, you have left yourself. Your only meaningful comparison is to the woman you were yesterday. Is she growing? Is she becoming? That is the only question worth asking.'},
{h:'The Mirror You Hold Up',b:'How you treat yourself teaches others how to treat you. Self-worth is communicated in a thousand tiny signals — in how you speak about yourself, what you tolerate, how you respond to criticism. Raise the standard you hold for yourself.'},
{h:'Self-Worth Is Not Selfishness',b:'The woman who invests in herself, holds her standards, protects her time, and pursues her own growth is not selfish. She is sustainable. She has something to give — not from the scraps of herself she has not yet distributed, but from genuine abundance.'},
{h:'Invest in Yourself Like You Mean It',b:'Read the book. Take the course. Buy the thing that makes you feel beautiful when you put it on. Pursue the goal that has been waiting. These are declarations that you believe you are worth investing in. That belief, once activated, reshapes everything.'},
{h:'The Origin of Low Self-Worth',b:'Low self-worth is not a character flaw — it is a learned response to environment. Criticism absorbed in childhood. Love that was conditional. Understanding where your self-worth was undermined is not about blame — it is about distinguishing the truth of who you are from the story someone else told about you.'},
{h:'Build It Every Day',b:'Self-worth is rebuilt daily through the accumulation of small acts of self-respect: the commitment honoured, the boundary held, the opinion shared, the care taken with your own appearance and health and mind. Each day is a vote for the woman you believe yourself to be.'},
]},
{emoji:'🌙',title:'Night Rituals for Connection',category:'Intimacy',tagline:'The last hour of the day builds the marriage.',pages:[
{h:'The Sacred Last Hour',b:'The hour before sleep is the most intimate in the marriage. The defenses are lowered. The pace has slowed. What happens in this hour — whether you spend it on separate screens or in genuine connection — becomes the emotional default of the marriage over time.'},
{h:'Put the Phone Down',b:'Not eventually. Before you get into bed. The phone is a third presence in the bedroom — one that takes your attention and your presence and delivers them somewhere else entirely. Reclaim the space. The feed will still be there in the morning. He will not always be.'},
{h:'The Real Question',b:'Not "how was your day" — the answer to which is always fine. But "what was the best moment?" or "what is something you have been thinking about that you have not said yet?" One real question before sleep can open a conversation that changes the quality of the entire relationship.'},
{h:'Skin to Skin',b:'Physical contact before sleep — even something as simple as a hand resting on a back — releases oxytocin, the bonding hormone, in both people. It communicates safety, belonging, and desire all at once, without words. Make it a ritual.'},
{h:'Say It Before You Sleep',b:'"I love you" said with eye contact and genuine meaning, not as reflex. "I am glad you are mine." "Today was better because you were in it." These are the last words he hears before unconsciousness. Let them matter.'},
{h:'Review the Day Together',b:'Spend five minutes sharing one thing from the day — not logistics, but experience. Something that surprised you. Something you found funny or beautiful or difficult. This practice of shared narration keeps you in each other\'s lives even when the days are spent separately.'},
{h:'The Intentional Bedroom',b:'The bedroom should feel different from the rest of the house. Dimmer light. The scent you associate with rest and intimacy. Surfaces that are clear enough to feel peaceful. The bedroom as sanctuary is a design choice that shapes the quality of sleep, intimacy, and daily reconnection.'},
{h:'The Evening Transition',b:'Moving from the busy day into the quieter evening requires a transition. A ritual that signals the shift — a shower, a change of clothes, a cup of something warm. The woman who arrives in the evening fully present offers something entirely different.'},
{h:'Read Together',b:'Not the same book necessarily — but in the same space. Reading beside each other in comfortable silence is one of the most intimate forms of companionship. It says: I choose to be near you even when we are not interacting.'},
{h:'The Goodnight That Matters',b:'The goodnight is not a formality. It is the seal of the day. Let it be warm. Let it be real. Touch. Make eye contact. Speak something genuine. The couple that goodnights each other with genuine warmth wakes toward each other rather than away.'},
{h:'Resolve Before You Sleep',b:'The touch that says "I am still here even though we are not finished" keeps the thread of connection intact through difficulty. Some closeness before sleep — however small — matters more than we realise.'},
{h:'Dream Together',b:'Ask him what he is thinking about. What he is looking forward to. What he is afraid of in the coming days. These conversations — held in the dark, before sleep — are among the most intimate available. The dark is a truth-telling space. Use it.'},
{h:'The Morning Follows the Evening',b:'How the night ends shapes how the morning begins. The couple that goes to sleep in genuine connection tends to wake in it. A morning that begins with warmth — a touch before rising, a moment before the rush begins — is the natural extension of an evening well spent.'},
{h:'Make the Bedroom Sacred',b:'Keep arguments out of the bedroom. Keep phones on the other side of the room. Keep the atmosphere clear enough that when you walk in, you both feel the shift into a different kind of space — softer, safer, more private.'},
{h:'End Every Day in Connection',b:'Not every evening will be perfect. But the commitment to end each day in some form of genuine connection — however brief, however imperfect — is the commitment that keeps a marriage genuinely alive across years and decades.'},
]},
{emoji:'🌸',title:'The Psychology of His Devotion',category:'Connection',tagline:'What actually keeps a man deeply bonded.',pages:[
{h:'What Men Actually Need',b:'Men bond deeply through feeling respected and admired. Through feeling useful and effective. Through physical closeness. Through shared experience. Understanding these specific channels is how you reach a man where he actually lives.'},
{h:'Respect as the Foundation',b:'Men bond most powerfully through feeling respected. Not deferred to — respected. Acknowledged. Treated as someone whose judgment is trusted, whose contributions are noticed, whose presence matters. A man who feels respected by his wife becomes devoted in a way that fear or obligation alone cannot create.'},
{h:'Admiration Changes Everything',b:'Tell him specifically what you admire about him. Not in a performance — but genuinely, specifically, and regularly. "I admire how you handled that." "I am proud of you." Men do not hear enough of this — especially from the person whose opinion matters most.'},
{h:'Never Stop Being His Girlfriend',b:'The greatest danger to long-term devotion is the transition from romantic partners to co-managers. The courtship does not end at the altar — it transforms. Flirt with him. Be excited when he comes home. The couples who remain madly in love never stop choosing each other actively.'},
{h:'Be the Safe Place',b:'The man who knows his wife is his safe place — where he will not be judged, shamed, or made to feel foolish — will bring her everything. His fears. His failures. His real thoughts. To be his safe place is simply to receive him without making him pay for his vulnerability.'},
{h:'Physical Affection Outside Intimacy',b:'The couple that only touches each other in the context of sex eventually experiences touch as a transaction. Touch him in ways that lead nowhere. Hold his hand in the car. Put your hand on his back as you pass him in the kitchen.'},
{h:'Celebrate His Wins',b:'When he succeeds — at anything, at any scale — celebrate genuinely and specifically. A man who feels genuinely celebrated by his wife becomes more confident, more motivated, and more devoted. Celebration is one of the most bonding things you can offer.'},
{h:'Give Him Space to Miss You',b:'Time apart — even just hours of genuine absorption in separate pursuits — creates the conditions for missing. And missing is the precursor to appreciation. The couple who has their own orbits collides with delight rather than taking presence for granted.'},
{h:'Let Him Be Imperfect',b:'The man who knows his wife accepts his imperfections — not as someone who is settling, but as someone who loves the whole of him — is freed from performance. This permission to be human is one of the most powerful bonds a wife can create.'},
{h:'Make Home a Refuge',b:'If home is where he is welcomed, where the atmosphere is warm, where his presence is clearly desired — he will rush toward it. You create that atmosphere as much as he does. Create it deliberately. Every day.'},
{h:'Stay Curious About Him',b:'The man you married is not a finished thing. He is still becoming. Stay curious about who he is now, not just who he was. Ask questions you do not know the answer to. Listen to learn, not just to respond.'},
{h:'Choose Him Publicly',b:'The way you speak about your husband in public — with warmth, with respect, with evident pride — reaches him. He hears it. He feels it. When others see that you are proud of him, he is proud of himself.'},
{h:'The Hero Instinct',b:'Ask for his help. Tell him when something he did made your life easier. Let him be your person in a tangible way. This activates a bond that is ancient and powerful and has nothing to do with weakness on your part.'},
{h:'Support His Friendships',b:'A man who has strong friendships is a healthier and better husband. Encourage his friendships. Make space for them. The wife who crowds out her husband\'s friendships creates dependency, not devotion. Support his full life, and he brings that fullness back to you.'},
{h:'Devotion Is Built, Not Born',b:'The devotion of a husband who has been deeply loved, respected, seen, and desired — built over years of daily choice — is one of the most stable forces in human relationship. It holds through every difficulty life brings. Build it. One day, one choice, one gesture at a time.'},
]},
{emoji:'🌿',title:'The Art of Feminine Rest',category:'Wellbeing',tagline:'A rested woman runs the whole show.',pages:[
{h:'Rest Is Not a Reward',b:'Most women treat rest as something to be earned — as the prize at the end of productivity. This is backwards. Rest is not the reward for work. It is the foundation that makes good work possible. The woman who rests well does everything else better.'},
{h:'Exhaustion Is Not a Virtue',b:'The cultural story that says the most devoted woman is the most depleted one is false and damaging. Exhaustion does not signal devotion. It signals the absence of self-care, which eventually becomes the absence of self. The woman who is genuinely rested is a better partner in every possible way.'},
{h:'The Rested Marriage',b:'The exhausted woman is shorter with her husband, less patient in conflict, less present in intimacy, less capable of the warmth that sustains a marriage. Rest is not just for you. It is for the marriage.'},
{h:'Sleep as Sacred',b:'Chronic sleep deprivation reduces emotional regulation, libido, patience, creativity, and immunity. Sleep is the most fundamental form of self-care available — and the one most often sacrificed first. Protect your sleep as you would protect any other essential resource.'},
{h:'Protect Your Energy',b:'Energy is finite. The woman who gives it indiscriminately eventually has nothing left for the things and people that genuinely matter. Energy management is not selfishness. It is sustainability. Know what refills you. Know what depletes you.'},
{h:'Pleasure as a Daily Practice',b:'The pleasure of a good meal eaten slowly. A bath taken without rushing. Music that lifts the mood. The smell of something beautiful. These are the sensory acknowledgment that you are alive and that aliveness deserves to be enjoyed. Pleasure is a practice. Begin it today.'},
{h:'Silence and Stillness',b:'Find some each day. Not emptiness — presence. The capacity to sit with yourself without distraction. This stillness is where the self reconstitutes. It is where you discover what you actually think, how you actually feel, what you actually want.'},
{h:'Do Less and Mean It',b:'Not every obligation requires your full participation. Not every invitation deserves a yes. The elegant art of doing less — specifically, with full attention and genuine care — produces better results than the exhausted art of doing everything to partial completion.'},
{h:'Say No as an Act of Love',b:'Every yes is automatically a no to something else. The woman who has learned to say no — warmly but clearly — has made an enormous act of self-respect. Your time and energy are among the most valuable things you possess. Give them accordingly.'},
{h:'Nature as Restoration',b:'Spend time outside without a purpose. Walk somewhere green. Sit near water. Nature has documented restorative effects on the nervous system — it reduces cortisol, improves mood, and reconnects you to something beyond the immediate demands of your life.'},
{h:'Rest From the Mental Load',b:'The mental load — the invisible management of the household, the relationships, the logistics — is as exhausting as any physical labour. Rest from it deliberately. Delegate. Release the need to track everything. The mental rest available in releasing control is substantial.'},
{h:'Creative Rest',b:'The kind of rest that comes from doing something that uses a different part of you. Drawing. Cooking experimentally. Reading fiction. Playing music. These activities restore the imaginative, playful, generative energy that makes you interesting to yourself and to others.'},
{h:'The Body Deserves Attention',b:'Move your body in ways that feel good rather than punishing. Stretch in the morning with attention. Dance in the kitchen without reason. Walk somewhere beautiful and look at what you are walking through. Care for it as something that deserves care.'},
{h:'Rest and Desire',b:'Exhaustion is one of the most common killers of desire in long-term marriages. Rest is not just maintenance for the self. It is maintenance for the marriage. The couple where both people are rested has access to an intimacy that the exhausted couple cannot reach.'},
{h:'You Deserve Rest',b:'Not because you have earned it. Not because you are efficient enough or productive enough or good enough. Simply because you are a person, and persons require rest. You deserve rest now, today, as you are. Take it without justification.'},
]},
{emoji:'✨',title:'Elegance: The Daily Practice',category:'Elegance',tagline:'Elegance is not expensive. It is intentional.',pages:[
{h:'What Elegance Actually Means',b:'Elegance is the removal of the unnecessary — the cultivation of the essential. An elegant woman chooses fewer, better things: fewer words, fewer complaints, fewer outfits that do not make her feel beautiful. She edits her life the way a great writer edits a sentence.'},
{h:'The Elegant Morning',b:'The elegant woman wakes before the chaos. She allows herself five minutes of quiet. She touches something beautiful — a good mug, a scented candle, the feeling of silk against her skin. These rituals are not indulgences. They are the infrastructure of a day lived with intention.'},
{h:'Elegance in Speech',b:'The elegant woman says what she means without excess. She does not pad her sentences with filler. She does not use volume as emphasis. When she speaks, the quality of her voice — its pace, its warmth — communicates as much as the words themselves. Speech is a form of style.'},
{h:'Elegance in Conflict',b:'She states her position once, clearly, without cruelty. She does not raise her voice. She does not bring up the past as ammunition. She fights for the relationship rather than against her husband. And when the conflict is resolved, she lets it be resolved completely.'},
{h:'The Elegant Body',b:'Elegance is posture, pace, and presence. The elegant woman stands tall because she is proud of what she carries. She walks as if she has somewhere worth going. She moves without rushing. These things cost nothing and change the way an entire room perceives her.'},
{h:'Elegance in Receiving',b:'The elegant woman receives a compliment without deflecting it. She accepts help without immediately reciprocating to neutralize it. She allows herself to be given to. Learning to receive fully is one of the most elegant things a woman can practise.'},
{h:'The Elegance of Restraint',b:'Not every thought requires expression. Not every feeling requires articulation in the moment. The elegant woman has a strong filter between impulse and action. This restraint is the considered choice of a woman who understands that not everything serves the larger goal.'},
{h:'Elegance in the Bedroom',b:'In the bedroom, elegance means intention. It means showing up present — not distracted by the day, not going through motions. The elegant lover is not passive. She is deliberate, sensual, and fully there. Her presence in the bedroom is a gift.'},
{h:'The Elegant Home',b:'An elegant home is not a perfect home. It is a home with a point of view — where objects are chosen rather than accumulated, where scent and light and texture are considered. A vase of fresh flowers. A candle burning in the evening. These things signal that someone cares about beauty.'},
{h:'Elegance in Dressing',b:'She dresses for how she wants to feel — not to impress, but to inhabit herself fully. She has a signature — a colour, a silhouette, an aesthetic — that is recognisably hers. She does not follow every trend. She curates. Curation is one of the most visible expressions of the elegant mind.'},
{h:'Elegance in Friendship',b:'She is loyal without being possessive. She celebrates her friends\' successes with genuine warmth. She shows up when it matters. Her friendships reveal her character when no one is evaluating her.'},
{h:'Elegance in Aging',b:'The elegant woman does not fight aging. She moves through it with the same intentionality she brings to everything else. She invests in her health, her skin, her style — not from fear of time, but from pride in her own appearance. She grows into her face.'},
{h:'The Elegance of Punctuality',b:'Being late is a form of entitlement. The elegant woman is on time. Not obsessively early, not fashionably late. She arrives when she said she would. This small discipline is a form of respect — for the other person\'s time and for her own word.'},
{h:'Discretion as Elegance',b:'A high-value woman keeps her marriage private, her conflicts private, her plans private. What is sacred is protected. Not everything needs an audience. Privacy is itself a form of power. The most elegant women are also the most discreet.'},
{h:'The Ultimate Elegance',b:'The most elegant thing a woman can be is entirely herself — without apology, without performance, without the need for anyone else\'s validation to feel complete. This is the elegance that cannot be purchased or imitated. It is earned through years of self-knowledge and self-respect.'},
]},
{emoji:'💫',title:'The Long Game of Love',category:'Connection',tagline:'Love is not a feeling. It is a practice.',pages:[
{h:'Love as a Practice',b:'The love that lasts is not a feeling that happens to you — it is a practice you maintain. It is the accumulation of thousands of small decisions over years: to be present rather than distracted, to be kind rather than impatient, to repair rather than withdraw, to choose the other person even on the days when you do not particularly feel like it.'},
{h:'The Long View',b:'Every marriage has seasons — stretches of extraordinary closeness and stretches of ordinary distance. The couple who has committed to the long view does not treat the distance as evidence that the closeness is gone. They recognise it as a season, tend it with care, and trust that the closeness returns when they both orient toward it.'},
{h:'Knowing and Being Known',b:'The deepest form of love available in a marriage is the experience of being fully known — with all your imperfections, all your history, all your worst moments and your best — and fully loved anyway. This is the work of years. When you reach it, you have something that no other human relationship can provide.'},
{h:'Choosing Again and Again',b:'Love in a long marriage is not a single choice made once. It is the same choice made repeatedly — on ordinary Tuesdays, in moments of frustration, in the aftermath of disappointment. Choose the relationship. Choose him. Choose it again. This is the practice.'},
{h:'Love and Forgiveness',b:'Long love requires long forgiveness — the capacity to forgive not just the dramatic failures, but the accumulated small irritations, the ways he has disappointed you. This forgiveness is a quiet, ongoing choice to see him in full and love the whole of him.'},
{h:'The Love That Sees',b:'Long love sees. It notices when the other person is struggling before they say so. It remembers what matters to them. It sees who they are now and who they are still becoming. Being seen by someone who has chosen to see you for decades is one of the most profound experiences available.'},
{h:'Love and Growth',b:'The love that lasts grows alongside the changes both people go through. It chooses to fall in love with each new version of the person rather than mourning the earlier ones. This requires curiosity about who they are now, and the willingness to update.'},
{h:'Love in the Body',b:'Long love is physical — not only sexually, but in the full range of physical connection that sustains intimacy: the hand held without thinking about it, the shoulder leaned against, the embrace at the end of a difficult day. The couple that maintains physical affection across decades maintains a closeness that emotional connection alone cannot fully provide.'},
{h:'Love and Humor',b:'The marriages that last longest almost always contain a lot of genuine laughter. Not polite laughter — real laughter, the kind that comes from years of shared references and private jokes. Protect the humour in the marriage. Cultivate it. It is evidence of ease and delight in each other.'},
{h:'Love During Hardship',b:'There are seasons in every marriage when love is not a feeling but a discipline — when the illness or the loss or the financial pressure has consumed everything warm and left only obligation. This is the love that matters most. Not the love of the easy seasons, but the love that shows up in the hard ones.'},
{h:'Love and Admiration',b:'Long love retains its capacity for admiration — the admiration of a person who has watched another person navigate life over years and found them, repeatedly, worthy of respect. Tell him what you admire. Specifically. Regularly. The marriage where both people still admire each other is a marriage with enduring passion.'},
{h:'Love as Legacy',b:'The love you build in your marriage is a demonstration to everyone who observes it — your children, your friends — of what love can be. A marriage of genuine depth, warmth, and mutual respect is a kind of gift to the world. It shows what is possible. Take it seriously as a legacy.'},
{h:'Keep Dating Each Other',b:'The feeling of dating — the anticipation, the attention, the deliberate effort to be interesting and present and attractive — does not have to end. It transforms. Dating your husband looks different than it did before the marriage and children. But the spirit is the same: two people choosing each other actively.'},
{h:'The Story You Are Writing',b:'Your love story is not finished. It is being written today, in the choices you make and the way you treat each other. You are not just the subject of the story — you are its author. What are you writing today? What would you like the next chapter to be?'},
{h:'Keep Choosing',b:'The long game of love is won in the daily choice to keep playing. To keep showing up, keep trying, keep turning toward rather than away. The life you are building together is worth every choice it costs. Keep choosing. Every day. For as long as you live.'},
]},
];


// ── DAILY SELECTION (changes every day by date) ───────────────
function getDailyItem(arr) {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth()+1) * 100 + today.getDate();
  return arr[seed % arr.length];
}

// ── STATE ─────────────────────────────────────────────────────
let journalEntries = JSON.parse(localStorage.getItem('sucre_j') || '[]');
let currentPrompt = '';
let currentBook = null;
let currentPage = 0;
let bookFilter = 'All';

// ── NAV ───────────────────────────────────────────────────────
document.getElementById('today-date').textContent =
  new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});

document.querySelectorAll('.nb').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nb').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('sec-' + btn.dataset.s).classList.add('active');
  });
});

// ── DAILY TIP ─────────────────────────────────────────────────
function renderDailyTip() {
  const tip = getDailyItem(DAILY_TIPS);
  const c = col(tip.category);
  const container = document.getElementById('daily-tip-card');
  container.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:16px">
      <div style="width:44px;height:44px;border-radius:50%;border:1px solid ${c};color:${c};display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0">${tip.emoji}</div>
      <div style="font-size:10px;letter-spacing:.25em;text-transform:uppercase;color:${c}">${tip.category}</div>
    </div>
    <p style="font-size:17px;line-height:1.9;color:rgba(245,230,216,.92);font-style:italic">${tip.tip}</p>
    <div style="margin-top:24px;padding-top:20px;border-top:1px solid rgba(201,169,110,.15);display:flex;align-items:center;justify-content:space-between">
      <span style="font-size:11px;color:rgba(245,230,216,.35);letter-spacing:.1em">Your focus for today</span>
      <div id="tip-done-btn" style="padding:8px 18px;border:1px solid rgba(201,169,110,.4);border-radius:20px;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:#c9a96e;cursor:pointer;font-family:Georgia,serif;transition:all .3s">Mark Done</div>
    </div>`;
  document.getElementById('daily-intro').classList.add('hidden');
  document.getElementById('daily-tip-card').classList.remove('hidden');
  const doneKey = 'sucre_done_' + new Date().toDateString();
  if (localStorage.getItem(doneKey)) markDone();
  document.getElementById('tip-done-btn')?.addEventListener('click', () => {
    localStorage.setItem(doneKey, '1');
    markDone();
  });
}

function markDone() {
  const btn = document.getElementById('tip-done-btn');
  if (!btn) return;
  btn.textContent = '✓ Done';
  btn.style.background = 'rgba(201,169,110,.2)';
  btn.style.borderColor = '#c9a96e';
  btn.style.cursor = 'default';
}

document.getElementById('begin-daily')?.addEventListener('click', renderDailyTip);

// ── SPICE IDEA ────────────────────────────────────────────────
function renderSpiceIdea() {
  const idea = getDailyItem(SPICE_IDEAS);
  const c = col(idea.intensity);
  const container = document.getElementById('spice-idea-card');
  container.innerHTML = `
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:14px">
      <span style="font-size:28px">${idea.emoji}</span>
      <div>
        <div style="font-size:16px;font-style:italic;color:#f5e6d8;margin-bottom:4px">${idea.title}</div>
        <div style="font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:${c}">${idea.intensity}</div>
      </div>
    </div>
    <p style="font-size:15px;line-height:1.85;color:rgba(245,230,216,.78)">${idea.description}</p>
    <div style="margin-top:20px;padding-top:16px;border-top:1px solid rgba(212,104,122,.15)">
      <span style="font-size:11px;color:rgba(245,230,216,.35);letter-spacing:.1em">Your spice idea for today</span>
    </div>`;
  document.getElementById('spice-intro').classList.add('hidden');
  document.getElementById('spice-idea-card').classList.remove('hidden');
}

document.getElementById('begin-spice')?.addEventListener('click', renderSpiceIdea);

// ── JOURNAL ───────────────────────────────────────────────────
function newPrompt() {
  const seed = new Date().getDate() + new Date().getMonth();
  currentPrompt = PROMPTS[seed % PROMPTS.length];
  document.getElementById('j-prompt').textContent = '"' + currentPrompt + '"';
}
newPrompt();

function renderEntries() {
  const section = document.getElementById('entries-section');
  const list = document.getElementById('entries-list');
  if (!journalEntries.length) { section.classList.add('hidden'); return; }
  section.classList.remove('hidden');
  list.innerHTML = journalEntries.slice(0,10).map(e =>
    `<div class="ec"><span class="ed">${e.date}</span><p class="ep">"${e.prompt}"</p><p class="et">${e.text.length>200?e.text.slice(0,200)+'…':e.text}</p></div>`
  ).join('');
}
renderEntries();

document.getElementById('save-entry')?.addEventListener('click', () => {
  const text = document.getElementById('j-area').value.trim();
  if (!text) return;
  journalEntries = [{id:Date.now(),prompt:currentPrompt,text,date:new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})},...journalEntries].slice(0,20);
  localStorage.setItem('sucre_j', JSON.stringify(journalEntries));
  document.getElementById('j-area').value = '';
  newPrompt();
  renderEntries();
});

// ── BOOKS ─────────────────────────────────────────────────────
const categories = ['All', ...new Set(BOOKS.map(b => b.category))];

function renderFilters() {
  const row = document.getElementById('filter-row');
  row.innerHTML = categories.map(cat =>
    `<button class="fb${cat===bookFilter?' active':''}" data-cat="${cat}">${cat}</button>`
  ).join('');
  row.querySelectorAll('.fb').forEach(btn => {
    btn.addEventListener('click', () => { bookFilter=btn.dataset.cat; renderFilters(); renderGrid(); });
  });
}

function renderGrid() {
  const grid = document.getElementById('books-grid');
  const filtered = bookFilter==='All' ? BOOKS : BOOKS.filter(b=>b.category===bookFilter);
  grid.innerHTML = filtered.map(book => {
    const c = col(book.category);
    const idx = BOOKS.indexOf(book);
    return `<div class="bk" data-idx="${idx}"><div class="be">${book.emoji}</div><div class="bcat" style="color:${c}">${book.category}</div><div class="bti">${book.title}</div><div class="btag">${book.tagline}</div><div class="bpn">${book.pages.length} chapters</div></div>`;
  }).join('');
  grid.querySelectorAll('.bk').forEach(card => {
    card.addEventListener('click', () => openBook(parseInt(card.dataset.idx)));
  });
}

function openBook(idx) {
  currentBook = BOOKS[idx]; currentPage = 0;
  document.getElementById('books-grid-view').classList.add('hidden');
  document.getElementById('book-reader').classList.remove('hidden');
  renderPage();
}

function renderPage() {
  const page = currentBook.pages[currentPage];
  const c = col(currentBook.category);
  document.getElementById('r-emoji').textContent = currentBook.emoji;
  document.getElementById('r-cat').textContent = currentBook.category;
  document.getElementById('r-cat').style.color = c;
  document.getElementById('r-title').textContent = currentBook.title;
  document.getElementById('r-chapter').textContent = 'Chapter ' + (currentPage+1);
  document.getElementById('r-heading').textContent = page.h;
  document.getElementById('r-body').textContent = page.b;
  document.getElementById('r-page-num').textContent = (currentPage+1) + ' / ' + currentBook.pages.length;
  document.getElementById('r-prev').disabled = currentPage===0;
  document.getElementById('r-next').disabled = currentPage===currentBook.pages.length-1;
  const pct = ((currentPage+1)/currentBook.pages.length)*100;
  document.getElementById('r-progress').style.width = pct+'%';
  document.getElementById('r-progress').style.background = c;
}

document.getElementById('r-prev')?.addEventListener('click', ()=>{if(currentPage>0){currentPage--;renderPage();}});
document.getElementById('r-next')?.addEventListener('click', ()=>{if(currentPage<currentBook.pages.length-1){currentPage++;renderPage();}});
document.getElementById('back-btn')?.addEventListener('click', ()=>{
  document.getElementById('book-reader').classList.add('hidden');
  document.getElementById('books-grid-view').classList.remove('hidden');
});

renderFilters();
renderGrid();
