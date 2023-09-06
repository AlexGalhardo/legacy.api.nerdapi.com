import * as fs from "fs";
import * as StripeCharges from "./Jsons/Stripe/charges.json";
import * as StripeCustomers from "./Jsons/Stripe/customers.json";
import * as StripeInvoices from "./Jsons/Stripe/invoices.json";

export interface StripeRepositoryPort {
    saveChargeWebhookEventLog(event: any): void;
    saveCustomerWebhookEventLog(event: any): void;
    saveInvoiceWebhookEventLog(event: any): void;
    savePaymentWebhookEventLog(event: any): void;
    saveCheckoutSessionWebhookEventLog(event: any): void;
    saveBillingPortalSessionWebhookEventLog(event: any): void;
}

export default class StripeRepository implements StripeRepositoryPort {
    constructor(
        private charges = StripeCharges,
        private customers = StripeCustomers,
        private invoices = StripeInvoices,
    ) {}
    saveBillingPortalCheckoutWebhookEventLog(event: any): void {
        throw new Error("Method not implemented.");
    }

    public saveChargeWebhookEventLog(event: any) {
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

    public saveCustomerWebhookEventLog(event: any) {
        try {
            this.charges.push(event);
            fs.writeFileSync(
                "./src/Repositories/Jsons/Stripe/customers.json",
                JSON.stringify(this.charges, null, 4),
                "utf-8",
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    public saveInvoiceWebhookEventLog(event: any) {
        try {
            this.charges.push(event);
            fs.writeFileSync(
                "./src/Repositories/Jsons/Stripe/invoices.json",
                JSON.stringify(this.charges, null, 4),
                "utf-8",
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    public savePaymentWebhookEventLog(event: any) {
        try {
            this.charges.push(event);
            fs.writeFileSync(
                "./src/Repositories/Jsons/Stripe/payments.json",
                JSON.stringify(this.charges, null, 4),
                "utf-8",
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    public saveCheckoutSessionWebhookEventLog(event: any) {
        try {
            this.charges.push(event);
            fs.writeFileSync(
                "./src/Repositories/Jsons/Stripe/checkouts.json",
                JSON.stringify(this.charges, null, 4),
                "utf-8",
            );
        } catch (error) {
            throw new Error(error);
        }
    }

    public saveBillingPortalSessionWebhookEventLog(event: any) {
        try {
            this.charges.push(event);
            fs.writeFileSync(
                "./src/Repositories/Jsons/Stripe/billingPortals.json",
                JSON.stringify(this.charges, null, 4),
                "utf-8",
            );
        } catch (error) {
            throw new Error(error);
        }
    }
}
