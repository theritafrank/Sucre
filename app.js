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

// ── COLORS ────────────────────────────────────────────────────
const CC = {
  Intimacy:'#c9a96e', Flirtation:'#d4687a', Emotional:'#8b7bb5',
  Confidence:'#5a9a8a', Surprise:'#c96e8f', Sensuality:'#d4687a',
  Playful:'#8bc4b5', Bold:'#c9a96e', Daring:'#d4687a', Intimate:'#8b7bb5'
};
const col = c => CC[c] || '#c9a96e';

// ── JOURNAL PROMPTS ───────────────────────────────────────────
const PROMPTS = [
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
  "Describe the woman you want your daughter — or any young woman watching you — to see in your marriage.",
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

// ── 500 DAILY TIPS ────────────────────────────────────────────
const DAILY_TIPS = [
  // FLIRTATION
  {category:'Flirtation', emoji:'💌', tip:'Send him one text today with no logistics — just something that made you think of him.'},
  {category:'Flirtation', emoji:'👀', tip:'Catch his eye from across the room today and hold it one second longer than usual. Say nothing.'},
  {category:'Flirtation', emoji:'💌', tip:'Leave a note somewhere he will find it unexpectedly — his wallet, his car, his jacket pocket.'},
  {category:'Flirtation', emoji:'😏', tip:'Compliment something specific about his body today. His hands. His shoulders. Say it like you mean it.'},
  {category:'Flirtation', emoji:'📱', tip:'Send him a voice note instead of a text. Let him hear your voice in the middle of his day.'},
  {category:'Flirtation', emoji:'💋', tip:'Kiss him today like you have somewhere to be — not a peck, a real kiss, then walk away.'},
  {category:'Flirtation', emoji:'🌹', tip:'Tell him one specific thing you find irresistible about him. Not general — specific.'},
  {category:'Flirtation', emoji:'😊', tip:'Smile at him from across the room when he is not expecting it. Just because.'},
  {category:'Flirtation', emoji:'💌', tip:'Text him "I was just thinking about you" with nothing else. No explanation needed.'},
  {category:'Flirtation', emoji:'🎵', tip:'Send him a song that makes you think of him with no explanation. Let him figure out why.'},
  {category:'Flirtation', emoji:'👗', tip:'Wear something today specifically because you know he loves it on you. Tell him that is why.'},
  {category:'Flirtation', emoji:'✍️', tip:'Write him a two-line note about something you love about him. Leave it on his pillow.'},
  {category:'Flirtation', emoji:'😘', tip:'Walk past him today and touch the back of his neck softly. Keep walking. Say nothing.'},
  {category:'Flirtation', emoji:'💌', tip:'Tell him one memory from early in your relationship that still makes you smile.'},
  {category:'Flirtation', emoji:'🌙', tip:'When he comes home today, stop what you are doing and go to him first.'},
  {category:'Flirtation', emoji:'💋', tip:'Whisper something in his ear today that is just for him. In public if you can.'},
  {category:'Flirtation', emoji:'📸', tip:'Send him a photo of yourself today. Not revealing — just you, looking like yourself.'},
  {category:'Flirtation', emoji:'😏', tip:'Challenge him to something playful today — a bet, a game, a competition. Winner decides dinner.'},
  {category:'Flirtation', emoji:'💌', tip:'Tell him one thing about him that still surprises you even after all this time.'},
  {category:'Flirtation', emoji:'🌹', tip:'Buy him something small today — his favourite snack, a drink he loves — just because.'},
  {category:'Flirtation', emoji:'👀', tip:'Let him catch you looking at him admiringly. When he notices, do not look away.'},
  {category:'Flirtation', emoji:'💋', tip:'Kiss him goodbye today like it is the last time. Make it count.'},
  {category:'Flirtation', emoji:'📱', tip:'Send him a meme or something funny that made you think of him specifically.'},
  {category:'Flirtation', emoji:'😊', tip:'Laugh at something he says today — really laugh, fully, without holding back.'},
  {category:'Flirtation', emoji:'💌', tip:'Tell him what he looked like the first time you knew you were in love with him.'},
  {category:'Flirtation', emoji:'✨', tip:'Dress up slightly more than usual today with no special occasion. Just because you felt like it.'},
  {category:'Flirtation', emoji:'🌹', tip:'Recall a specific date or moment from early in your relationship and bring it up today.'},
  {category:'Flirtation', emoji:'😘', tip:'Touch his face intentionally today — a hand on his cheek, briefly, warmly.'},
  {category:'Flirtation', emoji:'💌', tip:'Tell him one thing about your future together that you are genuinely excited about.'},
  {category:'Flirtation', emoji:'👗', tip:'Put on his favourite scent on you today and say nothing about it. See if he notices.'},

  // INTIMACY
  {category:'Intimacy', emoji:'🔥', tip:'Initiate physical closeness tonight — not necessarily sex, just closeness. Reach for him first.'},
  {category:'Intimacy', emoji:'🕯️', tip:'Create a sensory moment tonight — candles, music, no phones. Even thirty minutes counts.'},
  {category:'Intimacy', emoji:'🤝', tip:'Hold his hand today somewhere you normally would not. In the car, walking, sitting beside each other.'},
  {category:'Intimacy', emoji:'🔥', tip:'Tell him what you love about being physically close to him. Say it out loud, directly.'},
  {category:'Intimacy', emoji:'🛌', tip:'Put your phone on the other side of the room tonight and be fully present in the bedroom.'},
  {category:'Intimacy', emoji:'💆', tip:'Offer to give him a shoulder or back rub tonight with no agenda attached.'},
  {category:'Intimacy', emoji:'🔥', tip:'Tell him you want him. Simply, directly, without performing it. Just say the words.'},
  {category:'Intimacy', emoji:'🕯️', tip:'Tonight, slow everything down. Eat slowly, move slowly, speak slowly. Let the evening breathe.'},
  {category:'Intimacy', emoji:'🤝', tip:'Sit beside him tonight and lean into him while you watch something together.'},
  {category:'Intimacy', emoji:'🔥', tip:'Initiate something intimate today that you have not initiated in a while. Surprise him.'},
  {category:'Intimacy', emoji:'🛌', tip:'Go to bed at the same time tonight. Not separately. Together, at the same time.'},
  {category:'Intimacy', emoji:'💆', tip:'Run a bath or shower for him tonight without being asked. Have it ready when he needs it.'},
  {category:'Intimacy', emoji:'🔥', tip:'Make eye contact during a moment of physical closeness today — do not look away.'},
  {category:'Intimacy', emoji:'🕯️', tip:'Cook something he loves tonight. Set the table properly. Make it feel like an occasion.'},
  {category:'Intimacy', emoji:'🤝', tip:'Touch him in passing today — his arm, his back, his hand — without it leading anywhere.'},
  {category:'Intimacy', emoji:'🔥', tip:'Tell him one specific physical thing you love about him that you have never said out loud.'},
  {category:'Intimacy', emoji:'🛌', tip:'Tonight before sleep, reach for him first. A hand on his chest. A leg across his. Just warmth.'},
  {category:'Intimacy', emoji:'💆', tip:'Ask him how his body is feeling today — tired, tense, okay. Actually listen to the answer.'},
  {category:'Intimacy', emoji:'🔥', tip:'Dress intentionally for bed tonight. Not for anyone else — for the atmosphere you want to create.'},
  {category:'Intimacy', emoji:'🕯️', tip:'Light a candle tonight in whatever room you are together. Change the light in the space.'},
  {category:'Intimacy', emoji:'🤝', tip:'Sit close enough to be touching during dinner tonight even if it is just your arms.'},
  {category:'Intimacy', emoji:'🔥', tip:'Be present during intimacy today — not managing how you look, not somewhere else. Just there.'},
  {category:'Intimacy', emoji:'🛌', tip:'Say goodnight tonight with a real embrace — not a quick hug, a full, slow one.'},
  {category:'Intimacy', emoji:'💆', tip:'Bring him water, tea, or something to drink tonight without being asked. A small act of care.'},
  {category:'Intimacy', emoji:'🔥', tip:'Tell him the last time he made you feel desired and what it did for you.'},
  {category:'Intimacy', emoji:'🕯️', tip:'Put on music tonight that creates a mood. Not background noise — intentional music.'},
  {category:'Intimacy', emoji:'🤝', tip:'When he sits down beside you tonight, move closer to him rather than staying where you are.'},
  {category:'Intimacy', emoji:'🔥', tip:'Wear something to bed tonight that makes you feel beautiful. Not for him — for yourself first.'},
  {category:'Intimacy', emoji:'🛌', tip:'Turn off all screens an hour before bed tonight. See what fills the space instead.'},
  {category:'Intimacy', emoji:'💆', tip:'Give him your full physical presence for one hour tonight — no phone, no distraction, just there.'},

  // EMOTIONAL
  {category:'Emotional', emoji:'💬', tip:'Ask him one real question today — not about logistics. What is on his mind that he has not said?'},
  {category:'Emotional', emoji:'🫂', tip:'Tell him one specific thing you appreciate about who he is as a man — not what he does, who he is.'},
  {category:'Emotional', emoji:'💬', tip:'Listen today to respond less and understand more. Just receive what he says without fixing it.'},
  {category:'Emotional', emoji:'🌟', tip:'Celebrate something he did recently that you noticed but never acknowledged out loud.'},
  {category:'Emotional', emoji:'💬', tip:'Ask him what the hardest part of his week has been. Then just listen. Do not solve it.'},
  {category:'Emotional', emoji:'🫂', tip:'Tell him one way he has made your life better that you take for granted and forget to say.'},
  {category:'Emotional', emoji:'💬', tip:'Bring up a good memory today — something from your relationship that made you both happy.'},
  {category:'Emotional', emoji:'🌟', tip:'Tell him you are proud of him for something specific. Not general — name the exact thing.'},
  {category:'Emotional', emoji:'💬', tip:'Ask him what he is looking forward to this week. Be genuinely interested in his answer.'},
  {category:'Emotional', emoji:'🫂', tip:'If there is a small tension between you, address it today before it becomes something bigger.'},
  {category:'Emotional', emoji:'💬', tip:'Share something vulnerable with him today — something you have been feeling that you have not said.'},
  {category:'Emotional', emoji:'🌟', tip:'Thank him for something he does consistently that you have stopped noticing. Be specific.'},
  {category:'Emotional', emoji:'💬', tip:'Ask him how he is really doing. Not as a formality. Ask like you actually want to know.'},
  {category:'Emotional', emoji:'🫂', tip:'Validate something he is going through today without turning it into advice or comparison.'},
  {category:'Emotional', emoji:'💬', tip:'Tell him one dream or goal you have that you have not shared with him yet.'},
  {category:'Emotional', emoji:'🌟', tip:'Acknowledge something he handled well this week. Tell him you noticed and it impressed you.'},
  {category:'Emotional', emoji:'💬', tip:'Have dinner with no phones tonight. Talk about something that has nothing to do with the children or work.'},
  {category:'Emotional', emoji:'🫂', tip:'If you have been short with him lately, acknowledge it today without making it about why.'},
  {category:'Emotional', emoji:'💬', tip:'Ask him what he needs from you this week. Then actually try to give it.'},
  {category:'Emotional', emoji:'🌟', tip:'Write down three things you love about your husband tonight. Then tell him one of them.'},
  {category:'Emotional', emoji:'💬', tip:'Share something that made you laugh today. Let him into your world even in small moments.'},
  {category:'Emotional', emoji:'🫂', tip:'Tell him you feel safe with him. Those four words mean more than most things you could say.'},
  {category:'Emotional', emoji:'💬', tip:'Ask him what his favourite memory of the two of you is. Share yours too.'},
  {category:'Emotional', emoji:'🌟', tip:'Remind him today why you chose him. Not why you stay — why you chose him specifically.'},
  {category:'Emotional', emoji:'💬', tip:'Let a silence be comfortable today. Sit with him without needing to fill the space with words.'},
  {category:'Emotional', emoji:'🫂', tip:'If he is stressed today, do not add to it. Just be a calm, warm presence beside him.'},
  {category:'Emotional', emoji:'💬', tip:'Ask him what he would do if he could take a day completely for himself. Be curious about his answer.'},
  {category:'Emotional', emoji:'🌟', tip:'Tell him one thing about his character that you admire and have never put into words before.'},
  {category:'Emotional', emoji:'💬', tip:'Repair something small today — a tone, a comment, a moment that did not land well. Do it cleanly.'},
  {category:'Emotional', emoji:'🫂', tip:'Tell him "I see how hard you are working" — and mean it. Men need to hear this more than we realise.'},

  // CONFIDENCE
  {category:'Confidence', emoji:'✨', tip:'Wear something today that makes you feel like the most beautiful version of yourself. Dress for you.'},
  {category:'Confidence', emoji:'💪', tip:'Do one thing today that is just for you — not for the family, not for work. Just for you.'},
  {category:'Confidence', emoji:'✨', tip:'Stand tall today. Shoulders back, chin up, slow your walk. Your posture changes how you feel.'},
  {category:'Confidence', emoji:'📚', tip:'Read or listen to something that feeds your mind today. Even fifteen minutes counts.'},
  {category:'Confidence', emoji:'✨', tip:'Say something you actually think today — an opinion, a preference — without softening it first.'},
  {category:'Confidence', emoji:'💪', tip:'Do something today that makes you feel capable. Cook, create, exercise, build — something real.'},
  {category:'Confidence', emoji:'✨', tip:'Look in the mirror today and find one thing you genuinely love about what you see.'},
  {category:'Confidence', emoji:'📚', tip:'Spend thirty minutes on your business or a personal goal today. Protect that time fiercely.'},
  {category:'Confidence', emoji:'✨', tip:'Speak your mind today in a moment where you would normally stay quiet. Just once.'},
  {category:'Confidence', emoji:'💪', tip:'Move your body today in a way that feels good — not punishing. Dance, walk, stretch, swim.'},
  {category:'Confidence', emoji:'✨', tip:'Buy yourself one small beautiful thing today — a flower, a good coffee, something that pleases you.'},
  {category:'Confidence', emoji:'📚', tip:'Listen to a podcast or audiobook today that expands your thinking. Feed your mind.'},
  {category:'Confidence', emoji:'✨', tip:'Moisturise slowly today. Take care of your skin as an act of self-respect, not vanity.'},
  {category:'Confidence', emoji:'💪', tip:'Finish one thing today that you have been putting off. The satisfaction will carry into the evening.'},
  {category:'Confidence', emoji:'✨', tip:'Dress your hair or skin intentionally today. Not for anyone else — because you deserve to feel good.'},
  {category:'Confidence', emoji:'📚', tip:'Write down one goal you are working toward. Look at it. Remind yourself why it matters.'},
  {category:'Confidence', emoji:'✨', tip:'Decline one thing today that does not serve you. Practise saying no without over-explaining.'},
  {category:'Confidence', emoji:'💪', tip:'Pursue something today that is just yours — a hobby, a skill, a creative outlet. Even briefly.'},
  {category:'Confidence', emoji:'✨', tip:'Tell yourself one true, kind thing today. Out loud if you can. Your mind is listening.'},
  {category:'Confidence', emoji:'📚', tip:'Call or message a friend today who makes you feel like yourself. Invest in that connection.'},
  {category:'Confidence', emoji:'✨', tip:'Eat something today that nourishes you and tastes extraordinary. Pleasure and health together.'},
  {category:'Confidence', emoji:'💪', tip:'Do something brave today — small is fine. Courage is a muscle. Use it even in tiny ways.'},
  {category:'Confidence', emoji:'✨', tip:'Wear your good perfume today. Not for a special occasion. Today is the occasion.'},
  {category:'Confidence', emoji:'📚', tip:'Spend time in silence today — no music, no podcast, no scrolling. Just you and your thoughts.'},
  {category:'Confidence', emoji:'✨', tip:'Make a decision today without asking for anyone else\'s opinion first. Trust yourself.'},
  {category:'Confidence', emoji:'💪', tip:'Rest without guilt today. Lie down, sit still, do nothing. Rest is not laziness. It is maintenance.'},
  {category:'Confidence', emoji:'✨', tip:'Acknowledge something you did well this week. Say it to yourself. You are allowed to notice.'},
  {category:'Confidence', emoji:'📚', tip:'Write in your journal today — even three sentences. Check in with yourself honestly.'},
  {category:'Confidence', emoji:'✨', tip:'Take a photo of yourself today that you like. Not for social media. Just to see yourself clearly.'},
  {category:'Confidence', emoji:'💪', tip:'Do something today that the old version of you would have been too afraid to do. Even something small.'},

  // SURPRISE
  {category:'Surprise', emoji:'🎁', tip:'Do something for him today that he is not expecting and that requires you to have been paying attention.'},
  {category:'Surprise', emoji:'🌹', tip:'Plan a date for this week — even a simple one. Do not tell him where you are going until you arrive.'},
  {category:'Surprise', emoji:'🎁', tip:'Cook his absolute favourite meal tonight with no special occasion. Just because you wanted to.'},
  {category:'Surprise', emoji:'✉️', tip:'Write him a proper love letter today. On paper. By hand. Leave it somewhere he will find it.'},
  {category:'Surprise', emoji:'🎁', tip:'Order or buy something small he has mentioned wanting. Do not make a big deal of it. Just give it.'},
  {category:'Surprise', emoji:'🌹', tip:'Suggest something spontaneous today — a different restaurant, a drive somewhere, a walk somewhere new.'},
  {category:'Surprise', emoji:'🎁', tip:'Set up the bedroom beautifully tonight before he comes in — candles, music, something intentional.'},
  {category:'Surprise', emoji:'✉️', tip:'Leave a voice note on his phone tonight to wake up to. Something warm, something just for him.'},
  {category:'Surprise', emoji:'🎁', tip:'Get dressed up tonight for no reason. When he asks why, say "for you."'},
  {category:'Surprise', emoji:'🌹', tip:'Plan something to look forward to together — book it, suggest it, make it concrete. Give him anticipation.'},
  {category:'Surprise', emoji:'🎁', tip:'Do one of his chores without being asked and without mentioning it. Just do it and say nothing.'},
  {category:'Surprise', emoji:'✉️', tip:'Send him a specific compliment today that shows you have been paying attention to something he does.'},
  {category:'Surprise', emoji:'🎁', tip:'Put on a playlist tonight that you know he loves. Have it playing when he gets home.'},
  {category:'Surprise', emoji:'🌹', tip:'Suggest trying something neither of you has done before this month — a new food, place, or experience.'},
  {category:'Surprise', emoji:'🎁', tip:'Make him breakfast in bed or bring him coffee exactly the way he likes it without being asked.'},
  {category:'Surprise', emoji:'✉️', tip:'Text him a specific memory today that you love — something he might have forgotten that you never did.'},
  {category:'Surprise', emoji:'🎁', tip:'Clear his schedule for one evening this week and replace it with something you know he would enjoy.'},
  {category:'Surprise', emoji:'🌹', tip:'Do something creative for him today — even small. Something that required thought and effort.'},
  {category:'Surprise', emoji:'🎁', tip:'Arrange childcare and plan an evening that is just the two of you. Even two hours counts.'},
  {category:'Surprise', emoji:'✉️', tip:'Tell him one thing today that you have been meaning to say for a while but kept forgetting to.'},
  {category:'Surprise', emoji:'🎁', tip:'Make his favourite drink and bring it to him while he is working or resting.'},
  {category:'Surprise', emoji:'🌹', tip:'Recreate something from early in your relationship — a place you went, a thing you did, a meal you ate.'},
  {category:'Surprise', emoji:'🎁', tip:'Buy him a book you think he would love. Write a personal note inside the front cover.'},
  {category:'Surprise', emoji:'✉️', tip:'Send his favourite song to him today with a message about why it makes you think of him.'},
  {category:'Surprise', emoji:'🎁', tip:'Do something unexpected with your appearance today — a new style, a different look. Let him notice.'},
  {category:'Surprise', emoji:'🌹', tip:'Write down five things you love about your marriage and share them with him today — all five.'},
  {category:'Surprise', emoji:'🎁', tip:'Take over something he normally handles today so he gets a break without having to ask for one.'},
  {category:'Surprise', emoji:'✉️', tip:'Create a photo album or collage of your favourite moments together. Share it with him.'},
  {category:'Surprise', emoji:'🎁', tip:'Ask him to teach you something he knows that you do not. Let him be the expert. Pay full attention.'},
  {category:'Surprise', emoji:'🌹', tip:'Write him a list of reasons you are grateful to be his wife. Put it somewhere unexpected.'},

  // SENSUALITY
  {category:'Sensuality', emoji:'🌸', tip:'Put on your favourite scent today — not for him, for how it makes you feel in your own body.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Slow down one ordinary moment today — eating, bathing, walking — and actually feel it.'},
  {category:'Sensuality', emoji:'🌸', tip:'Wear fabric that feels extraordinary against your skin today. Dressing for sensation counts.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Take a proper bath tonight with oils and scent and slow attention. Reclaim it as a ritual.'},
  {category:'Sensuality', emoji:'🌸', tip:'Eat something today with full attention — taste it, enjoy it, be present with it completely.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Put on music that changes your body chemistry tonight. Let it move through you.'},
  {category:'Sensuality', emoji:'🌸', tip:'Touch something with full attention today — fabric, skin, bark, water. Feel it properly.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Moisturise slowly and deliberately tonight. Every part of your body deserves care and attention.'},
  {category:'Sensuality', emoji:'🌸', tip:'Walk somewhere beautiful today and look at what you are actually walking through.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Dim the lights tonight and change the atmosphere of your home. Light is a mood and you control it.'},
  {category:'Sensuality', emoji:'🌸', tip:'Wear beautiful lingerie today — not for him, because you deserve to feel luxurious against your own skin.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Cook something tonight that fills the kitchen with an extraordinary scent. Cook as a sensory act.'},
  {category:'Sensuality', emoji:'🌸', tip:'Stretch your body this morning with slow attention — feel each movement, each release.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Light a candle with a scent you love today. Let it fill the room. Create atmosphere deliberately.'},
  {category:'Sensuality', emoji:'🌸', tip:'Put fresh sheets on the bed today. Notice how different it feels to slide into clean, cool linen.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Sit outside today if you can — feel the air, the temperature, the sounds. Be present in the world.'},
  {category:'Sensuality', emoji:'🌸', tip:'Buy fresh flowers today. Put them where you will see them. Beauty in the home matters.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Take your coffee or tea today and drink it slowly, standing still, tasting every sip.'},
  {category:'Sensuality', emoji:'🌸', tip:'Dance alone today — even for two minutes, even in the kitchen. Let your body move for joy.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Read something beautiful tonight — a poem, a passage, something that stirs something in you.'},
  {category:'Sensuality', emoji:'🌸', tip:'Notice what your husband smells like today. Really notice. File it away in your memory deliberately.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Take a shower tonight and let the water be the right temperature and stay a little longer than usual.'},
  {category:'Sensuality', emoji:'🌸', tip:'Wear your hair differently today. Something small changes how you carry yourself entirely.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Set the table properly tonight — even for a simple meal. Create the experience of an occasion.'},
  {category:'Sensuality', emoji:'🌸', tip:'Put lotion on your hands slowly today and actually feel the sensation. Presence in small moments.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Open a window today and actually breathe the outside air in. Feel it enter your body.'},
  {category:'Sensuality', emoji:'🌸', tip:'Wear colour today — something vivid, something that changes your energy. Colour is a mood.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Create a scent ritual tonight — your bedroom should smell like somewhere you want to be.'},
  {category:'Sensuality', emoji:'🌸', tip:'Move slowly through your home today. Unhurried. As if you have all the time you need.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Put on something that makes you feel like yourself tonight before your husband comes home.'},

  // MORE TIPS across categories
  {category:'Flirtation', emoji:'💋', tip:'Send him a message today that says exactly what you would say if you were not worried about how it sounds.'},
  {category:'Intimacy', emoji:'🔥', tip:'Tonight, close every door between you — phones, thoughts, distractions — and just be in the same space.'},
  {category:'Emotional', emoji:'💬', tip:'Tell him one thing about your childhood that shaped who you are. Share something real.'},
  {category:'Confidence', emoji:'✨', tip:'Decide one thing today without second-guessing yourself. Make the choice and own it completely.'},
  {category:'Surprise', emoji:'🎁', tip:'Hide a love note in his phone — add it to his notes app where he will find it unexpectedly.'},
  {category:'Sensuality', emoji:'🌸', tip:'Tonight, pay attention to how he smells, sounds, and feels. Be present in every sense.'},
  {category:'Flirtation', emoji:'💌', tip:'Describe to him in a message what you love about the way he holds you. Be specific and vivid.'},
  {category:'Intimacy', emoji:'🔥', tip:'Ask him to tell you one thing he has been wanting more of from you. Then truly receive the answer.'},
  {category:'Emotional', emoji:'🫂', tip:'Apologise today for something small you got wrong recently. Clean, direct, no justification.'},
  {category:'Confidence', emoji:'💪', tip:'Start something today you have been putting off because you were waiting to feel ready. Begin anyway.'},
  {category:'Surprise', emoji:'🌹', tip:'Plan a trip — even a one-night getaway — and present him with the idea tonight.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Arrange the bedroom tonight before bed — dim light, clean surfaces, your scent. Create the atmosphere.'},
  {category:'Flirtation', emoji:'😏', tip:'Tell him one thing he does that you find irresistibly attractive. The more specific, the better.'},
  {category:'Intimacy', emoji:'💆', tip:'Ask him where he is holding tension in his body and offer to help release it. Hands, no agenda.'},
  {category:'Emotional', emoji:'🌟', tip:'Tell him the specific moment you knew you wanted to marry him. Revisit that story together.'},
  {category:'Confidence', emoji:'✨', tip:'Invest in one thing for yourself today — a class, a book, a treatment. You are worth investing in.'},
  {category:'Surprise', emoji:'✉️', tip:'Record a video message for him today — thirty seconds of you telling him something you love about him.'},
  {category:'Sensuality', emoji:'🌸', tip:'Choose your outfit today based entirely on how the fabric feels against your skin. Sensation first.'},
  {category:'Flirtation', emoji:'👀', tip:'During a conversation today, give him your complete, undivided attention. No phone, no distraction.'},
  {category:'Intimacy', emoji:'🛌', tip:'Tell him tonight what you love about waking up next to him. Say it in the dark before you sleep.'},
  {category:'Emotional', emoji:'💬', tip:'Ask him what his biggest dream is right now. Not his plan — his dream. Listen without judgment.'},
  {category:'Confidence', emoji:'📚', tip:'Protect one hour this week that is entirely yours. Guard it. Use it for something that fills you.'},
  {category:'Surprise', emoji:'🎁', tip:'Do something for him this week that shows you have been paying attention to what he loves.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Burn incense or a candle as you get ready tonight. Scent your getting-ready ritual.'},
  {category:'Flirtation', emoji:'💋', tip:'When you say goodnight tonight, say it like you mean it — eye contact, warmth, presence.'},
  {category:'Intimacy', emoji:'🔥', tip:'Light candles in the bedroom tonight and see what happens when you change the atmosphere.'},
  {category:'Emotional', emoji:'🫂', tip:'If he seems off today, ask once and then simply be present. Sometimes presence is the answer.'},
  {category:'Confidence', emoji:'✨', tip:'Speak one truth today that you would normally keep to yourself. Let yourself be known.'},
  {category:'Surprise', emoji:'🌹', tip:'Make a reservation at a restaurant you have never been to and take him there this week.'},
  {category:'Sensuality', emoji:'🌸', tip:'Today, eat your food sitting down, with attention, without your phone. One mindful meal.'},
  {category:'Flirtation', emoji:'😊', tip:'Text him something funny that happened today. Let him into the small moments of your life.'},
  {category:'Intimacy', emoji:'🤝', tip:'Sit close to him tonight — not for anything specific, just to feel him near you.'},
  {category:'Emotional', emoji:'💬', tip:'Share one fear you have today with your husband. Not a complaint — a vulnerability.'},
  {category:'Confidence', emoji:'💪', tip:'Say no to one thing today that you would normally agree to out of guilt. Practice it.'},
  {category:'Surprise', emoji:'✉️', tip:'Write him a list of ten reasons you love being his wife. Leave it where he will find it.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Tonight, turn off the overhead light and use lamps only. See how differently the room feels.'},
  {category:'Flirtation', emoji:'💌', tip:'Tell him what you find most attractive about his mind — not his body, his mind.'},
  {category:'Intimacy', emoji:'🕯️', tip:'Make the bedroom feel different tonight — a new candle, fresh sheets, music. Small changes matter.'},
  {category:'Emotional', emoji:'🌟', tip:'Write down three things you are grateful for in your marriage today. Let gratitude be a practice.'},
  {category:'Confidence', emoji:'✨', tip:'Buy yourself flowers today. Put them in a place where you will see them when you wake up.'},
  {category:'Surprise', emoji:'🎁', tip:'Organise something he has been meaning to sort but has not had time for. Do it quietly for him.'},
  {category:'Sensuality', emoji:'🌸', tip:'Take a walk outside today with no podcast, no music. Just you, the air, and your thoughts.'},
  {category:'Flirtation', emoji:'😘', tip:'Sit next to him at dinner tonight instead of across from him. Proximity is a form of flirtation.'},
  {category:'Intimacy', emoji:'💆', tip:'Tonight, ask him to just hold you. No conversation needed. Just be held.'},
  {category:'Emotional', emoji:'💬', tip:'Ask him one question tonight that you genuinely do not know the answer to.'},
  {category:'Confidence', emoji:'📚', tip:'Do something creative today — write, draw, cook experimentally. Create something with your hands.'},
  {category:'Surprise', emoji:'🌹', tip:'Suggest watching something he loves tonight even if it is not your usual preference. Choose him.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Make your morning beautiful — a good mug, slow coffee, five minutes of quiet before the rush.'},
  {category:'Flirtation', emoji:'💋', tip:'End today with one genuine, warm, unhurried kiss. Not a peck. A real one.'},
  {category:'Intimacy', emoji:'🔥', tip:'Tell him what intimacy means to you right now — not what you think it should be, what it actually is.'},
  {category:'Emotional', emoji:'🫂', tip:'Ask him what he needs most from the marriage right now. Receive the answer with an open heart.'},
  {category:'Confidence', emoji:'✨', tip:'Identify one belief about yourself that is not true and name it. Naming it begins to dismantle it.'},
  {category:'Surprise', emoji:'🎁', tip:'This week, do one grand and one tiny romantic gesture. Both matter. Both land differently.'},
  {category:'Sensuality', emoji:'🌸', tip:'Pay attention to how your body feels today — not how it looks. Feel it from the inside.'},
  {category:'Flirtation', emoji:'👗', tip:'Wear red today. Or gold. Or whatever colour makes you feel electric. Own the energy it brings.'},
  {category:'Intimacy', emoji:'🛌', tip:'Tell him something in the dark tonight that you have been carrying. The dark makes honesty easier.'},
  {category:'Emotional', emoji:'💬', tip:'Tell him one thing about himself that he does not see clearly enough — something truly good in him.'},
  {category:'Confidence', emoji:'💪', tip:'Eat something extraordinary today, slowly, with full pleasure. Nourish yourself like you matter.'},
  {category:'Surprise', emoji:'✉️', tip:'Send him a message today that says exactly what you feel — unfiltered, unperformed, just true.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Light a candle at dinner tonight even if it is just the two of you on a Tuesday. Create ritual.'},
  {category:'Flirtation', emoji:'😏', tip:'Be slightly mysterious today — do not explain everything, do not fill every silence. Let him wonder.'},
  {category:'Intimacy', emoji:'🔥', tip:'Prioritise physical connection today even when you are tired. Especially when you are tired.'},
  {category:'Emotional', emoji:'🌟', tip:'Tell him specifically what kind of father he is or will be. Men need to hear this more than they show.'},
  {category:'Confidence', emoji:'✨', tip:'Wear your best underwear today. No special occasion. You are the special occasion.'},
  {category:'Surprise', emoji:'🎁', tip:'Make him something handmade this week — food, a note, something crafted. Effort is felt.'},
  {category:'Sensuality', emoji:'🌸', tip:'Use a body scrub or treatment today. Tend to your skin slowly. This is not vanity — it is care.'},
  {category:'Flirtation', emoji:'💌', tip:'Tell him what your favourite thing about your marriage is. Say it like you mean it. Mean it.'},
  {category:'Intimacy', emoji:'🕯️', tip:'Create one beautiful moment tonight — even ten minutes of real, warm, present connection.'},
  {category:'Emotional', emoji:'🫂', tip:'If something was left unresolved this week, address it today. Do not let it harden into distance.'},
  {category:'Confidence', emoji:'📚', tip:'Learn something new this week — a skill, a fact, an idea. Keep your mind alive and growing.'},
  {category:'Surprise', emoji:'🌹', tip:'Plan something for next month together — a trip, a dinner, an experience. Give yourselves something to anticipate.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Perfume your home tonight — a diffuser, a candle, flowers. Make the space smell like somewhere worth being.'},
  {category:'Flirtation', emoji:'👀', tip:'Look at your husband today like you did when you first fell for him. Really look. Remember why.'},
  {category:'Intimacy', emoji:'💆', tip:'Give him your full, undivided presence for thirty minutes tonight. No half-attention. Just there.'},
  {category:'Emotional', emoji:'💬', tip:'Tell him one thing you hope for your marriage in the next five years. Be honest and specific.'},
  {category:'Confidence', emoji:'✨', tip:'Do one thing today that scares you a little. Courage compounds. Small acts build into large ones.'},
  {category:'Surprise', emoji:'✉️', tip:'Hide something sweet for him to find — a chocolate, a note, a small thing that says I thought of you.'},
  {category:'Sensuality', emoji:'🌸', tip:'Stretch for ten minutes this morning with full attention to each part of your body. Feel yourself wake up.'},
  {category:'Flirtation', emoji:'💋', tip:'Tell him tonight what you love about the way he loves you. Give him the specific evidence.'},
  {category:'Intimacy', emoji:'🔥', tip:'Be the one who reaches first tonight. Every time. For one week. See what shifts.'},
  {category:'Emotional', emoji:'🌟', tip:'Tell him you believe in him today. Not in what he does — in who he is. Those are different things.'},
  {category:'Confidence', emoji:'💪', tip:'Protect your energy today. Before you give it to anyone, give some to yourself first.'},
  {category:'Surprise', emoji:'🎁', tip:'Do something for his comfort tonight — his favourite food, his preferred temperature, his kind of evening.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Slow your speech tonight. Talk a little slower, move a little slower. See how the atmosphere shifts.'},
  {category:'Flirtation', emoji:'😊', tip:'Tease him about something today — gently, warmly, the way only someone who loves him would.'},
  {category:'Intimacy', emoji:'🛌', tip:'Ask him what he needs tonight to feel close to you. Then give it to him without reservation.'},
  {category:'Emotional', emoji:'💬', tip:'Say sorry today for something — even something small — without adding a but. Clean and complete.'},
  {category:'Confidence', emoji:'✨', tip:'Take a photo of yourself today that you love. Print it. Put it somewhere you can see it.'},
  {category:'Surprise', emoji:'🌹', tip:'Text him in the middle of the day: "I am lucky to be your wife." Nothing else needed.'},
  {category:'Sensuality', emoji:'🌸', tip:'Eat dinner by candlelight tonight even if it is just the two of you at home on a weeknight.'},
  {category:'Flirtation', emoji:'💌', tip:'Tell him what you were thinking about him the last time he was not home. Be honest and warm.'},
  {category:'Intimacy', emoji:'🔥', tip:'Kiss him slowly tonight. Not urgently. Slowly. Like you have all the time in the world.'},
  {category:'Emotional', emoji:'🫂', tip:'Let him be imperfect today without fixing, commenting, or correcting. Just love him as he is.'},
  {category:'Confidence', emoji:'📚', tip:'Read something that challenges your thinking today. A great mind stays curious and uncomfortable.'},
  {category:'Surprise', emoji:'🎁', tip:'Create a playlist for him tonight of songs that remind you of your relationship. Press play when he arrives.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Make the kitchen smell extraordinary tonight — something baking, something simmering, something warm.'},
  {category:'Flirtation', emoji:'😏', tip:'Tell him what you were thinking about during a quiet moment today. Be honest. Let him in.'},
  {category:'Intimacy', emoji:'💆', tip:'Put your hands on him tonight simply because you want to. No reason needed beyond wanting to touch him.'},
  {category:'Emotional', emoji:'💬', tip:'Ask him what he misses most about life before children — and share what you miss too. No judgment.'},
  {category:'Confidence', emoji:'✨', tip:'Write down five things you are good at. Read it. Believe it. You are more capable than you remember.'},
  {category:'Surprise', emoji:'✉️', tip:'Write a letter tonight to your marriage — to where it is going, what you want for it, what you promise it.'},
  {category:'Sensuality', emoji:'🌸', tip:'Buy a new scent for your home today. Smell is the fastest route to atmosphere and mood.'},
  {category:'Flirtation', emoji:'💋', tip:'When he talks today, look at his mouth. Really look. Remember what you love about him physically.'},
  {category:'Intimacy', emoji:'🔥', tip:'Tonight, be completely present — not thinking about tomorrow, not processing today. Just here.'},
  {category:'Emotional', emoji:'🌟', tip:'Name one thing your husband is better at than anyone you know. Tell him. Specifically. Today.'},
  {category:'Confidence', emoji:'💪', tip:'Set one boundary today — gently but firmly. Your limits are not unreasonable. They are necessary.'},
  {category:'Surprise', emoji:'🎁', tip:'Surprise him with a gesture that has nothing to do with any occasion. Love without reason is the best kind.'},
  {category:'Sensuality', emoji:'🕯️', tip:'Close your eyes for five minutes today and just breathe. Let your nervous system soften. Rest.'},
  {category:'Flirtation', emoji:'👗', tip:'Get dressed with intention tonight even if you are staying in. Let the effort speak.'},
  {category:'Intimacy', emoji:'🛌', tip:'Hold him a little longer tonight before you fall asleep. A few extra seconds of warmth matters.'},
  {category:'Emotional', emoji:'🫂', tip:'Thank him for one specific way he shows up for your family that often goes unacknowledged.'},
  {category:'Confidence', emoji:'✨', tip:'Do not apologise for taking up space today. In conversation, in the room, in the relationship. Just be.'},
  {category:'Surprise', emoji:'🌹', tip:'Arrange flowers or something beautiful in a part of the home you both spend time in. Beauty is a gift.'},
  {category:'Sensuality', emoji:'🌸', tip:'Spend five minutes in the sun today — face up, eyes closed, warmth on your skin. This is medicine.'},
];

// ── 200 SPICE IDEAS ───────────────────────────────────────────
const SPICE_IDEAS = [
  {intensity:'Playful', emoji:'🎲', title:'The Decision Jar', description:'Write 10 activities on paper — restaurants, experiences, things to try — fold them and put them in a jar. Tonight he picks one blind. Whatever comes out, you do this week. No vetoes.'},
  {intensity:'Intimate', emoji:'🕯️', title:'The Phone-Free Evening', description:'Both phones in another room from 7pm. Candles, music, whatever conversation or closeness fills the space. No agenda — just each other and no escape route.'},
  {intensity:'Bold', emoji:'💋', title:'The First Date Replay', description:'Go back to where you had your first date or somewhere that felt like the beginning. Dress like you were trying to impress. Flirt like you have not already won each other.'},
  {intensity:'Playful', emoji:'🍽️', title:'Blind Taste Night', description:'Blindfold him and feed him five different things. Let his other senses take over. Keep it playful or let it get intimate — either way it will be memorable.'},
  {intensity:'Intimate', emoji:'✉️', title:'The Love Letter Exchange', description:'Both of you write a letter to each other tonight — handwritten, honest, specific. No phones, no interruptions. Then exchange them and read in silence.'},
  {intensity:'Daring', emoji:'🌙', title:'Midnight Drive', description:'After the children are asleep, get in the car and drive somewhere — no destination, just music and movement. Talk or do not talk. Being in motion together changes things.'},
  {intensity:'Playful', emoji:'🎮', title:'The Bet Game', description:'Make a bet on anything — a sport, a prediction, a silly challenge. Winner gets to choose the plans for an evening with no questions asked.'},
  {intensity:'Intimate', emoji:'🛌', title:'The Early Night', description:'Get everything done by 8pm tonight. Put the children down. Get into bed ridiculously early with nothing to do but be with each other. No phones. No purpose. Just time.'},
  {intensity:'Bold', emoji:'👗', title:'Dressed for Him', description:'Wear exactly what he has told you he loves most on you. Tell him that is why when he notices. Watch what that one sentence does to the evening.'},
  {intensity:'Playful', emoji:'🍳', title:'Cook Together', description:'Pick a recipe neither of you has made. Cook it together tonight — music on, no rushing, wine or mocktails. The point is the chaos and closeness of creating something together.'},
  {intensity:'Intimate', emoji:'💆', title:'The Full Body Exchange', description:'Take turns giving each other a proper massage tonight. Thirty minutes each. No rushing. No agenda. Just hands and trust and presence.'},
  {intensity:'Daring', emoji:'📸', title:'The Photo Session', description:'Take photos of each other tonight — not for social media. Just beautiful, private, honest images of each other right now. Keep them. Look at them in ten years.'},
  {intensity:'Playful', emoji:'🎵', title:'The Playlist Duel', description:'Each of you makes a playlist of songs that represent your relationship. Play them for each other and explain why each song made the cut. Deeply revealing, often hilarious.'},
  {intensity:'Intimate', emoji:'🌹', title:'The Appreciation Night', description:'Sit facing each other. Take turns saying one specific thing you love about the other — back and forth, ten times each. No generalities. Specifics only.'},
  {intensity:'Bold', emoji:'🏨', title:'One Night Away', description:'Book a hotel room for one night this month — even in your own city. Leave the house. Leave the roles. Just be two people in a room with nothing else required of them.'},
  {intensity:'Playful', emoji:'🎭', title:'Roleplay Strangers', description:'Meet somewhere — a bar, a café — and pretend you are strangers meeting for the first time. Flirt. Discover each other again from scratch. Drive home together.'},
  {intensity:'Intimate', emoji:'🕯️', title:'The Candlelit Bath', description:'Draw a bath together tonight. Candles, oils, music. No phones within reach. Two people in warm water with nowhere else to be. Simple and transformative.'},
  {intensity:'Daring', emoji:'💌', title:'The Fantasy Exchange', description:'Each of you writes down one thing you have always wanted to try or experience together. Fold it. Exchange. No judgment — just conversation about what you both actually want.'},
  {intensity:'Playful', emoji:'🎬', title:'Movie Marathon Night', description:'Pick three films — one each and one you both choose together. Build a proper nest on the sofa. Snacks he loves. Stay up later than you should. Just be in it together.'},
  {intensity:'Intimate', emoji:'✍️', title:'The Memory Book Night', description:'Go through old photos together tonight. Talk about the memories. Laugh, feel things, remember who you were before all the responsibilities arrived. Write down your three favourites.'},
  {intensity:'Bold', emoji:'🚗', title:'The Surprise Trip', description:'Plan a day trip for next weekend and tell him nothing except what to wear and when to be ready. Take him somewhere he has mentioned wanting to go. Anticipation is everything.'},
  {intensity:'Playful', emoji:'🍷', title:'The Wine and Truth Game', description:'Open a bottle of wine or a nice drink. Take turns asking each other questions you have never asked before. Real questions. Things you actually want to know.'},
  {intensity:'Intimate', emoji:'🌙', title:'The Stargazing Night', description:'Drive somewhere dark tonight and lie on a blanket and look at the stars together. Bring something warm to drink. Say very little. Let the scale of the sky do the work.'},
  {intensity:'Daring', emoji:'💃', title:'The Dance Night', description:'Clear the living room. Put on music that moves your body. Dance together — badly, beautifully, whatever comes. Physical playfulness is its own form of intimacy.'},
  {intensity:'Playful', emoji:'🎁', title:'The Gift Without Occasion', description:'Buy him something completely unexpected this week — something small that shows you have been paying attention to what he loves. Leave it with a note that has no explanation.'},
  {intensity:'Intimate', emoji:'🔥', title:'The Slow Morning', description:'Set your alarm an hour earlier one morning this week. No children yet, no rush. Use that hour just for the two of you. What you do with it is entirely up to you.'},
  {intensity:'Bold', emoji:'👠', title:'The Dress Up Night', description:'Both of you get properly dressed — as if you are going somewhere significant. Then have dinner at home. The formality changes the atmosphere completely.'},
  {intensity:'Playful', emoji:'🌊', title:'The Outdoor Adventure', description:'Do something physical together this weekend — a hike, a swim, a cycle. Shared physical experience creates bonding that conversation alone cannot replicate.'},
  {intensity:'Intimate', emoji:'💬', title:'The Question Night', description:'Use the journal prompts from this app as a couple tonight. Take turns answering them honestly. Let yourselves be known in new ways.'},
  {intensity:'Daring', emoji:'🎨', title:'The Creative Night', description:'Do something creative together tonight — paint, draw, cook something ambitious, build something. Create something together that did not exist before tonight.'},
  {intensity:'Playful', emoji:'🌹', title:'The Flower Moment', description:'Buy him flowers or a plant this week. Men are rarely given beautiful things. Watch his face when you hand them to him with no explanation.'},
  {intensity:'Intimate', emoji:'🛌', title:'The No Agenda Night', description:'Tonight you have no plan. No activity chosen, no movie queued, no restaurant booked. Just see what emerges between two people with no script and no obligations.'},
  {intensity:'Bold', emoji:'💋', title:'The Midday Surprise', description:'If possible, visit him at work or send something to him there this week. Show up in the middle of his ordinary day with something unexpected. The disruption is the gift.'},
  {intensity:'Playful', emoji:'🎤', title:'The Karaoke Night', description:'At home, pick songs, take turns performing for each other. The silliness is the point. Couples who can be ridiculous together have something rare.'},
  {intensity:'Intimate', emoji:'✉️', title:'The Future Letters', description:'Both write a letter to yourselves about your marriage — to be opened in five years. Seal them. Store them somewhere together. You are writing your future into existence.'},
  {intensity:'Daring', emoji:'🌍', title:'The Spontaneous Yes', description:'This week, say yes to the first thing he suggests — however unexpected. Go wherever he proposes without negotiation. Let him lead something completely.'},
  {intensity:'Playful', emoji:'🏠', title:'The Home Picnic', description:'Lay a blanket on your bedroom floor tonight. Pack a picnic properly — good food, good drinks. Eat on the floor like children. Change the setting, change the feeling.'},
  {intensity:'Intimate', emoji:'🕯️', title:'The Gratitude Night', description:'Tonight, both of you share five things you are grateful for in each other and in your marriage. Say them slowly. Receive them fully. Let it land.'},
  {intensity:'Bold', emoji:'👗', title:'The Lingerie Reveal', description:'Buy something beautiful for yourself this week. Wear it. Let him discover it. Say nothing about it. Let the moment speak entirely for itself.'},
  {intensity:'Playful', emoji:'🎲', title:'The Challenge List', description:'Make a list of ten experiences you both want to have together before the end of the year. Print it. Put it on the wall. Start ticking things off this week.'},
};

// ── DAILY SELECTION (seed by date so it changes daily) ────────
function getDailyItem(arr) {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const idx = seed % arr.length;
  return arr[idx];
}

// ── STATE ─────────────────────────────────────────────────────
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
      <div id="tip-done-btn" style="padding:8px 18px;border:1px solid rgba(201,169,110,.4);border-radius:20px;font-size:11px;letter-spacing:.15em;text-transform:uppercase;color:#c9a96e;cursor:pointer;font-family:'Georgia',serif;transition:all .3s">Mark Done</div>
    </div>
  `;
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
    </div>
  `;
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
