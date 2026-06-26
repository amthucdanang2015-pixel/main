#!/usr/bin/env python3
"""Generate Manh Nguyen Cong's CV as a polished, recruiter-ready 2-page PDF.

Frontend-focused full-stack developer. Mirrors the portfolio site
(https://nguyencongmanh.vercel.app/) in tone and structure.
"""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas
from reportlab.pdfbase.pdfmetrics import stringWidth

OUT = "public/Manh-Nguyen-CV.pdf"
SITE = "nguyencongmanh.vercel.app"

# palette
INK = HexColor("#0E1018")
SUB = HexColor("#4C5260")
MUT = HexColor("#8A91A0")
LINE = HexColor("#E3E5EA")
VIOLET = HexColor("#6D4DF2")
CYAN = HexColor("#0E8FA0")
SIDEBG = HexColor("#0E1018")
SIDEFG = HexColor("#D8DAE2")
SIDEMUT = HexColor("#8E93A4")
WHITE = HexColor("#FFFFFF")

W, H = A4
SIDE_W = 64 * mm
M = 11 * mm
PAD = 9 * mm
TOP = 18 * mm
BOTTOM = 14 * mm

c = canvas.Canvas(OUT, pagesize=A4)
c.setTitle("Manh Nguyen Cong — Full-Stack Developer (Frontend-focused)")
c.setAuthor("Manh Nguyen Cong")
c.setSubject("CV / Resume")


def wrap(text, font, size, max_w):
    out = []
    for para in text.split("\n"):
        words, cur = para.split(), ""
        for w in words:
            t = (cur + " " + w).strip()
            if stringWidth(t, font, size) <= max_w:
                cur = t
            else:
                if cur:
                    out.append(cur)
                cur = w
        out.append(cur)
    return out


def link_text(s, x, y, url, font, size, color):
    """Draw text and register a real clickable hyperlink over it."""
    c.setFillColor(color)
    c.setFont(font, size)
    c.drawString(x, y, s)
    tw = stringWidth(s, font, size)
    c.linkURL(url, (x, y - 1.0 * mm, x + tw, y + size * 0.9), relative=0, thickness=0)
    return tw


# ───────────────────────── shared content blocks ─────────────────────────
def main_heading(label, x, w, y):
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 10.5)
    c.drawString(x, y, label.upper())
    c.setFillColor(VIOLET)
    c.rect(x, y - 2.6 * mm, w, 0.7 * mm, fill=1, stroke=0)
    return y - 7.5 * mm


def job(title, org, period, loc, bullets, x, w, y):
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 9.8)
    c.drawString(x, y, org)
    c.setFillColor(MUT)
    c.setFont("Helvetica", 7.8)
    c.drawRightString(x + w, y, period)
    y -= 4.4 * mm
    c.setFillColor(VIOLET)
    c.setFont("Helvetica-Oblique", 8.6)
    c.drawString(x, y, title)
    if loc:
        tw = stringWidth(title, "Helvetica-Oblique", 8.6)
        c.setFillColor(MUT)
        c.setFont("Helvetica", 7.8)
        c.drawString(x + tw + 3 * mm, y, "· " + loc)
    y -= 4.9 * mm
    c.setFont("Helvetica", 8.3)
    for b in bullets:
        c.setFillColor(CYAN)
        c.drawString(x, y, "›")
        c.setFillColor(SUB)
        for ln in wrap(b, "Helvetica", 8.3, w - 4.5 * mm):
            c.drawString(x + 4.5 * mm, y, ln)
            y -= 4.3 * mm
        y -= 0.5 * mm
    return y - 2.6 * mm


