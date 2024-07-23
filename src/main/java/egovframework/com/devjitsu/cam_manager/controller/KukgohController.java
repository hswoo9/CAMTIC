package egovframework.com.devjitsu.cam_manager.controller;

import com.ibm.icu.text.SimpleDateFormat;
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
import java.util.Date;
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

            EnaraCall(rsParams);

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
//        try {
//            Reader reader = new FileReader("/fs_data/mtDir/rcv/IF-CMM-EFS-0062/IBTC00_IF-CMM-EFS-0062_T00001_1720066721897-data.csv");
//
//            CSVParser csvParser = CSVParser.parse(reader, CSVFormat.DEFAULT);
//
//            for (CSVRecord csvRecord : csvParser) {
//                // Accessing values by the names assigned to each column
//                String CNTC_SN = csvRecord.get("CNTC_SN");
//                String CNTC_JOB_PROCESS_CODE = csvRecord.get("CNTC_JOB_PROCESS_CODE");
//                String INTRFC_ID = csvRecord.get("INTRFC_ID");
//                String TRNSC_ID = csvRecord.get("TRNSC_ID");
//                String FILE_ID = csvRecord.get("FILE_ID");
//                String CNTC_CREAT_DT = csvRecord.get("CNTC_CREAT_DT");
//                String CNTC_TRGET_SYS_CODE = csvRecord.get("CNTC_TRGET_SYS_CODE");
//                String FSYR = csvRecord.get("FSYR");
//                String ASSTN_EXPITM_TAXITM_CODE = csvRecord.get("ASSTN_EXPITM_TAXITM_CODE");
//                String ASSTN_EXPITM_NM = csvRecord.get("ASSTN_EXPITM_NM");
//                String ASSTN_TAXITM_NM = csvRecord.get("ASSTN_TAXITM_NM");
//                String ASSTN_TAXITM_CODE_DC = csvRecord.get("ASSTN_TAXITM_CODE_DC");
//                String ASSTN_EXPITM_TAXITM_SE_CODE = csvRecord.get("ASSTN_EXPITM_TAXITM_SE_CODE");
//                String DELVRY_TRGET_AT = csvRecord.get("DELVRY_TRGET_AT");
//
//
//                System.out.println("Record No - " + csvRecord.getRecordNumber());
//                System.out.println("---------------");
//                System.out.println("CNTC_SN : " + CNTC_SN);
//                System.out.println("CNTC_JOB_PROCESS_CODE : " + CNTC_JOB_PROCESS_CODE);
//                System.out.println("INTRFC_ID : " + INTRFC_ID);
//                System.out.println("TRNSC_ID : " + TRNSC_ID);
//                System.out.println("FILE_ID : " + FILE_ID);
//                System.out.println("CNTC_CREAT_DT : " + CNTC_CREAT_DT);
//                System.out.println("CNTC_TRGET_SYS_CODE : " + CNTC_TRGET_SYS_CODE);
//                System.out.println("FSYR : " + FSYR);
//                System.out.println("ASSTN_EXPITM_TAXITM_CODE : " + ASSTN_EXPITM_TAXITM_CODE);
//                System.out.println("ASSTN_EXPITM_NM : " + ASSTN_EXPITM_NM);
//                System.out.println("ASSTN_TAXITM_NM : " + ASSTN_TAXITM_NM);
//                System.out.println("ASSTN_TAXITM_CODE_DC : " + ASSTN_TAXITM_CODE_DC);
//                System.out.println("ASSTN_EXPITM_TAXITM_SE_CODE : " + ASSTN_EXPITM_TAXITM_SE_CODE);
//                System.out.println("DELVRY_TRGET_AT : " + DELVRY_TRGET_AT);
//                System.out.println("---------------\n\n");
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }

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

}
