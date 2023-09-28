package egovframework.devjitsu.common.utiles;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.mime.HttpMultipartMode;
import org.apache.http.entity.mime.MultipartEntityBuilder;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;

import java.io.File;
import java.nio.charset.Charset;
import java.util.Map;

public class CtPostUrl {

    private final String boundary =  "*****";
    private final String crlf = "\r\n";
    private final String twoHyphens = "--";


    private HttpPost post;
    private MultipartEntityBuilder meb;
    public CtPostUrl() {
        String domain = CtGetProperties.getKey("BizboxA.domain");
        post = new HttpPost(domain +"gw/outProcessUpload.do"); //api
        meb = MultipartEntityBuilder.create();
        meb.setBoundary(boundary);
        meb.setMode(HttpMultipartMode.BROWSER_COMPATIBLE);
        meb.setCharset(Charset.forName("UTF-8"));
    }

    /**
     * YH
     * 2017. 12. 18.
     * 설명 : 텍스트필드
     */
    public void urlTxt(String fileNm, String txt) {
        meb.addTextBody(fileNm, txt);
    }

    /**
     * YH
     * 2017. 12. 18.
     * 설명 : 첨부파일, 중복파일 안됨
     */
    public void urlFile(String fileNm, File file) {
        FileBody cbFile = new FileBody(file, ContentType.MULTIPART_FORM_DATA, fileNm);
        meb.addPart(fileNm, cbFile);
    }

    /**
     * YH
     * 2017. 12. 18.
     * 설명 : api 최종 호출,
     * return result
     */
    public String finish() {
        HttpEntity entity = meb.build();
        post.setEntity(entity);
        HttpResponse response;
        String result = "";

        HttpClient client = HttpClientBuilder.create().build();
        try {
            response = client.execute(post);
            result = EntityUtils.toString(response.getEntity());
        } catch (Exception e) {
        }

        Gson gson = new Gson();
        Map<String, Object> jsonObject = gson.fromJson((String) result,new TypeToken<Map<String, Object>>(){}.getType() );
        System.out.println(jsonObject + "@@@@@@@@@@@@");
        return (String) jsonObject.get("fileKey");
    }


}