def named_item(name, desc, x, w, y, link=None, link_url=None):
    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 8.6)
    c.drawString(x, y, name)
    nw = stringWidth(name + "   ", "Helvetica-Bold", 8.6)
    c.setFillColor(SUB)
    c.setFont("Helvetica", 8.3)
    first = True
    for ln in wrap(desc, "Helvetica", 8.3, w - nw):
        c.drawString(x + (nw if first else 0), y, ln)
        y -= 4.3 * mm
        first = False
    if link:
        url = link_url or ("https://" + link)
        link_text(link, x, y, url, "Helvetica-Oblique", 7.8, CYAN)
        y -= 4.3 * mm
    return y - 1.6 * mm


def app_line(name, phrase, url, x, w, y):
    """One line per app: bold clickable name + phrase + a visible 'App Store' link."""
    label = "App Store ↗"
    label_w = stringWidth(label, "Helvetica-Oblique", 7.8)
    tw = link_text(name, x, y, url, "Helvetica-Bold", 8.4, INK)
    c.setFillColor(SUB)
    c.setFont("Helvetica", 8.3)
    phrase_txt = " — " + phrase + "   "
    phrase_w = stringWidth(phrase_txt, "Helvetica", 8.3)
    if tw + phrase_w + label_w <= w:
        # everything on one line, link at the end
        c.drawString(x + tw, y, phrase_txt)
        link_text(label, x + tw + phrase_w, y, url, "Helvetica-Oblique", 7.8, CYAN)
        return y - 4.4 * mm - 1.0 * mm
    # phrase wraps under the name; link on its own line
    lines = wrap(" — " + phrase, "Helvetica", 8.3, w - tw) or [""]
    c.drawString(x + tw, y, lines[0])
    y -= 4.4 * mm
    for ln in lines[1:]:
        c.drawString(x, y, ln)
        y -= 4.4 * mm
    link_text(label, x, y, url, "Helvetica-Oblique", 7.8, CYAN)
    return y - 4.4 * mm - 1.0 * mm


APPS = [
    ("VocabTunes", "AI vocab as a TikTok-style swipe feed, scored with music — top-200 downloads of the day.",
     "https://apps.apple.com/us/app/vocabtunes-ai-word-builder/id6473722198"),
    ("King English Kids Anime", "AI anime videos & voiced flashcards for kids — top-15 downloads of the day.",
     "https://apps.apple.com/us/app/king-english-kids-anime/id6483942011"),
    ("WenLambo AI", "Snap a memecoin chart, get an AI Buy / Sell / Hold call with the reasoning.",
     "https://apps.apple.com/us/app/wenlambo-ai-meme-alt-scanner/id6749757392"),
    ("New Scan QR Code", "Instant full-screen QR scanner plus a custom generator — ad-free.",
     "https://apps.apple.com/us/app/new-scan-qr-code-no-ads/id6749230692"),
    ("Buzzed", "A do-or-drink party card game with themed deck packs and custom rules.",
     "https://apps.apple.com/us/app/buzzed-adult-party-game-cards/id6757947194"),
    ("YIKES!", "Modern truth-or-dare that reads each card out loud.",
     "https://apps.apple.com/us/app/yikes-truth-dare-party-game/id6758385148"),
    ("Rouly", "Party roulette — spin the wheel, it picks who's next.",
     "https://apps.apple.com/us/app/rouly-party-roulette-game/id6758606033"),
    ("Most Likely To", "Listen & vote — the app reads each question aloud and runs the countdown.",
     "https://apps.apple.com/us/app/most-likely-to-listen-vote/id6759958663"),
    ("Never Ever", "Never-have-I-ever, fully automated and hands-free.",
     "https://apps.apple.com/us/app/never-ever-listen-answer/id6759959558"),
    ("Dilemma", "Would-you-rather as a faster party game with a player wheel.",
     "https://apps.apple.com/us/app/dilemma-what-would-you-choose/id6761237352"),
]


