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

import java.io.*;
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

            model.addAttribute("rs", rsParams);
            model.addAttribute("code", 200);
        }catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }


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
