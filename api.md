# APIs

# Global types

```typescript
interface Item {
  name: string
  width: number
  length: number
  rotationDegree: number
  isCustom: boolean // either you are an uploaded item or something from ikea
  cost: number // in cents
  image: string
  link?: string // "https://ikea.com/...
}
```

## Accounts

**Ignore for now, all created canvas will be under username "user"**

- /accounts/login
- /accounts/logout
- /accounts/create-account

## Canvas

- `/canvas/all`
    - GET: Returns a list `/canvas/<name>-<uuid>`
- `/canvas/<name>-<uuid>`
    - GET: Get the canvas
        - Returns `Item[]`
    - POST: Overwrite a canvas
        - Send to server: `{items: []Item}`
    - DELETE: Deletes the canvas

## Presets

- /presets
    - GET response:

```typescript
type Presets = {
  [key: string]: []Item
}
// Example:
{
  "kitchen": [
    {
      name: "sink"
    },
    {
      name: "shower"
    }
  ],
  "bedroom": []
}
```

## Uploading furniture (tied to account)

- /furniture/upload