"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const StripeCharges = require("./Jsons/Stripe/charges.json");
const StripeCustomers = require("./Jsons/Stripe/customers.json");
const StripeInvoices = require("./Jsons/Stripe/invoices.json");
const StripeCheckouts = require("./Jsons/Stripe/checkouts.json");
const StripeBillingPortals = require("./Jsons/Stripe/billingPortals.json");
const StripePayments = require("./Jsons/Stripe/payments.json");
class StripeRepository {
    constructor(charges = StripeCharges, customers = StripeCustomers, invoices = StripeInvoices, checkouts = StripeCheckouts, billingPortals = StripeBillingPortals, payments = StripePayments) {
        this.charges = charges;
        this.customers = customers;
        this.invoices = invoices;
        this.checkouts = checkouts;
        this.billingPortals = billingPortals;
        this.payments = payments;
    }
    saveBillingPortalCheckoutWebhookEventLog(event) {
        throw new Error("Method not implemented.");
    }
    saveChargeWebhookEventLog(event) {
        try {
            this.charges.push(event);
            fs.writeFileSync("./src/Repositories/Jsons/Stripe/charges.json", JSON.stringify(this.charges, null, 4), "utf-8");
        }
        catch (error) {
            throw new Error(error);
        }
    }
    saveCustomerWebhookEventLog(event) {
        try {
            this.customers.push(event);
            fs.writeFileSync("./src/Repositories/Jsons/Stripe/customers.json", JSON.stringify(this.charges, null, 4), "utf-8");
        }
        catch (error) {
            throw new Error(error);
        }
    }
    saveInvoiceWebhookEventLog(event) {
        try {
            this.invoices.push(event);
            fs.writeFileSync("./src/Repositories/Jsons/Stripe/invoices.json", JSON.stringify(this.charges, null, 4), "utf-8");
        }
        catch (error) {
            throw new Error(error);
        }
    }
    savePaymentWebhookEventLog(event) {
        try {
            this.payments.push(event);
            fs.writeFileSync("./src/Repositories/Jsons/Stripe/payments.json", JSON.stringify(this.charges, null, 4), "utf-8");
        }
        catch (error) {
            throw new Error(error);
        }
    }
    saveCheckoutSessionWebhookEventLog(event) {
        try {
            this.checkouts.push(event);
            fs.writeFileSync("./src/Repositories/Jsons/Stripe/checkouts.json", JSON.stringify(this.charges, null, 4), "utf-8");
        }
        catch (error) {
            throw new Error(error);
        }
    }
    saveBillingPortalSessionWebhookEventLog(event) {
        try {
            this.billingPortals.push(event);
            fs.writeFileSync("./src/Repositories/Jsons/Stripe/billingPortals.json", JSON.stringify(this.charges, null, 4), "utf-8");
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.default = StripeRepository;
//# sourceMappingURL=Stripe.repository.js.map