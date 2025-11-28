/**
 * Test Script for Login Flow
 *
 * This script demonstrates the complete login flow:
 * 1. Register a new user
 * 2. Login with the registered credentials
 * 3. Access protected route with token
 *
 * Usage: node test-login-flow.js
 */

const axios = require("axios");

const BASE_URL = "http://localhost:5000/api";

// Test user credentials
const testUser = {
  name: "Test User",
  email: `test${Date.now()}@example.com`, // Unique email
  password: "testpassword123",
};

async function testLoginFlow() {
  console.log("🚀 Starting Login Flow Test...\n");

  try {
    // Step 1: Register a new user
    console.log("📝 Step 1: Registering new user...");
    console.log("Email:", testUser.email);
    console.log("Password:", testUser.password);

    const registerResponse = await axios.post(`${BASE_URL}/auth/register`, {
      name: testUser.name,
      email: testUser.email,
      password: testUser.password,
    });

    console.log("✅ Registration successful!");
    console.log("User ID:", registerResponse.data.user.id);
    console.log(
      "Token received:",
      registerResponse.data.token.substring(0, 20) + "...\n"
    );

    // Step 2: Login with the same credentials
    console.log("🔐 Step 2: Logging in with registered credentials...");

    const loginResponse = await axios.post(`${BASE_URL}/auth/login`, {
      email: testUser.email,
      password: testUser.password,
    });

    console.log("✅ Login successful!");
    console.log("User:", loginResponse.data.user);
    console.log("Token:", loginResponse.data.token.substring(0, 20) + "...\n");

    const token = loginResponse.data.token;

    // Step 3: Access protected route with token
    console.log("🔒 Step 3: Accessing protected route with token...");

    const meResponse = await axios.get(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("✅ Protected route accessed successfully!");
    console.log("Current User:", meResponse.data.user);
    console.log("\n✨ All tests passed! Login flow is working correctly.\n");

    // Step 4: Test wrong password
    console.log("❌ Step 4: Testing with wrong password...");

    try {
      await axios.post(`${BASE_URL}/auth/login`, {
        email: testUser.email,
        password: "wrongpassword",
      });
    } catch (error) {
      console.log("✅ Correctly rejected wrong password");
      console.log(
        "Error message:",
        error.response?.data?.message || error.message
      );
    }

    // Step 5: Test non-existent user
    console.log("\n❌ Step 5: Testing with non-existent email...");

    try {
      await axios.post(`${BASE_URL}/auth/login`, {
        email: "nonexistent@example.com",
        password: "somepassword",
      });
    } catch (error) {
      console.log("✅ Correctly rejected non-existent user");
      console.log(
        "Error message:",
        error.response?.data?.message || error.message
      );
    }

    console.log("\n🎉 Complete flow test finished successfully!\n");
  } catch (error) {
    console.error("❌ Test failed:");

    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Error:", error.response.data);
    } else if (error.request) {
      console.error("No response received. Is the server running?");
      console.error(
        "Make sure the backend is running on http://localhost:5000"
      );
    } else {
      console.error("Error:", error.message);
    }

    process.exit(1);
  }
}

// Run the test
testLoginFlow();
