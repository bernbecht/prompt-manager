## 23.08.2023

### Problem

How to evolve/update a schema in API without breaking client (especially in prod)?

### Solution #1

**API**
Books
author -> person

**Client**

const Books: Books = fetch(Books)

for Book in Books
render Book.author;

1. Alignment between API and Client teams
2. Prepare Client code for migration before API is deployed

```
// extend current type with the new things
type Books extend Books {
  person: string
}

const Books: Books = fetch(Books)

for Book in Books
  const author = Book.author ?? Book.person; // how to overcome ts error?
  render author;
```

3. Update Client with new type and change code accordinlgy

### Solution 2

1. Deploy API as v2 but keep v1
2. Release new shared types
3. Change the endpoint in Client and update the shared-types package
