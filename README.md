# Shopify Backdoor Management Tool

This tool is developed for **Shopify developers and freelancers** who face non-payment or fraud after completing store development projects for international clients. It acts as a backdoor control panel to **remotely deactivate or activate** a client’s website after the project is delivered, offering protection against scams and unfair practices.

## 🔒 Purpose

After completing a Shopify store, many developers share full access with clients. Unfortunately, in some cases, clients take the site and disappear without paying. This tool provides a way to retain some level of control by embedding a script in the Shopify theme. You can then **remotely deactivate the site** by toggling a status from this control panel.

---

## 📋 Shopify Backdoor Website Instruction Guideline

### 1. Add a New Project
Click the **"Add New Project"** button and fill in the following details:
- Project Name (optional)
- Client Name
- Developer Name
- Status (Active/Inactive)

### 2. Submit Your Project
Click **Submit** to save the project.

### 3. Copy the Code
Find your newly added project in the list and **copy the generated script code**.

### 4. Embed in Shopify
Paste the script code just above the closing `</body>` tag in the **`theme.liquid`** file of the client's Shopify store.

### 5. Manage Website Status
Use the **Active / Inactive** buttons to control the visibility or availability of the website in real time.

---

## 🚀 Features

- 🧑‍💻 Developer-focused dashboard
- 🔐 Login & logout functionality
- 🎯 Project-based script generation
- 🧩 Real-time status toggling (active/inactive)
- ⚙️ Script integration into Shopify's `theme.liquid`
- 🛡️ Backend protection for listed projects

---

## 🛠 Tech Stack

- **Frontend**: React.js + TailwindCSS
- **Backend**: Node.js + Express.js
- **Database**: MongoDB
- **Auth**: LocalStorage (Demo Use Only)

---

## 📌 Current Version

`v1.0.1-BETA`

---

## ⚠️ Important Note

> This tool is designed for developer protection and educational purposes only. Always comply with client contracts, platform policies, and local laws. Misuse of this tool can lead to legal consequences.

---
