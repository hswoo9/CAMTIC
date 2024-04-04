package egovframework.com.devjitsu.common.service.impl;

import com.google.common.hash.Hashing;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.common.repository.CommonRepository;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.common.utiles.CommonUtil;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.gw.user.repository.UserRepository;
import egovframework.com.devjitsu.system.repository.MenuManagementRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import javax.net.ssl.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
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

    @Autowired
    private UserRepository userRepository;

    @Override
    public void fileDownLoad(String fileNm, String path, String fileType, HttpServletRequest request, HttpServletResponse response) throws Exception {
        InputStream in = null;
        OutputStream out = null;

        fileNm = URLDecoder.decode(fileNm, "utf-8");

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1") || request.getServerName().contains("218.158.231.186")){
            path = "http://218.158.231.186" + path;
        }else{
            if(!path.contains("http")){
                path = "http://218.158.231.184" + path;
            }
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


        try {
            URL url = new URL(fileUrl);
            // 만약 프로토콜이 https 라면 https SSL을 무시하는 로직을 수행해주어야 한다.('https 인증서 무시' 라는 키워드로 구글에 검색하면 많이 나옵니다.)
            disableSslVerification();
            in = url.openStream();
        }catch (Exception e){
            URL url = new URL(fileUrl.replace("http://218.158.231.184", "http://218.158.231.189"));
            disableSslVerification();
            in = url.openStream();
        }

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
    public List<Map<String, Object>> getDeptList(Map<String, Object> params) {
        return commonRepository.getDeptList(params);
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
                    children.put("MENU_FULL_PATH", "camtic_new|"+children.get("MENU_FULL_PATH"));
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

    @Override
    public List<Map<String, Object>> commonCodeList(Map<String, Object> params) {
        return commonRepository.commonCodeList(params);
    }

    @Override
    public void setDeptInfo(Map<String, Object> params) {
        Map<String, Object> saveMap = new HashMap<>();
        if(params.get("newDeptChk").equals("Y")){
            /** 부서 생성 */
            saveMap.put("parentDeptSeq", "1000");
            saveMap.put("deptSeq", commonRepository.getDeptSeqMax());
            saveMap.put("deptName", params.get("deptName"));
            saveMap.put("deptLevel", 1);
            saveMap.put("path", "");
            saveMap.put("pathName", "");
            saveMap.put("empSeq", params.get("empSeq"));
            saveMap.put("sortSn", params.get("sortSn"));

            commonRepository.setDeptInfo(saveMap);
        }else if(params.get("newTeamChk").equals("Y")){
            /** 팀 생성 */
            saveMap.put("parentDeptSeq", params.get("deptSeq"));
            saveMap.put("deptSeq", commonRepository.getDeptSeqMax());
            saveMap.put("deptName", params.get("teamName"));
            saveMap.put("deptLevel", 2);
            saveMap.put("path", "");
            saveMap.put("pathName", "");
            saveMap.put("empSeq", params.get("empSeq"));
            saveMap.put("sortSn", params.get("sortSn"));

            commonRepository.setDeptInfo(saveMap);
        }

        if(!StringUtils.isEmpty(params.get("deptSeq"))){
            commonRepository.setDeptInfoUpd(params);
        }

        if(!StringUtils.isEmpty(params.get("teamSeq"))){
            commonRepository.setTeamInfoUpd(params);
        }
    }

    @Override
    public void setDeptInfoDel(Map<String, Object> params) {
        commonRepository.setDeptInfoDel(params);
    }

    @Override
    public List<Map<String, Object>> teamList(Map<String, Object> params) {
        return commonRepository.teamList(params);
    }

    @Override
    public List<Map<String, Object>> getSearchMenu(Map<String, Object> params) {
        return commonRepository.getSearchMenu(params);
    }

    @Override
    public Map<String, Object> getSearchMenuCnt(Map<String, Object> params) {

        Map<String, Object> resultMap = new HashMap<>();

        int cnt = commonRepository.getSearchMenuCnt(params);
        if (cnt == 9) {
            resultMap.put("status", 500);
        } else {
            commonRepository.setFavoriteMenuInsert(params);
            resultMap.put("status", 200);
        }
        return resultMap;
    }

    @Override
    public List<Map<String, Object>> getFvMenu(Map<String, Object> params) {
        return commonRepository.getFvMenu(params);
    }
    @Override
    public void setDelFvMenu(Map<String, Object> params) {
        commonRepository.setDelFvMenu(params);
    }

    @Override
    public void getContentFileDelOne(Map<String, Object> params) {
        commonRepository.getContentFileDelOne(params);
    }

    @Override
    public void insFileUpload(Map<String, Object> fileParameters) {
        commonRepository.insFileUpload(fileParameters);
    }

    @Override
    public Map<String, Object> getDept(Map<String, Object> params) {
        return commonRepository.getDept(params);
    }

    @Override
    public List<Map<String, Object>> getAlarmList(Map<String, Object> params) {
        return commonRepository.getAlarmList(params);
    }

    @Override
    public void setAlarm(Map<String, Object> params) {
        commonRepository.setAlarm(params);
    }

    @Override
    public void setAlarmCheck(Map<String, Object> params) {
        commonRepository.setAlarmCheck(params);
    }

    @Override
    public void setAlarmTopListDel(Map<String, Object> params) {
        commonRepository.setAlarmTopListDel(params);
    }

    @Override
    public void setAlarmAllCheck(Map<String, Object> params) {
        commonRepository.setAlarmAllCheck(params);
    }

    @Override
    public void setPasswordEncryption(Map<String, Object> params) {
        params.put("encryption", "N");
        List<Map<String, Object>> list = userRepository.getUserEncryptionList(params);
        for(Map<String, Object> data : list){
            String passwordTmp = data.get("LOGIN_PASSWD").toString();
            String password = Hashing.sha256().hashString(passwordTmp, StandardCharsets.UTF_8).toString();
            data.put("password", password);
            commonRepository.setPasswordEncryption(data);
        }
    }

    @Override
    public Map<String, Object> getFileInfo(Map<String, Object> params) {
        return commonRepository.getContentFileOne(params);
    }

    @Override
    public List<Map<String, Object>> getFileList(Map<String, Object> params) {
        return commonRepository.getFileList(params);
    }

    @Override
    public List<Map<String, Object>> getJangCodeList(Map<String, Object> params) {
        return commonRepository.getJangCodeList(params);
    }

    @Override
    public List<Map<String, Object>> getGwanCodeList(Map<String, Object> params) {
        return commonRepository.getGwanCodeList(params);
    }

    @Override
    public List<Map<String, Object>> getHangCodeList(Map<String, Object> params) {
        return commonRepository.getHangCodeList(params);
    }

    @Override
    public Map<String, Object> getJangInfo(Map<String, Object> params) {
        return commonRepository.getJangInfo(params);
    }

    @Override
    public Map<String, Object> getGwanInfo(Map<String, Object> params) {
        return commonRepository.getGwanInfo(params);
    }

    @Override
    public Map<String, Object> getHangInfo(Map<String, Object> params) {
        return commonRepository.getHangInfo(params);
    }

    @Override
    public void setJangInfo(Map<String, Object> params) {
        if(params.containsKey("pk")){
            commonRepository.updJangInfo(params);
        } else {
            commonRepository.insJangInfo(params);
        }
    }

    @Override
    public void setGwanInfo(Map<String, Object> params) {
        if(params.containsKey("pk")){
            commonRepository.updGwanInfo(params);
        } else {
            commonRepository.insGwanInfo(params);
        }
    }

    @Override
    public void setHangInfo(Map<String, Object> params) {
        if(params.containsKey("pk")){
            commonRepository.updHangInfo(params);
        } else {
            commonRepository.insHangInfo(params);
        }
    }

    @Override
    public void delBudgetCode(Map<String, Object> params) {
        Map<String, Object> map = new HashMap<>();
        String keyArr = params.get("pk").toString();

        if("A".equals(params.get("type").toString())){
            for(String pk : keyArr.split(",")){
                map.put("pk", pk);
                commonRepository.delJangCode(map);
            }
        } else if("B".equals(params.get("type").toString())){
            for(String pk : keyArr.split(",")){
                map.put("pk", pk);
                commonRepository.delGwanCode(map);
            }
        } else if("C".equals(params.get("type").toString())){
            for(String pk : keyArr.split(",")){
                map.put("pk", pk);
                commonRepository.delHangCode(map);
            }
        }
    }

    @Override
    public void insFileInfoOne(Map<String, Object> params) {
        commonRepository.insFileInfoOne(params);
    }
}
