// ── PWA INSTALL ──────────────────────────────────────────────
let deferredPrompt;
window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredPrompt = e;
  document.getElementById('install-bar').classList.remove('hidden');
});
document.getElementById('install-now')?.addEventListener('click', async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  await deferredPrompt.userChoice;
  deferredPrompt = null;
  document.getElementById('install-bar').classList.add('hidden');
});
document.getElementById('install-dismiss')?.addEventListener('click', () => {
  document.getElementById('install-bar').classList.add('hidden');
});
window.addEventListener('appinstalled', () => {
  document.getElementById('install-bar').classList.add('hidden');
});
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

// ── API ───────────────────────────────────────────────────────
const API = 'https://api.anthropic.com/v1/messages';
const MDL = 'claude-sonnet-4-20250514';
async function claude(system, msg) {
  const r = await fetch(API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    },
    body: JSON.stringify({ model: MDL, max_tokens: 1000, system, messages: [{ role: 'user', content: msg }] })
  });
  const d = await r.json();
  return d.content?.[0]?.text || '';
}

// ── SYSTEMS ───────────────────────────────────────────────────
const DSYS = `You are Sucre — a warm, sophisticated relationship coach for married women who want to keep their husbands deeply in love and obsessed with them. Generate exactly 5 daily action tips that are practical, sensual, emotionally intelligent, and immediately actionable TODAY. Cover: Intimacy, Flirtation, Emotional, Confidence, Surprise. Return ONLY a JSON array of 5 objects with keys category, tip, emoji. No markdown.`;
const SSYS = `You are Sucre — a sophisticated relationship advisor for married women. Generate 4 creative ideas to spice up the marriage tonight or this week: bedroom adventures, surprise dates, flirty games, or romantic gestures. Make them vivid and specific. Return ONLY a JSON array of 4 objects with keys title, description, intensity (Playful|Bold|Daring|Intimate), emoji. No markdown.`;

// ── JOURNAL PROMPTS — marriage-focused ───────────────────────
const PROMPTS = [
  "What is one thing your husband does that you have stopped noticing — and what would it mean to truly see it again?",
  "When did you last make him feel like the most important person in the room? What happened, and how can you do it again this week?",
  "What version of yourself shows up most in your marriage right now — and is that the woman you want to be his partner?",
  "Write about a moment of real closeness between you and your husband. What created it? How do you bring more of that?",
  "What resentment are you quietly carrying in this marriage? What would it free up in you to release it?",
  "What does your husband need from you right now that you have not been giving? What stops you?",
  "Describe the marriage you want five years from now. What has to change today to build that?",
  "When did you last initiate something — physically, romantically, emotionally? What held you back and what would happen if you stopped waiting?",
  "What is one thing you admire deeply about your husband that you have never told him? Why haven't you said it — and when will you?",
  "Where in your marriage are you playing small — shrinking your needs, your desires, your voice? What would it look like to take up more space?",
  "Write about a conflict you and your husband have had more than once. What is it really about beneath the surface?",
  "What is the most romantic thing you have ever done for him? What stopped you from doing something like that recently?",
  "How has becoming a wife changed who you are? What parts of yourself do you want to reclaim?",
  "What does intimacy mean to you in this season of your marriage — and how close is your reality to that vision?",
  "If your marriage were a garden, what is thriving, what is neglected, and what needs to be replanted entirely?"
];

// ── COLORS ────────────────────────────────────────────────────
const CC = {
  Intimacy:'#c9a96e', Flirtation:'#d4687a', Emotional:'#8b7bb5',
  Confidence:'#5a9a8a', Surprise:'#c96e8f',
  Playful:'#8bc4b5', Bold:'#c9a96e', Daring:'#d4687a', Intimate:'#8b7bb5',
  Desire:'#d4687a', Elegance:'#c9a96e', Power:'#8b7bb5',
  Connection:'#5a9a8a', Wellbeing:'#8bc4b5', Identity:'#c96e8f', Sensuality:'#d4687a'
};
const col = c => CC[c] || '#c9a96e';

// ── FALLBACKS ─────────────────────────────────────────────────
const FT = [
  {category:'Flirtation',tip:'Send him one text with no logistics — just something that made you think of him.',emoji:'💌'},
  {category:'Intimacy',tip:'Tonight, initiate physical closeness first. Touch his arm, his back — let him feel chosen.',emoji:'🔥'},
  {category:'Confidence',tip:'Wear something today that makes you feel like the most beautiful version of yourself.',emoji:'✨'},
  {category:'Emotional',tip:'Ask him one real question about something he cares about — and truly listen.',emoji:'💬'},
  {category:'Surprise',tip:'Leave a handwritten note somewhere he will find it unexpectedly.',emoji:'🌹'}
];
const FS = [
  {title:'The Blind Taste Game',description:'Blindfold him and feed him different foods — let touch and taste become surprisingly intimate.',intensity:'Playful',emoji:'🍓'},
  {title:'Dress Code: Just for Him',description:'Get dressed specifically to his taste one evening. Tell him it is for him.',intensity:'Intimate',emoji:'👗'},
  {title:'Mystery Date',description:'Plan a date entirely in secret. Tell him only what to wear and when to be ready.',intensity:'Bold',emoji:'🌙'},
  {title:'The Love Letter Drop',description:'Write him a vivid letter about exactly what you love about him. Leave it on his pillow.',intensity:'Intimate',emoji:'💌'}
];

