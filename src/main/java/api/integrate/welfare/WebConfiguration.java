package api.integrate.welfare;
import org.springframework.boot.autoconfigure.web.servlet.WebMvcAutoConfiguration;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {
    private String url = "http://localhost";
    private int port = 3000;
    private int testEnv = 5;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String[] allowedOrigins = new String[testEnv];
        for(int i=0; i<testEnv; i++){
            allowedOrigins[i] = url+":"+(port+i);
        }
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods("GET", "POST");
    }
}
