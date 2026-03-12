Below is a prompt you can copy and give to another AI agent. Edit any details in ALL CAPS before using it.

---

You are a senior full‑stack developer and nonprofit tech consultant. Your task is to design and implement a complete donation infrastructure for my NGO’s website: **cmrfgh.com**.

## CONTEXT ABOUT THE NGO

- Organization: CMRFGH (CHANGE THIS TO FULL LEGAL NAME)
- Type: Non-governmental, non-profit organization
- Country of registration: GHANA (EDIT IF DIFFERENT)
- Website: https://cmrfgh.com
- Primary audience:
  - Local Ghanaian donors (individuals and corporates)
  - International donors (US, EU, UK, etc.)
- Currencies:
  - Local: GHS (Ghanaian Cedi)
  - International: USD, EUR, GBP (PRIORITIZE THESE, MODIFY AS NEEDED)
- Main goals:
  1. Make it very easy for anyone (local + international) to donate.
  2. Support one-time and monthly recurring donations.
  3. Automatically send donation receipts/emails.
  4. Keep fees as low as possible while maintaining reliability and trust.
  5. Ensure compliance, security, and basic analytics.

## HIGH-LEVEL REQUIREMENTS

Implement the following donation methods:

1. Donorbox (primary international online donation system)
2. A regional payment gateway for Africa/Ghana (use **Paystack** or **Flutterwave**, and optionally **Hubtel** if it adds value)
3. Direct bank transfer / wire / mobile money account details on the site
4. Optional: Suggest and integrate **PayPal** only if it adds clear value beyond Donorbox.

Provide:

- Technical implementation (code, configuration, and embedding instructions)
- UX/UI suggestions and copy for donation pages/sections
- Security, compliance, and best-practice recommendations
- Simple documentation I can hand over to a non-technical team member

---

## 1. DONORBOX IMPLEMENTATION (PRIMARY)

### 1.1. Account & setup (Describe steps in detail)

Assume I have not set up Donorbox yet. Provide me with a clear checklist and step-by-step instructions to:

1. Create a Donorbox account and set it up for a **registered nonprofit**:
   - What information and documents I need (charity registration, bank details, etc.).
   - How to enable reduced nonprofit transaction fees (if available).
   - How to configure organization profile (logo, description, contact info).

2. Configure payment methods:
   - Make sure we can accept:
     - Credit/Debit cards (Visa, Mastercard, etc.)
     - Google Pay / Apple Pay (if available in Donorbox)
     - Bank transfers via Donorbox where available
   - Explain which payment processors Donorbox supports by default and what I need to do to enable them.

3. Configure currencies:
   - Set default currency to GHS or USD (recommend which is best and explain why).
   - Enable multi-currency options for donors (USD, EUR, GBP at minimum).

4. Donation form settings:
   - Enable **one-time** and **monthly recurring** donations (optionally yearly).
   - Suggested amounts for:
     - Local donors (in GHS)
     - International donors (in USD/EUR/GBP)
   - Allow custom donation amounts.
   - Enable donor-covered fees if possible.

5. Receipts & donor communication:
   - Configure automatic email receipts.
   - Configure a branded receipt template:
     - NGO logo
     - NGO legal name
     - Registration number
     - Contact email
     - Thank-you message text (you write a good default template for me).
   - Configure post-donation thank-you page text.

Output this section as a clear, numbered checklist.

---

### 1.2. Donorbox form integration into cmrfgh.com

Assume the current site is built with: **[PLEASE ASSUME/DETECT COMMON STACK LIKE WORDPRESS, WIX, CUSTOM HTML, OR ASK ME TO FILL THIS IN]**. For the purpose of your answer, show solutions for:

- WordPress
- A generic custom HTML/CSS/JS site

Tasks:

1. Show me how to:
   - Create a **main general donation form** in Donorbox.
   - Get the embed code and/or popup code.

2. Provide:
   - HTML snippets to embed the Donorbox form inside a dedicated **/donate** page.
   - A **“Donate” button** code snippet for the main navigation that:
     - Scrolls/jumps to the embedded form on the /donate page, OR
     - Opens a Donorbox popup/modal (if supported).

3. Provide:
   - Suggested UX layout for the /donate page:
     - Short mission statement (you write 2–3 good example paragraphs).
     - Impact examples (3–5 bullet points with sample amounts and what they fund).
     - Clear Call To Action above the fold.
     - Trust markers (registration number, brief governance info, maybe logos of partners if applicable).

4. Make sure:
   - The donor experience is mobile-first and responsive.
   - There is a clear distinction in copy for local vs. international donors if needed.

Output all code in clean, copy-pasteable form, with comments.

---

## 2. AFRICAN/GHANA PAYMENT GATEWAY (PAYSTACK / FLUTTERWAVE / HUBTEL)

Goal: Make it easy for local donors to pay via **Mobile Money (MTN, Vodafone, AirtelTigo)** and local cards, and optionally bank transfers.

### 2.1. Recommendation

- Compare **Paystack** vs. **Flutterwave** vs. **Hubtel** for:
  - Ghana coverage (cards, mobile money, bank).
  - Fees.
  - Ease of integration with a typical NGO website.
  - Recurring payments support.
- Give a clear recommendation: which ONE should be primary for cmrfgh.com, and whether adding a second one is worth it.

### 2.2. Setup & configuration checklist

For the recommended provider (call it PRIMARY_GATEWAY):

