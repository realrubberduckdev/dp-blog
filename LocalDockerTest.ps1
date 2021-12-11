$tagName = "dpblog/test"
docker build -t $tagName .

Write-Host "Explore to http://localhost"
docker run --rm -p 80:80 $tagName
# Open your browser at http://localhost
