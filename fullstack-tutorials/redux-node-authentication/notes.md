#COOKIES VS TOKENS

## COOKIES
- Valid on one domain only, cant be sent across multiple domains.
- automatically included in all requests.
- **UNIQUE** to each domain
- need to have 

## TOKENS
- Have to manually wire up
- can be sent across different domains.
- Tokens are more widely used when CONTENT server and API server are different, thus requests has to be sent across different domains. (scales better)

### Content server
- Contains bundle.js and index.html file, our app address points here.
- Makes update to backend easier and seperate from frontend.
- Makes scaling much easier as others can use API server apart from our website (mobile apps etc.)

### API server
- needed for data exchange with application.
- Makes update to backend easier and seperate from frontend.
- Makes scaling much easier as others can use API server apart from our website (mobile apps etc.)