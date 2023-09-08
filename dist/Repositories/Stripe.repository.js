"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const StripeCharges = require("./Jsons/Stripe/charges.json");
const StripeCustomers = require("./Jsons/Stripe/customers.json");
const StripeInvoices = require("./Jsons/Stripe/invoices.json");
class StripeRepository {
    constructor(charges = StripeCharges, customers = StripeCustomers, invoices = StripeInvoices) {
        this.charges = charges;
        this.customers = customers;
        this.invoices = invoices;
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
            this.charges.push(event);
            fs.writeFileSync("./src/Repositories/Jsons/Stripe/customers.json", JSON.stringify(this.charges, null, 4), "utf-8");
        }
        catch (error) {
            throw new Error(error);
        }
    }
    saveInvoiceWebhookEventLog(event) {
        try {
            this.charges.push(event);
            fs.writeFileSync("./src/Repositories/Jsons/Stripe/invoices.json", JSON.stringify(this.charges, null, 4), "utf-8");
        }
        catch (error) {
            throw new Error(error);
        }
    }
    savePaymentWebhookEventLog(event) {
        try {
            this.charges.push(event);
            fs.writeFileSync("./src/Repositories/Jsons/Stripe/payments.json", JSON.stringify(this.charges, null, 4), "utf-8");
        }
        catch (error) {
            throw new Error(error);
        }
    }
    saveCheckoutSessionWebhookEventLog(event) {
        try {
            this.charges.push(event);
            fs.writeFileSync("./src/Repositories/Jsons/Stripe/checkouts.json", JSON.stringify(this.charges, null, 4), "utf-8");
        }
        catch (error) {
            throw new Error(error);
        }
    }
    saveBillingPortalSessionWebhookEventLog(event) {
        try {
            this.charges.push(event);
            fs.writeFileSync("./src/Repositories/Jsons/Stripe/billingPortals.json", JSON.stringify(this.charges, null, 4), "utf-8");
        }
        catch (error) {
            throw new Error(error);
        }
    }
}
exports.default = StripeRepository;
//# sourceMappingURL=Stripe.repository.js.map