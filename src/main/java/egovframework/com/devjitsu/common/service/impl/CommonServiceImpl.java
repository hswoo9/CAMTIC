package egovframework.com.devjitsu.common.service.impl;

import com.google.gson.Gson;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.common.utiles.CommonUtil;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.system.repository.MenuManagementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.net.ssl.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.security.KeyManagementException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.X509Certificate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CommonServiceImpl implements CommonService {

    private static final Logger logger = LoggerFactory.getLogger(CommonServiceImpl.class);

    @Autowired
    private CommonRepository commonRepository;

    @Autowired
    private MenuManagementRepository menuManagementRepository;

    @Override
    public void fileDownLoad(String fileNm, String path, String fileType, HttpServletRequest request, HttpServletResponse response) throws Exception {
        InputStream in = null;
        OutputStream out = null;

        fileNm = URLDecoder.decode(fileNm, "utf-8");

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1") || request.getServerName().contains("121.186.165.80")){
            path = "http://121.186.165.80:8010" + path;
        }else{
            path = "http://10.10.10.114:80" + path;
        }

        String header = request.getHeader("User-Agent");
        if(header.contains("MSIE") || header.contains("Trident")) {
            fileNm = URLEncoder.encode(fileNm, "UTF-8").replaceAll("\\+", "%20");
            System.out.println("MSIE" + fileNm);
            response.setHeader("Content-Disposition", "attachment; filename="+ fileNm +";");
        } else {
            System.out.println("else" + fileNm);
            fileNm = new String(fileNm.getBytes("UTF-8"), "iso-8859-1");
            response.setHeader("Content-Disposition", "attachment; filename=\""+ fileNm +"\"");
        }

        response.setHeader("Pragma", "no-cache;");
        response.setContentType("application/octet-stream");
        response.setHeader("Content-Transfer-Encoding", "binary");

        out = response.getOutputStream();
        String fileUrl = path;
        URL url = new URL(fileUrl);

        // 만약 프로토콜이 https 라면 https SSL을 무시하는 로직을 수행해주어야 한다.('https 인증서 무시' 라는 키워드로 구글에 검색하면 많이 나옵니다.)
        disableSslVerification();

        in = url.openStream();
        while(true){
            //파일을 읽어온다.
            int data = in.read();
            if(data == -1){
                break;
            }
            //파일을 쓴다.
            out.write(data);
        }
        in.close();
        out.close();
    }

    @Override
    public String ctDept(String deptSeq) {
        List<Map<String, Object>> list = commonRepository.ctDept();

        List<Map<String, Object>> result = new ArrayList<Map<String, Object>>();

        for (Map<String, Object> map : list) {

            if(map.get("dept_seq").equals(deptSeq)){
                map.put("selected", true);
                map.put("expanded", true);
            }else{
                map.put("expanded", true);
            }
        }

        //부모
        for (Map<String, Object> vo : list) {
            if(vo.get("dept_seq").equals("1000")){
                vo.put("path", "camtic_new|"+vo.get("path"));
            }
            //자식
            for (Map<String, Object> vo2 : list) {

                if(vo.get("dept_seq").equals(vo2.get("parent_dept_seq"))){
                    vo2.put("path", "camtic_new|"+vo2.get("path"));
                    List<Map<String, Object>> sub = new ArrayList<Map<String, Object>>();
                    if(vo.containsKey("items")){
                        sub = (List<Map<String, Object>>) vo.get("items");
                        sub.add(vo2);
                        vo.put("items", sub);
                    }else{
                        sub.add(vo2);
                        vo.put("items", sub);
                    }

                }

            }

            if(vo.get("org_type").equals("C")){
                result.add(vo);
            }

        }

        return new Gson().toJson(result);
    }

    @Override
    public List<Map<String, Object>> getUserList(Map<String, Object> params) {
        return commonRepository.getUserList(params);
    }

    @Override
    public int getUserListTotal(Map<String, Object> map) {
        return commonRepository.getUserListTotal(map);
    }

    @Override
    public String getMenuFullJsonString(LoginVO loginVO) {
        List<Map<String, Object>> treeList = new ArrayList<>();

        List<Map<String, Object>> getMenuList = menuManagementRepository.getMainMenuList(loginVO);
        for(Map<String, Object> parent : getMenuList){
            if(parent.get("MENU_DEPTH").equals("0")){
                parent.put("MENU_FULL_PATH", "epis|" + parent.get("MENU_FULL_PATH"));
            }

            for(Map<String, Object> children : getMenuList){
                if(parent.get("MENU_ID").equals(children.get("UPPER_MENU_ID"))){
                    children.put("MENU_FULL_PATH", "epis_new|"+children.get("MENU_FULL_PATH"));
                    List<Map<String, Object>> childrenMenu = new ArrayList<Map<String, Object>>();
                    if(parent.containsKey("childrenMenu")){
                        childrenMenu = (List<Map<String, Object>>) parent.get("childrenMenu");
                        childrenMenu.add(children);
                        parent.put("childrenMenu", childrenMenu);
                    }else{
                        childrenMenu.add(children);
                        parent.put("childrenMenu", childrenMenu);
                    }
                }
            }

            if(parent.get("MENU_DEPTH").equals("0")){
                treeList.add(parent);
            }
        }
        return new Gson().toJson(treeList);
    }

    @Override
    public Map<String, Object> getContentFileOne(Map<String, Object> params) {
        Map<String, Object> result = new HashMap<>();

        try {
            Map<String, Object> fileMap = new HashMap<>();
            fileMap = commonRepository.getContentFileOne(params);

            CommonUtil commonUtil = new CommonUtil();
            boolean isDelete = commonUtil.deleteFile(new String[]{fileMap.get("file_uuid").toString()}, fileMap.get("file_path").toString());

            if(isDelete){
                commonRepository.getContentFileDelOne(params);
            }else{
                throw new Exception();
            }

            result.put("code", "200");
            result.put("message", "파일이 삭제되었습니다.");
        }catch (Exception e){
            result.put("code", "500");
            result.put("message", "파일 삭제 중 에러가 발생했습니다.");
        }

        return result;
    }

    public void disableSslVerification(){
        // TODO Auto-generated method stub
        try
        {
            // Create a trust manager that does not validate certificate chains
            TrustManager[] trustAllCerts = new TrustManager[] {new X509TrustManager() {
                public java.security.cert.X509Certificate[] getAcceptedIssuers() {
                    return null;
                }
                public void checkClientTrusted(X509Certificate[] certs, String authType){
                }
                public void checkServerTrusted(X509Certificate[] certs, String authType){
                }
            }
            };

            // Install the all-trusting trust manager
            SSLContext sc = SSLContext.getInstance("SSL");
            sc.init(null, trustAllCerts, new java.security.SecureRandom());
            HttpsURLConnection.setDefaultSSLSocketFactory(sc.getSocketFactory());

            // Create all-trusting host name verifier
            HostnameVerifier allHostsValid = new HostnameVerifier() {
                public boolean verify(String hostname, SSLSession session){
                    return true;
                }
            };

            // Install the all-trusting host verifier
            HttpsURLConnection.setDefaultHostnameVerifier(allHostsValid);
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (KeyManagementException e) {
            e.printStackTrace();
        }
    }
}