// ── 15 BOOKS ──────────────────────────────────────────────────
const BOOKS = [

// 1
{emoji:'🌹',title:'The Art of Seduction',category:'Desire',tagline:'Make him unable to think of anyone else.',pages:[
{h:'The First Law of Seduction',b:'Seduction is never about desperation — it is about abundance. The woman who truly seduces does not chase; she creates conditions so irresistible that he comes to her willingly. Move through the world as if you already have everything you need, and he will want to be part of that world. Desperation repels. Fullness attracts.'},
{h:'Mystery Is Your Greatest Asset',b:'Never reveal everything at once. Leave sentences unfinished. Have opinions you do not fully explain. Laugh at things he does not quite understand. Mystery is not coldness — it is depth. And depth is endlessly attractive to a man who wants to feel like he is still discovering you years into a marriage.'},
{h:'The Power of Withdrawal',b:'Presence is powerful, but strategic withdrawal is more powerful. When you pull back slightly — become absorbed in your own world, your own projects, your own joy — he will lean in. The woman who is always available is taken for granted. The woman who has her own orbit pulls him into her gravity without trying.'},
{h:'Seduce His Mind First',b:'Physical attraction fades if the mind is not engaged. Ask him questions that make him think. Challenge his ideas gently. The man who feels truly understood by a woman — not just loved, but intellectually seen — becomes profoundly devoted. The mind is the longest erogenous zone. Engage it deliberately and often.'},
{h:'The Scent Anchor',b:'Choose a signature scent and wear it consistently in intimate moments. The brain links scent to emotion more powerfully than any other sense. Over time, your scent becomes inseparable from the feeling of desire and warmth. He will smell it on a stranger someday and feel something move in him. That association is yours to build deliberately.'},
{h:'The Art of Suggestion',b:'What is implied is more powerful than what is stated. A glance held a moment too long. A sentence that trails off suggestively. A touch that stops before it should. Suggestion activates the imagination — and the imagination, once engaged, does more seductive work than any direct action ever could. Imply more. Deliver less. Let him fill in the rest.'},
{h:'Make Him Feel Like a Discovery',b:'Show him sides of yourself that the world does not get to see. Let him be the one who knows you at your most unguarded, most playful, most complex. When a man feels he has access to something rare and exclusive, his investment deepens enormously. Exclusivity creates value. Give him the private self — slowly, in layers, without end.'},
{h:'The Seductive Environment',b:'Your home, your presence, your way of being in the world — these are environments you create. A home that is beautiful and sensory, a manner that is warm and unhurried, an atmosphere of ease and pleasure — these things communicate that being near you feels better than being anywhere else. Design the environment of attraction deliberately.'},
{h:'Timing Is Everything',b:'The right word at the wrong moment falls flat. The right touch at the wrong time is ignored. Seduction requires attunement — to his mood, his energy, his needs in this particular moment. The woman who reads the room and acts in alignment with it seems almost magical. She gets what she wants because she offers what is actually needed, precisely when it is needed.'},
{h:'The Look That Says Everything',b:'Before a word is spoken, your eyes communicate your inner state. Practice a gaze that is warm but direct — not coy, not flinching, but steady and present. The woman who can meet a man\'s eyes without deflecting communicates confidence and depth simultaneously. Let your eyes speak before your mouth does. Let him feel looked at — really looked at.'},
{h:'Seduce Through Absence',b:'Let there be evenings that are yours alone. Nights with friends. Projects that absorb you completely. Time when he simply cannot reach you. This absence — handled warmly and without coldness — creates the condition for missing. And missing is the precursor to appreciation, desire, and the renewed awareness that he wants you specifically.'},
{h:'Embody What You Want to Attract',b:'If you want passion, be passionate — about your life, your work, your ideas. If you want depth, cultivate depth. If you want romance, be romantic. You cannot attract what you do not embody. The seductive woman is not performing a role — she is living a life so rich and so fully inhabited that others cannot help but want to enter it.'},
{h:'Never Stop the Seduction',b:'The mistake many married women make is believing seduction belongs only to the beginning. It does not. Seduction in a long marriage is subtler, deeper, and more meaningful — because it is chosen, not automatic. The woman who continues to seduce her husband after years together is the woman he considers himself profoundly lucky to have. Choose it every day.'},
{h:'The Final Secret',b:'The deepest seduction is not about techniques or timing or mystery alone. It is about being so genuinely, fully, unapologetically yourself — so alive and interesting and at home in your own skin — that being near you feels like an expansion of life. That is the seduction that lasts decades. Become that woman. Everything else follows naturally.'},
{h:'Seduction as a Daily Practice',b:'Seduction is not saved for special occasions. It lives in the ordinary — in the way you dress for a Tuesday, in the text sent at noon with no agenda, in the question asked at dinner that has nothing to do with logistics. The great marriages are not sustained by occasional grand gestures. They are built from the daily practice of choosing to be irresistible.'},
]},

// 2
{emoji:'👑',title:'The High-Value Woman',category:'Elegance',tagline:'She knows exactly what she is worth.',pages:[
{h:'What High Value Actually Means',b:'High value is not about wealth, beauty, or status. It is about the relationship a woman has with herself — the degree to which she knows her worth, acts from that knowing, and refuses to compromise it for approval or comfort. A high-value woman is not cold or difficult. She is simply certain. And certainty is one of the most compelling qualities a person can possess.'},
{h:'Composure Is Currency',b:'A high-value woman does not raise her voice to be heard. She does not panic publicly, does not complain without purpose, and does not justify herself to those who have not earned her explanation. Composure is not suppression — it is the quiet confidence of a woman who knows she does not need to perform distress to be taken seriously.'},
{h:'She Does Not Compete',b:'The high-value woman is not threatened by other women. She does not compare herself, does not diminish others, does not compete for attention. Her security comes from within. This absence of competition is itself magnetic — it signals an abundance mindset that is rare and deeply attractive. A woman who has no need to compete has already won.'},
{h:'Standards Without Ultimatums',b:'She knows what she will and will not accept — and she communicates this with warmth rather than aggression. Standards are not threats. They are the quiet architecture of a life built with integrity. They are expressed through her choices, not her words. The woman who holds her standards lightly but firmly never has to demand respect — she simply receives it.'},
{h:'She Does Not Over-Explain',b:'When she makes a decision, she does not require others to agree with it or understand it. She does not lecture, justify, or convince. This restraint signals confidence — the kind that does not depend on external validation to feel legitimate. The woman who explains herself endlessly undermines her own authority. The woman who trusts her choices creates authority effortlessly.'},
{h:'Gratitude as a Practice',b:'Entitlement repels. Genuine gratitude attracts. A high-value woman notices what is done for her and acknowledges it specifically — not gushingly, but with the warmth of someone who was actually paying attention. This quality of noticing makes the people around her feel seen. And people give more to those who see them.'},
{h:'The Art of Speaking Less',b:'Speak with intention. Say less than you think. Let silences breathe. A woman who speaks thoughtfully is taken more seriously than one who fills every space with words. When you do speak, the room shifts — because it has learned that what you say will be worth hearing. Economy of language is a mark of self-respect.'},
{h:'Emotional Availability Without Dependency',b:'She is warm, open, and genuinely present with the people she loves. But her emotional stability does not depend on their behaviour. She feels things deeply — and she manages those feelings herself before bringing them into a relationship. This distinction between availability and dependency is one of the marks of true emotional maturity.'},
{h:'She Invests in Herself Consistently',b:'Not as self-indulgence, but as self-respect. She reads. She moves her body. She cultivates skills. She nurtures her friendships. She tends to her inner life. These investments compound over time into a woman who is richer, more interesting, and more grounded with every passing year. She is always becoming — and becoming is irresistible.'},
{h:'Discretion as Sophistication',b:'A high-value woman does not share everything she knows, feels, or observes. She keeps her marriage private, her conflicts private, her plans private. What is sacred is protected. This is not secrecy — it is the understanding that not everything needs an audience, and that privacy is itself a form of power.'},
{h:'How She Handles Conflict',b:'She does not attack. She does not retreat into silence. She addresses conflict directly, specifically, and without cruelty. She fights for the relationship rather than against her husband. And when the conflict is resolved, she lets it be resolved — she does not carry the residue into the next day. Conflict ends cleanly when handled by a woman who values the relationship more than being right.'},
{h:'She Knows When to Walk Away',b:'Not dramatically, not as a threat, but as a natural expression of her self-respect. From conversations that go nowhere. From environments that diminish her. From dynamics that ask her to be less than herself. The woman who knows when to disengage preserves her energy for what genuinely deserves it.'},
{h:'Consistency Is Her Signature',b:'A high-value woman is the same person in public and in private. Her values do not shift with the audience. Her warmth is not performed. Her standards do not fluctuate with her mood. This consistency is deeply trustworthy — and trust is the foundation of every meaningful relationship she builds.'},
{h:'How She Enters a Room',b:'She slows down before entering. She takes a breath. She makes eye contact before she smiles. She moves without appearing to rush. None of this is performance — it is the physical expression of a woman who knows she has arrived somewhere worth arriving. This quality of presence is immediately felt by everyone in the room.'},
{h:'She Keeps Becoming',b:'The high-value woman is not a finished product. She is a woman in motion — growing, evolving, shedding what no longer serves her, and building what she wants to become. This quality of ongoing growth means she is never boring, never fully predictable, and always worth investing in. She is always becoming — and that becoming never stops.'},
]},

// 3
{emoji:'🕯️',title:'Keeping Passion Alive',category:'Desire',tagline:'Long-term passion is a daily choice.',pages:[
{h:'Passion Requires a Decision',b:'Passion in a long-term relationship does not maintain itself. It requires a daily decision to prioritise it — to treat the marriage as something alive that needs tending rather than a finished structure that can be left to stand. The couples who remain passionate after ten, twenty, thirty years are not lucky. They are deliberate. Passion is a practice, not a feeling that happens to you.'},
{h:'Date Nights Are Non-Negotiable',b:'Not optional. Not when we have time. Scheduled, protected, non-negotiable. Date nights are not about the activity — they are about the signal: we are still choosing each other over everything else competing for our attention. The couple that consistently creates protected time together consistently feels like partners rather than co-managers of a household.'},
{h:'Initiate More',b:'Initiation is a gift. When you reach for him — physically, emotionally, romantically — you give him the experience of being wanted. Being wanted by the person you love is one of the most powerful experiences available to a human being. Do not wait to be pursued. Pursue. The woman who initiates is the woman who leads the marriage toward desire rather than waiting for it to appear.'},
{h:'Novelty as Fuel',b:'Try things you have never tried together. Go somewhere neither of you has been. Eat something neither of you has ordered. Have a conversation about a topic you have never discussed. These small novelties — not dramatic, not expensive — reactivate the brain\'s reward system and create the neurological conditions for renewed attraction. Novelty is not dissatisfaction. It is staying alive.'},
{h:'Desire Needs Oxygen',b:'Desire cannot breathe in an atmosphere of resentment, contempt, or unresolved conflict. These are the great suffocators of passion — and they accumulate quietly if not addressed. Keep the relational atmosphere clean. Address resentments before they calcify. Repair conflicts before they become the wallpaper. The emotional air quality of your marriage is the environment in which desire either flourishes or dies.'},
{h:'Keep Some Mystery',b:'The couple with no mystery between them eventually runs out of things to discover. Keep some thoughts to yourself. Have pursuits he is not entirely familiar with. Maintain an interior life that surfaces in conversation selectively, as invitation rather than disclosure. The woman who is not completely known remains interesting. This is not withholding — it is the natural result of being a full person with an ongoing inner life.'},
{h:'The Physical Baseline',b:'The frequency and quality of physical intimacy shapes the emotional tone of everything else in the marriage. This does not mean performance or obligation — but it does mean prioritising physical connection consistently, even when life is busy and exhausting. The couple that allows weeks to pass without intimacy is building distance. The couple that maintains a physical baseline builds toward each other.'},
{h:'Fantasy and Imagination',b:'Keep your imagination active in the context of your marriage. Think about him during the day in ways that are not logistical. Allow desire to exist as a thought before it becomes an action. Share fantasies. Ask about his. The imagination, when engaged, does enormous amounts of work on behalf of desire — keeping it present and alive even during the ordinary stretches of life.'},
{h:'Adventure Is Bonding',b:'Shared experiences that are genuinely novel and slightly challenging — travel, physical challenges, learning something new together — create a bonding that routine cannot. Adrenaline and novelty shared together reactivate attraction. You do not need to climb mountains. You need to do something together that neither of you has done before. Make it a habit to keep having firsts.'},
{h:'After Children',b:'Children are the most common extinction event for marital passion — not because parenthood is wrong, but because it is all-consuming. The couples who survive it with passion intact are the ones who protected the marriage with the same ferocity they brought to the parenting. The marriage is not less important than the children. It is the foundation on which the children stand.'},
{h:'The Weekly Check-In',b:'Once a week, create the space for an honest conversation about the state of the marriage — what is working, what needs attention, what each person needs more of. This is not a complaint session. It is a maintenance ritual. Marriages that have regular honest conversations stay aligned. Marriages that do not slowly drift apart, often without either person noticing until the distance is significant.'},
{h:'Passion After Conflict',b:'The most passionate moments in many marriages come after genuine conflict and repair. The vulnerability of an honest fight, followed by genuine reconnection, creates an intimacy that comfortable periods rarely touch. Do not fear conflict. Fear the conflict that never resolves. The marriage that can fight and come back together, genuinely, is one of the most passionate and alive relationships there is.'},
{h:'Dress for It',b:'Occasionally — not always, but deliberately — dress in a way that signals desire. Not for a special occasion, but for a random Wednesday. Tell him why. The unexpectedness of this effort communicates more than the effort itself. It says: I still want you to want me. And that sentence, delivered in fabric and intention, lands very differently than any verbal declaration could.'},
{h:'The Long Goodbye and the Real Welcome',b:'How you greet him when he comes home and how you say goodbye when he leaves — these small rituals shape the marriage\'s daily emotional temperature. A real embrace. Eye contact before the hug ends. Something said with genuine feeling. These fifteen-second moments, practised daily, accumulate into a marriage where both people feel genuinely wanted. Start there.'},
{h:'Choose It Again Today',b:'The decision to keep a marriage passionate is made not once but every day, in small choices: the phone put down, the touch initiated, the date planned, the compliment given, the conflict repaired. Passion is not a feeling that happens to you. It is the cumulative result of thousands of choices to treat this particular relationship as something worth tending. Make the choice today.'},
]},

// 4
{emoji:'🦋',title:'Reclaiming Your Identity',category:'Identity',tagline:'The woman he fell for — she is still in you.',pages:[
{h:'Who Were You Before?',b:'Before wife. Before mother. Before all the roles accumulated around you like layers of sediment — who were you? What made you laugh without thinking? What did you want to become? What were you working toward? She is still there. The version of you that existed before you became everything for everyone — she did not disappear. She went quiet. And she is waiting for you to come back.'},
{h:'The Cost of Disappearing',b:'When a woman loses herself in her roles — wife, mother, daughter, employee — there is a cost that is paid quietly and over time. She becomes less interesting to herself, which makes her less interesting to others. She becomes more anxious, because her sense of self depends entirely on external things. She becomes resentful, though she may not be able to name the source. The marriage eventually feels the weight of her disappearance.'},
{h:'The Woman He Fell For',b:'Think about who you were when he chose you. She was more spontaneous. More confident in her opinions. More playful. More absorbed in her own becoming. She was not less — she was more. She did not shrink to fit. She was fully herself, and he fell in love with that fullness. She is not gone. She got buried under everything that accumulated after. Dig her out. He still wants her.'},
{h:'Ambition Is Attractive',b:'A woman with goals is a woman worth watching. You do not need to be building an empire — but you should be building something. A skill you are developing. A project that engages you. An ambition you are pursuing. The woman who is becoming something is endlessly more compelling than the woman who has stopped moving. Your ambition is not selfish. It is the fuel that keeps you interesting to yourself and irresistible to him.'},
{h:'Stop Shrinking',b:'Notice every time you make yourself smaller — quieter than you want to be, less certain than you feel, less present than you are — to manage someone else\'s comfort. Stop. Take up the space you are entitled to. Share the opinion. Order what you actually want. Wear the thing you have been saving for a special occasion that never seems to arrive. Smallness is a habit that can be unlearned. Unlearn it.'},
{h:'Your Interests Are Non-Negotiable',b:'The things you love — the music, the books, the hobbies, the creative outlets — are not luxuries. They are the materials from which your identity is constructed. When you abandon them for the sake of efficiency or others\' preferences, you are dismantling yourself piece by piece. Protect your interests with the same vigour you protect everyone else\'s needs. They are what makes you who you are.'},
{h:'The Permission You Are Waiting For',b:'You are waiting for permission to take up more space, want more things, pursue more of yourself. The permission is not coming from outside. There is no one who will grant it to you. You grant it to yourself. Today. By deciding that who you are and what you want matters — not more than your family, but as much. Decide this. It changes everything.'},
{h:'Pursue Something Hard',b:'Something that could fail. Something that requires real effort. Something you might not be good at initially. The pursuit of something genuinely difficult — that costs you comfort and requires growth — builds a quality of self-respect that nothing else can replicate. And self-respect, visible in a woman, is one of the most attractive qualities her husband can witness in the person he married.'},
{h:'Reclaim Your Ambitions',b:'Whatever you put on hold — the career pivot, the business idea, the creative project, the education — it is not too late and you are not too far in. Your ambitions did not expire when you got married or had children. They went underground. Bring them back up. Even in small doses. Even imperfectly. The woman who is moving toward her own dreams has a quality of aliveness that transforms her marriage.'},
{h:'You Are Not Just a Mother',b:'Motherhood is one of the most profound identities a woman can inhabit — but it is not the only one. The woman who has no identity outside her children is not only diminishing herself; she is also building an unsustainable structure that collapses when the children leave. You are a woman who is also a mother. Hold both. The distinction saves you — and ultimately serves your children better.'},
{h:'Friendship as Fuel',b:'The woman who has her own friendships — real ones, not just mutual couple friendships — has something that no marriage can fully provide: the experience of being known and loved purely as herself, not in the context of her roles. Invest in your friendships. Prioritise them without guilt. They are not a luxury you enjoy when the marriage is full enough. They are maintenance for the self the marriage needs.'},
{h:'Your Appearance Is Yours',b:'How you look and present yourself is not vanity — it is identity. Your style, your grooming, the way you inhabit your body — these are expressions of who you are and how you choose to show up in the world. Invest in your appearance not to please others, but as an act of claiming yourself. The woman who looks the way she wants to look walks differently. Dress for the woman you are becoming.'},
{h:'Rest Is Part of Identity',b:'You cannot know who you are if you are always exhausted. Exhaustion collapses the self into function — you become what you do rather than who you are. Rest is not laziness. It is the space in which the self reconstitutes. It is where your voice returns. Take it without guilt. The woman who rests is the woman who shows up as a person — not just a function.'},
{h:'Identity Is Daily Work',b:'Reclaiming your identity is not a single decision made once. It is a daily practice of small choices: the morning that begins with something for you, the opinion shared instead of swallowed, the project worked on for thirty minutes before the day\'s demands begin. Identity is not found — it is built, continuously, from the choices you make about where to put your attention and your energy.'},
{h:'You Are the Main Character',b:'Your marriage is not the story of someone who supports his becoming. You are not a supporting character. You are the protagonist of your own life, and he is the protagonist of his, and you have chosen to share the stage. Reclaim the centre of your own story. The most magnetic wives are not the ones who disappeared into the role. They are the ones who brought all of themselves to it.'},
]},

// 5
{emoji:'💌',title:'The Language of Love',category:'Connection',tagline:'Words that build permanent devotion.',pages:[
{h:'Words Are Architecture',b:'Every word you speak in your marriage either builds or erodes. Not dramatically — the effect of any single exchange is small. But over months and years, the accumulated weight of your language shapes the entire structure of what you share. Speak the way you would want to be spoken to. Not in the heat of anger. Every day, in the ordinary moments, choose words that build.'},
{h:'Speak His Love Language',b:'Every person receives love in a particular language — through words, touch, acts of service, gifts, or quality time. If you are speaking words of affirmation to a man whose primary language is physical touch, the message is not landing however sincerely it is sent. Study him. Learn which language actually reaches him. Then speak it fluently, deliberately, and often.'},
{h:'The Specific Compliment',b:'Generic praise is forgotten. Specific praise is treasured. Not "you are amazing" — but "the way you handled that situation showed me exactly who you are, and I am so proud of you." Specificity signals observation. And observation is one of the deepest forms of love — it says: I am watching you, I see you, you matter enough to notice specifically.'},
{h:'The Text That Changes His Day',b:'One message sent in the middle of an ordinary day with no agenda and no logistics. Not "can you pick up milk" — but "I was just thinking about you and wanted to say so." This takes four seconds. The effect on a man who receives it is disproportionate. The woman who makes him feel thought about outside the house is the woman he rushes home to.'},
{h:'Desire Said Out Loud',b:'Tell him you want him. Not hinted, not implied, not performed — but said simply and directly. "I want you" are three of the most powerful words in a long-term marriage. Men who feel desired by their wives become devoted. Men who feel that intimacy is an obligation their wife fulfils become distant. Say the words. Mean them. Watch what changes.'},
{h:'The Power of Noticing',b:'Notice things out loud. "I noticed how patient you were with the kids today." "I noticed you have been working so hard this week." "I noticed you remembered what I said last month." Noticing is the most fundamental act of love — it says you are not background to me. You are foreground. You are seen. Most people walk through their lives feeling unseen. Be the person who sees him.'},
{h:'Gratitude That Lands',b:'"Thank you for everything you do" is true but vague. "Thank you for fixing that without me having to ask — it meant a lot" is specific, warm, and lasting. Gratitude that lands sees the act, names it, and expresses the feeling it created. This level of specificity takes thirty seconds and creates the feeling of being truly appreciated rather than generally acknowledged.'},
{h:'Words of Reassurance',b:'Men need to know they are doing well — in the marriage, in the family, in the work of building a life together. "I am happy with us" or "you are a good husband" — these are words most men rarely hear and desperately need. Offer reassurance without being asked. It creates the emotional security from which a man becomes his best self.'},
{h:'Ask Before Assuming',b:'Most relationship conflicts begin with an assumption mistaken for a fact. Before you decide what he meant, what he intended, or what he was feeling — ask. "Help me understand what you meant." "I want to make sure I am not misreading this." This simple practice dissolves conflicts before they form and communicates a respect for his interior experience that is deeply bonding.'},
{h:'The Language of Repair',b:'After conflict, the words of repair matter enormously. Not "I am sorry you felt that way" — which is not an apology — but "I am sorry I said that. It was not fair and you did not deserve it." Clean, specific, undefended. And then let it be done. Do not rehearse it. Do not repeat it. Say it, mean it, and move back toward each other.'},
{h:'Speak Well of Him to Others',b:'What you say about your husband when he is not in the room eventually reaches him — in energy if not in words. Speak of him with warmth to your friends and family. Do not use him as material for complaint or humour at his expense. The woman who speaks well of her husband builds a reputation for the marriage as something she is proud of. He will feel this, and rise to it.'},
{h:'The Question That Opens Everything',b:'Not "how was your day" — the answer to which is always fine. But "what was the hardest part of today?" or "what is something you are thinking about that you have not told me yet?" These questions create the space for real conversation — and real conversation is the oxygen of a deep marriage. Ask better questions. Get deeper answers.'},
{h:'Silence as Language',b:'Not all communication is verbal. The quality of your silence — whether it is warm or cold, present or withdrawn — speaks. Sitting beside him without speaking, reading in the same room, driving without the need to fill the space — these are expressions of comfort and trust. A relationship where silence is companionable has reached a depth that words alone cannot create.'},
{h:'The Love Letter',b:'Write him a letter. Not an email — a letter. On paper, by hand, in your own handwriting. Tell him what he means to you in specific, vivid terms. What he gave you that no one else could. What you see in him that perhaps he does not see in himself. What you are grateful for. A letter like this is kept. Returned to. It becomes part of the mythology of your love.'},
{h:'Speak Love Every Day',b:'Not in grand declarations — in the ordinary moments. In the passing comment. The thank you said with eye contact. The "I am glad you are home." The hand touched in passing. Love is not a feeling that erupts occasionally — it is a practice maintained daily in small choices of language and attention. Practise it. Every day. Without exception.'},
]},

// 6
{emoji:'🎭',title:'Emotional Intelligence in Marriage',category:'Connection',tagline:'The smarter you love, the deeper it goes.',pages:[
{h:'What Emotional Intelligence Is',b:'Emotional intelligence is not the ability to manage other people\'s feelings. It is the ability to recognise and regulate your own emotional states, to read others accurately, and to use emotional information in the service of connection. In marriage, it is the most important form of intelligence available — more consequential than intellect, more determinative of outcome than good intentions alone.'},
{h:'Regulation Before Response',b:'When you are flooded with emotion — hurt, anger, fear — your prefrontal cortex goes partially offline. You cannot think clearly or communicate effectively. The most important skill in marriage is learning to pause before responding. To breathe. To give yourself the time to return to the part of yourself that speaks from values rather than wounds. This pause is not weakness. It is the most sophisticated thing you can do.'},
{h:'The Feeling Beneath the Feeling',b:'The emotion that comes out first is rarely the deepest one. Anger is often fear or grief dressed in armour. Withdrawal is often shame or hurt protecting itself. The emotionally intelligent woman learns to ask — of herself first — what is underneath this? Getting to the real feeling changes the entire conversation. It moves from accusation to vulnerability, which is where genuine intimacy lives.'},
{h:'Hear What He Is Not Saying',b:'The ability to hear what is not said — to feel the feeling beneath the words — is one of the most profound gifts one partner can offer another. When a man says "I\'m fine" in a tone that is clearly not fine, the response "I notice you seem tired — do you want to talk or do you need some quiet?" is a form of seeing him that creates deep and lasting gratitude.'},
{h:'Repair Is the Most Important Skill',b:'Every couple argues. The research is unambiguous: it is not the presence of conflict but the quality of the repair that predicts relationship longevity. A good repair is specific, warm, and undefended. It acknowledges the impact without excessive self-punishment. It returns to connection. This skill — the ability to repair — is the single most learnable and highest-return skill in marriage.'},
{h:'Validation Before Solutions',b:'When he shares a problem, the first instinct of many women is to solve it. But what is almost always needed first is to feel understood. Validate before you fix. "That sounds genuinely frustrating" before "have you tried." Then ask: "do you want to think through this together, or did you mainly need to say it?" This small question changes the quality of every difficult conversation.'},
{h:'Take Responsibility Cleanly',b:'The emotionally intelligent woman can own her part in a conflict without requiring the other person to own theirs first. She can say "I was short with you and I am sorry" without adding "but you provoked me." This clean ownership — undefended, unqualified — is disarming. It breaks cycles of mutual blame and creates the conditions for genuine repair.'},
{h:'Manage Your Own States',b:'Your emotional states are your responsibility. Not to suppress — but to manage. The emotionally intelligent woman has strategies for returning to regulation when she is flooded: breathing, walking, pausing. She does not require others to manage her feelings for her. This self-management frees the marriage from the exhausting work of constant emotional maintenance.'},
{h:'Curiosity Over Certainty',b:'The most damaging assumption in marriage is the certainty that you already know what your husband meant, felt, or intended. Approach his behaviour with curiosity rather than certainty. "What did you mean by that?" asked with genuine openness dissolves more conflicts than any other single phrase. The marriage built on mutual curiosity stays interesting and alive forever.'},
{h:'Name What You Feel',b:'The ability to name your emotional state with precision — not just "I am upset" but "I feel overlooked and it is making me pull away" — is a form of self-knowledge that dramatically improves communication. When you can name it, you can speak about it rather than from it. This distinction is the difference between a conversation and an explosion.'},
{h:'Empathy as Connection',b:'Empathy is not agreeing with someone\'s position — it is the ability to feel what they are feeling without losing yourself. In marriage, the practice of genuine empathy — attempting to understand his emotional experience from the inside rather than evaluating it from the outside — creates a quality of intimacy that logic and problem-solving cannot reach. It says: I am trying to be where you are.'},
{h:'Emotional Bids',b:'Research shows that couples make thousands of small emotional bids for connection every day — a comment that invites response, a touch that invites reciprocation, a look that invites acknowledgment. The marriage that responds to these bids with presence builds an enormous reservoir of goodwill and connection over time. Notice the bids. Respond to them. They are the currency of closeness.'},
{h:'The Four Horsemen to Avoid',b:'Research identifies four communication patterns that predict relationship failure: criticism of character rather than behaviour, contempt, defensiveness, and stonewalling. Learning to recognise these in yourself — before they have done their damage — is the most protective emotional intelligence work available. The moment you feel contempt rising, that is the signal to pause completely.'},
{h:'Forgiveness as Intelligence',b:'Forgiveness is not excusing the thing that happened. It is releasing yourself from the obligation to carry it. Holding a grievance is expensive — it costs energy, it colours every subsequent interaction, and it keeps you attached to a past moment that has already occurred. The emotionally intelligent woman forgives — genuinely, not just verbally — because she understands that the weight of unforgiveness costs her more than anyone else.'},
{h:'Emotional Intelligence Grows',b:'Emotional intelligence is not fixed. It is a skill set that develops through practice, feedback, and the willingness to learn from what does not work. The marriage itself is the best classroom available. Every conflict is a lesson. Every repair is practice. Every moment of genuine connection confirms what is working. Stay the student. The learning never ends and the rewards compound.'},
]},

// 7
{emoji:'🍷',title:'Sensuality: The Slow Art',category:'Sensuality',tagline:'Pleasure is not a reward. It is a practice.',pages:[
{h:'What Sensuality Actually Is',b:'Sensuality is not performance. It is not a skill set, a wardrobe, or a set of techniques. It is the quality of being fully present in your body — aware of temperature, texture, scent, taste, and sound in each moment. A woman who is genuinely in her body is naturally sensual. The practice is not to learn new things but to stop fleeing the present moment into the future or the past.'},
{h:'Slow Everything Down',b:'Sensuality lives in slowness. The woman who moves through the world quickly, always on to the next thing, is in her head — not her body. Slow down your eating. Your walking. Your way of touching things. When you slow down, you arrive in the present. And the present moment, inhabited fully, is always more than enough. Everything sensual requires slowness to be felt.'},
{h:'The Body as Home',b:'Many women inhabit their bodies as tools — useful for carrying them from task to task — rather than as homes. The sensual woman feels her body from the inside. She notices when she is holding tension. She responds to pleasure. She is aware of her physical state as information. Inhabiting your body fully — rather than using it — is the foundation of all sensuality.'},
{h:'Create a Sensory Environment',b:'The home is a sensory experience and you are its curator. Candlelight instead of overhead lights. Music that feels like warmth. Fresh flowers chosen for their scent. Sheets that feel luxurious against skin. These details are not frivolous — they are the environmental expression of someone who takes pleasure seriously. They also create the conditions in which desire can arise naturally.'},
{h:'Dress for Sensation',b:'Before you dress for anyone else, dress for your own nervous system. Choose fabric that feels extraordinary against your skin. A colour that changes how you carry yourself. The right underwear that makes you walk differently. Dressing as an act of sensory pleasure — rather than social performance — is a daily practice of inhabiting yourself. The effect on others is a byproduct.'},
{h:'Water as Ritual',b:'A bath or shower taken slowly, with attention — with good oil, good scent, the right temperature — is one of the most accessible sensual experiences available. It is also one of the most frequently rushed. Reclaim it as a ritual. Use it as a transition between the world and yourself. The woman who takes her bath seriously takes herself seriously. These things are related.'},
{h:'The Sensual Mind',b:'Sensuality begins in the imagination. Read things that move you. Watch films that stir something. Listen to music that changes your body chemistry. Keep your inner world rich, stimulated, and alive. A woman with a vivid inner life brings something to every physical encounter that cannot be manufactured or performed — the presence of a person who is genuinely awake.'},
{h:'Pleasure Without Guilt',b:'Many women are conditioned to experience pleasure with the shadow of guilt trailing behind it — the sense that enjoyment must be earned, deserved, or immediately reciprocated. Release this. Pleasure is not a reward. It is a birthright. A woman who can receive pleasure without guilt — who can simply enjoy — has a quality of ease that is profoundly attractive and deeply rare.'},
{h:'Your Own Pleasure First',b:'A woman who does not know what gives her pleasure cannot effectively share pleasure with another. Know your body. Know what you like. Explore your own sensuality without apology or embarrassment. This self-knowledge is not selfish — it is the prerequisite for genuine intimacy. You cannot give what you do not have, and you cannot offer pleasure you have not first allowed yourself.'},
{h:'Touch as a Practice',b:'Touch as many things as possible with real attention — the bark of a tree, the texture of a fabric, the warmth of a mug in your hands. This sounds small, but it is a recalibration of the nervous system toward presence. The more you practise conscious touch in ordinary moments, the more naturally present you become when touch matters most.'},
{h:'The Sensuality of Attention',b:'The most sensual thing you can offer another person is your full, undivided attention. Not half-attention while thinking about something else. Not attention offered through a screen. The real thing — eyes on him, mind present, body oriented toward him. This quality of attention, given fully, creates an intimacy that no technique can replicate. It is the ultimate sensual act.'},
{h:'Scent as Memory',b:'Of all the senses, smell has the most direct pathway to the brain\'s emotional centres. Scent creates memory and mood faster than any other stimulus. Use this deliberately. Have a scent for your bedroom. A scent for your body after a bath. A scent for intimate evenings. Over time, these scents become inseparable from specific emotional states — and you can use them to create those states on demand.'},
{h:'The Sensual Morning',b:'The morning sets the sensory tone for the day. Coffee drunk slowly, tasted rather than consumed. Stretching that is attentive to the body rather than mechanical. Skin moisturised with care. Music that begins the day with feeling. These small morning pleasures are not self-indulgence — they are the practice of a woman who has decided that her days are worth experiencing.'},
{h:'Sensuality in the Bedroom',b:'The woman who brings full sensory presence to intimacy — who is actually there, actually feeling, actually responding rather than managing how she appears — transforms the experience for both people. Presence is the most powerful thing you can bring into the bedroom. It cannot be purchased, performed, or faked. It is available right now, in the simple decision to arrive fully.'},
{h:'Sensuality Is a Lifelong Practice',b:'The woman who cultivates sensuality at thirty is more sensual at fifty. Not despite time, but because of it — because she has spent years learning her own body, deepening her pleasure vocabulary, and maintaining her relationship with physical experience. Sensuality does not fade with age for women who practise it. It matures. And matured sensuality is one of the most extraordinary things a woman can possess.'},
]},

// 8
{emoji:'💎','title':'Self-Worth as a Foundation',category:'Confidence',tagline:'You cannot pour from an empty crown.',pages:[
{h:'Your Worth Is Not Earned',b:'You do not earn your worth by being useful enough, agreeable enough, or beautiful enough. Your worth is intrinsic — it existed before you performed anything for anyone, and it will remain when all the performances are over. A woman who knows this carries herself differently. She does not beg for what she deserves. She simply expects it, quietly and without drama.'},
{h:'Standards Are Attractive',b:'A woman with clear standards — for how she is spoken to, how her time is used, how she is treated — is compelling rather than difficult. Standards are not demands. They are a reflection of self-knowledge, and self-knowledge is one of the most attractive things a human being can possess. The woman without standards is not easier to love — she is easier to take for granted.'},
{h:'Stop Seeking Approval',b:'Every time you seek approval before trusting your own judgment, you communicate — to yourself and others — that your instincts are not reliable. They are reliable. Make decisions. Have preferences. Disagree sometimes. Exist without requiring consensus. The woman who needs no permission is endlessly more interesting than the one who waits for it. Practice trusting yourself. Build the muscle daily.'},
{h:'The Danger of Over-Giving',b:'Women with low self-worth often over-give — believing that their value is located in their usefulness to others. But generosity given from depletion is not truly generous; it is strategic survival. True generosity comes from abundance. The woman who gives from fullness — from a life that is genuinely rich — gives something real. Fill yourself first. The rest follows naturally.'},
{h:'Receiving as a Practice',b:'A woman who does not believe she deserves good things has difficulty receiving them. She deflects compliments. She refuses help. She minimises what is offered. Practise receiving. Let the compliment land. Accept the help graciously. Allow yourself to be given to. Each act of graceful receiving builds the neural pathway that says: good things are appropriate for me. They are.'},
{h:'Boundaries Are Love',b:'A boundary is not a wall. It is a door with a lock — you choose who gets in, and under what conditions. Boundaries protect the relationship by protecting the self. The woman who has no boundaries eventually resents those she loves, because she has given what she could not afford to give. Boundaries are the most loving thing you can maintain — for yourself and for the marriage.'},
{h:'The Body and Self-Worth',b:'How you treat your body is one of the most legible expressions of your self-worth. Not your size or shape — but whether you feed yourself well, move with care, rest enough, present yourself with intention. The woman who tends to her body with respect is practising self-worth physically. The body responds. It carries you differently when you treat it as something worth caring for.'},
{h:'Know Your Non-Negotiables',b:'A woman who knows what she will and will not accept — and holds to it with warmth rather than aggression — commands respect. Non-negotiables are not ultimatums. They are the quiet architecture of a life lived with integrity. They are not negotiated away under pressure. They simply exist, and the life is built around them. Know yours. Return to them when they are tested.'},
{h:'Self-Worth in the Bedroom',b:'Sexual self-worth — the belief that your body and desire are valid and worthy of pleasure — shapes your entire intimate life. The woman who approaches intimacy from a place of genuine self-worth is not passive or apologetic. She is present, communicative, and embodied. She knows what she wants and asks for it. This confidence is not aggressive — it is one of the most attractive things she possesses.'},
{h:'Compare Yourself Only to Yourself',b:'The moment you begin measuring your worth against another woman\'s appearance, success, or marriage, you have left yourself and entered a competition you can never win. Your only meaningful comparison is to the woman you were yesterday. Is she more honest today? More courageous? More herself? That is the only metric worth tracking. That is the only race worth running.'},
{h:'The Mirror You Hold Up',b:'How you treat yourself teaches others how to treat you. Not because you enforce it consciously, but because self-worth is communicated in a thousand tiny signals — in how you speak about yourself, what you tolerate, how you respond to criticism, what you allow to continue. Raise the standard you hold for yourself. The people around you will feel the shift and respond to it.'},
{h:'Self-Worth Is Not Selfishness',b:'The woman who invests in herself, holds her standards, protects her time, and pursues her own growth is not selfish. She is sustainable. She has something to give — not from the scraps of herself she has not yet distributed, but from genuine abundance. Selfishness is taking what you have not earned. Self-worth is knowing what you deserve and allowing yourself to have it.'},
{h:'Invest in Yourself Like You Mean It',b:'Read the book. Take the course. Buy the thing that makes you feel beautiful when you put it on. Pursue the goal that has been waiting. These are not indulgences — they are declarations that you believe you are worth investing in. And that belief, once activated, reshapes everything: how you move, how you speak, what you accept, what you create.'},
{h:'The Origin of Low Self-Worth',b:'Low self-worth is not a character flaw — it is a learned response to environment. Criticism absorbed in childhood. Love that was conditional. Messages about what a woman should be that conflicted with who you actually are. Understanding where your self-worth was undermined is not about blame — it is about distinguishing between the truth of who you are and the story someone else told about you.'},
{h:'Build It Every Day',b:'Self-worth is not a fixed quality discovered once and possessed permanently. It is rebuilt daily through the accumulation of small acts of self-respect: the commitment honoured, the boundary held, the opinion shared, the care taken with your own appearance and health and mind. Each day is a vote for the woman you believe yourself to be. Vote for her. Consistently. Without waiting to feel worthy first.'},
]},

// 9
{emoji:'🌙',title:'Night Rituals for Connection',category:'Intimacy',tagline:'The last hour of the day builds the marriage.',pages:[
{h:'The Sacred Last Hour',b:'The hour before sleep is the most intimate in the marriage. The defenses are lowered. The pace has slowed. The children are asleep. The demands of the world have temporarily paused. What happens in this hour — whether you spend it on separate screens or in genuine connection — becomes the emotional default of the marriage over time. It is the most valuable hour of the day.'},
{h:'Put the Phone Down',b:'Not eventually. Before you get into bed. The phone is a third presence in the bedroom — one that takes your attention, your imagination, your nervous system, and your presence and delivers them somewhere else entirely. Reclaim the space. The feed will still be there in the morning. He will not always be. Make the choice consciously, every night, as an act of choosing the marriage.'},
{h:'The Real Question',b:'Not "how was your day" — the answer to which is always fine and tells you nothing. But "what was the best moment?" or "what is something you have been thinking about that you have not said yet?" or "what do you wish I knew about how you are feeling right now?" One real question before sleep can open a conversation that changes the quality of the entire relationship over time.'},
{h:'Skin to Skin',b:'Physical contact before sleep — even something as simple as a hand resting on a back — releases oxytocin, the bonding hormone, in both people. It communicates safety, belonging, and desire all at once, without words. Make it a ritual. Not as a request for more, not as obligation, but as a closing of the day in physical connection. This practice, sustained across years, is quietly transformative.'},
{h:'Say It Before You Sleep',b:'Whatever you want him to carry into his dreams — say it tonight. Not every night requires a declaration. But regularly: "I love you" said with eye contact and genuine meaning, not as reflex. "I am glad you are mine." "Today was better because you were in it." These are the last words he hears before unconsciousness. Let them matter. Let them be the last thing he feels before sleep.'},
{h:'Review the Day Together',b:'Spend five minutes sharing one thing from the day — not logistics, but experience. Something that surprised you. Something that moved you. Something you found funny or beautiful or difficult. This practice of shared narration keeps you in each other\'s lives even when the days are spent separately. It makes him a witness to your inner life, and you a witness to his.'},
{h:'The Intentional Bedroom',b:'The bedroom should feel different from the rest of the house. Dimmer light. Cooler temperature. The scent you associate with rest and intimacy. Surfaces that are clear enough to feel peaceful. The bedroom as sanctuary is not a luxury — it is a design choice that shapes the quality of sleep, intimacy, and daily reconnection. Design it deliberately. Protect it from being a workspace or a worry room.'},
{h:'The Evening Transition',b:'Moving from the busy day into the quieter evening requires a transition. A ritual that signals the shift — a shower, a change of clothes, a cup of something warm, a specific piece of music. This transition is not for you alone — it is for the marriage. The woman who arrives in the evening fully present, having shed the residue of the day, offers something entirely different from the woman who brings all of it with her.'},
{h:'Read Together',b:'Not the same book necessarily — but in the same space. Reading beside each other in comfortable silence is one of the most intimate forms of companionship. It says: I choose to be near you even when we are not interacting. This quiet togetherness, practised regularly, builds a quality of ease and comfort that deepens the marriage in ways that more active connection sometimes cannot.'},
{h:'The Goodnight That Matters',b:'The goodnight is not a formality. It is the seal of the day — the final communication before sleep that will carry into the morning. Let it be warm. Let it be real. Touch. Make eye contact. Speak something genuine. The couple that goodnights each other with genuine warmth wakes toward each other rather than away. This fifteen-second ritual shapes the morning that follows.'},
{h:'Resolve Before You Sleep',b:'Not every conflict can be resolved in an evening. But the attempt matters. The agreement to continue tomorrow matters. The touch that says "I am still here even though we are not finished" matters. Do not allow nights to pass in the silence of unresolved contempt if it can be avoided. Some closeness before sleep — however small — keeps the thread of connection intact through difficulty.'},
{h:'Dream Together',b:'Ask him what he is thinking about. What he is looking forward to. What he is afraid of in the coming days. These conversations — held in the dark, before sleep, without the pressure of the full day behind them — are among the most intimate available. The dark is a truth-telling space. Use it. Some of the most important things in a marriage are said in the dark just before sleep.'},
{h:'The Morning Follows the Evening',b:'How the night ends shapes how the morning begins. The couple that goes to sleep in genuine connection tends to wake in it. A morning that begins with warmth — a touch before rising, a moment before the rush begins — is the natural extension of an evening well spent. The evening and the morning together create the daily rhythm of a marriage that is truly alive.'},
{h:'Make the Bedroom Sacred',b:'Keep arguments out of the bedroom. Keep phones on the other side of the room. Keep the atmosphere clear enough that when you walk in, you both feel the shift into a different kind of space — softer, safer, more private. The bedroom is where the marriage renews itself. Protect it with the seriousness that anything sacred deserves.'},
{h:'End Every Day in Connection',b:'Not every evening will be perfect. Not every night will end in closeness. But the commitment to end each day in some form of genuine connection — however brief, however imperfect — is the commitment that keeps a marriage genuinely alive across years and decades. Make it a non-negotiable. Not the how, but the fact of it. Every day. Without exception.'},
]},

// 10
{emoji:'🌸',title:'The Psychology of His Devotion',category:'Connection',tagline:'What actually keeps a man deeply bonded.',pages:[
{h:'What Men Actually Need',b:'Beneath all the social programming and cultural narratives, men need what everyone needs: to feel seen, valued, and loved. But the specific expressions of these needs differ. Men bond deeply through feeling respected and admired. Through feeling useful and effective. Through physical closeness. Through shared experience. Understanding these specific channels is how you reach a man where he actually lives.'},
{h:'Respect as the Foundation',b:'As women bond deeply through feeling emotionally safe, men bond most powerfully through feeling respected. Not deferred to — respected. Acknowledged. Treated as someone whose judgment is trusted, whose contributions are noticed, whose presence matters. A man who feels respected by his wife becomes devoted in a way that fear, obligation, or attraction alone cannot create.'},
{h:'Admiration Changes Everything',b:'Tell him specifically what you admire about him. Not in a performance — but genuinely, specifically, and regularly. "I admire how you handled that." "I think you are one of the most principled people I know." "I am proud of you." Men do not hear enough of this — especially from the person whose opinion matters most. Admiration from a wife is the most potent form of fuel a man receives.'},
{h:'Never Stop Being His Girlfriend',b:'The greatest danger to long-term devotion is the transition from romantic partners to co-managers. The courtship does not end at the altar — it transforms. Flirt with him. Be excited when he comes home. Make plans that are just for the two of you. The couples who remain madly in love are those who never stop choosing each other actively, publicly, and visibly.'},
{h:'Be the Safe Place',b:'The man who knows his wife is his safe place — where he will not be judged, shamed, ridiculed, or made to feel foolish — will bring her everything. His fears. His failures. His real thoughts. To be his safe place is not to be his therapist. It is simply to receive him without making him pay for his vulnerability. This quality of safety is one of the rarest gifts one person can offer another.'},
{h:'Physical Affection Outside Intimacy',b:'The couple that only touches each other in the context of sex eventually experiences touch as a transaction. Touch him in ways that lead nowhere. Hold his hand in the car. Put your hand on his back as you pass him in the kitchen. These non-transactional touches maintain a baseline of physical connection that keeps desire alive between intimate encounters.'},
{h:'Celebrate His Wins',b:'When he succeeds — at anything, at any scale — celebrate genuinely and specifically. Not performatively. Not with a half-second of attention before moving on. But with real recognition of what he accomplished and what it means. A man who feels genuinely celebrated by his wife becomes more confident, more motivated, and more devoted. Celebration is one of the most bonding things you can offer.'},
{h:'Give Him Space to Miss You',b:'Absence, used wisely, sharpens desire and appreciation. Time apart — even just an evening, even just hours of genuine absorption in separate pursuits — creates the conditions for missing. And missing is the precursor to appreciation. The couple who has their own orbits collides with delight rather than taking presence for granted.'},
{h:'Let Him Be Imperfect',b:'The man who knows his wife accepts his imperfections — not as someone who is settling, but as someone who loves the whole of him — is freed from performance. He does not need to be flawless in her presence. He can admit failure, uncertainty, limitation. This permission to be human is one of the most powerful bonds a wife can create. It cannot be faked and it cannot be replaced.'},
{h:'Make Home a Refuge',b:'The world is demanding and often disappointing. If home is also demanding and disappointing — if he walks through the door into criticism, logistics, and emotional labour — he will dread it. If home is where he is welcomed, where the atmosphere is warm, where his presence is clearly desired — he will rush toward it. You create that atmosphere as much as he does. Create it deliberately.'},
{h:'Stay Curious About Him',b:'The man you married is not a finished thing. He is still becoming — his views are still evolving, his fears still shifting, his dreams still changing. Stay curious about who he is now, not just who he was. Ask questions you do not know the answer to. Listen to learn, not just to respond. The wife who stays genuinely curious about her husband never loses the feeling of knowing someone interesting.'},
{h:'Choose Him Publicly',b:'The way you speak about your husband in public — with warmth, with respect, with evident pride — reaches him. He hears it. He feels it. When others see that you are proud of him, he is proud of himself. This public choosing is not performance — it is an extension of the private choice you make every day. Let it show. It matters more than you know.'},
{h:'The Hero Instinct',b:'Men are wired to want to protect, provide, and be needed by the people they love — not in an archaic way, but in the essential human sense of wanting to matter to someone. Ask for his help. Tell him when something he did made your life easier. Let him be your person in a tangible way. This activates a bond that is ancient and powerful and has nothing to do with weakness.'},
{h:'Support His Friendships',b:'A man who has strong friendships — who has outlets for connection and loyalty outside the marriage — is a healthier and better husband. Encourage his friendships. Make space for them without resentment. The wife who crowds out her husband\'s friendships creates dependency, not devotion. Support his full life, and he brings that fullness back to you.'},
{h:'Devotion Is Built, Not Born',b:'The devotion of a husband who has been deeply loved, respected, seen, and desired — built over years of daily choice — is one of the most stable and powerful forces in human relationship. It is not dramatic. It does not shout. But it holds through every difficulty life brings. Build it. One day, one choice, one gesture at a time. It is the most worthwhile thing you will ever construct.'},
]},

// 11
{emoji:'🌿','title':'The Art of Feminine Rest',category:'Wellbeing',tagline:'A rested woman runs the whole show.',pages:[
{h:'Rest Is Not a Reward',b:'Most women treat rest as something to be earned — as the prize at the end of productivity rather than a necessary component of a functioning life. This is backwards. Rest is not the reward for work. It is the foundation that makes good work possible. The woman who rests well does everything else better. She thinks more clearly, loves more generously, and is more fully present in every role she inhabits.'},
{h:'Exhaustion Is Not a Virtue',b:'There is a cultural story that says the most devoted woman is the most depleted one — that running yourself into the ground is the measure of how much you care. This story is false and damaging. Exhaustion does not signal devotion. It signals the absence of self-care, which eventually becomes the absence of self. The woman who is genuinely rested is a better partner in every possible way.'},
{h:'The Rested Marriage',b:'The relationship between rest and marriage is direct and significant. The exhausted woman is shorter with her husband, less patient in conflict, less present in intimacy, less capable of the warmth that sustains a marriage. Rest is not just for you. It is for the marriage. The woman who sleeps well, takes her pleasures seriously, and protects her energy is a better partner in every possible way.'},
{h:'Sleep as Sacred',b:'Chronic sleep deprivation reduces emotional regulation, libido, patience, creativity, and immunity. It makes everything harder and less good. Sleep is not laziness. It is the most fundamental form of self-care available — and the one most often sacrificed first. Protect your sleep as you would protect any other essential resource. The marriage will feel the difference immediately.'},
{h:'Protect Your Energy',b:'Energy is finite. The woman who gives it indiscriminately — to every request, every obligation, every person who makes demands — eventually has nothing left for the things and people that genuinely matter. Energy management is not selfishness. It is sustainability. Know what refills you. Know what depletes you. Structure your days accordingly, without apology.'},
{h:'Pleasure as a Daily Practice',b:'Not just in the bedroom — but throughout the ordinary day. The pleasure of a good meal eaten slowly. A bath taken without rushing. Music that lifts the mood. The smell of something beautiful. Sunlight on the face. These are the sensory acknowledgment that you are alive and that aliveness deserves to be enjoyed. Pleasure is not a reward. It is a practice. Begin it today.'},
{h:'Silence and Stillness',b:'Find some each day. Not emptiness — presence. The capacity to sit with yourself without distraction, without entertainment, without productivity. This stillness is where the self reconstitutes. It is where you discover what you actually think, how you actually feel, what you actually want. Women who have no access to stillness do not know themselves. And not knowing yourself has costs.'},
{h:'Do Less and Mean It',b:'Not every obligation requires your full participation. Not every invitation deserves a yes. Not every project needs to be perfect. The elegant art of doing less — specifically, with full attention and genuine care — produces better results than the exhausted art of doing everything to partial completion. Choose what you will do. Do those things with your whole self. Leave the rest.'},
{h:'Say No as an Act of Love',b:'Every yes is automatically a no to something else. When you say yes to an obligation that does not serve your values, you are saying no to something that does. The woman who has learned to say no — warmly but clearly — has made an enormous act of self-respect. Your time and energy are among the most valuable things you possess. Give them accordingly.'},
{h:'Nature as Restoration',b:'Spend time outside without a purpose. Walk somewhere green. Sit near water. Feel the sun or the wind with some attention. Nature has documented restorative effects on the nervous system — it reduces cortisol, improves mood, and reconnects you to something beyond the immediate demands of your life. Use it regularly. The restoration is real.'},
{h:'Rest From the Mental Load',b:'The mental load — the invisible management of the household, the relationships, the logistics, the planning — is as exhausting as any physical labour. Rest from it deliberately. Delegate. Release the need to track everything. Allow things to be managed differently than you would manage them. The mental rest available in releasing control is substantial. It requires trust. Build it.'},
{h:'Creative Rest',b:'The kind of rest that comes not from doing nothing, but from doing something that uses a different part of you. Drawing. Cooking experimentally. Reading fiction. Playing music. These activities restore the kind of energy that productive work depletes — the imaginative, playful, generative energy that makes you interesting to yourself and to others. Protect time for creative rest.'},
{h:'The Body Deserves Attention',b:'Move it in ways that feel good rather than punishing. Stretch in the morning with attention. Dance in the kitchen without reason. Walk somewhere beautiful and look at what you are walking through. The body that is cared for by its owner carries a different quality — not just of health, but of confidence and ease. Care for it as something that deserves care. Because it does.'},
{h:'Rest and Desire',b:'Exhaustion is one of the most common killers of desire in long-term marriages — not because either person has stopped wanting, but because they are too depleted to access what they want. Rest is not just maintenance for the self. It is maintenance for the marriage. The couple where both people are rested has access to an intimacy that the exhausted couple cannot reach.'},
{h:'You Deserve Rest',b:'Not because you have earned it. Not because you are efficient enough or productive enough or good enough. Simply because you are a person, and persons require rest. The belief that you must earn rest before you take it is one of the most common and most damaging beliefs women carry. Release it. You deserve rest now, today, as you are. Take it without justification.'},
]},

// 12
{emoji:'🌹','title':'Flirting After the Wedding',category:'Desire',tagline:'The couple who keeps flirting keeps falling.',pages:[
{h:'Why Flirting in Marriage Matters',b:'Flirtation communicates something essential: I still see you. I still find you interesting. I still choose to be attractive for you. Without it, even the most loving relationships begin to feel like partnerships rather than romances. The couples who keep flirting — genuinely, playfully, consistently — maintain a charge between them that routine cannot erode. It costs nothing and preserves everything.'},
{h:'The Eyes Have It',b:'The most powerful flirting tool available to you is also the most overlooked: eye contact. Catch his eye across a room full of people and hold it a moment longer than necessary. Let something pass between you that belongs only to you. This silent exchange — private, exclusive, unspoken — is the most intimate form of flirtation and requires nothing but presence and the decision to use it.'},
{h:'The Unexpected Text',b:'Send him something in the middle of an ordinary Tuesday that has no logistical purpose whatsoever. A memory. A thought that made you think of him. Something funny only he would understand. A compliment about something specific. The unexpectedness is the point — it signals that you think about him when there is no practical reason to, and this is one of the most romantic things a wife can do.'},
{h:'Touch as Flirtation',b:'A hand laid on his chest as you pass him in the kitchen. Fingers through his hair briefly. A touch on his arm when you hand him something. A shoulder leaned against his while sitting beside each other. These non-transactional, non-leading touches are flirtation in its purest and most powerful form. They say: I like being near you. That is enough. That is actually everything.'},
{h:'Compliment His Body',b:'Men receive so few genuine physical compliments in long-term relationships. Tell him you find him attractive — specifically. His hands. The way he looks when he does something physical. The way he carries himself. These compliments, specific and genuine, communicate that you are still looking — and still like what you see. A man who feels physically desired by his wife is a devoted man.'},
{h:'Dress for It',b:'Occasionally — not always, but deliberately — wear something specifically because you know he finds it attractive. Tell him that is why. "I wore this for you" is one of the most powerfully flirtatious sentences in a long-term relationship. It says: I think about your desire. I want you to want me. This communication is not performance — it is the active expression of desire, which is a gift.'},
{h:'The Whisper',b:'Something said quietly, close to his ear, in a public setting — that is intended only for him. It can be funny, tender, or suggestive. The act of closeness, of choosing to communicate something privately in a shared space, creates a world within a world — the two of you inside a bubble of private language that no one else can enter. This is one of the most intimate things a wife can do.'},
{h:'Recall Specific Memories',b:'Bring up a specific memory — a moment from early in the relationship, a private joke, a trip, a conversation that you have never forgotten. "Do you remember when..." said with genuine feeling creates an instant reconnection to who you were when you chose each other. Memory is one of the most powerful tools of ongoing romance. Use it deliberately. Return to the beginning often.'},
{h:'Laugh Together, Often',b:'Laughter is a form of flirtation — it signals delight in each other\'s presence. The couple that makes each other laugh frequently is the couple that continues to enjoy being together. Cultivate this. Look for the funny angle. Share the ridiculous detail. Laugh loudly when something is actually funny. The relationship that has lost its laughter has lost something important and must find it again.'},
{h:'The Long Goodbye',b:'When you leave, linger a moment. A real kiss rather than a peck. Eye contact as you separate. A touch that is slightly longer than necessary. These small extensions of parting communicate that you do not take the reunion for granted, and that the separation is felt. The couple that says goodbye as though the other person matters is the couple that reunites with genuine pleasure.'},
{h:'Write Something',b:'A note left in a pocket. A word written on the bathroom mirror in steam. A message hidden in a book he is reading. Something written — however brief — that required the deliberate act of choosing to communicate in this way. Writing for someone says: I thought about you enough to do this. In a world of instant communication, the deliberate gesture carries disproportionate weight.'},
{h:'The Tease',b:'Teasing — done with warmth, without cruelty — is one of the most intimate forms of flirtation. It signals that you know him well enough to poke at something specific, and that the relationship is safe enough for that poke to land as playfulness rather than criticism. The ability to tease each other is a sign of genuine intimacy and a reliable indicator that the relationship still has play in it.'},
{h:'Be Excited When He Comes Home',b:'Stop what you are doing. Look up. Say something real. Let your face communicate that his arrival matters. This does not need to be dramatic — it needs to be genuine. The woman who greets her husband as though his presence is genuinely good for her creates a home he wants to return to. This fifteen-second moment, practised daily, is one of the most powerful things in marriage.'},
{h:'The Playful Challenge',b:'Challenge him to something — a game, a bet, a competition. The playful antagonism of a genuine challenge between two people who know each other well is deeply attractive. It reactivates the dynamic energy of early courtship, when you were two people discovering whether you were a match. You already know you are. Play anyway. Competition between lovers keeps the spark.'},
{h:'Keep Flirting Forever',b:'There is no phase of a marriage in which flirtation becomes unnecessary. It is not a stage that gives way to something more mature. It is the oxygen that prevents the fire from going out. The couple that flirts in their thirties, their fifties, their seventies — that is a couple that chose each other that morning. Be that couple. Choose him today. Show him.'},
]},

// 13
{emoji:'🏛️','title':'Building Something That Lasts',category:'Connection',tagline:'A great marriage is constructed, not discovered.',pages:[
{h:'The Architecture of Marriage',b:'A great marriage does not happen by accident. It is constructed — deliberately, over time — from the materials of two people\'s character, values, choices, and sustained effort. Like any worthy architecture, it requires vision, planning, skilled execution, and ongoing maintenance. The couple who understands this — who approaches the marriage as something to build — builds accordingly.'},
{h:'Shared Values as Foundation',b:'The foundation of a durable marriage is shared values — not shared opinions, not shared tastes, but the deeper layer of what you both believe about what matters most. When the surface things differ and the foundation holds, the marriage holds. Identify your shared foundation. Return to it when the surface things crack. The foundation is what survives difficulty and makes repair possible.'},
{h:'Rituals as Structure',b:'Every enduring marriage has rituals — the small repeated acts that create continuity and mark the relationship as something particular. The Sunday morning practice. The specific greeting when he comes home. The annual trip. The way you celebrate each other. These rituals are the repeating grammar of the marriage — the patterns that make it recognisably itself. Create them intentionally. Protect them fiercely.'},
{h:'The Vision of the Marriage',b:'What kind of marriage are you trying to build? Not just a functioning one — but what do you want it to feel like? What do you want others to observe in you? What do you want your children to grow up witnessing? Having a shared vision for the marriage you want creates direction and standard. The couple with a shared vision for their marriage builds toward it, even imperfectly.'},
{h:'Hard Seasons Are Normal',b:'Every marriage passes through seasons of difficulty — not because the marriage is failing, but because two people are living a full life together. Financial strain, illness, loss, conflict, the relentless pressure of early parenthood — these are not signs that you chose wrong. They are the texture of a real marriage lived across time. The marriage that survives hard seasons is made of something real.'},
{h:'Do Not Make Permanent Decisions in Temporary Pain',b:'The hard season distorts perspective. What feels permanent and irresolvable in the middle of it is often temporary. The woman who can hold this understanding — who can distinguish between "this is a difficult season" and "this marriage is over" — gives the relationship the time it needs to breathe and recover. Most marriages that survive hard seasons emerge from them fundamentally stronger.'},
{h:'Ask for Help',b:'The pride that prevents a couple from asking for help — from a counsellor, from a trusted friend, from a mentor marriage — costs them dearly. Help is not a sign of failure. It is a sign of intelligence and commitment. The marriage worth saving is worth getting help to save. Ask earlier than you think you need to. The earlier the intervention, the better the outcome.'},
{h:'Keep Tending the Friendship',b:'Beneath the romance, the passion, the partnership — the marriage is a friendship. The couple who genuinely likes each other, who can laugh together, who would choose each other\'s company even without obligation — this couple has something that sustains the marriage through every kind of difficulty. Tend the friendship. It is the foundation beneath the foundation.'},
{h:'Recommitment in Hard Seasons',b:'There are moments in hard seasons when the choice to stay must be actively remade — when the default of staying is not enough, and a genuine, conscious recommitment is required. This recommitment is not the same as the original commitment made when everything was new. It is harder and more meaningful. It is the choice of two people who know what they are choosing. Make it consciously.'},
{h:'The Investment of Time',b:'The marriage that is starved of time together cannot be sustained. Not all time together needs to be romantic or productive — much of it should simply be shared. The couple who spends genuine time in each other\'s presence, regularly and consistently, builds a familiarity and ease that cannot be manufactured through intention alone. Time is the primary material from which marriage is made.'},
{h:'Protect the Marriage Publicly',b:'What you protect reveals what you value. The couple that protects time together, that protects the marriage\'s privacy from social media and gossip, that protects their intimate connection from the erosion of distraction and neglect — is the couple that has decided the marriage is worth protecting. Make that decision consciously and repeatedly, and act on it in the small choices each day.'},
{h:'Growth as a Shared Project',b:'The marriage that grows together stays together. Not the same growth simultaneously — but the shared commitment to growth as a value: that both people will continue to learn, to become more themselves, to evolve rather than calcify. The couple who reads together, who challenges each other, who celebrates each other\'s growth — is the couple that finds each other more interesting at fifty than at thirty.'},
{h:'Forgiveness Is the Mortar',b:'The bricks of a marriage are the good moments. The mortar that holds them together is forgiveness. The capacity to forgive — not just the dramatic failures, but the accumulated small irritations, the ways he has disappointed you, the versions of himself that you did not enjoy — is what allows the couple to keep building. A marriage without ongoing forgiveness eventually stops being able to grow.'},
{h:'Legacy Planning',b:'At some point, the most meaningful question in a marriage is not "are we happy right now" but "what are we building that will outlast us?" The legacy of a great marriage — in the children it shapes, the community it strengthens, the love it models for everyone who witnesses it — is one of the most significant things two people can create together. Build with legacy in mind.'},
{h:'Keep Choosing',b:'The long game of love is won in the daily choice to keep playing. To keep showing up, keep trying, keep turning toward rather than away. Not because it is always easy — it is not. But because the decision you made to build a life with this person is still the best decision available to you, and the life you are building together is worth every choice it costs. Keep choosing. Every day.'},
]},

// 14
{emoji:'✨','title':'Elegance: The Daily Practice',category:'Elegance',tagline:'Elegance is not expensive. It is intentional.',pages:[
{h:'What Elegance Actually Means',b:'Elegance is not about expense. It is not about designer labels or formal occasions or knowing which fork to use. Elegance is the removal of the unnecessary — the cultivation of the essential. An elegant woman chooses fewer, better things: fewer words, fewer complaints, fewer outfits that do not make her feel beautiful. She edits her life the way a great writer edits a sentence.'},
{h:'The Elegant Morning',b:'How you begin your day shapes everything that follows. The elegant woman does not lurch into the morning on her phone. She wakes before the chaos. She allows herself five minutes of quiet. She touches something beautiful — a good mug, a scented candle, the feeling of silk against her skin. These rituals are not indulgences. They are the infrastructure of a day lived with intention.'},
{h:'Elegance in Speech',b:'The elegant woman says what she means without excess. She does not pad her sentences with filler. She does not speak to fill silence. She does not use volume as emphasis. When she speaks, the quality of her voice — its pace, its warmth, its lack of anxiety — communicates as much as the words themselves. Speech is a form of style. Cultivate it with the same attention you give your appearance.'},
{h:'Elegance in Conflict',b:'She states her position once, clearly, without cruelty. She does not raise her voice. She does not bring up the past as ammunition. She does not name-call, shame, or dismiss. She fights for the relationship rather than against her husband. And when the conflict is resolved, she lets it be resolved — she does not carry the residue into the next day. Conflict ends cleanly when handled elegantly.'},
{h:'The Elegant Body',b:'Elegance is not a size or a shape — it is posture, pace, and presence. The elegant woman stands tall not because she was told to, but because she is proud of what she carries. She walks as if she has somewhere worth going. She moves without rushing. She sits with her body open rather than contracted. These things cost nothing and change the way an entire room perceives her.'},
{h:'Elegance in Receiving',b:'The elegant woman receives a compliment without deflecting it. She accepts help without immediately reciprocating to neutralize it. She allows herself to be given to. This quality of graceful receiving is rarer than it sounds — most women have been conditioned to deflect, minimise, or immediately return. Learning to receive fully is one of the most elegant things a woman can practise.'},
{h:'The Elegance of Restraint',b:'Not every thought requires expression. Not every feeling requires articulation in the moment. Not every provocation requires a response. The elegant woman has a strong filter between impulse and action — and this restraint is not repression. It is the considered choice of a woman who understands that not everything serves the larger goal of the relationship she is building.'},
{h:'Elegance in the Bedroom',b:'In the bedroom, elegance means intention. It means showing up present — not distracted by the day, not going through motions. It means knowing what she likes and communicating it without apology. The elegant lover is not passive. She is deliberate, sensual, and fully there. Her presence in the bedroom is a gift — and she offers it as such.'},
{h:'The Elegant Home',b:'An elegant home is not a perfect home. It is a home with a point of view — where objects are chosen rather than accumulated, where scent and light and texture are considered. A vase of fresh flowers. A candle burning in the evening. Surfaces that are clear enough to breathe. These things signal that someone lives here who cares about beauty. That person is her.'},
{h:'Elegance in Dressing',b:'She dresses for how she wants to feel — not to impress, but to inhabit herself fully. She knows what fits her body and chooses it. She has a signature — a colour, a silhouette, an aesthetic — that is recognisably hers. She does not follow every trend. She curates. And this curation is one of the most visible expressions of the elegant mind at work in the visible world.'},
{h:'Elegance in Friendship',b:'She is loyal without being possessive. She celebrates her friends\' successes with genuine warmth. She does not gossip gratuitously. She shows up when it matters. She maintains her friendships with the same care she brings to everything else. Her friendships are among the most elegant things about her — because they reveal her character when no one is evaluating her.'},
{h:'Elegance in Aging',b:'The elegant woman does not fight aging. She moves through it with the same intentionality she brings to everything else. She invests in her health, her skin, her style — not from fear of time, but from pride in her own appearance. She grows into her face. She becomes more herself as the years pass. Elegance is not youth. It is the quality of a woman fully inhabiting whatever age she is.'},
{h:'The Elegance of Punctuality',b:'Being late is a form of entitlement — the implicit message that your time is more valuable than theirs. The elegant woman is on time. Not obsessively early, not fashionably late. She arrives when she said she would. This small discipline is a form of respect — for the other person\'s time, for her own word, for the value of showing up when and how you said you would.'},
{h:'Discretion as Elegance',b:'A high-value woman does not share everything she knows, feels, or observes. She keeps her marriage private, her conflicts private, her plans private. What is sacred is protected. This is not secrecy — it is the understanding that not everything needs an audience, and that privacy is itself a form of power. The most elegant women are also the most discreet.'},
{h:'The Ultimate Elegance',b:'The most elegant thing a woman can be is entirely herself — without apology, without performance, without the need for anyone else\'s validation to feel complete. This is the elegance that cannot be purchased or imitated. It is earned through years of self-knowledge, self-respect, and the daily choice to live in alignment with what she values most. This is where all the other elegances lead.'},
]},

// 15
{emoji:'💫','title':'The Long Game of Love',category:'Connection',tagline:'Love is not a feeling. It is a practice.',pages:[
{h:'Love as a Practice',b:'The love that lasts is not a feeling that happens to you — it is a practice you maintain. It is the accumulation of thousands of small decisions over years: to be present rather than distracted, to be kind rather than impatient, to repair rather than withdraw, to choose the other person even on the days when you do not particularly feel like it. The practice of love is the love itself.'},
{h:'The Long View',b:'Every marriage has seasons — stretches of extraordinary closeness and stretches of ordinary distance. The couple who has committed to the long view does not treat the distance as evidence that the closeness is gone. They recognise it as a season, tend it with care, and trust that the closeness is available when they both orient toward it. The long view is the most stabilising thing a marriage can have.'},
{h:'Knowing and Being Known',b:'The deepest form of love available in a marriage is the experience of being fully known — with all your imperfections, all your history, all your worst moments and your best — and fully loved anyway. This is the work of years. It requires consistent vulnerability and consistent acceptance. When you reach it, you have something that no other human relationship can provide.'},
{h:'Choosing Again and Again',b:'Love in a long marriage is not a single choice made once. It is the same choice made repeatedly — on ordinary Tuesdays, in moments of frustration, in the aftermath of disappointment. The moment when choosing someone would be easier than choosing the relationship is the moment when genuine love is expressed or withheld. Choose the relationship. Choose him. Choose it again.'},
{h:'Love and Forgiveness',b:'Long love requires long forgiveness — the capacity to forgive not just the dramatic failures, but the accumulated small irritations, the ways he has disappointed you, the versions of himself that you did not enjoy. This forgiveness is a quiet, ongoing choice to see him in full and love the whole of him. Not despite the imperfections. With them, and sometimes because of what they have revealed.'},
{h:'The Love That Sees',b:'Long love sees. It notices when the other person is struggling before they say so. It remembers what matters to them. It holds their history with care. It sees who they are now and who they are still becoming. Being seen by someone who has chosen to see you for decades is one of the most profound experiences available to a human being. Be the person who sees him.'},
{h:'Love and Growth',b:'The long marriage holds two people who are both changing across time. The love that lasts is the love that grows alongside those changes — that chooses to fall in love with each new version of the person rather than mourning the earlier ones. This requires curiosity about who they are now, and the willingness to update your understanding rather than hold an image that no longer fits.'},
{h:'Love in the Body',b:'Long love is physical — not only sexually, but in the full range of physical connection that sustains intimacy: the hand held without thinking about it, the shoulder leaned against, the embrace at the end of a difficult day. The couple that maintains physical affection across decades maintains a closeness that purely emotional connection cannot fully provide. Touch is the language that says: I am still here.'},
{h:'Love and Humor',b:'The marriages that last longest almost always contain a lot of genuine laughter. Not polite laughter — real laughter, the kind that comes from years of shared references, private jokes, and the deep amusement of being known by someone who finds you genuinely funny. Protect the humour in the marriage. Cultivate it. It is the evidence of ease, play, and delight in each other that is one of love\'s most reliable signs.'},
{h:'Love During Hardship',b:'There are seasons in every marriage when love is not a feeling but a discipline — when the illness or the loss or the financial pressure has consumed everything warm and left only obligation. This is the love that matters most. Not the love of the easy seasons, but the love that shows up in the hard ones — quieter, less romantic, and more real than anything that has come before.'},
{h:'Love and Admiration',b:'Long love retains its capacity for admiration. Not the dazzled admiration of early attraction — but something deeper: the admiration of a person who has watched another person navigate life over years and found them, repeatedly, worthy of respect. Tell him what you admire. Specifically. Regularly. The marriage where both people still genuinely admire each other is a marriage with enduring passion.'},
{h:'Love as Legacy',b:'The love you build in your marriage is not only for you and for him. It is a demonstration to everyone who observes it — your children, your friends, the people who come into your home — of what love can be. A marriage of genuine depth, warmth, and mutual respect is a kind of gift to the world. It shows what is possible. Take it seriously as a legacy, not just as a private arrangement.'},
{h:'Keep Dating Each Other',b:'The feeling of dating — the anticipation, the attention, the deliberate effort to be interesting and present and attractive — does not have to end. It transforms. Dating your husband looks different than it did before the marriage, the mortgage, the children. But the spirit is the same: two people choosing each other actively, making effort for each other, showing each other that the choosing is ongoing.'},
{h:'The Story You Are Writing',b:'Your love story is not finished. It is being written today, in the choices you make and the way you treat each other. You are not just the subject of the story — you are its author. What are you writing today? What chapter is this? What would you like the next one to be? These questions, taken seriously, give you agency over the narrative of your marriage that you might not have known you possessed.'},
{h:'Keep Choosing',b:'The long game of love is won in the daily choice to keep playing. To keep showing up, keep trying, keep turning toward rather than away. Not because it is always easy — it is not. But because the decision you made to build a life with this person is still the best decision available to you, and the life you are building together is worth every choice it costs. Keep choosing. Every day. For as long as you live.'},
]},

];