# ============================ PAGE 1 ============================
def page1():
    # backgrounds
    c.setFillColor(SIDEBG)
    c.rect(0, 0, SIDE_W, H, fill=1, stroke=0)
    c.setFillColor(VIOLET)
    c.rect(0, H - 6 * mm, SIDE_W, 6 * mm, fill=1, stroke=0)

    # ---- sidebar ----
    sx, sw = PAD, SIDE_W - 2 * PAD
    sy = H - 20 * mm
    c.setFillColor(VIOLET)
    c.roundRect(sx, sy - 4 * mm, 13 * mm, 13 * mm, 3 * mm, fill=1, stroke=0)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 16)
    c.drawCentredString(sx + 6.5 * mm, sy + 1.2 * mm, "M")

    sy -= 16 * mm
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 17)
    c.drawString(sx, sy, "Manh Nguyen")
    sy -= 6.2 * mm
    c.drawString(sx, sy, "Cong")
    sy -= 6.4 * mm
    c.setFillColor(VIOLET)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(sx, sy, "FRONTEND-FOCUSED")
    sy -= 4.2 * mm
    c.drawString(sx, sy, "FULL-STACK DEVELOPER")

    def s_head(label, y):
        c.setFillColor(WHITE)
        c.setFont("Helvetica-Bold", 9.3)
        c.drawString(sx, y, label.upper())
        c.setStrokeColor(HexColor("#2A2E3B"))
        c.setLineWidth(0.6)
        c.line(sx, y - 2.2 * mm, sx + sw, y - 2.2 * mm)
        return y - 7.2 * mm

    def s_lines(lines, y, color=SIDEFG, gap=4.6):
        c.setFont("Helvetica", 8.2)
        for ln in lines:
            c.setFillColor(color)
            for seg in wrap(ln, "Helvetica", 8.2, sw):
                c.drawString(sx, y, seg)
                y -= gap * mm
            y -= 0.5 * mm
        return y

    sy -= 9 * mm
    sy = s_head("Contact", sy)
    sy = s_lines(["Da Nang, Vietnam"], sy)
    link_text("manhncse02926@gmail.com", sx, sy, "mailto:manhncse02926@gmail.com", "Helvetica", 8.2, SIDEFG)
    sy -= 5.1 * mm
    link_text("+84 372 489 192", sx, sy, "tel:+84372489192", "Helvetica", 8.2, SIDEFG)
    sy -= 5.6 * mm
    link_text(SITE, sx, sy, "https://" + SITE, "Helvetica-Bold", 8.2, VIOLET)
    sy -= 6 * mm

    sy = s_head("Core Stack", sy)
    core = [
        "React · Next.js · React Native",
        "TypeScript · JavaScript",
        "Tailwind · Framer Motion",
        "Node.js · GraphQL · REST",
        "AWS (Amplify, Lambda, DynamoDB,",
        "S3, SQS, Cognito, AppSync)",
        "Solidity · Hardhat · Ethers.js",
        "PostgreSQL · MongoDB · Elastic",
        "Git · CI/CD · App Store / Play",
    ]
    c.setFont("Helvetica", 8.2)
    for ln in core:
        c.setFillColor(CYAN)
        c.drawString(sx, sy, "▪")
        c.setFillColor(SIDEFG)
        c.drawString(sx + 3.6 * mm, sy, ln)
        sy -= 4.7 * mm

    sy -= 3 * mm
    sy = s_head("Highlights", sy)
    for s in [
        "10 live apps on the App Store",
        "~200K monthly users (WhaleStats)",
        "Shipped across VN · MY · US",
    ]:
        c.setFillColor(VIOLET)
        c.drawString(sx, sy, "›")
        c.setFillColor(SIDEFG)
        c.setFont("Helvetica", 8.2)
        for seg in wrap(s, "Helvetica", 8.2, sw - 4 * mm):
            c.drawString(sx + 3.6 * mm, sy, seg)
            sy -= 4.5 * mm
        sy -= 0.6 * mm

    sy -= 3 * mm
    sy = s_head("Education", sy)
    c.setFillColor(WHITE)
    c.setFont("Helvetica-Bold", 8.5)
    c.drawString(sx, sy, "FPT University")
    sy -= 4.4 * mm
    c.setFillColor(SIDEFG)
    c.setFont("Helvetica", 8.2)
    c.drawString(sx, sy, "BS, Software Engineering")
    sy -= 4.4 * mm
    c.setFillColor(SIDEMUT)
    c.drawString(sx, sy, "2011 — 2015")

    # ---- main ----
    mx = SIDE_W + M
    mw = W - mx - M
    my = H - 20 * mm

    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(mx, my, "Frontend engineer who ships the whole product")
    my -= 6.6 * mm
    c.setFillColor(SUB)
    c.setFont("Helvetica", 8.9)
    summary = ("Frontend-focused full-stack developer with a decade of shipping production software "
               "across Vietnam, Malaysia and the US. I lead the frontend end-to-end across React, "
               "Next.js and React Native, and step into the backend — Node.js, GraphQL, AWS and "
               "Solidity — whenever a product needs it. 10 apps live on the App Store; co-built a "
               "platform that scaled to ~200K monthly users. I take a design and turn it into a "
               "fast, pixel-accurate interface, then carry it through to release.")
    for ln in wrap(summary, "Helvetica", 8.9, mw):
        c.drawString(mx, my, ln)
        my -= 4.5 * mm

    my -= 4 * mm
    my = main_heading("Experience", mx, mw, my)

    my = job(
        "Frontend-Focused Full-Stack Developer",
        "Product Studio — with Nam Nguyen",
        "2015 — Present", "Remote · Da Nang",
        [
            "Engineering partner on a serial product team where Nam leads product and I lead the frontend — building and shipping mobile apps, web platforms and web3 products from zero to launch.",
            "Owned the client side across React, Next.js and React Native: turned designs into fast, pixel-accurate, animated interfaces and ran the full iOS/Android release pipeline.",
            "Stepped into the backend when needed — Node.js, GraphQL, AWS Lambda/DynamoDB/S3 — and integrated Solidity smart contracts for the web3 products.",
            "Co-built WhaleStats (crypto whale analytics), scaling it to ~200K monthly users.",
            "Joined Cardpool (US gift-card exchange) remotely with the team in 2019–20: maintained and extended a large multi-service system in Angular, Ruby, Node.js and AWS microservices, with code review and Agile delivery.",
        ],
        mx, mw, my,
    )

    my = job(
        "Software Engineer",
        "Finexus Software", "2016 — 2018", "Kuala Lumpur, Malaysia",
        [
            "Built banking products integrating with data-processor services and digital wallets for secure, efficient transactions.",
            "Worked directly with bank customers on feature and correction requests; mentored juniors and interns on the system.",
        ],
        mx, mw, my,
    )

    my = job(
        "Software Engineer",
        "FPT Software", "2015 — 2016", "Da Nang, VN · onsite Japan",
        [
            "Spent ~4 months onsite in Japan supporting the client team directly.",
            "Built features with Spring MVC and a Java Swing front-end; managed the project's Oracle database.",
        ],
        mx, mw, my,
    )

    # footer
    c.setFillColor(MUT)
    c.setFont("Helvetica", 7.2)
    c.drawString(mx, BOTTOM, "Manh Nguyen Cong — page 1 / 2")
    c.setFillColor(VIOLET)
    c.drawRightString(mx + mw, BOTTOM, SITE)


