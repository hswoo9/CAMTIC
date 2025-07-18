package egovframework.com.devjitsu.common.utiles;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Map;

public class MapUtil {

    private final String uri = "https://dapi.kakao.com/v2/local/search/address.json";
    private final String streetUri = "https://apis-navi.kakaomobility.com/v1/directions";

    public JSONArray getCoordinate(Map<String, Object> params){
        RestTemplate restTemplate = new RestTemplate();

        String apiKey = "KakaoAK " + "a2a3e1c483ac1e0f3b08086bfd74c656"; // REST API KEY
        String address = params.get("addr").toString();

        // 요청 헤더에 만들기, Authorization 헤더 설정하기
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.set("Authorization", apiKey);
        HttpEntity<String> entity = new HttpEntity<>(httpHeaders);

        UriComponents uriComponents = UriComponentsBuilder
                .fromHttpUrl(uri)
                .queryParam("query",address)
                .build();

        ResponseEntity<String> response = restTemplate.exchange(uriComponents.toString(), HttpMethod.GET, entity, String.class);

        // API Response로부터 body 뽑아내기
        String body = response.getBody();
        JSONObject json = new JSONObject(body);
        // body에서 좌표 뽑아내기
        JSONArray documents = json.getJSONArray("documents");
        String x = documents.getJSONObject(0).getString("x");
        String y = documents.getJSONObject(0).getString("y");

        String originX = "127.08107339088";
        String originY = "35.8623360720182";
        UriComponents streetUriComponents = UriComponentsBuilder
                .fromHttpUrl(streetUri)
                .queryParam("origin",originX+","+originY)
                .queryParam("destination",x+","+y)
                .queryParam("waypoints","")
                .queryParam("priority","RECOMMEND")
                .queryParam("car_fuel","GASOLINE")
                .queryParam("car_hipass","false")
                .queryParam("alternatives","false")
                .queryParam("road_details","false")
                .build();

        ResponseEntity<String> streetResponse = restTemplate.exchange(streetUriComponents.toString(), HttpMethod.GET, entity, String.class);

        // API Response로부터 body 뽑아내기
        String streetBody = streetResponse.getBody();
        JSONObject streetJson = new JSONObject(streetBody);
        JSONArray streetDocuments = streetJson.getJSONArray("routes");



        return streetDocuments;
    }
}
