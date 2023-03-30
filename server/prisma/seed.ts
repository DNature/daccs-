import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput = {
	accountNumber: '988274912',
	city: 'Rotterdam',
	email: 'divinehycenth8@gmail.com',
	firstName: 'Divine',
	lastName: 'Hycenth',
	phoneNumber: '1283712984',
};

async function main() {
	console.log(`Start seeding ...`);
	const user = await prisma.user.create({
		data: userData,
	});
	console.log(`Created user with id: ${user.id}`);
	console.log(`Seeding finished.`);
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		// @ts-ignore
		process.exit(1);
	});
