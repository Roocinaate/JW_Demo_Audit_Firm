# Frontend Input Validation Guide

This guide explains how input validation is implemented in the frontend application.

## Validation Methods Used

### 1. **Client-Side Validation (React State)**
- Real-time validation feedback
- Prevents form submission with invalid data
- Immediate user feedback

### 2. **HTML5 Validation**
- Basic browser-level validation (email type, required fields)
- Provides native browser error messages

## Implementation Details

### Login Page (`LoginPage.tsx`)

**Validation Rules:**
- **Username:**
  - Required
  - Minimum 3 characters
  - Maximum 50 characters
  - Only letters, numbers, and underscores allowed

- **Password:**
  - Required
  - Minimum 6 characters

**Features:**
- Errors clear as user types
- Visual error indicators (red border)
- Error messages display below fields

### Admin Dashboard (`AdminDashboard.tsx`)

**Validation Rules:**
- **Username:**
  - Required
  - 3-50 characters
  - Alphanumeric and underscores only

- **Email:**
  - Required
  - Must be valid email format (regex validation)

- **Password:**
  - Required when creating new user
  - Optional when editing (but must be valid if provided)
  - Minimum 6 characters

- **Full Name:**
  - Required
  - 2-100 characters

- **Phone:**
  - Optional
  - Must contain only digits, spaces, dashes, plus signs, and parentheses if provided

**Features:**
- Field-level validation
- Dynamic error messages
- Visual feedback (red borders on invalid fields)

## Validation Flow

1. **User Types** → Input change handler updates state
2. **Error Clearing** → If field has error, clear it when user starts typing
3. **Form Submit** → `validateForm()` function runs all validations
4. **Error Display** → If validation fails, errors are displayed
5. **Submission** → Only proceeds if validation passes

## Code Structure

```typescript
// 1. Define error state
const [validationErrors, setValidationErrors] = useState<ValidationErrors>({})

// 2. Validation function
const validateForm = (): boolean => {
  const errors: ValidationErrors = {}
  
  // Add validation rules
  if (!field.trim()) {
    errors.field = 'Error message'
  }
  
  setValidationErrors(errors)
  return Object.keys(errors).length === 0
}

// 3. Handle input changes
const handleChange = (value: string) => {
  setValue(value)
  // Clear error when user types
  if (validationErrors.field) {
    setValidationErrors({ ...validationErrors, field: undefined })
  }
}

// 4. Form submission
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault()
  if (!validateForm()) {
    return // Stop if validation fails
  }
  // Proceed with submission
}
```

## Styling

Error states are styled with:
- Red border (`input-error` class)
- Light red background
- Error message below field (`validation-error` class)
- Red text color

## Best Practices

1. ✅ Validate on submit (not on every keystroke for better UX)
2. ✅ Clear errors when user starts typing
3. ✅ Show specific, helpful error messages
4. ✅ Visual indicators (red borders, error text)
5. ✅ Prevent submission if validation fails
6. ✅ Validate both client-side AND server-side (backend also validates)

## Notes

- **Client-side validation is for UX** - it provides immediate feedback
- **Server-side validation is for security** - never trust client-side only
- Always validate on the backend as well (which this application does)
