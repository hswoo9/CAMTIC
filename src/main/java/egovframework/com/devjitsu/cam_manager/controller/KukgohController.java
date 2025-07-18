package egovframework.com.devjitsu.cam_manager.controller;

import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import egovframework.com.devjitsu.cam_manager.service.KukgohService;
import egovframework.devjitsu.common.utiles.CSVKeyUtil;
import egovframework.devjitsu.common.utiles.EsbUtils;
import org.apache.commons.httpclient.HttpClient;
import org.apache.commons.httpclient.HttpVersion;
import org.apache.commons.httpclient.methods.PostMethod;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.*;
import java.net.ConnectException;
import java.net.HttpURLConnection;
import java.net.SocketTimeoutException;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class KukgohController {

    @Autowired
    private KukgohService kukgohService;

    @RequestMapping("/kukgoh/getCmmnCodeList")
    public String getCmmnCodeList(@RequestParam Map<String, Object> params, Model model) {

        model.addAttribute("list", kukgohService.getCmmnCodeList(params));

        return "jsonView";
    }

    @RequestMapping("/kukgoh/getCmmnCodeDetailList")
    public String getCmmnCodeDetailList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", kukgohService.getCmmnCodeDetailList(params));

        return "jsonView";
    }

    @RequestMapping("/kukgoh/setCommCodeObject")
    public String setCommCodeObject(@RequestParam Map<String, Object> params, Model model) {

        try{
            kukgohService.setCommCodeObject(params);

            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }


        return "jsonView";
    }

    @RequestMapping("/kukgoh/getPayAppList")
    public String getPayAppList(@RequestParam Map<String, Object> params, Model model) {

        model.addAttribute("list", kukgohService.getPayAppList(params));

        return "jsonView";
    }

    @RequestMapping("/kukgoh/setEnaraSendExcept")
    public String setEnaraSendExcept(@RequestParam Map<String, Object> params, Model model) {

        kukgohService.setEnaraSendExcept(params);

        return "jsonView";
    }

    @RequestMapping("/kukgoh/setEnaraMngStat")
    public String setEnaraMngStat(@RequestParam Map<String, Object> params, Model model) {

        kukgohService.setEnaraMngStat(params);

        return "jsonView";
    }

    @RequestMapping("/kukgoh/getBudgetGroupList")
    public String getBudgetGroupList(@RequestParam Map<String, Object> params, Model model) {

        model.addAttribute("list", kukgohService.getBudgetGroupList(params));

        return "jsonView";
    }

    @RequestMapping("/kukgoh/getEnaraBudgetCdList")
    public String getEnaraBudgetCdList(@RequestParam Map<String, Object> params, Model model) {

        model.addAttribute("list", kukgohService.getEnaraBudgetCdList(params));

        return "jsonView";
    }

    @RequestMapping("kukgoh/setEnaraBudgetCode")
    public String setEnaraBudgetCode(@RequestParam Map<String, Object> params, Model model) {

        try{
            kukgohService.setEnaraBudgetCode(params);

            model.addAttribute("code", 200);
            model.addAttribute("message", "저장되었습니다.");
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/kukgoh/delBudgetCodeMatch")
    public String delBudgetCodeMatch(@RequestParam Map<String, Object> params, Model model) {

        try{
            kukgohService.delBudgetCodeMatch(params);

            model.addAttribute("code", 200);
            model.addAttribute("message", "설정 취소되었습니다.");
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/kukgoh/getProjectList")
    public String getProjectList(@RequestParam Map<String, Object> params, Model model) {

        model.addAttribute("list", kukgohService.getProjectList(params));

        return "jsonView";
    }

    @RequestMapping("/kukgoh/getEnaraPjtList")
    public String getEnaraPjtList(@RequestParam Map<String, Object> params, Model model) {

    	model.addAttribute("list", kukgohService.getEnaraPjtList(params));

    	return "jsonView";
    }

    @RequestMapping("/kukgoh/setEnaraProject")
    public String setEnaraProject(@RequestParam Map<String, Object> params, Model model) {
        try{
            kukgohService.setEnaraProject(params);

            model.addAttribute("code", 200);
            model.addAttribute("message", "설정되었습니다.");
        } catch(Exception e){
            e.printStackTrace();
        }
    	return "jsonView";
    }

    @RequestMapping("/kukgoh/delEnaraProject")
    public String delEnaraProject(@RequestParam Map<String, Object> params, Model model) {
        try{
            kukgohService.delEnaraProject(params);

            model.addAttribute("code", 200);
            model.addAttribute("message", "취소되었습니다.");
        } catch(Exception e){
            e.printStackTrace();
        }
    	return "jsonView";
    }

    @RequestMapping("/kukgoh/getExecutionInfo")
    public String getExecutionInfo(@RequestParam Map<String, Object> params, Model model) {


        model.addAttribute("rs", kukgohService.getExecutionInfo(params));

        return "jsonView";
    }

    @RequestMapping("/kukgoh/getExecutionInfoList")
    public String getExecutionInfoList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("rs", kukgohService.getExecutionInfoList(params));
        return "jsonView";
    }

    @RequestMapping("/kukgoh/getEnaraBankList")
    public String getEnaraBankList(@RequestParam Map<String, Object> params, Model model) {

        model.addAttribute("list", kukgohService.getEnaraBankList(params));

        return "jsonView";
    }

    @RequestMapping("/kukgoh/sendEnara")
    public String sendEnara(@RequestParam Map<String, Object> params, Model model) {

        try{
            Map<String, Object> rsParams = kukgohService.sendEnara(params);

//            EnaraCall(rsParams);

            model.addAttribute("rs", rsParams);
            model.addAttribute("code", 200);
        }catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/kukgoh/test")
    public String kukgohTest (@RequestParam Map<String, Object> params) throws IOException{
        EnaraCall(params);
        return "jsonView";
    }

    private void EnaraCall(Map<String, Object> params) {
        HttpClient httpClient = new HttpClient();

        try {
            int wasNum = 1;
            String systemCode = "CTIC";
            String interfaceId = params.get("INTRFC_ID").toString();

            // 개발 포트 45000, 운영 포트 41000
            String url = "http://218.158.231.92:41000/esb/HttpListenerServlet";

            int timeout = 0;

            // 송신 메시지 생성
            Map<String, Object> dataStream = makeMessage(interfaceId, systemCode, wasNum, params);

            String dataStreamStr = EsbUtils.map2Json(dataStream);

            String result = call(url, timeout, dataStreamStr, httpClient);

            System.out.println("result: " + result);

            if(result != null && !"".equals(result)){
                Map<String, Object> resutMap = EsbUtils.json2Map(result);
                // log
                System.out.println("result data: " + resutMap);
                resutMap.put("excutCntcId", params.get("EXCTNC_CNTC_ID"));

                Map<String, Object> tempMap = kukgohService.getErpSendTrscId(resutMap);
                if(tempMap != null){
                    kukgohService.delErpSendTrscId(tempMap);
                }

                kukgohService.insDjErpSend(resutMap);
                if ("SUCC".equals(resutMap.get("rspCd"))) { // 연계 성공
                    // 연계 성공시 실행할 로직 작성
                } else { // 연계 실패공공/민간기관 ERP 연계 개발가이드
                    // 실패 업무 로직 추가
                }
            }
        } catch(ConnectException e){
            System.out.println("Connection ERROR : " + e.getMessage());
        } catch (SocketTimeoutException e){
            System.out.println("SocketTimeout ERROR : " + e.getMessage());
        } catch (Exception e){
            System.out.println("ERROR : " + e.getMessage());
        }

    }

    private String call(String url, int timeout, String dataStream, HttpClient httpClient) throws Exception {
        String result = "";
        PostMethod post = null;


        try{
            post = new PostMethod(url);
            post.getParams().setParameter("http.protocol.version", HttpVersion.HTTP_1_1);
            post.getParams().setParameter("http.protocol.content-charset", "UTF-8");
            post.getParams().setParameter("http.socket.timeout", timeout);
            post.addParameter("dataStream", dataStream);
            int status = httpClient.executeMethod(post);
            if (status == 200) {
                BufferedReader reader = new BufferedReader(new InputStreamReader(post.getResponseBodyAsStream(), post.getResponseCharSet()));
                StringBuffer response = new StringBuffer();
                String line = "";
                while ((line = reader.readLine()) != null) {
                    response.append(line);
                }
                result = response.toString();
                reader.close();
            } else {
                // http 호출 실패
                System.out.println("http status code = " + status);
            }
        } catch (Exception e){
            throw e;
        } finally {
            try{
                post.releaseConnection();
            } catch (Exception e){

                throw e;
            }
        }

        return result;
    }

    private Map<String, Object> makeMessage(String interfaceId, String systemCode, int wasNum, Map<String, Object> params) {
        Map<String, Object> dataStream = new HashMap<String, Object>();

        dataStream.put("intfId", interfaceId);
        dataStream.put("intfTrscId", params.get("TRNSC_ID"));

        return dataStream;
    }

    @RequestMapping("/kukgoh/getEtaxInfo")
    public String getEtaxInfo(@RequestParam Map<String ,Object> params, Model model){

        Map<String, Object> result = kukgohService.getEtaxInfo(params);
        Map<String, Object> resultSendMsg = kukgohService.sendResultEtaxData(result);
        model.addAttribute("result", result);
        model.addAttribute("resultSendMsg", resultSendMsg);

        return "jsonView";
    }

    @RequestMapping("/kukgoh/sendEtaxData")
    public String sendEtaxData(@RequestParam Map<String ,Object> params, Model model){

        try {
            Map<String, Object> reParams = kukgohService.sendEtaxData(params);
            model.addAttribute("reParams", reParams);
            model.addAttribute("code", 200);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/kukgoh/getCmmnCode")
    public String getCmmnCode(@RequestParam Map<String ,Object> params, Model model){

        String csvFile = "/fs_data/mtDir/rcv/"+params.get("INTRFC_ID").toString();

        List<Map<String, Object>> cmmnCodeList = new ArrayList<>();
        List<Map<String, Object>> cmmnCodeDetList = new ArrayList<>();

        File dir = new File(csvFile);
        FilenameFilter filter = new FilenameFilter() {
            public boolean accept(File dir, String name) {
                return name.endsWith(".csv");
            }
        };

        String[] children = dir.list(filter);
        String filename = "";
        if (children == null) {
            System.out.println("That directory does not exist.");
        } else {
            for (int i=0; i< children.length; i++) {
                filename = children[i];
                System.out.println(filename);
            }
        }

        csvFile += "/" + filename;

        try (CSVReader reader = new CSVReader(new InputStreamReader(new FileInputStream(csvFile), "EUC-KR"))) {
            String[] data;
            while ((data = reader.readNext()) != null) {
                if(data[0].contains("T_IFS_ERP_CMMN_CODE_DETAIL")) {
                    break;
                }

                if(data[0].contains("T_IFS_ERP_CMMN_CODE") || data[0].contains("CNTC_SN")) {
                    System.out.println(data[0]);
                    continue;
                } else {
                    Map<String, Object> map = new HashMap<>();
                    for(int i = 0; i < CSVKeyUtil.T_IFS_ERP_CMMN_CODE.length; i++) {
                        System.out.print(data[i] + " ");
                        map.put(CSVKeyUtil.T_IFS_ERP_CMMN_CODE[i].toString(), data[i].replaceAll("\"", ""));
                    }

                    cmmnCodeList.add(map);
                }
            }

            while ((data = reader.readNext()) != null) {
                if(data[0].contains("T_IFS_ERP_CMMN_CODE")) {
                    break;
                }

                if(data[0].contains("T_IFS_ERP_CMMN_CODE_DETAIL") || data[0].contains("CNTC_SN")) {
                    System.out.println(data[0]);
                    continue;
                } else {
                    Map<String, Object> map = new HashMap<>();
                    for(int i = 0; i < CSVKeyUtil.T_IFS_ERP_CMMN_CODE_DETAIL.length; i++) {
                        System.out.print(data[i] + " ");
                        map.put(CSVKeyUtil.T_IFS_ERP_CMMN_CODE_DETAIL[i].toString(), data[i].replaceAll("\"", ""));
                    }

                    cmmnCodeDetList.add(map);
                }
            }

            model.addAttribute("cmmnCodeList", cmmnCodeList);
            model.addAttribute("cmmnCodeDetList", cmmnCodeDetList);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (CsvValidationException e) {
            throw new RuntimeException(e);
        }

        return "jsonView";
    }


    @RequestMapping("/kukgoh/getInterfaceList")
    public String getInterfaceList(@RequestParam Map<String ,Object> params, Model model){

        model.addAttribute("list", kukgohService.getInterfaceList(params));

        return "jsonView";
    }

    @RequestMapping("/kukgoh/setInterfaceAuto")
    public String setInterfaceAuto(@RequestParam Map<String ,Object> params, Model model) throws Exception{

        String urlStr = "http://218.158.231.92:1000" + params.get("url").toString();

        URL url = new URL(urlStr);

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();

        // 선택적 기본 요청 방식은 GET입니다.
        conn.setRequestMethod("GET");

        // 연결 시간 제한 설정 (5초)
        conn.setConnectTimeout(5000);

        int responseCode = conn.getResponseCode();
        System.out.println("Response Code : " + responseCode);

        if(responseCode == HttpURLConnection.HTTP_OK) {
            BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
            String inputLine;
            StringBuffer response = new StringBuffer();

            while ((inputLine = in.readLine()) != null) {
                response.append(inputLine);
            }
            in.close();

            // 결과 출력
            System.out.println(response.toString());
            model.addAttribute("code", 200);
        } else {
            System.out.println("GET request not worked");
            model.addAttribute("code", 500);
        }

        conn.disconnect();

        return "jsonView";
    }

    @RequestMapping("/kukgoh/getCardPuchasRecptnList")
    public String getCardPuchasRecptnList(@RequestParam Map<String ,Object> params, Model model){

        model.addAttribute("list", kukgohService.getCardPuchasRecptnList(params));

        return "jsonView";
    }

    @RequestMapping("/kukgoh/cancelEnaraMng")
    public String cancelEnaraMng(@RequestParam Map<String ,Object> params, Model model){
        kukgohService.cancelEnaraMng(params);
        model.addAttribute("rs", "sc");

        return "jsonView";
    }

}
