import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash('password123', 10);

  // Create Admin
  const admin = await prisma.user.upsert({
    where: { email: 'admin@taleem.edu' },
    update: {},
    create: {
      email: 'admin@taleem.edu',
      name: 'System Admin',
      password,
      role: Role.ADMIN,
    },
  });

  // Create Teacher
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@taleem.edu' },
    update: {},
    create: {
      email: 'teacher@taleem.edu',
      name: 'Ustadh Bilal',
      password,
      role: Role.TEACHER,
      teacherProfile: {
        create: {
          qualification: 'Senior Tajweed Instructor',
          shift: 'Evening',
          rating: 4.8,
        }
      }
    },
  });

  // Create Student
  const student = await prisma.user.upsert({
    where: { email: 'student@taleem.edu' },
    update: {},
    create: {
      email: 'student@taleem.edu',
      name: 'Zayd Ibrahim',
      password,
      role: Role.STUDENT,
      studentProfile: {
        create: {
          guardianName: 'Ibrahim Ali',
          level: 'Beginner',
          progress: 78,
        }
      }
    },
  });

  // Create ClassSession
  const now = new Date();
  const startTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 19, 0, 0); // 7:00 PM today
  const endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 20, 0, 0); // 8:00 PM today

  const classSession = await prisma.classSession.create({
    data: {
      title: 'Tajweed Basics',
      description: 'Mastering Madd & Articulation',
      scheduledStart: startTime,
      scheduledEnd: endTime,
      status: 'SCHEDULED',
      teacherId: teacher.id,
      studentId: student.id,
    }
  });

  console.log('Seed execution successful!');
  console.log({ admin, teacher, student, classSession });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
