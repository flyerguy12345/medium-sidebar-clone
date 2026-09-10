// Full body content for articles that have a detail page implemented.
// Keyed by STORIES[].id from src/data/searchIndex.js. Articles without an
// entry here fall back to showing just their excerpt on the detail page.
export const ARTICLE_CONTENT = {
  'openclaw-2-0': [
    {
      heading: null,
      paragraphs: [
        "OpenClaw's new installer starts by going through your own computer looking for AI access you already have.",
        'A signed-in Claude or ChatGPT account. An API key sitting in your environment. An Ollama or LM Studio model you downloaded two months ago and forgot about.',
        'You pick one, it sends a test message to check the thing actually answers, and only then does it save the model and the credential. Almost everything else, channels and skills and automation policy, has been pushed out of first-run setup entirely, on the theory that you can finish configuring the agent by talking to it.',
        'That change on its own would have been a normal OpenClaw release. What landed at the end of August is version 2026.8.1, which the project is calling OpenClaw 2.0. It was built by 933 contributors, 569 of them contributing for the first time, across more than 16,000 merged pull requests. That is roughly half of every pull request the project has ever merged, shipped in a single release after nearly seven weeks of silence from a team that had previously put out 106 releases in 230 days.',
        'OpenClaw is a free, self-hosted agent that runs on hardware you control and does not disappear when you close the tab. It wakes up on a schedule, reaches you through WhatsApp, Telegram, Discord, Slack, Signal or iMessage, and touches your files, inbox and calendar if you grant it permission. This release matters because it changes the defaults you live with daily rather than adding one more feature to an already long list.',
        'Community manager Hannes Rudolph titled the announcement post "OpenClaw 2.0, Accidentally," which is unusually candid for a launch blog. The plan was small: simplify installation, rebuild the browser app. Doing either properly meant touching memory, models, plugins, messaging, storage and security, so the team ended up doing all of it at once.',
        'Here is what actually changed, roughly in order of how much you will notice it.',
      ],
    },
    {
      heading: '1. Setup Stops Interrogating You',
      paragraphs: [
        'The old first run assumed you would architect the Gateway before you ever spoke to the agent. The new one assumes you already pay for AI somewhere and would like to use it.',
        "Guided setup detects verified Codex, ChatGPT or Claude CLI sign-ins, accepts an API key, runs a provider's own login, or finds installed Ollama and LM Studio models. It proves the specific choice works before saving it.",
      ],
      list: [
        'Fresh OpenAI setups default to GPT-5.6.',
        'On Mac, an app opened from Downloads offers to move itself into Applications so updates and launch-at-login behave.',
        'On Linux, the installer makes the command available in new shells without asking you to edit startup files.',
        'Mobile setup now leads with QR and setup-code pairing, which is what most people were hunting for anyway.',
      ],
      trailingParagraphs: [
        'There is also a staged import path from Claude Code, Codex and Hermes, where OpenClaw repairs the model route in a temporary area before making the new setup live.',
        'For most people this is the difference between an evening of config files and fifteen minutes. It also tells you who the project is aiming at now.',
        'Worth noting: reports of setups still needing manual fixes showed up within a day of launch, so detection is better, not perfect.',
      ],
    },
    {
      heading: '2. The Browser App Is Now the Product',
      paragraphs: [
        'The Control UI was rebuilt around conversation. The separate Overview page is gone, sessions sit in a sidebar, and the one you are working in is in the middle.',
      ],
      list: [
        'A file editor for existing text and Markdown files, which stops with a conflict rather than overwriting if the agent edits the same file while you are typing',
        'A git-backed Changes panel with branch commits, working-tree edits, pull request status and CI summaries',
        'A dockable browser panel that can navigate, click, type, scroll, inspect elements and let you annotate a screenshot before attaching it to the conversation',
        'A full-screen web terminal, which can now be shared across viewers in the same session',
        'Approval requests that appear inside the conversation that triggered them, with a rolling history',
      ],
      trailingParagraphs: [
        'The limits are stated plainly in the release notes. The file editor cannot create or delete files. Changes is read-only. Create PR hands off to GitHub instead of submitting from inside OpenClaw.',
        'There is a small addition called /btw that opens a separate side conversation, so you can ask a quick question without derailing a long-running task.',
        'On speed, the project reports its test harness startup dropping from roughly 1.6 seconds to 575 milliseconds, measured against a mocked Gateway with simulated latency.',
      ],
    },
    {
      heading: '3. Sessions Became Places You Can Leave and Come Back To',
      paragraphs: [
        'Sessions and transcripts moved into SQLite. That is the least glamorous change here and probably the most consequential.',
        'It brings conversation search, durable progress cards that survive reloads across web, macOS, iOS and Android, and persistence across idle periods and day boundaries by default.',
        'The cost is real, though. Downgrading is messy, and any session created after the migration will not appear in an older version. Take a verified backup before you upgrade anything you care about.',
      ],
    },
    {
      heading: '4. Forking a Conversation to Try Two Approaches',
      paragraphs: [
        'You can now rewind or fork from a saved user message, switch between retained branches, and keep the earlier paths available.',
        'The important caveat: rewinding changes chat context. It does not undo file writes or other tool effects. The conversation goes back. The world does not.',
      ],
    },
    {
      heading: '5. One Agent, Several People',
      paragraphs: [
        'Shared cloud sessions let an owner or administrator decide whether someone else may read, suggest changes, work in a draft, or participate directly, with creator attribution, presence, and typing cues.',
        'The ceiling is documented and worth reading twice: these are collaboration controls, not tenant isolation and not a security boundary. One Gateway is one trust domain.',
      ],
    },
    {
      heading: '6. Memory That Consolidates Itself, and Skills It Writes on Its Own',
      paragraphs: [
        'Grounded dreaming is on by default: a background process consolidates recent activity into long-term memory, promoting only material it can trace back to a source.',
        'Automatic self-learning captures reusable lessons and applies scanner-approved skills automatically, while a Skill Workshop deliberately holds at most three pending proposals so it stays reviewable.',
        'Memory ownership tools let you inspect which sessions fed memory, exclude sources, and delete derived memories while leaving original transcripts intact.',
      ],
    },
    {
      heading: '7. Security Is Where the Defaults Really Moved',
      paragraphs: ['This is a security release, which tracks with what an agent holding your files, browser sessions and messaging accounts has become.'],
      list: [
        'Every session runs in an explicit permission mode, anchored to its recorded workspace',
        'Credentials can be requested through a masked prompt so the value never enters chat history',
        'An optional 1Password broker adds per-secret approval and a value-free audit trail',
        'Plugin trust review shows capabilities, source, version and artifacts before install',
        'Automations get approved once for an exact operation, invalidated the moment the job changes',
      ],
      trailingParagraphs: [
        'Critics are not entirely convinced: Secret Store values are not encrypted at rest, and the new sandboxing is off by default. Easier installation plus security you have to opt into is a genuine tension.',
      ],
    },
    {
      heading: '8. The Rest of the List, Briefly',
      list: [
        'Swarm and Fleet, experimental parallel-subagent and multi-cell features, live behind Labs',
        'Interactive widgets render in chat, pin to session dashboards, and export as images',
        'Local models moved to a managed llama-server with a 64K default context',
        'Cross-device support covers QR pairing, a Linux desktop companion, and a Wear OS companion',
        'A Telegram Mini App, Slack Enterprise Grid support, and Discord voice rooms',
      ],
    },
    {
      heading: 'Upgrading',
      paragraphs: [
        'The breaking-change list is short for a release this size: the OpenProse plugin is gone, codex/* model references migrate to openai/*, and five legacy plugin SDK subpaths are deprecated.',
        'Back up first, update, then run openclaw doctor --fix. Reaction to the upgrade has been genuinely mixed, so stage it if you run anything scheduled and important.',
      ],
    },
    {
      heading: 'Where It Sits Next to Hermes and Grok Bot',
      paragraphs: [
        'Hermes Agent is the closest comparison: also MIT-licensed and self-hosted, built around procedural memory and safer defaults from the start.',
        'Grok Bot is a closed cloud product from xAI with the best onboarding of the three, but it requires a subscription starting around $200 per month and locks you to their model.',
        'The honest summary: Grok Bot is easiest, Hermes is the most self-improving, and OpenClaw gives you the most control and the widest set of places it can talk to you.',
      ],
    },
    {
      heading: 'Should You Update?',
      paragraphs: [
        'If you are installing fresh, yes. If you live in the Control UI, yes. If you want a family or small team sharing one agent, this is the first version where that works properly. If you run a cron-heavy production Gateway, test it somewhere else first.',
      ],
    },
  ],
}
