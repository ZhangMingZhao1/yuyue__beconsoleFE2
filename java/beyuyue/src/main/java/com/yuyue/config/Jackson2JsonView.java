package com.yuyue.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;

@Configuration
public class Jackson2JsonView{
	@Bean
    public static MappingJackson2HttpMessageConverter getMappingJackson2HttpMessageConverter() {
    	return new MappingJackson2HttpMessageConverter();
    }

}
