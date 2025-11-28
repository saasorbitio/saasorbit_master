/**
 * Password Verification Example
 *
 * This script demonstrates exactly how password matching works
 * in the login system using bcrypt.
 *
 * Run: node password-verification-example.js
 */

const bcrypt = require("bcryptjs");

console.log("🔐 Password Verification Demo\n");
console.log("=".repeat(60));

async function demonstratePasswordVerification() {
  // SCENARIO 1: User Registration
  console.log("\n📝 SCENARIO 1: USER REGISTRATION");
  console.log("-".repeat(60));

  const userPassword = "mypassword123";
  console.log("User enters password:", userPassword);

  // Generate salt and hash the password
  const salt = await bcrypt.genSalt(10);
  console.log("\nGenerated salt:", salt);

  const hashedPassword = await bcrypt.hash(userPassword, salt);
  console.log("\nHashed password (stored in database):");
  console.log(hashedPassword);
  console.log(
    '\n⚠️  Notice: The hash is COMPLETELY different from "mypassword123"'
  );
  console.log(
    '⚠️  It\'s impossible to get "mypassword123" back from this hash!'
  );

  // This simulates storing in database
  console.log("\n✅ Password stored in database as hash (NOT plain text)");

  // SCENARIO 2: User Login - Correct Password
  console.log("\n\n🔐 SCENARIO 2: USER LOGIN - CORRECT PASSWORD");
  console.log("-".repeat(60));

  const loginAttempt1 = "mypassword123"; // Same as registration
  console.log("User enters password:", loginAttempt1);
  console.log("\nBackend retrieves hash from database:", hashedPassword);

  const isMatch1 = await bcrypt.compare(loginAttempt1, hashedPassword);
  console.log('\nbcrypt.compare("' + loginAttempt1 + '", hash)');
  console.log("Result:", isMatch1);

  if (isMatch1) {
    console.log(
      "\n✅ SUCCESS! Passwords match → Generate JWT token → Login successful"
    );
  } else {
    console.log("\n❌ FAILED! Passwords don't match → Return error");
  }

  // SCENARIO 3: User Login - Wrong Password
  console.log("\n\n❌ SCENARIO 3: USER LOGIN - WRONG PASSWORD");
  console.log("-".repeat(60));

  const loginAttempt2 = "wrongpassword"; // Different from registration
  console.log("User enters password:", loginAttempt2);
  console.log("\nBackend retrieves hash from database:", hashedPassword);

  const isMatch2 = await bcrypt.compare(loginAttempt2, hashedPassword);
  console.log('\nbcrypt.compare("' + loginAttempt2 + '", hash)');
  console.log("Result:", isMatch2);

  if (isMatch2) {
    console.log(
      "\n✅ SUCCESS! Passwords match → Generate JWT token → Login successful"
    );
  } else {
    console.log(
      '\n❌ FAILED! Passwords don\'t match → Return "Invalid credentials" error'
    );
  }

  // SCENARIO 4: Multiple Users - Same Password
  console.log("\n\n🔄 SCENARIO 4: DIFFERENT USERS WITH SAME PASSWORD");
  console.log("-".repeat(60));

  const user1Password = "samepassword";
  const user2Password = "samepassword"; // Same password

  const hash1 = await bcrypt.hash(user1Password, await bcrypt.genSalt(10));
  const hash2 = await bcrypt.hash(user2Password, await bcrypt.genSalt(10));

  console.log("User 1 password:", user1Password);
  console.log("User 1 hash:", hash1);
  console.log("\nUser 2 password:", user2Password, "(same as User 1)");
  console.log("User 2 hash:", hash2);

  console.log(
    "\n⚠️  Notice: Even with the SAME password, hashes are DIFFERENT!"
  );
  console.log("This is because each hash uses a unique salt.");
  console.log("✅ This prevents rainbow table attacks.");

  // SCENARIO 5: Case Sensitivity
  console.log("\n\n🔤 SCENARIO 5: PASSWORD CASE SENSITIVITY");
  console.log("-".repeat(60));

  const originalPassword = "MyPassword123";
  const hashedOriginal = await bcrypt.hash(
    originalPassword,
    await bcrypt.genSalt(10)
  );

  console.log("Registered password:", originalPassword);
  console.log("Hash:", hashedOriginal);

  const testPasswords = [
    "MyPassword123", // Exact match
    "mypassword123", // Different case
    "MYPASSWORD123", // All uppercase
    "MyPassword124", // One character different
  ];

  console.log("\nTesting different login attempts:\n");

  for (const testPwd of testPasswords) {
    const match = await bcrypt.compare(testPwd, hashedOriginal);
    const icon = match ? "✅" : "❌";
    console.log(`${icon} "${testPwd}" → ${match ? "MATCH" : "NO MATCH"}`);
  }

  console.log('\n⚠️  Passwords are case-sensitive! "ABC" ≠ "abc"');

  // SUMMARY
  console.log("\n\n📋 SUMMARY - HOW IT WORKS IN YOUR APP");
  console.log("=".repeat(60));

  console.log("\n1️⃣  REGISTRATION:");
  console.log('   User enters: "mypassword123"');
  console.log("   ↓");
  console.log("   Backend hashes it with bcrypt");
  console.log("   ↓");
  console.log('   Stores hash: "$2a$10$xyz...abc"');
  console.log("   ↓");
  console.log("   Original password is NEVER stored");

  console.log("\n2️⃣  LOGIN:");
  console.log('   User enters: "mypassword123"');
  console.log("   ↓");
  console.log("   Backend gets hash from database");
  console.log("   ↓");
  console.log("   bcrypt.compare(entered, storedHash)");
  console.log("   ↓");
  console.log("   If TRUE → Login success ✅");
  console.log('   If FALSE → "Invalid credentials" ❌');

  console.log("\n3️⃣  KEY POINTS:");
  console.log(
    "   ✅ Password MUST match exactly what was entered during registration"
  );
  console.log("   ✅ Case sensitive (ABC ≠ abc)");
  console.log("   ✅ Cannot recover original password from hash");
  console.log("   ✅ Each hash is unique even with same password");
  console.log("   ✅ Extremely secure (industry standard)");

  console.log("\n" + "=".repeat(60));
  console.log("🎉 That's how password matching works in your login API!");
  console.log("=".repeat(60) + "\n");
}

// Run the demonstration
demonstratePasswordVerification().catch(console.error);
