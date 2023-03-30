#!/bin/sh

yarn prisma migrate dev --name init

yarn prisma db seed

yarn dev
