# Delete Vendor by Email - API Endpoint

## 🗑️ Endpoint Details

**Method:** `DELETE`  
**URL:** `/api/vendor/delete-by-email`  
**Purpose:** Delete all vendor details based on email address

## 📋 Request

### Headers

```
Content-Type: application/json
```

### Body (JSON)

```json
{
  "email": "vendor@example.com"
}
```

### Example Request

```bash
curl -X DELETE http://localhost:5001/api/vendor/delete-by-email \
  -H "Content-Type: application/json" \
  -d '{"email": "vendor@acme.com"}'
```

## ✅ Success Response (200)

```json
{
  "success": true,
  "message": "Vendor with email vendor@acme.com has been successfully deleted",
  "deletedVendor": {
    "email": "vendor@acme.com",
    "companyName": "Acme Corporation",
    "_id": "507f1f77bcf86cd799439011"
  }
}
```

## ❌ Error Responses

### 400 - Bad Request (Email Missing)

```json
{
  "success": false,
  "message": "Email is required"
}
```

### 404 - Not Found

```json
{
  "success": false,
  "message": "No vendor found with email: vendor@example.com"
}
```

### 500 - Server Error

```json
{
  "success": false,
  "message": "Server error while deleting vendor",
  "error": "Error details..."
}
```

## 🧪 Testing in Swagger UI

1. **Navigate to Swagger UI:**

   ```
   http://localhost:5001/api-docs
   ```

2. **Find the endpoint:**

   - Look for the **Vendor** section
   - Find **DELETE /api/vendor/delete-by-email**

3. **Test the endpoint:**
   - Click to expand the endpoint
   - Click "Try it out"
   - Enter the vendor email in the request body:
     ```json
     {
       "email": "vendor@example.com"
     }
     ```
   - Click "Execute"
   - View the response

## 🔍 What Gets Deleted

When you delete a vendor by email, the following are removed:

1. ✅ **Vendor Record** - Complete vendor document from MongoDB
2. ✅ **Company Logo** - Associated company logo file from GridFS (if exists)
3. ✅ **All Vendor Data** - Including:
   - Company information (name, GST, registration)
   - Contact details (address, phone, website)
   - Profile details (admin info, company size, description)
   - All other vendor-specific data

## ⚠️ Important Notes

### Permanent Deletion

- This action **permanently deletes** the vendor record
- There is **no undo** functionality
- Make sure you have the correct email before executing

### File Cleanup

- If the vendor has a company logo, it will be automatically deleted from GridFS
- File deletion errors won't stop the vendor deletion process

### Not Integrated in Frontend

- This endpoint is **only available via API** (Swagger UI or direct API calls)
- It is **NOT integrated** in the frontend application
- Use with caution and only for administrative purposes

## 🛡️ Security Considerations

**Recommended Enhancements (Future):**

- Add authentication middleware to protect this endpoint
- Require admin role to execute
- Add confirmation step
- Log deletion actions for audit trail
- Consider soft delete instead of hard delete

## 📝 Example Use Cases

### Delete a test vendor

```bash
curl -X DELETE http://localhost:5001/api/vendor/delete-by-email \
  -H "Content-Type: application/json" \
  -d '{"email": "test@vendor.com"}'
```

### Delete vendor using JavaScript (fetch)

```javascript
const deleteVendor = async (email) => {
  try {
    const response = await fetch(
      "http://localhost:5001/api/vendor/delete-by-email",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
};

deleteVendor("vendor@example.com");
```

### Delete vendor using Postman

1. Create a new DELETE request
2. URL: `http://localhost:5001/api/vendor/delete-by-email`
3. Headers: `Content-Type: application/json`
4. Body (raw JSON):
   ```json
   {
     "email": "vendor@example.com"
   }
   ```
5. Send

## 🔧 Implementation Details

### Controller Location

`backend/controllers/vendorController.js`

### Route Location

`backend/routes/vendorRoutes.js`

### Function Name

`deleteVendorByEmail`

### Process Flow

1. Validate email is provided
2. Search for vendor by email
3. Delete vendor from database
4. Attempt to delete associated company logo from GridFS
5. Return success response with deleted vendor info

---

**Created:** December 11, 2025  
**Status:** ✅ Active and Available in Swagger UI  
**Access:** http://localhost:5001/api-docs
