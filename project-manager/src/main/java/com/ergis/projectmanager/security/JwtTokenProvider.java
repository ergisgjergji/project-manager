package com.ergis.projectmanager.security;

import com.ergis.projectmanager.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import static com.ergis.projectmanager.security.SecurityConstants.EXPIRATION_TIME;
import static com.ergis.projectmanager.security.SecurityConstants.SECRET_KEY;

@Component
public class JwtTokenProvider {

    // Generate the token

    public String generateToken(Authentication authentication) {

        // Get the user that is authenticated at this point
        User user = (User)authentication.getPrincipal();

        Date now = new Date(System.currentTimeMillis());
        Date expirationTime = new Date(now.getTime() + EXPIRATION_TIME);

        String userId = Long.toString(user.getId());

        Map<String, Object> claims = new HashMap<>();
        claims.put("id", userId);
        claims.put("username", user.getUsername());
        claims.put("full_name", user.getFull_name());

        return Jwts.builder()
                .setSubject(userId)
                .setClaims(claims)
                .setIssuedAt(now)
                .setExpiration(expirationTime)
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }

    // Validate the token

    // Get user 'id' from the token
}
