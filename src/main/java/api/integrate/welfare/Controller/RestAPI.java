package api.integrate.welfare.Controller;

import jakarta.servlet.http.HttpServletRequest;
import org.json.JSONObject;
import org.json.XML;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;

@RestController
public class RestAPI {
    @Value("${api.encodeKey}")
    private String encodedKey;

    @RequestMapping(value = "/test", method = RequestMethod.GET)
    public String test(HttpServletRequest req){
        try {
            StringBuilder urlParams = new StringBuilder("http://apis.data.go.kr/B554287/NationalWelfareInformations/NationalWelfarelist");
            urlParams.append("?" + URLEncoder.encode("serviceKey","UTF-8") + "=" + encodedKey); /*Service Key*/

            req.getParameterMap().forEach((key, value) -> {
                urlParams.append("&" + key + "=" + value[0]);
            });
            URL url = new URL(urlParams.toString());
            System.out.println(url.toString());

            HttpURLConnection conn = (HttpURLConnection) url.openConnection();
            conn.setRequestMethod("GET");
            conn.setRequestProperty("Content-type", "application/json");
            System.out.println("Response code: " + conn.getResponseCode());

            if(conn.getResponseCode() == 302){
                String newUrl = conn.getHeaderField("Location");
                conn = (HttpURLConnection) new URL(newUrl).openConnection();
                conn.setRequestMethod("GET");
                conn.setRequestProperty("Content-type", "application/xml");
                System.out.println("Response code: " + conn.getResponseCode());
            }

            BufferedReader rd;
            if(conn.getResponseCode() >= 200 && conn.getResponseCode() <= 300) {
                rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            } else {
                rd = new BufferedReader(new InputStreamReader(conn.getErrorStream()));
            }

            StringBuilder sb = new StringBuilder();
            String line;
            while ((line = rd.readLine()) != null) {
                sb.append(line);
            }
            rd.close();
            conn.disconnect();

            JSONObject jsonObject = XML.toJSONObject(sb.toString());
            System.out.println(jsonObject);
            return jsonObject.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
