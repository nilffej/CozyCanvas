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

## Canvas

- `/canvas`
    - GET: Returns a list `/canvas/<name>-<uuid>` for all canvases
    - POST: Uploads the list of canvas (canvas should be a dict), returns a list of ids corresponding to the uploaded canvas
- `/canvas/<name>-<uuid>`
    - GET: Get the canvas
        - Returns `Item[]`
        - Send to server: `{items: []Item}`
    - PUT: replaces content of 
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