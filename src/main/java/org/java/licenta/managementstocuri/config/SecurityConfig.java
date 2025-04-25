package org.java.licenta.managementstocuri.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .securityMatcher("/**") // aplică regula la toate rutele
                .authorizeHttpRequests(auth -> auth
                        .anyRequest().permitAll() // permite orice fără autentificare
                )
                .csrf(csrf -> csrf.disable()); // dezactivează CSRF
        return http.build();
    }
}
