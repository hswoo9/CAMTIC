package egovframework.com.devjitsu.cam_manager.controller;

import com.ibm.icu.text.SimpleDateFormat;
import egovframework.com.devjitsu.cam_manager.service.KukgohService;
import egovframework.devjitsu.common.utiles.CSVKeyUtil;
import egovframework.devjitsu.common.utiles.EsbUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.OutputStreamWriter;
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

//    private String makeCSVFile(Map<String, Object> params) {
//        String fileName = "";
//        String filepath = "/home/upload/kukgoh";
//
//        SimpleDateFormat sf = new SimpleDateFormat("yyyyMMddHHmmss");
//        String cntcCreateDt = sf.format(new Date());
//
//        String systemCode = "CTIC";
//        int wasNum = 1;
//        String intrfcId = "IF-EXE-EFR-0074";
//        String trnscId = EsbUtils.getTransactionId(intrfcId, systemCode, wasNum);
//
//        params.put("TRNSC_ID", trnscId);
//
//        try {
//            if (directoryConfirmAndMake(filepath)) { // 로컬경로 폴더 없으면 생성 ( 로컬에 csv파일 생성 로직 )
//                fileName = filepath + "/" + trnscId + "-data.csv";
//                BufferedWriter fw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(fileName), "EUC-KR"));
//                Map<String, Object> map2 = new HashMap<String, Object>();
//                int i = 0;
//
//                fw.write("\"[TABLE_NAME:T_IFR_EXCUT_REQUST_ERP]\"");
//                fw.newLine();
//
//                List<Map<String, Object>> execRequestCsvList = kukgohService.getExecRequestCsvList(params);
//
//                for (Map<String, Object> dom : execRequestCsvList) {
//
//                    if (dom.get("DIV").toString().equals("0") || Integer.parseInt(dom.get("DIV").toString()) == 0) {
//
//                        for (int j = 0; j < (dom.size() - 1); j++) {
//
//                            fw.write("\"" + (String) dom.get(CSVKeyUtil.T_IFR_EXCUT_REQUST_ERP[j]) + "\"");
//                            if (!(j == (dom.size() - 2))) {
//                                fw.write(",");
//                            }
//                        }
//                    } else {
//
//                        for (int j = 0; j < (dom.size() - 1); j++) {
//                            fw.write("\"" + (String) dom.get(CSVKeyUtil.T_IFR_EXCUT_REQUST_ERP[j]) + "\"");
//                            if (!(j == (dom.size() - 2))) {
//                                fw.write(",");
//                            }
//                        }
//                    }
//
//                    fw.newLine();
//                }
//
//                fw.write("\"[TABLE_NAME:T_IFR_EXCUT_EXPITM_ERP]\"");
//                fw.newLine();
//
//                for (Map<String, Object> dom : execBimokCsvList) {
//
//                    if (dom.get("DIV").toString().equals("0") || Integer.parseInt(dom.get("DIV").toString()) == 0) {
//                        for (int j = 0; j < (dom.size() - 1); j++) {
//                            fw.write("\"" + (String) dom.get(CSVKeyUtil.T_IFR_EXCUT_EXPRITM_ERP[j]) + "\"");
//                            if (!(j == (dom.size() - 2))) {
//                                fw.write(",");
//                            }
//                        }
//                    } else {
//                        for (int j = 0; j < (dom.size() - 1); j++) {
//                            fw.write("\"" + (String) dom.get(CSVKeyUtil.T_IFR_EXCUT_EXPRITM_ERP[j]) + "\"");
//                            if (!(j == (dom.size() - 2))) {
//                                fw.write(",");
//                            }
//                        }
//                    }
//                    fw.newLine();
//                }
//
//                fw.write("\"[TABLE_NAME:T_IFR_EXCUT_FNRSC_ERP]\"");
//                fw.newLine();
//
//                for (Map<String, Object> dom : execBimokDataCsvList) {
//
//                    if (dom.get("DIV").toString().equals("0") || Integer.parseInt(dom.get("DIV").toString()) == 0) {
//                        for (int j = 0; j < (dom.size() - 1); j++) {
//                            fw.write("\"" + (String) dom.get(CSVKeyUtil.T_IFR_EXCUT_FNRSC_ERP[j]) + "\"");
//                            if (!(j == (dom.size() - 2))) {
//                                fw.write(",");
//                            }
//                        }
//                    } else {
//                        for (int j = 0; j < (dom.size() - 1); j++) {
//                            fw.write("\"" + (String) dom.get(CSVKeyUtil.T_IFR_EXCUT_FNRSC_ERP[j]) + "\"");
//                            if (!(j == (dom.size() - 2))) {
//                                fw.write(",");
//                            }
//                        }
//                    }
//                    fw.newLine();
//                }
//
//                fw.flush();
//                fw.close();
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return fileName;
//    }
//
//    public boolean directoryConfirmAndMake(String targetDir) {
//        boolean result = true;
//        File d = new File(targetDir);
//        if (!d.isDirectory()) {
//            if (!d.mkdirs()) {
//                System.out.println("생성 실패");
//                result = false;
//            }
//        }
//        return result;
//    }
//
//    /**
//     * 트랜잭션ID를 생성한다.
//     */
//    public static String getTransactionId(String intfId, String systemCode, int seq) {
//        String transactionId = ""; // 43 자리
//        // 시스템 정보(6자리)
//        String instanceName = "E" // 인터넷망코드(1자리)
//                + ((systemCode.length() > 3) ? systemCode.substring(0, 3) : rpad(systemCode, 3, "0")) // 시스템코드(3자리)
//                + String.format("%02d", seq); // 서버 일련번호(2자리)
//        // 인터페이스 ID (15자리)
//        String interfaceId = intfId;
//        // Thread 정보(6자리) : "T"(1자리) + Thread 번호(5자리. ex. 00001 ~ 99999)
//        String threadID = "T" + String.format("%05d", Thread.currentThread().getId());
//        // 시간 정보(13자리, long 형식의 현재 시간 값)
//        Long currentTime = System.currentTimeMillis();
//        transactionId = instanceName + "_";
//        transactionId += interfaceId + "_";
//        transactionId += threadID + "_";
//        transactionId += currentTime;
//        return transactionId;
//    }
//
//    /**
//     * Right Padding을 수행한다.
//     */
//    public static String rpad(String str, int length, String addStr) {
//        String result = str;
//        int tempLen = length - str.length();
//        for (int i = 0; i < tempLen; i++) {
//            result += addStr;
//        }
//        return result;
//    }
}
