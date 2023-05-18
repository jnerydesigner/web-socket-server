-- CreateTable
CREATE TABLE "Message" (
    "id" UUID NOT NULL,
    "author" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "registration_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "room" TEXT NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);
