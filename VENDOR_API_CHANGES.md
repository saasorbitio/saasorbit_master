# Vendor Profile API Documentation

## Backend API Changes Summary

### 1. **Database Model Update** (`backend/models/Vendor.js`)

Added 14 new fields to the Vendor schema to store company profile details:

```javascript
// Profile Details Fields
adminName: String,
adminJobTitle: String,
adminContactNumber: String,
companyLegalName: String,
brandName: String,
companyLogo: String,
foundedYear: String,
companySize: String,
businessType: String,
saasCategory: String,
saasType: String,
shortDescription: String,
detailedDescription: String,
registrationNumber: String,
supportEmail: String,
```

### 2. **Controller Updates** (`backend/controllers/vendorController.js`)

#### Updated: `registerVendor` Function

- Now accepts all 14 new profile detail fields in the request body
- Validates that if any profile field is provided, ALL profile fields must be provided
- Includes all new fields in the vendor creation
- Maintains backward compatibility - profile fields are optional during registration

#### New: `updateVendorProfile` Function

**Endpoint:** `PUT /api/vendor/:id/profile`

Allows updating vendor profile details after registration.

**Request Parameters:**

- `id` - Vendor ID (in URL path)

**Request Body (all optional):**

```json
{
  "adminName": "string",
  "adminJobTitle": "string",
  "adminContactNumber": "string",
  "companyLegalName": "string",
  "brandName": "string",
  "companyLogo": "string",
  "foundedYear": "string",
  "companySize": "string",
  "businessType": "string (Product|Service|Product & Service)",
  "saasCategory": "string",
  "saasType": "string (Product|Service|Product & Service)",
  "shortDescription": "string",
  "detailedDescription": "string",
  "registrationNumber": "string",
  "supportEmail": "string",
  "website": "string",
  "landline": "string",
  "fax": "string",
  "address1": "string",
  "address2": "string",
  "city": "string",
  "state": "string",
  "zip": "string",
  "country": "string"
}
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Vendor profile updated successfully",
  "vendor": {
    "_id": "...",
    "adminName": "...",
    "businessType": "...",
    "saasType": "...",
    ...
  }
}
```

**Response (Error):**

```json
{
  "message": "Vendor not found"
}
```

### 3. **Routes Update** (`backend/routes/vendorRoutes.js`)

Added new route:

```javascript
router.put("/:id/profile", updateVendorProfile);
```

## API Endpoints Summary

| Method | Endpoint                         | Description                          |
| ------ | -------------------------------- | ------------------------------------ |
| POST   | `/vendor/api/vendor/register`    | Register new vendor with all details |
| GET    | `/vendor/api/vendor/all`         | Get all vendors                      |
| GET    | `/vendor/api/vendor/:id`         | Get vendor by ID                     |
| PUT    | `/vendor/api/vendor/:id/profile` | Update vendor profile details        |

## Frontend Integration

The frontend form automatically collects all profile details and sends them to the backend:

1. **Steps 0-3:** Basic registration (Email, OTP, Address)
2. **Step 4:** Company Profile Details (NEW)
   - Admin information
   - Company information
   - Business classification
   - Descriptions
   - Location details
3. **Steps 5-7:** Contact, Social Media, Terms
4. **Final Submit:** All data sent to `/vendor/api/vendor/register`

## Data Validation

### Profile Fields Validation:

- All fields are required if any profile field is provided
- Email validation for `supportEmail`
- URL validation for `website`
- All text fields support up to MongoDB string limits

### SaaS Type Dropdown Options:

- "Product"
- "Service"
- "Product & Service"

### Business Type Dropdown Options:

- "Product"
- "Service"
- "Product & Service"

### Company Size Options:

- "1-10"
- "11-50"
- "51-200"
- "201-500"
- "501-1000"
- "1000+"

### SaaS Categories:

- "CRM"
- "Accounting"
- "E-commerce"
- "Project Management"
- "HR & Payroll"
- "Marketing"
- "Analytics"
- "Other"

## Error Handling

All endpoints include error handling for:

- Missing required fields
- Duplicate email addresses
- Database errors
- Server errors

## Example Usage

### Register Vendor with Profile Details:

```bash
curl -X POST http://localhost:5000/vendor/api/vendor/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "vendor@example.com",
    "password": "password123",
    "companyName": "Tech Solutions Inc",
    "gst": "18AABCT1234H1Z0",
    "address1": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zip": "10001",
    "country": "USA",
    "adminName": "John Doe",
    "adminJobTitle": "CEO",
    "adminContactNumber": "+1-555-0123",
    "companyLegalName": "Tech Solutions Inc",
    "brandName": "TechSol",
    "foundedYear": "2020",
    "companySize": "51-200",
    "businessType": "Product & Service",
    "saasCategory": "CRM",
    "saasType": "Product",
    "shortDescription": "Leading CRM solutions",
    "detailedDescription": "We provide innovative CRM solutions...",
    "registrationNumber": "REG123456",
    "supportEmail": "support@techsol.com",
    "accepted": true
  }'
```

### Update Vendor Profile:

```bash
curl -X PUT http://localhost:5000/vendor/api/vendor/123456/profile \
  -H "Content-Type: application/json" \
  -d '{
    "adminName": "Jane Doe",
    "businessType": "Service",
    "saasType": "Product & Service"
  }'
```

## Notes

- Profile fields are optional during registration but recommended for complete vendor information
- The update endpoint allows partial updates - only include fields you want to change
- All timestamps are automatically managed by MongoDB
- Vendor status defaults to "pending" and can be updated by admins only
