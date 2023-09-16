import * as fs from "fs";
import * as StripeCharges from "./Jsons/Stripe/charges.json";
import * as StripeCustomers from "./Jsons/Stripe/customers.json";
import * as StripeInvoices from "./Jsons/Stripe/invoices.json";
import * as StripeCheckouts from "./Jsons/Stripe/checkouts.json";
import * as StripeBillingPortals from "./Jsons/Stripe/billingPortals.json";
import * as StripePayments from "./Jsons/Stripe/payments.json";
import { Database } from "src/Utils/Database";
import { Injectable } from "@nestjs/common";

export interface StripeRepositoryPort {
    saveChargeWebhookEventLog(event: any): void;
    saveCustomerWebhookEventLog(event: any): void;
    saveInvoiceWebhookEventLog(event: any): void;
    savePaymentWebhookEventLog(event: any): void;
    saveCheckoutSessionWebhookEventLog(event: any): void;
    saveBillingPortalSessionWebhookEventLog(event: any): void;
}

@Injectable()
export default class StripeRepository implements StripeRepositoryPort {
    constructor(
        private charges = StripeCharges,
        private customers = StripeCustomers,
        private invoices = StripeInvoices,
        private checkouts = StripeCheckouts,
        private billingPortals = StripeBillingPortals,
        private payments = StripePayments,
        private readonly database: Database,
    ) {}

    public async saveChargeWebhookEventLog(event: any) {
        if (process.env.USE_DATABASE_JSON === "true") {
            try {
                this.charges.push(event);
                fs.writeFileSync(
                    "./src/Repositories/Jsons/Stripe/charges.json",
                    JSON.stringify(this.charges, null, 4),
                    "utf-8",
                );
            } catch (error) {
                throw new Error(error);
            }
        }

        try {
            await this.database.stripeWebhookChargesLogs.create({
                data: {
                    event_log: JSON.stringify(event),
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    public async saveCustomerWebhookEventLog(event: any) {
        if (process.env.USE_DATABASE_JSON === "true") {
            try {
                this.customers.push(event);
                fs.writeFileSync(
                    "./src/Repositories/Jsons/Stripe/customers.json",
                    JSON.stringify(this.customers, null, 4),
                    "utf-8",
                );
            } catch (error) {
                throw new Error(error);
            }
        }

        try {
            await this.database.stripeWebhookCustomersLogs.create({
                data: {
                    event_log: JSON.stringify(event),
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    public async saveInvoiceWebhookEventLog(event: any) {
        if (process.env.USE_DATABASE_JSON === "true") {
            try {
                this.invoices.push(event);
                fs.writeFileSync(
                    "./src/Repositories/Jsons/Stripe/invoices.json",
                    JSON.stringify(this.invoices, null, 4),
                    "utf-8",
                );
            } catch (error) {
                throw new Error(error);
            }
        }

        try {
            await this.database.stripeWebhookInvoicesLogs.create({
                data: {
                    event_log: JSON.stringify(event),
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    public async savePaymentWebhookEventLog(event: any) {
        if (process.env.USE_DATABASE_JSON === "true") {
            try {
                this.payments.push(event);
                fs.writeFileSync(
                    "./src/Repositories/Jsons/Stripe/payments.json",
                    JSON.stringify(this.payments, null, 4),
                    "utf-8",
                );
            } catch (error) {
                throw new Error(error);
            }
        }

        try {
            await this.database.stripeWebhookPaymentsLogs.create({
                data: {
                    event_log: JSON.stringify(event),
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    public async saveCheckoutSessionWebhookEventLog(event: any) {
        if (process.env.USE_DATABASE_JSON === "true") {
            try {
                this.checkouts.push(event);
                fs.writeFileSync(
                    "./src/Repositories/Jsons/Stripe/checkouts.json",
                    JSON.stringify(this.checkouts, null, 4),
                    "utf-8",
                );
            } catch (error) {
                throw new Error(error);
            }
        }

        try {
            await this.database.stripeWebhookCheckoutsLogs.create({
                data: {
                    event_log: JSON.stringify(event),
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    public async saveBillingPortalSessionWebhookEventLog(event: any) {
        if (process.env.USE_DATABASE_JSON === "true") {
            try {
                this.billingPortals.push(event);
                fs.writeFileSync(
                    "./src/Repositories/Jsons/Stripe/billingPortals.json",
                    JSON.stringify(this.billingPortals, null, 4),
                    "utf-8",
                );
            } catch (error) {
                throw new Error(error);
            }
        }

        try {
            await this.database.stripeWebhookBillingPortalLogs.create({
                data: {
                    event_log: JSON.stringify(event),
                },
            });
        } catch (error) {
            throw new Error(error);
        }
    }
}