// ── STATE ─────────────────────────────────────────────────────
let checked = {};
let journalEntries = JSON.parse(localStorage.getItem('sucre_j') || '[]');
let currentPrompt = '';
let currentBook = null;
let currentPage = 0;
let bookFilter = 'All';

// ── NAV ───────────────────────────────────────────────────────
document.getElementById('today-date').textContent =
  new Date().toLocaleDateString('en-US', {weekday:'long', month:'long', day:'numeric'});

document.querySelectorAll('.nb').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.nb').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.sec').forEach(s => s.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('sec-' + btn.dataset.s).classList.add('active');
  });
});

// ── DAILY ─────────────────────────────────────────────────────
function hexRGB(hex) {
  return [1,3,5].map(i => parseInt(hex.slice(i,i+2),16)).join(',');
}
function updateBadge() {
  const done = Object.values(checked).filter(Boolean).length;
  document.getElementById('prog-badge').textContent = done + '/5 completed';
}

function renderTips(tips) {
  const list = document.getElementById('tips-list');
  list.innerHTML = '';
  checked = {};
  tips.forEach((tip, i) => {
    const c = col(tip.category);
    const card = document.createElement('div');
    card.className = 'tc';
    card.innerHTML = `<div class="ti" id="ti-${i}" style="border:1px solid ${c};color:${c}">${tip.emoji}</div><div style="flex:1"><div class="tcat" style="color:${c}">${tip.category}</div><p class="tt" id="tt-${i}">${tip.tip}</p></div>`;
    card.addEventListener('click', () => {
      checked[i] = !checked[i];
      const icon = document.getElementById('ti-'+i);
      const text = document.getElementById('tt-'+i);
      if (checked[i]) {
        card.classList.add('ck');
        card.style.border = '1px solid ' + c;
        card.style.background = 'rgba(' + hexRGB(c) + ',.08)';
        icon.textContent = '✓';
        icon.style.background = c;
        icon.style.color = '#1a0a0f';
        text.classList.add('done');
      } else {
        card.classList.remove('ck');
        card.style.border = '1px solid rgba(245,230,216,.1)';
        card.style.background = 'rgba(255,255,255,.03)';
        icon.textContent = tip.emoji;
        icon.style.background = 'transparent';
        icon.style.color = c;
        text.classList.remove('done');
      }
      updateBadge();
    });
    list.appendChild(card);
  });
  document.getElementById('daily-intro').classList.add('hidden');
  document.getElementById('daily-loading').classList.add('hidden');
  document.getElementById('tips-list').classList.remove('hidden');
  document.getElementById('daily-refresh').classList.remove('hidden');
  document.getElementById('prog-badge').classList.remove('hidden');
  updateBadge();
}

