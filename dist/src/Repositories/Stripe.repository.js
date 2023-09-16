"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const StripeCharges = require("./Jsons/Stripe/charges.json");
const StripeCustomers = require("./Jsons/Stripe/customers.json");
const StripeInvoices = require("./Jsons/Stripe/invoices.json");
const StripeCheckouts = require("./Jsons/Stripe/checkouts.json");
const StripeBillingPortals = require("./Jsons/Stripe/billingPortals.json");
const StripePayments = require("./Jsons/Stripe/payments.json");
const Database_1 = require("../Utils/Database");
const common_1 = require("@nestjs/common");
let StripeRepository = class StripeRepository {
    constructor(charges = StripeCharges, customers = StripeCustomers, invoices = StripeInvoices, checkouts = StripeCheckouts, billingPortals = StripeBillingPortals, payments = StripePayments, database) {
        this.charges = charges;
        this.customers = customers;
        this.invoices = invoices;
        this.checkouts = checkouts;
        this.billingPortals = billingPortals;
        this.payments = payments;
        this.database = database;
    }
    async saveChargeWebhookEventLog(event) {
        if (process.env.USE_DATABASE_JSON === "true") {
            try {
                this.charges.push(event);
                fs.writeFileSync("./src/Repositories/Jsons/Stripe/charges.json", JSON.stringify(this.charges, null, 4), "utf-8");
            }
            catch (error) {
                throw new Error(error);
            }
        }
        try {
            await this.database.stripeWebhookChargesLogs.create({
                data: {
                    event_log: JSON.stringify(event)
                }
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async saveCustomerWebhookEventLog(event) {
        if (process.env.USE_DATABASE_JSON === "true") {
            try {
                this.customers.push(event);
                fs.writeFileSync("./src/Repositories/Jsons/Stripe/customers.json", JSON.stringify(this.customers, null, 4), "utf-8");
            }
            catch (error) {
                throw new Error(error);
            }
        }
        try {
            await this.database.stripeWebhookCustomersLogs.create({
                data: {
                    event_log: JSON.stringify(event)
                }
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async saveInvoiceWebhookEventLog(event) {
        if (process.env.USE_DATABASE_JSON === "true") {
            try {
                this.invoices.push(event);
                fs.writeFileSync("./src/Repositories/Jsons/Stripe/invoices.json", JSON.stringify(this.invoices, null, 4), "utf-8");
            }
            catch (error) {
                throw new Error(error);
            }
        }
        try {
            await this.database.stripeWebhookInvoicesLogs.create({
                data: {
                    event_log: JSON.stringify(event)
                }
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async savePaymentWebhookEventLog(event) {
        if (process.env.USE_DATABASE_JSON === "true") {
            try {
                this.payments.push(event);
                fs.writeFileSync("./src/Repositories/Jsons/Stripe/payments.json", JSON.stringify(this.payments, null, 4), "utf-8");
            }
            catch (error) {
                throw new Error(error);
            }
        }
        try {
            await this.database.stripeWebhookPaymentsLogs.create({
                data: {
                    event_log: JSON.stringify(event)
                }
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async saveCheckoutSessionWebhookEventLog(event) {
        if (process.env.USE_DATABASE_JSON === "true") {
            try {
                this.checkouts.push(event);
                fs.writeFileSync("./src/Repositories/Jsons/Stripe/checkouts.json", JSON.stringify(this.checkouts, null, 4), "utf-8");
            }
            catch (error) {
                throw new Error(error);
            }
        }
        try {
            await this.database.stripeWebhookCheckoutsLogs.create({
                data: {
                    event_log: JSON.stringify(event)
                }
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }
    async saveBillingPortalSessionWebhookEventLog(event) {
        if (process.env.USE_DATABASE_JSON === "true") {
            try {
                this.billingPortals.push(event);
                fs.writeFileSync("./src/Repositories/Jsons/Stripe/billingPortals.json", JSON.stringify(this.billingPortals, null, 4), "utf-8");
            }
            catch (error) {
                throw new Error(error);
            }
        }
        try {
            await this.database.stripeWebhookBillingPortalLogs.create({
                data: {
                    event_log: JSON.stringify(event)
                }
            });
        }
        catch (error) {
            throw new Error(error);
        }
    }
};
StripeRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [Object, Object, Object, Object, Object, Object, Database_1.Database])
], StripeRepository);
exports.default = StripeRepository;
//# sourceMappingURL=Stripe.repository.js.map