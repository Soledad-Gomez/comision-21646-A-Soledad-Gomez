fetch('http://localhost:3000/api/tasks')
    .then(res => res.json())
    .then(data => console.log(data))
    