async function loadDailyTips() {
  document.getElementById('daily-intro').classList.add('hidden');
  document.getElementById('tips-list').classList.add('hidden');
  document.getElementById('daily-refresh').classList.add('hidden');
  document.getElementById('prog-badge').classList.add('hidden');
  document.getElementById('daily-loading').classList.remove('hidden');
  try {
    const raw = await claude(DSYS, "Give me today's 5 tips.");
    renderTips(JSON.parse(raw.replace(/```json|```/g,'').trim()));
  } catch(e) {
    renderTips(FT);
  }
}

document.getElementById('begin-daily')?.addEventListener('click', loadDailyTips);
document.getElementById('refresh-daily')?.addEventListener('click', loadDailyTips);

// ── SPICE ─────────────────────────────────────────────────────
function renderSpice(ideas) {
  const list = document.getElementById('spice-list');
  list.innerHTML = '';
  ideas.forEach(idea => {
    const c = col(idea.intensity);
    const card = document.createElement('div');
    card.className = 'sc';
    card.innerHTML = `<div class="sh"><span class="se">${idea.emoji}</span><div><div class="st">${idea.title}</div><div class="si" style="color:${c}">${idea.intensity}</div></div></div><p class="sd">${idea.description}</p>`;
    list.appendChild(card);
  });
  document.getElementById('spice-intro').classList.add('hidden');
  document.getElementById('spice-loading').classList.add('hidden');
  document.getElementById('spice-list').classList.remove('hidden');
  document.getElementById('spice-refresh').classList.remove('hidden');
}

