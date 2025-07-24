# [STORY-001] Implement useCounter Hook

**Creation Date**: 2024-01-20  
**Author**: [Your Name]  
**Priority**: Medium  
**Estimate**: 2-3 hours

---

## 📋 Context

We need a custom hook to manage counters in a standardized way throughout the application. Currently, several components reimplement the same increment/decrement logic.

### Background

- Why is this task necessary? Avoid code duplication and standardize counter behavior
- What problem does it solve? Inconsistency in counter implementation and rework
- How does it relate to other functionalities? Will be used in quantity components, pagination, etc.

---

## 🎯 Objectives

### Main Objective

Create a reusable hook that manages counter state with increment, decrement, and reset functionalities.

### Secondary Objectives

- [x] Allow initial, minimum, and maximum values
- [x] Include reset function
- [x] Add custom step support
- [x] Implement complete unit tests

---

## 🔧 Technical Requirements

### Mandatory Features

1. **Counter state**: Manage current numeric value
2. **Increment**: Increase value respecting maximum
3. **Decrement**: Decrease value respecting minimum
4. **Reset**: Return to initial value

### Optional Features

- Custom step for increment/decrement
- Callbacks for value changes
- Limit validation

### Technical Constraints

- Must be compatible with React 18+
- Cannot cause unnecessary re-renders
- Must follow project hook patterns

---

## 🛠 Tools and Technologies

### Languages

- [x] TypeScript

### Frameworks/Libraries

- [x] React

### Development Tools

- [x] Jest (testing)
- [x] ESLint (linting)
- [x] Prettier (formatting)

---

## 📝 Detailed Specifications

### Interface/API

```typescript
interface UseCounterOptions {
  initialValue?: number;
  min?: number;
  max?: number;
  step?: number;
}

interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  setValue: (value: number) => void;
}

function useCounter(options?: UseCounterOptions): UseCounterReturn;
```

### Expected Behavior

1. **Basic Scenario**: Hook returns count=0 and control functions
2. **With Limits**: Increment stops at maximum, decrement stops at minimum
3. **Reset**: Returns to initialValue regardless of current value

### Use Cases

- **Simple Counter**: No limits, increment/decrement by 1
- **Product Quantity**: With minimum 0 and maximum from stock
- **Pagination**: With minimum 1 and maximum based on total pages

---

## ✅ Acceptance Criteria

### Functional

- [x] Hook maintains counter state correctly
- [x] Increment/decrement respect defined limits
- [x] Reset works regardless of current value
- [x] setValue allows setting value directly (respecting limits)

### Non-Functional

- [x] Performance: Doesn't cause unnecessary re-renders
- [x] Usability: Simple and intuitive API
- [x] Maintainability: Well-documented and typed code

### Testing

- [x] Unit tests implemented
- [x] Coverage of at least 95%
- [x] Documentation updated

---

## 🧪 Test Scenarios

### Basic Tests

1. **Initial Test**: Hook starts with default value (0)
2. **Increment Test**: Increment increases value by 1
3. **Decrement Test**: Decrement decreases value by 1
4. **Reset Test**: Reset returns to initial value

### Edge Case Tests

1. **Maximum Limit**: Increment doesn't exceed max
2. **Minimum Limit**: Decrement doesn't go below min
3. **Custom Step**: Increment/decrement respect step
4. **Invalid Initial Value**: Behavior with initialValue outside limits

---

## 📚 References

### Documentation

- [React Hooks Documentation](https://react.dev/reference/react)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

### Examples

- [useCounter from Ahooks](https://ahooks.js.org/hooks/use-counter)
- [useCounter from React-Use](https://github.com/streamich/react-use/blob/master/docs/useCounter.md)

---

## 🚨 Special Considerations

### Impacts

- **Breaking Changes**: No - new hook
- **Dependencies**: No new dependencies required
- **Compatibility**: React 16.8+ (hooks)

### Risks

- Performance impact if poorly implemented - Mitigation: use useCallback
- Unnecessary complexity - Mitigation: keep API simple

### Additional Notes

This hook should be generic enough to be used in different contexts, but specific enough to be useful.

---

## 📝 Implementation Notes

_Remember to:_

- Use useCallback for returned functions
- Validate limits in setValue
- Consider adding to hooks index.ts

---

**Status**: Pending  
**Last Update**: 2024-01-20
