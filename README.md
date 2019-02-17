# dataloader-test
a test of facebook's dataloader

# example fetch for step 1

```
fetch("http://localhost:4001/grahpql", { 
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ query: `
    {
      posts {
        title
        Author {
          first_name
          last_name
        }
      }
    }
  ` })
})
.then(res => res.json())
.then(data => console.log(data))
```