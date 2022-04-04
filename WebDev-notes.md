# Intro
This document contains all the different information about HTML, communication, storage, prod vs dev and other topics with relation to web development.

# HTML Sessions and Cookies
(todo - fact proof)
Let's assume that our server uses cookies to identify users. Process goes like this:

1. User requests a service
2. Server receives the request:
   1. Creates a cookie for the user (because incoming request didn't contain any cookie yet):
      - request.session.(anything) = (received + created information we need to store in cookie)
   2. Server stores this received session inside a database (for example redis for fast communication)
      - redis returns a key: **session**:*fiuqb4gpiuqb2i4jtb*
   3. Server encrypts the cookie using its secret key.
      - encrypted = key X serverSecret
   4. Then it replies to the client with a Set-Cookie header with this new cookie.
     - Set-cookie: encrypted
   5. Client browser stores this cookie. 
3. Client later requests another service, but since it already has the cookie, browser will attach it to the request.
4. Server will take the cookie, decrypt it using its secret and make a request to the database for the cookie information.

# Package Managers

## NPM and Yarn
NPM is traditional and works well. Yarn is similar, considered rather as an alternative instead of replacement[^1]. 

[^1]: At the time of Yarn release it had features which NPM didn't offer, making it an enhancement over NPM. Since then NPM introduced crucial updates proving our statement.

## pNPM
I discovered also pNPM which reminds me of Maven and POM from Java. It keeps local storage and points every installed package towards it so we don't have to download many copies of the same package.