async function loadSpice() {
  document.getElementById('spice-intro').classList.add('hidden');
  document.getElementById('spice-list').classList.add('hidden');
  document.getElementById('spice-refresh').classList.add('hidden');
  document.getElementById('spice-loading').classList.remove('hidden');
  try {
    const raw = await claude(SSYS, "Give me 4 fresh spice ideas.");
    renderSpice(JSON.parse(raw.replace(/```json|```/g,'').trim()));
  } catch(e) {
    renderSpice(FS);
  }
}

document.getElementById('begin-spice')?.addEventListener('click', loadSpice);
document.getElementById('refresh-spice')?.addEventListener('click', loadSpice);

// ── JOURNAL ───────────────────────────────────────────────────
function newPrompt() {
  currentPrompt = PROMPTS[Math.floor(Math.random() * PROMPTS.length)];
  document.getElementById('j-prompt').textContent = '"' + currentPrompt + '"';
}
newPrompt();

function renderEntries() {
  const section = document.getElementById('entries-section');
  const list = document.getElementById('entries-list');
  if (!journalEntries.length) { section.classList.add('hidden'); return; }
  section.classList.remove('hidden');
  list.innerHTML = journalEntries.slice(0,10).map(e =>
    `<div class="ec"><span class="ed">${e.date}</span><p class="ep">"${e.prompt}"</p><p class="et">${e.text.length > 200 ? e.text.slice(0,200) + '…' : e.text}</p></div>`
  ).join('');
}
renderEntries();

