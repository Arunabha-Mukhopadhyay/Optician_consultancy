// src/scripts/seedAdmin.js — One-time script to create an admin user
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: resolve(__dirname, '../../.env') });

import User from '../models/User.model.js';

const ADMIN_EMAIL = 'admin@optichain.in';
const ADMIN_PASSWORD = 'admin123456';
const ADMIN_NAME = 'Admin OptiChain';

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const existing = await User.findOne({ email: ADMIN_EMAIL });
    if (existing) {
      if (existing.role !== 'admin') {
        existing.role = 'admin';
        await existing.save();
        console.log(`✅ Updated existing user to admin: ${ADMIN_EMAIL}`);
      } else {
        console.log(`ℹ️  Admin already exists: ${ADMIN_EMAIL}`);
      }
    } else {
      await User.create({
        name: ADMIN_NAME,
        email: ADMIN_EMAIL,
        password: ADMIN_PASSWORD,
        role: 'admin',
      });
      console.log(`✅ Admin user created!`);
    }

    console.log('\n📌 Admin Credentials:');
    console.log(`   Email:    ${ADMIN_EMAIL}`);
    console.log(`   Password: ${ADMIN_PASSWORD}`);
    console.log(`   URL:      http://localhost:5173/login`);
    console.log(`\n   After login, go to: /admin/dashboard\n`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

seedAdmin();