# ============================ PAGE 2 ============================
def page2():
    # slim accent rail
    c.setFillColor(VIOLET)
    c.rect(0, 0, 4 * mm, H, fill=1, stroke=0)

    x = 16 * mm
    w = W - x - M
    y = H - 20 * mm

    c.setFillColor(INK)
    c.setFont("Helvetica-Bold", 13)
    c.drawString(x, y, "Selected work")
    y -= 5 * mm
    c.setFillColor(MUT)
    c.setFont("Helvetica", 8.4)
    c.drawString(x, y, "Live demos, screenshots and full case studies at " + SITE)
    y -= 8 * mm

    y = main_heading("Web Platforms (live)", x, w, y)
    y = named_item("Moreso — web3 luxury fashion IP",
                   "Frontend lead. Turned the founders' and artists' designs into shipped features; built the smart-contract integration and the viral 'reveal' feature that drove its biggest marketing moment.",
                   x, w, y, link="moreso.io", link_url="https://www.moreso.io/")
    y = named_item("OpenCTO — crypto-powered ads on X",
                   "Built the frontend — campaign flows, wallet connection and the marketing site — for the first crypto-powered advertising platform on X (Twitter).",
                   x, w, y, link="opencto.vercel.app", link_url="https://opencto.vercel.app/")
    y = named_item("AgentCTO — community AI agent launchpad",
                   "Built the interactive launchpad frontend and on-chain integration: daily AI brainstorm, community vote & crowdfund, fair token launch and airdrops.",
                   x, w, y, link="agentcto.vercel.app", link_url="https://agentcto-fun-nam-nguyens-projects-2dee7f8f.vercel.app/")
    y = named_item("GroupPump — coordinated launch campaigns",
                   "Built the campaign-management frontend for exploring, creating and running community token-launch campaigns.",
                   x, w, y, link="groupumpfun.vercel.app", link_url="https://groupumpfun.vercel.app/")

    y -= 1 * mm
    y = main_heading("Mobile — App Store (10 live)", x, w, y)
    for nm, phrase, url in APPS:
        y = app_line(nm, phrase, url, x, w, y)
    y -= 2.5 * mm

    y = main_heading("Earlier Products", x, w, y)
    for nm, desc in [
        ("WhaleStats", "Crypto whale-wallet analytics — co-built to ~200K monthly users; once a top-10 crypto voice on Twitter."),
        ("KoalaChat", "Location-based chat that turns cafes, bars and campuses into rooms. React Native + AWS AppSync."),
        ("Oqeo", "Women-only ride-hailing (driver and rider both women). React Native + Apollo GraphQL + MongoDB."),
        ("BaeCafe · ChainAlerts · KryptKitties", "NFT collections and an NFT floor-price alert platform (Email/Telegram/Slack/Line). React + Solidity + Node.js."),
    ]:
        y = named_item(nm, desc, x, w, y)

    y -= 1 * mm
    y = main_heading("References", x, w, y)
    for nm, rel, email, phone in [
        ("Nam Nguyen Van", "Product Leader & Co-founder (2016–Present)", "mailnamnv@gmail.com", "+84 979 734 061"),
        ("Ha Thanh Hung", "Engineering colleague (2017–2023)", "thanhhung071@gmail.com", "+84 932 778 939"),
    ]:
        c.setFillColor(INK)
        c.setFont("Helvetica-Bold", 8.6)
        c.drawString(x, y, nm)
        c.setFillColor(MUT)
        c.setFont("Helvetica", 8.0)
        c.drawString(x + stringWidth(nm + "   ", "Helvetica-Bold", 8.6), y, rel)
        y -= 4.3 * mm
        ew = link_text(email, x, y, "mailto:" + email, "Helvetica", 8.0, CYAN)
        c.setFillColor(MUT)
        c.setFont("Helvetica", 8.0)
        c.drawString(x + ew, y, "  ·  " + phone)
        y -= 5.8 * mm

    c.setFillColor(MUT)
    c.setFont("Helvetica", 7.2)
    c.drawString(x, BOTTOM, "Manh Nguyen Cong — page 2 / 2")
    c.setFillColor(VIOLET)
    c.drawRightString(x + w, BOTTOM, SITE)


page1()
c.showPage()
page2()
c.showPage()
c.save()
print("wrote", OUT)
