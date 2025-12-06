# API Testing Guide

## Prerequisites

- Backend server running on `http://localhost:5000` (or your configured port)
- Postman or cURL installed
- MongoDB running and connected

## Testing Steps

### Step 1: Start Backend Server

```bash
cd backend
npm install
npm start
```

Server should start at `http://localhost:5000`

### Step 2: Test Vendor Registration with Profile Details

#### Using cURL:

```bash
curl -X POST http://localhost:5000/vendor/api/vendor/register \
  -H "Content-Type: application/json" \
  -d '{
    "role": "Vendor",
    "email": "vendor1@example.com",
    "password": "SecurePass123!",
    "companyName": "TechVision Solutions",
    "landline": "+1-555-0100",
    "fax": "+1-555-0101",
    "gst": "18AABCT1234H1Z0",
    "address1": "123 Tech Boulevard",
    "address2": "Suite 100",
    "city": "San Francisco",
    "state": "CA",
    "zip": "94102",
    "country": "USA",
    "website": "https://techvision.com",
    "linkedin": "https://linkedin.com/company/techvision",
    "x": "https://x.com/techvision",
    "accepted": true,
    "adminName": "John Smith",
    "adminJobTitle": "Chief Executive Officer",
    "adminContactNumber": "+1-555-0150",
    "companyLegalName": "TechVision Solutions Inc.",
    "brandName": "TechVision",
    "companyLogo": "https://example.com/logo.png",
    "foundedYear": "2018",
    "companySize": "51-200",
    "businessType": "Product & Service",
    "saasCategory": "CRM",
    "saasType": "Product",
    "shortDescription": "Leading provider of AI-powered CRM solutions for enterprise businesses",
    "detailedDescription": "TechVision Solutions specializes in developing innovative customer relationship management platforms that leverage artificial intelligence and machine learning. Our solutions help enterprises streamline operations, improve customer satisfaction, and drive revenue growth.",
    "registrationNumber": "REG2024-001",
    "supportEmail": "support@techvision.com"
  }'
```

#### Expected Response (Success):

```json
{
  "success": true,
  "message": "Vendor registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "65d8f3c2a1b2c3d4e5f6g7h8",
    "email": "vendor1@example.com",
    "name": "TechVision Solutions",
    "role": "Vendor"
  },
  "vendor": {
    "id": "65d8f3c2a1b2c3d4e5f6g7h8",
    "companyName": "TechVision Solutions",
    "email": "vendor1@example.com",
    "status": "pending"
  }
}
```

### Step 3: Update Vendor Profile

Replace `{VENDOR_ID}` with the vendor ID from the registration response.

#### Using cURL:

```bash
curl -X PUT http://localhost:5000/vendor/api/vendor/{VENDOR_ID}/profile \
  -H "Content-Type: application/json" \
  -d '{
    "adminName": "Jane Doe",
    "adminJobTitle": "Chief Technology Officer",
    "businessType": "Service",
    "saasType": "Product & Service",
    "foundedYear": "2019"
  }'
```

#### Expected Response:

```json
{
  "success": true,
  "message": "Vendor profile updated successfully",
  "vendor": {
    "_id": "65d8f3c2a1b2c3d4e5f6g7h8",
    "email": "vendor1@example.com",
    "adminName": "Jane Doe",
    "adminJobTitle": "Chief Technology Officer",
    "businessType": "Service",
    "saasType": "Product & Service",
    "foundedYear": "2019",
    ...
  }
}
```

### Step 4: Get Vendor by ID

```bash
curl -X GET http://localhost:5000/vendor/api/vendor/{VENDOR_ID} \
  -H "Content-Type: application/json"
```

#### Expected Response:

```json
{
  "success": true,
  "vendor": {
    "_id": "65d8f3c2a1b2c3d4e5f6g7h8",
    "email": "vendor1@example.com",
    "companyName": "TechVision Solutions",
    "adminName": "Jane Doe",
    "businessType": "Service",
    "saasType": "Product & Service",
    ...
  }
}
```

### Step 5: Get All Vendors

```bash
curl -X GET http://localhost:5000/vendor/api/vendor/all \
  -H "Content-Type: application/json"
```

#### Expected Response:

```json
{
  "success": true,
  "vendors": [
    {
      "_id": "65d8f3c2a1b2c3d4e5f6g7h8",
      "email": "vendor1@example.com",
      "companyName": "TechVision Solutions",
      ...
    },
    {
      "_id": "65d8f3c2a1b2c3d4e5f6g7h9",
      "email": "vendor2@example.com",
      "companyName": "Another Company",
      ...
    }
  ]
}
```

## Using Postman

### Create New Request

1. **Method:** POST
2. **URL:** `http://localhost:5000/vendor/api/vendor/register`
3. **Headers:**
   - Key: `Content-Type`
   - Value: `application/json`
4. **Body:** (Select "raw" and paste the JSON below)

```json
{
  "role": "Vendor",
  "email": "test@example.com",
  "password": "TestPass123!",
  "companyName": "Test Company",
  "gst": "18AABCT1234H1Z0",
  "address1": "123 Main St",
  "city": "New York",
  "state": "NY",
  "zip": "10001",
  "country": "USA",
  "accepted": true,
  "adminName": "Admin User",
  "adminJobTitle": "Manager",
  "adminContactNumber": "+1-555-0123",
  "companyLegalName": "Test Company LLC",
  "brandName": "TestBrand",
  "foundedYear": "2020",
  "companySize": "51-200",
  "businessType": "Product",
  "saasCategory": "CRM",
  "saasType": "Product & Service",
  "shortDescription": "A test company",
  "detailedDescription": "Detailed description of test company",
  "registrationNumber": "REG123456",
  "supportEmail": "support@test.com"
}
```

5. Click **Send**

### Test Validation Scenarios

#### Scenario 1: Missing Required Fields

**Expected:** 400 Bad Request with message about required fields

```json
{
  "message": "Please fill all required fields"
}
```

#### Scenario 2: Duplicate Email

**Expected:** 400 Bad Request

```json
{
  "message": "Vendor with this email already exists"
}
```

#### Scenario 3: Profile Fields Incomplete

**Expected:** 400 Bad Request

```json
{
  "message": "Please fill all profile detail fields or skip this step"
}
```

## Testing Checklist

- [ ] Register vendor with all profile details
- [ ] Verify vendor saved in database
- [ ] Update vendor profile with partial fields
- [ ] Get vendor by ID
- [ ] Get all vendors
- [ ] Test duplicate email rejection
- [ ] Test missing required fields
- [ ] Test profile field validation (all or none)
- [ ] Verify timestamps (createdAt, updatedAt)
- [ ] Check token is returned and valid

## Common Issues & Solutions

### Issue: Connection Refused

**Solution:** Make sure backend server is running on correct port

### Issue: 404 Not Found

**Solution:** Verify route path: `/vendor/api/vendor/register`

### Issue: Validation Error

**Solution:** Check all required fields are provided:

- Basic: email, password, companyName, gst, address1, city, state, zip, country
- Profile (if any): all 14 profile fields required

### Issue: Database Error

**Solution:** Verify MongoDB is running and connection string is correct in `.env`

## Environment Variables

Make sure `.env` in backend has:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/saasorbit
JWT_SECRET=your-secret-key-here
```

## Response Time

- Registration: ~500-1000ms (includes password hashing)
- Update: ~200-500ms
- Get Single: ~100-300ms
- Get All: ~300-800ms (depending on vendor count)