document.getElementById('save-entry')?.addEventListener('click', () => {
  const text = document.getElementById('j-area').value.trim();
  if (!text) return;
  const entry = {
    id: Date.now(),
    prompt: currentPrompt,
    text,
    date: new Date().toLocaleDateString('en-US', {month:'short', day:'numeric', year:'numeric'})
  };
  journalEntries = [entry, ...journalEntries].slice(0,20);
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
    `<button class="fb${cat === bookFilter ? ' active' : ''}" data-cat="${cat}">${cat}</button>`
  ).join('');
  row.querySelectorAll('.fb').forEach(btn => {
    btn.addEventListener('click', () => {
      bookFilter = btn.dataset.cat;
      renderFilters();
      renderGrid();
    });
  });
}

function renderGrid() {
  const grid = document.getElementById('books-grid');
  const filtered = bookFilter === 'All' ? BOOKS : BOOKS.filter(b => b.category === bookFilter);
  grid.innerHTML = filtered.map(book => {
    const c = col(book.category);
    const idx = BOOKS.indexOf(book);
    return `<div class="bk" data-idx="${idx}">
      <div class="be">${book.emoji}</div>
      <div class="bcat" style="color:${c}">${book.category}</div>
      <div class="bti">${book.title}</div>
      <div class="btag">${book.tagline}</div>
      <div class="bpn">${book.pages.length} chapters</div>
    </div>`;
  }).join('');
  grid.querySelectorAll('.bk').forEach(card => {
    card.addEventListener('click', () => openBook(parseInt(card.dataset.idx)));
  });
}

function openBook(idx) {
  currentBook = BOOKS[idx];
  currentPage = 0;
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
  document.getElementById('r-chapter').textContent = 'Chapter ' + (currentPage + 1);
  document.getElementById('r-heading').textContent = page.h;
  document.getElementById('r-body').textContent = page.b;
  document.getElementById('r-page-num').textContent = (currentPage + 1) + ' / ' + currentBook.pages.length;
  document.getElementById('r-prev').disabled = currentPage === 0;
  document.getElementById('r-next').disabled = currentPage === currentBook.pages.length - 1;
  const pct = ((currentPage + 1) / currentBook.pages.length) * 100;
  document.getElementById('r-progress').style.width = pct + '%';
  document.getElementById('r-progress').style.background = c;
}

document.getElementById('r-prev')?.addEventListener('click', () => { if (currentPage > 0) { currentPage--; renderPage(); }});
document.getElementById('r-next')?.addEventListener('click', () => { if (currentPage < currentBook.pages.length - 1) { currentPage++; renderPage(); }});
document.getElementById('back-btn')?.addEventListener('click', () => {
  document.getElementById('book-reader').classList.add('hidden');
  document.getElementById('books-grid-view').classList.remove('hidden');
});

renderFilters();
renderGrid();
