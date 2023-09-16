-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "reset_password_token" TEXT,
    "stripe_customer_id" TEXT,
    "stripe_currently_subscription_id" TEXT,
    "stripe_currently_subscription_name" TEXT,
    "stripe_subscription_start" TIMESTAMP(3),
    "stripe_subscription_end" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_customer_id_key" ON "users"("stripe_customer_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_stripe_currently_subscription_id_key" ON "users"("stripe_currently_subscription_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_reset_password_token_key" ON "users"("email", "reset_password_token");
