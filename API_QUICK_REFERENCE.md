# API Changes - Quick Reference Guide

## ✅ What Was Changed?

### Backend Files Modified: 3

#### 1. `backend/models/Vendor.js`

- Added 14 new fields to store vendor profile details
- Fields: adminName, adminJobTitle, adminContactNumber, companyLegalName, brandName, companyLogo, foundedYear, companySize, businessType, saasCategory, saasType, shortDescription, detailedDescription, registrationNumber, supportEmail

#### 2. `backend/controllers/vendorController.js`

- **Updated:** registerVendor - now accepts and saves 14 new profile fields
- **Added:** updateVendorProfile - new function to update vendor profile after registration

#### 3. `backend/routes/vendorRoutes.js`

- Added new route: `PUT /:id/profile` → updateVendorProfile

---

## 🆕 New API Endpoint

### Update Vendor Profile

```
PUT /vendor/api/vendor/{vendorId}/profile
```

**Purpose:** Update vendor profile information after registration

**Request Body (all optional):**

```json
{
  "adminName": "string",
  "adminJobTitle": "string",
  "adminContactNumber": "string",
  "companyLegalName": "string",
  "brandName": "string",
  "companyLogo": "string (URL or path)",
  "foundedYear": "string (year)",
  "companySize": "string",
  "businessType": "string",
  "saasCategory": "string",
  "saasType": "string",
  "shortDescription": "string",
  "detailedDescription": "string",
  "registrationNumber": "string",
  "supportEmail": "string"
}
```

---

## 📋 New Form Fields (Frontend)

**StepCompanyDetails Component includes:**

- Admin Name
- Admin Job Title
- Admin Contact Number
- Company Legal Name
- Brand Name
- Website
- Company Logo
- Founded Year
- Company Size (dropdown)
- Business Type (dropdown)
- SaaS Category (dropdown)
- SaaS Type (dropdown) ⭐ **NEW with: Product, Service, Product & Service**
- Short Description
- Detailed Description
- Registration Number
- Support Email

---

## 🔄 Registration Flow

- Step 0: Role Selection
- Step 1: Email & Password
- Step 2: OTP Verification
- Step 3: Company Address
- **Step 4: ⭐ Company Profile (NEW)**
- Step 5: Contact Details
- Step 6: Social Media
- Step 7: Terms & Conditions
- Step 8: Success

---

## 📊 API Endpoints Summary

| Method | Endpoint                         | Status       |
| ------ | -------------------------------- | ------------ |
| POST   | `/vendor/api/vendor/register`    | ✅ Updated   |
| GET    | `/vendor/api/vendor/all`         | ✅ Unchanged |
| GET    | `/vendor/api/vendor/:id`         | ✅ Unchanged |
| PUT    | `/vendor/api/vendor/:id/profile` | ✅ **NEW**   |

---

## 🧪 Testing Quick Commands

### Register:

```bash
curl -X POST http://localhost:5000/vendor/api/vendor/register \
  -H "Content-Type: application/json" \
  -d '{
    "email":"test@test.com",
    "password":"pass123",
    "companyName":"Test Co",
    "gst":"123",
    "address1":"123 St",
    "city":"NY",
    "state":"NY",
    "zip":"10001",
    "country":"USA",
    "accepted":true,
    "adminName":"John Doe",
    "adminJobTitle":"CEO",
    "adminContactNumber":"+1234567890",
    "companyLegalName":"Test Co Inc",
    "brandName":"Test",
    "foundedYear":"2020",
    "companySize":"51-200",
    "businessType":"Product & Service",
    "saasCategory":"CRM",
    "saasType":"Product",
    "shortDescription":"Test company",
    "detailedDescription":"Detailed description",
    "registrationNumber":"REG123",
    "supportEmail":"sup@test.com"
  }'
```

### Update Profile:

```bash
curl -X PUT http://localhost:5000/vendor/api/vendor/{VENDOR_ID}/profile \
  -H "Content-Type: application/json" \
  -d '{"adminName":"Jane Doe","businessType":"Service"}'
```

---

## 📝 Dropdown Options

### Business Type & SaaS Type:

- Product
- Service
- **Product & Service** ⭐ NEW

### Company Size:

- 1-10
- 11-50
- 51-200
- 201-500
- 501-1000
- 1000+

### SaaS Categories:

- CRM
- Accounting
- E-commerce
- Project Management
- HR & Payroll
- Marketing
- Analytics
- Other

---

## ⚠️ Validation Rules

**During Registration:**

- Profile fields: ALL or NONE required
- If any profile field provided, all must be provided

**During Update:**

- Any field can be updated independently

**Format:**

- Email validation
- URL validation for website
- Year format for foundedYear

---

## 📁 Files Modified

### Backend (3 files):

- ✅ `backend/models/Vendor.js`
- ✅ `backend/controllers/vendorController.js`
- ✅ `backend/routes/vendorRoutes.js`

### Frontend (3 files):

- ✅ `frontend/src/pages/vendor/StepCompanyDetails.jsx` (NEW)
- ✅ `frontend/src/context/VendorFormContext.jsx`
- ✅ `frontend/src/pages/vendor/VendorRegister.jsx`

**Total: 6 files changed**

---

## 🎯 Key Highlights

1. ✅ 14 new profile fields added to Vendor model
2. ✅ Register endpoint enhanced to accept profile details
3. ✅ New PUT endpoint for profile updates
4. ✅ **SaaS Type dropdown now includes: Product, Service, Product & Service**
5. ✅ New form step (StepCompanyDetails) integrated into registration flow
6. ✅ All validation and error handling implemented
7. ✅ Backward compatible - profile fields are optional

---

## 📚 Documentation Files

For detailed information, see:

- `VENDOR_API_CHANGES.md` - Complete API documentation
- `COMPLETE_CODE_CHANGES.md` - All code changes
- `API_TESTING_GUIDE.md` - Testing instructions
- `API_IMPLEMENTATION_SUMMARY.md` - Implementation overview