1. Step-by-step to create a business/NGO account:
   - Required documents (registrations, IDs, bank statements).
   - Verification steps.
2. How to:
   - Configure default currency (GHS).
   - Link NGO bank account(s) and set payout schedule.
   - Enable Mobile Money and card payments.
3. Settings for:
   - Transaction notifications (email, dashboard, webhooks).
   - Fraud protection and risk settings (with recommended defaults).

Output as a clear checklist.

---

### 2.3. Integration into cmrfgh.com

Assume again:
- WordPress scenario
- Custom HTML site scenario

Tasks:

1. Provide code examples for:
   - A “Local Donation (Ghana)” button that opens the PRIMARY_GATEWAY checkout (Pop-up or redirect).
   - Handling donation amounts:
     - Predefined amounts (e.g., 50, 100, 200 GHS).
     - Custom amount field.
2. Explain how to:
   - Tag or label payments as “Donation” in the gateway dashboard.
   - Pass metadata fields like:
     - Donor name
     - Donor email
     - Campaign (e.g., “General Fund”)

3. If the gateway supports **recurring payments / subscriptions**:
   - Explain briefly how to enable and configure this for monthly giving.
   - If recurring is not well supported, suggest the best workaround.

4. Show:
   - Copy-pasteable code examples (HTML + JS) for integrating a sample donation page section for local donors using PRIMARY_GATEWAY.

---

## 3. DIRECT BANK TRANSFER & MOBILE MONEY DETAILS

Goal: Provide an option for large donors or traditional donors to give via bank transfer or direct Mobile Money, and display this clearly but securely.

### 3.1. Information layout

Design content for a section on the /donate page called **“Bank Transfer & Mobile Money Donations”** that includes:

- Sample labels and structure (you write the content; I’ll later update the actual numbers):

  1. Bank Transfer (Local – Ghana)
     - Bank Name:
     - Account Name:
     - Account Number:
     - Branch:
     - SWIFT/BIC (if applicable):
  2. International Bank Transfer (Foreign Currency)
     - Bank Name:
     - Account Name:
     - IBAN:
     - SWIFT/BIC:
     - Bank Address:
  3. Mobile Money (Ghana)
     - MTN MoMo Number:
     - Vodafone Cash Number:
     - AirtelTigo Money Number:
     - Account Name/Reference Format:

- Write clear instructions for donors:
  - To include a specific reference format (e.g., “Donation – YourName – Purpose”).
  - To email a copy of their transfer slip to a given address for a receipt (e.g., donations@cmrfgh.com).
  - If possible, provide a short template acknowledgement text.

### 3.2. Presentation & UI

- Suggest a clean, trustworthy design/format:
  - Collapsible panels or a simple card layout.
  - Emphasis on clarity and avoiding overwhelming the donor.

---

## 4. OPTIONAL: PAYPAL (ONLY IF IT ADDS VALUE)

- Briefly evaluate whether adding **PayPal** on top of Donorbox is still useful:
  - Note: Donorbox can already use PayPal as a processor in many cases.
- If you recommend a separate visible “Donate with PayPal” button:
  1. Provide a short setup checklist for a PayPal Business/Charity account.
  2. Provide HTML code for a simple PayPal button integrating with cmrfgh.com.

Keep this section concise; only include if you think it’s clearly beneficial.

---

## 5. INFORMATION ARCHITECTURE & UX SUMMARY

Provide a concise sitemap / structure for how donations should appear on cmrfgh.com:

1. A dedicated **/donate** page serving as the main hub.
2. Header navigation **“Donate”** link pointing to /donate.
3. Recommended sections on the /donate page:
   - Hero section with brief pitch + main “Donate Now” button (scrolls to Donorbox form).
   - Donorbox embedded form (for international + card donors).
   - Section for **Local (Ghana) Donations via Mobile Money & Cards** using PRIMARY_GATEWAY.
   - Section for **Bank Transfer & Mobile Money Direct Details**.
   - Short **FAQ** (3–5 Q&As you will draft) about:
     - Is my donation tax-deductible?
     - How are funds used?
     - Is my payment secure?
     - Can I give monthly?
   - Contact info for donation-related questions.

Provide suggested copy/text for each section (short, clear, professional, and trust-building).

---

## 6. SECURITY, COMPLIANCE, AND BEST PRACTICES

Provide concise recommendations on:

1. SSL/HTTPS requirements and how to verify the site is secure.
2. Basic GDPR/data protection and privacy considerations for donors.
3. Minimizing PCI scope by using hosted fields / redirect flows instead of handling card data directly.
4. Storing donor data:
   - What can be safely stored (name, email, amount, etc.).
   - What should **never** be stored (full card numbers, CVV, etc.).
5. Backup and access control:
   - Who should have access to donation dashboards.
   - How to use 2FA wherever possible.

---

## 7. SIMPLE HANDOFF DOCUMENTATION

Finally, produce a short “handover” document (1–2 pages of text) that I can give to a non-technical staff member that:

1. Explains:
   - Where each type of donation is processed:
     - Donorbox
     - PRIMARY_GATEWAY (e.g., Paystack/Flutterwave)
     - Bank transfers / MoMo
   - How to log into each system.
2. Explains:
   - How to export basic donation reports.
   - How to look up a specific donor’s transaction.
   - How to resend a receipt if possible (or what to do if not).

Write this in simple language, step-by-step.

---

Deliver all outputs in a clearly structured format with headings, code blocks, and checklists so I can easily copy, paste, and act on them.