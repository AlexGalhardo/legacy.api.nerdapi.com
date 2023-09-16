-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "telegram_number" TEXT,
    "jwt_token" TEXT,
    "api_token" TEXT,
    "password" TEXT NOT NULL,
    "reset_password_token" TEXT,
    "reset_password_token_expires_at" TEXT,
    "stripe_customer_id" TEXT,
    "stripe_subscription_active" BOOLEAN NOT NULL DEFAULT false,
    "stripe_subscription_name" TEXT NOT NULL DEFAULT 'NOOB',
    "stripe_subscription_starts_at" TEXT,
    "stripe_subscription_ends_at" TEXT,
    "stripe_subscription_charge_id" TEXT,
    "stripe_subscription_receipt_url" TEXT,
    "stripe_subscription_hosted_invoice_url" TEXT,
    "stripe_updated_at" TEXT,
    "stripe_updated_at_pt_br" TEXT,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    "created_at_pt_br" TEXT NOT NULL,
    "updated_at_pt_br" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "games" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "cover_image" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "release_year" INTEGER NOT NULL,
    "release_date" TEXT NOT NULL,
    "igdb_url" TEXT,
    "igdb_rating" INTEGER,
    "metacritic_url" TEXT,
    "metacritic_rating" INTEGER,
    "where_to_buy" JSONB NOT NULL,
    "developer_id" TEXT NOT NULL,
    "developer_name" TEXT NOT NULL,
    "publisher_id" TEXT NOT NULL,
    "publisher_name" TEXT NOT NULL,
    "platforms_available" JSONB NOT NULL,
    "genres" JSONB NOT NULL,
    "how_long_to_beat" JSONB NOT NULL,
    "created_at" TEXT NOT NULL,
    "updated_at" TEXT,
    "created_at_pt_br" TEXT NOT NULL,
    "updated_at_pt_br" TEXT,

    CONSTRAINT "games_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe_webhook_billing_portal_logs" (
    "id" TEXT NOT NULL,
    "event_log" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "stripe_webhook_billing_portal_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe_webhook_charges_logs" (
    "id" TEXT NOT NULL,
    "event_log" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "stripe_webhook_charges_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe_webhook_checkouts_logs" (
    "id" TEXT NOT NULL,
    "event_log" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "stripe_webhook_checkouts_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe_webhook_customers_logs" (
    "id" TEXT NOT NULL,
    "event_log" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "stripe_webhook_customers_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe_webhook_invoices_logs" (
    "id" TEXT NOT NULL,
    "event_log" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "stripe_webhook_invoices_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stripe_webhook_payments_logs" (
    "id" TEXT NOT NULL,
    "event_log" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "stripe_webhook_payments_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_telegram_number_key" ON "users"("telegram_number");

-- CreateIndex
CREATE UNIQUE INDEX "users_jwt_token_key" ON "users"("jwt_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_api_token_key" ON "users"("api_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_reset_password_token_key" ON "users"("reset_password_token");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_customer_id_key" ON "users"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_subscription_charge_id_key" ON "users"("stripe_subscription_charge_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_subscription_receipt_url_key" ON "users"("stripe_subscription_receipt_url");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_subscription_hosted_invoice_url_key" ON "users"("stripe_subscription_hosted_invoice_url");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_reset_password_token_key" ON "users"("email", "reset_password_token");

-- CreateIndex
CREATE UNIQUE INDEX "games_cover_image_key" ON "games"("cover_image");

-- CreateIndex
CREATE UNIQUE INDEX "games_igdb_url_key" ON "games"("igdb_url");

-- CreateIndex
CREATE UNIQUE INDEX "games_metacritic_url_key" ON "games"("metacritic_url");
