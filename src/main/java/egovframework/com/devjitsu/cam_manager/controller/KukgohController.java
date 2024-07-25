package egovframework.com.devjitsu.cam_manager.controller;

import com.ibm.icu.text.SimpleDateFormat;
import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;
import egovframework.com.devjitsu.cam_manager.service.KukgohService;
import egovframework.devjitsu.common.utiles.CSVKeyUtil;
import egovframework.devjitsu.common.utiles.EsbUtils;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVParser;
import org.apache.commons.csv.CSVRecord;
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
import java.net.SocketTimeoutException;
import java.nio.charset.StandardCharsets;
import java.util.*;

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

    @RequestMapping("/kukgoh/getExecutionInfo")
    public String getExecutionInfo(@RequestParam Map<String, Object> params, Model model) {


        model.addAttribute("rs", kukgohService.getExecutionInfo(params));

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
            String url = "http://218.158.231.92:45000/esb/HttpListenerServlet";

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
        model.addAttribute("result", result);

        return "jsonView";
    }

    @RequestMapping("/kukgoh/sendEtaxData")
    public String sendEtaxData(@RequestParam Map<String ,Object> params, Model model){

        Map<String, Object> reParams = kukgohService.sendEtaxData(params);
        model.addAttribute("reParams", reParams);

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

}
