# CMRF Donation System - Staff Guide

This document explains how the new donation infrastructure works and what the administrative team needs to know to operate it securely.

## 1. System Overview

The `/donate` page now features three distinct donation channels to maximize conversion globally and locally.

1. **International (Donorbox):** Optimized for USD, EUR, GBP. Handles recurring donations and Apple/Google Pay globally.
2. **Ghana (Paystack):** Optimized for GHS. Handles local mobile money (MTN MoMo, Vodafone Cash) and domestic bank cards securely.
3. **Direct Transfer:** Static information for large donors who prefer manual wire transfers or direct-to-agent mobile money.

---

## 2. Managing Donorbox (International)

### How it Works
The website embeds a secure Donorbox form. Donorbox is configured to deposit funds directly into the organization's linked US/International bank account via Stripe.

### Actions Needed
- **Campaign Slug:** Ensure the iframe slug in `src/components/donate/DonorboxEmbed.tsx` (currently `cmrf-ghana`) matches your actual active Donorbox campaign URL.
- **Reporting:** Login to your Donorbox Dashboard to view international donors, schedule exports, and issue tax receipts (501c3).

---

## 3. Managing Paystack (Local Ghana)

### How it Works
We integrated a "headless" Paystack flow. Donors select their amount, enter their email, and the system securely hands off the transaction to Paystack's official popup. CMRF’s servers **never touch or store card data**.

### Actions Needed
- **API Keys:** The system requires the public key to run. Ensure your IT manager has added `NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_your_key_here` to the production environment variables (e.g., in Vercel or your hosting provider).
- **Payouts:** Paystack automatically settles GHS funds to the linked Corporate Bank Account in Ghana according to their settlement schedule (usually T+1).
- **Dashboard:** Go to `dashboard.paystack.com` to view local transactions, issue refunds, and configure automated email receipts.

---

## 4. Direct Transfers (Manual)

### How it works
This section displays static bank routing information.

### Actions Needed
- **Verifying Funds:** When a donor emails `donations@cmrfgh.com` stating they made a transfer, staff must manually verify the deposit in the corporate bank portal before issuing a receipt.
- **Updating Info:** If the bank account or MoMo number changes, a developer must update the `DirectTransferInfo.tsx` file.

---

## 5. Security & Privacy Addendum

- **PCI Compliance:** Both Donorbox and Paystack are robust, PCI-compliant gateways. Our website safely routes data to them; we do not process the actual cards.
- **Data Privacy:** Do not ask developers to "save credit cards" in our own database. Always rely on the gateways for tokenized, recurring billing.
- **SSL:** Ensure the website ALWAYS loads over `https://`. (Next.js/Vercel handles this automatically).
