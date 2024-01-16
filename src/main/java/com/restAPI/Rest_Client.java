package com.restAPI;
import static org.apache.http.HttpHeaders.ACCEPT;
import static org.apache.http.HttpHeaders.CONTENT_TYPE;

import org.apache.http.client.methods.HttpDelete;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.methods.HttpPut;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;


import java.net.http.HttpClient;

public class Rest_Client {

    private CloseableHttpClient client;
    private HttpGet allLaptops;
    private HttpGet allLaptopsBrand;
    private HttpGet allLaptopsMemory_Core;
    private HttpPut laptopsUpdate;
    private HttpDelete laptopsDelete;
    private HttpPost addlaptopsService;
    private static final String URL =
            "http://localhost:4567/computersAPI/eshop";

    private String serviceName;

    public Rest_Client() {
        client = HttpClientBuilder.create().build();
    }

    public static void main(String[] args) {
        Rest_Client rs = new Rest_Client();
    }
}
