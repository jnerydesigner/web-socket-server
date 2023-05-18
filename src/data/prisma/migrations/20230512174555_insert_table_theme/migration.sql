-- CreateTable
CREATE TABLE "Theme" (
    "id" UUID NOT NULL,
    "theme" TEXT NOT NULL,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Theme_pkey" PRIMARY KEY ("id")
);
