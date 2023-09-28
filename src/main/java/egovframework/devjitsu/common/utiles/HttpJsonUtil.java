package egovframework.devjitsu.common.utiles;

import net.sf.json.JSONObject;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Map;

public class HttpJsonUtil {

    /**
     * resource를 요청한다.
     * 
     * @param URL
     * @param parameters : access_token, scope, redirect_url, client_id, client_secret
     * @return String : JSON
     */
    public static String getResourcesToString(String URL, JSONObject parameters) {
        String method = "POST";
        String result = execute(method, URL, parameters);
        return result;
    }

    /**
     * request and response
     * 
     * @param method : POST/GET
     * @param url
     * @param parameters
     * @return
     */
    // public synchronized static String execute(String method, final String url, final JSONObject parameters) {
    public static String execute(String method, final String url, final JSONObject parameters) {
        HttpURLConnection connection = null;
        String result = "";
        int methodCase = 0;
        if (method.toUpperCase().equals("POST"))
            methodCase = 1;
        try {
            switch (methodCase) {
                case 0:
                    connection = openConnection(url.concat("?").concat(formEncode(parameters)));
                    connection.setRequestMethod("GET");
                    connection.connect();
                    break;
                case 1:
                    connection = openConnection(url);
                    connection.setRequestMethod("POST");
                    connection.setDoOutput(true);
                    connection.setRequestProperty("Content-Type", "application/json");
                    connection.connect();
                    final OutputStream out = connection.getOutputStream();

                    // out.write(formEncode(parameters).getBytes());

                    out.write(parameters.toString().getBytes());
                    out.flush();
                    out.close();
                    break;
            }
            final int statusCode = connection.getResponseCode();
            if (statusCode / 100 != 2) {
                // 400, 401, 501
                result = "{\"error\":" + statusCode + "}";
            } else {
                result = readInputStream(connection.getInputStream());
            }
        } catch (IOException e) {
            e.printStackTrace();
            return result;
        } finally {
            if (connection != null)
                connection.disconnect();
        }

        // System.out.println("============== parameter =========== : " + parameters.toString());
        // System.out.println("============== alarm message call =========== : " + result);
        return result;
    }

    /**
     * read InputStream
     * 
     * @param is
     * @return
     * @throws IOException
     */
    public static String readInputStream(InputStream is) throws IOException {
        StringBuilder sb = new StringBuilder();
        BufferedReader in = new BufferedReader(new InputStreamReader(is, "utf-8"));
        String inputLine;
        while ((inputLine = in.readLine()) != null) {
            sb.append(inputLine);
        }
        return sb.toString();
    }

    /**
     * Not Auth
     * 
     * @param url
     * @return
     * @throws IOException
     */
    private static HttpURLConnection openConnection(final String url) throws IOException {
        final HttpURLConnection connection = (HttpURLConnection) new URL(url).openConnection();
        connection.setInstanceFollowRedirects(true);
        connection.setRequestProperty("User-Agent", "newturns.com");
        connection.setRequestProperty("Accept", "application/xhtml+xml,application/xml,text/xml;q=0.9,*/*;q=0.8");
        connection.setRequestProperty("Accept-Language", "en-us,ko-kr;q=0.7,en;q=0.3");
        connection.setRequestProperty("Accept-Encoding", "deflate");
        connection.setRequestProperty("Accept-Charset", "utf-8");
        connection.setRequestProperty("Authorization", "No");
        return connection;
    }

    /**
     * for GET request url encoder
     * 
     * @param parameters
     * @return
     */
    public static String formEncode(final Map<String, String> parameters) {
        final StringBuilder builder = new StringBuilder();
        boolean isFirst = true;
        for (final Map.Entry<String, String> parameter : parameters.entrySet()) {
            if (isFirst)
                isFirst = false;
            else
                builder.append("&");
            final String key = parameter.getKey();
            if (key == null)
                continue;
            builder.append(urlEncode(key));
            builder.append("=");
            builder.append(urlEncode(parameter.getValue()));
        }

        return builder.toString();
    }

    private static String urlEncode(final String s) {
        if (s == null)
            return "";
        try {
            return URLEncoder.encode(s.trim(), "UTF-8").replace("+", "%20").replace("*", "%2A").replace("%7E", "~");
        } catch (final UnsupportedEncodingException e) {
            // ignore.
        }
        return "";
    }
}
