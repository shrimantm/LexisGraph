import os
import requests
from jose import jwt
from fastapi import HTTPException, Depends, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional

# Clerk Configuration
CLERK_API_URL = os.getenv("CLERK_API_URL", "https://api.clerk.com/v1")
CLERK_SECRET_KEY = os.getenv("CLERK_SECRET_KEY")
CLERK_JWKS_URL = os.getenv("CLERK_JWKS_URL") # e.g. https://<your-domain>/.well-known/jwks.json

security = HTTPBearer()

class ClerkAuth:
    def __init__(self):
        self.jwks = None
        self._fetch_jwks()

    def _fetch_jwks(self):
        if not CLERK_JWKS_URL:
            return
        try:
            response = requests.get(CLERK_JWKS_URL)
            self.jwks = response.json()
        except Exception as e:
            print(f"Error fetching JWKS: {e}")

    async def verify_token(self, auth: HTTPAuthorizationCredentials = Security(security)):
        token = auth.credentials
        
        if not self.jwks:
            self._fetch_jwks()
            if not self.jwks:
                raise HTTPException(status_code=500, detail="JWKS not configured")

        try:
            # Note: In a real app, you'd want to cache the public key and handle rotation
            unverified_header = jwt.get_unverified_header(token)
            rsa_key = {}
            for key in self.jwks["keys"]:
                if key["kid"] == unverified_header["kid"]:
                    rsa_key = {
                        "kty": key["kty"],
                        "kid": key["kid"],
                        "use": key["use"],
                        "n": key["n"],
                        "e": key["e"]
                    }
            
            if rsa_key:
                payload = jwt.decode(
                    token,
                    rsa_key,
                    algorithms=["RS256"],
                    # Clerk JWTs usually have 'iss' and 'aud'
                    # You can add checks here if needed
                )
                return payload
            
            raise HTTPException(status_code=401, detail="Invalid token")
        except Exception as e:
            raise HTTPException(status_code=401, detail=str(e))

clerk_auth = ClerkAuth()

async def get_current_user(payload: dict = Depends(clerk_auth.verify_token)):
    return {
        "id": payload.get("sub"),
        "email": payload.get("email"), # Clerk can include email in JWT if configured
    }
