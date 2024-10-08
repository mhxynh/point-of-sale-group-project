### Introduction:

The project involves developing a POS system user interface and an ECommerce website that integrate with it. The POS system is designed to be used by cashiers or managers to manage sales, inventory. And users can ultilize the website to pick orders, see the inventory amount, and place orders which they are being processed by the POS system.

### Features

#### Point of Sale System:

**- User Interface:** Create a simple UI for the cashier/manager to be able to interact with the POS system.

**- Item Management:** Have the ability to create, delete, modify the items in the inventory.

**- Sales Reporting:** Able to view the sales report, track the items being sold overtime and manage cash flow.

**- Customization:** Business owners able to customize the system however they want, logo, themes, etc...

### Customer Facing Store Website:

**- Item Display:** Displays all the available items for the customers that they are able to be ordered.

**- Placement order:** Types of order, online for pickup, etc...

**- Order Integration:** Things that being place ordered on the website go into the POS system.

### Extremely Stretchness Goalmericas

**- Stripe Integration:** The feature allows the use of credit/debit cards transaction on the POS system and website

## Running the Project Locally

#### Requirements:

-   Node.js

-   PostgreSQL

-   psql (CLI tool for Postgres)

#### Installing Dependencies

-   `npm i`

#### Setting up .env

Copy `sample.env` into a new file `.env`

Replace `PGUSER` and `PGPASSWORD` values with your Postgres username and password, this is for the Postgres Database

Replace `BOSS_USER` and `BOSS_PASSWORD` values with your POS username and password, this will be the first account you will log in to the POS

Replace `DBNAME` value with your DB name, or keep it as `atspos` for default

### Starting the Server

**Setup server:** `npm run setup:dev`

**Alternatively, run setup server with demo items:** `npm run setup-demo:dev`

**Start server:** `npm run start:dev`
