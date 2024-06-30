package egovframework.com.devjitsu.inside.subHoliday.controller;

import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.inside.subHoliday.repository.SubHolidayRepository;
import egovframework.com.devjitsu.inside.subHoliday.service.SubHolidayService;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.inside.userManage.service.UserManageService;
import egovframework.devjitsu.common.utiles.EgovUserDetailsHelper;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.*;

@Controller
public class SubHolidayController {

    private static final Logger logger = LoggerFactory.getLogger(SubHolidayController.class);

    @Autowired
    private CommonService commonService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Autowired
    private SubHolidayService subHolidayService;

    @Autowired
    private SubHolidayRepository subHolidayRepository;


    //휴가관리 페이지
    @RequestMapping("/subHoliday/subHolidayList.do")
    public String subHolidayList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "/subHoliday/subHolidayList";

    }

    //전체휴가현황 페이지
    @RequestMapping("/subHoliday/subHolidayAdmin.do")
    public String subHolidayAdmin(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "/subHoliday/subHolidayAdmin";
    }

    //휴가사용현황 페이지
    @RequestMapping("/subHoliday/subHolidayStat.do")
    public String subHolidayStatus(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();

        Map<String, Integer> countMap = subHolidayService.getCountMap2();

        model.addAttribute("countMap", countMap);
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "/subHoliday/subHolidayStat";
    }

    //휴가설정 페이지
    @RequestMapping("/subHoliday/subHolidaySetting.do")
    public String subHolidaySetting(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "/subHoliday/subHolidaySetting";
    }

    //휴가신청 팝업
    @RequestMapping("/subHoliday/pop/subHolidayReqPop.do")
    public String subHolidayReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        LoginVO login = getLoginVO(request);
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("code", params.get("code"));
        model.addAttribute("type", params.get("type"));
        return "/popup/subHoliday/subHolidayReqPop";
    }

    //휴일근로신청 팝업
    @RequestMapping("/subHoliday/pop/subHolidayReqPop2.do")
    public String subHolidayReqPop2(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        LoginVO login = getLoginVO(request);
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("code", params.get("code"));
        model.addAttribute("type", params.get("type"));
        return "/popup/subHoliday/subHolidayReqPop2";
    }

    // 휴가 설정 -> 이력관리 버튼 팝업
    @RequestMapping("/subHoliday/pop/subHolidaySettingPop.do")
    public String subHolidaySettingPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        LoginVO login = getLoginVO(request);
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("code", params.get("code"));
        model.addAttribute("type", params.get("type"));
        return "/popup/subHoliday/subHolidaySettingPop";
    }

    //휴가신청 전자결재
    @RequestMapping("/popup/subHoliday/approvalFormPopup/subHolidayApprovalPop.do")
    public String subHolidayApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        LoginVO login = getLoginVO(request);
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/subHoliday/approvalFormPopup/subHolidayApprovalPop";
    }

    //휴일근로신청서 전자결재
    @RequestMapping("/popup/subHoliday/approvalFormPopup/workHolidayApprovalPop.do")
    public String workHolidayApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        LoginVO login = getLoginVO(request);
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/subHoliday/approvalFormPopup/workHolidayApprovalPop";
    }

    //전체휴가현황
    @RequestMapping("/subHoliday/searchHolidayPop.do")
    public String searchHolidayPop(Model model, HttpServletRequest request) {
        LoginVO login = getLoginVO(request);
        model.addAttribute("loginVO", login);
        return "/popup/subHoliday/searchHolidayPop";
    }

    //연차일괄신청
    @RequestMapping("/subHoliday/subHolidayReqBatchPop.do")
    public String subHolidayReqBatchPop(HttpServletRequest request, Model model) {
        Map<String, Integer> countMap = subHolidayService.getCountMap2();
        LoginVO login = getLoginVO(request);
        model.addAttribute("loginVO", login);
        model.addAttribute("countMap", countMap);
        return "/popup/subHoliday/subHolidayReqBatchPop";
    }

    /**
     * 캠인사이드 > 휴가관리
     * 휴가 신청구분 코드
     *
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/subHoliday/getVacCodeList")
    public String getVacCodeList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", subHolidayService.getVacCodeList(params));
        return "jsonView";
    }


    /**
     * 캠인사이드 > 휴가관리 > 휴가신청 > 휴가사용내역
     * 휴가사용내역 조회 MainGrid Load
     *
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/subHoliday/getVacUseHistoryList")
    public String getVacUseHistoryList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", subHolidayService.getVacUseHistoryList(params));
        return "jsonView";
    }

    //휴가신청 기안전 신청내역 저장
    @RequestMapping("/subHoliday/setVacUseHist.do")
    public String setVacUseHist(@RequestParam Map<String, Object> params, Model model) {
        subHolidayService.setVacUseHist(params);
        model.addAttribute("vacUseHistId", params.get("vacUseHistId"));

        return "jsonView";
    }

    //휴일근로 기안전 신청내역 저장
    @RequestMapping("/subHoliday/setVacUseHist2.do")
    public String setVacUseHist2(@RequestParam Map<String, Object> params, Model model) {
        subHolidayService.setVacUseHist2(params);
        model.addAttribute("holidayWorkMasterSn", params.get("holidayWorkMasterSn"));

        return "jsonView";
    }

    /**
     * 인사관리 > 휴가관리 - 휴가 신청내역 삭제
     *
     * @param params
     * @return
     */
    @RequestMapping("/subHoliday/setVacUseHistDel.do")
    public String setVacUseHistDel(@RequestParam Map<String, Object> params) {
        subHolidayService.setVacUseHistDel(params);
        return "jsonView";
    }

    /**
     * 마이페이지 > 복무 > 근무상황 > 연차 > admin
     * 휴가사용내역 조회 MainGrid Load
     *
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/subHoliday/getVacUseHistoryListAdmin")
    public String getVacUseHistoryListAdmin(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", subHolidayService.getVacUseHistoryListAdmin(params));
        /* model.addAttribute("totalCount", subHolidayService.getVacUseHistoryListTotal(params));*/
        return "jsonView";
    }

    @RequestMapping("/subHoliday/getVacUseStatDetailList")
    public String getVacUseStatDetailList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", subHolidayService.getVacUseStatDetailList(params));
        return "jsonView";
    }

    /**
     * 마이페이지 > 복무 > 근무상황 > 연차
     * 휴가사용내역 조회 only one
     *
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/subHoliday/getVacUseHistoryOne")
    public String getVacUseHistoryOne(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("data", subHolidayService.getVacUseHistoryOne(params));
        return "jsonView";
    }

    @RequestMapping("/subHoliday/getHolidayWorkHistOne")
    public String getHolidayWorkHistOne(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("data", subHolidayService.getHolidayWorkMasterOne(params));
        model.addAttribute("list", subHolidayService.getHolidayWorkHistOne(params));
        return "jsonView";
    }

    @RequestMapping("/subHoliday/getHolidayWorkDuplList")
    public String getHolidayWorkDuplList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", subHolidayService.getHolidayWorkDuplList(params));
        return "jsonView";
    }

    @RequestMapping("/subHoliday/getVacUseHistoryWorkList")
    public String getVacUseHistoryWorkList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", subHolidayService.getVacUseHistoryWorkList(params));
        return "jsonView";
    }

    @RequestMapping("/subHoliday/getUserVacList.do")
    public String getUserVacList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        model.addAttribute("list", subHolidayService.getUserVacList(params));

        return "jsonView";
    }

    @RequestMapping("/subHoliday/getUserVacListStat.do")
    public String getUserVacListStat(@RequestParam Map<String, Object> map, HttpServletRequest request, Model model) {
        model.addAttribute("list", subHolidayService.getUserVacListStat(map));

        return "jsonView";
    }

    @RequestMapping("/subHoliday/setUserVac")
    public String setUserVac(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        subHolidayService.setUserVac(params);
        return "jsonView";
    }

    /**
     * 휴가 결재 상태값에 따른 UPDATE 메서드
     *
     * @param bodyMap
     * @return
     */
    @RequestMapping(value = "/subHoliday/subHolidayReqApp")
    public String subHolidayReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try {
            subHolidayService.updateDocState(bodyMap);
        } catch (Exception e) {
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생(" + e.getMessage() + ")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    @RequestMapping("/subHoliday/subHolidayListPop.do")
    public String subHolidayListLine(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        LoginVO loginVO = getLoginVO(request);

        model.addAttribute("data", commonService.ctDept((String) loginVO.getOrgnztId()));
        model.addAttribute("loginVO", loginVO);

        return "popup/subHoliday/subHolidayListPop";
    }

    private static LoginVO getLoginVO(HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        return loginVO;
    }


    //오늘날짜 구하기 yyyyMMddhhmmss
    public static String getCurrentDateTime() {
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }

    @RequestMapping("/subHoliday/getUserHolyData")
    public String getUserHolyData(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request) {
        LoginVO loginVO = getLoginVO(request);
        params.put("loginEmpSeq", loginVO.getUniqId());
        Map<String, Object> holyData = subHolidayService.getuserHolyData(params);

        model.addAttribute("rs", holyData);


        return "jsonView";
    }

    @RequestMapping("/subHoliday/setUserVacList")
    public String setUserVacList(@RequestParam("param") String params, Model model, HttpServletRequest request) {
        LoginVO loginVO = getLoginVO(request);
        JsonParser p = new JsonParser();

        JsonElement element = p.parse(params);
        JsonArray jsonArray = element.getAsJsonObject().getAsJsonObject("dataSource").getAsJsonArray("data");

        Gson gson = new Gson();
        List<Map<String, Object>> list = new ArrayList<>();
        for (JsonElement jsonElement : jsonArray) {
            Map<String, Object> jsonObject = gson.fromJson(jsonElement, new TypeToken<Map<String, Object>>() {
            }.getType());
            list.add(jsonObject);
        }
//        Map<String, Object> map = mapper.readValue(params);

        subHolidayService.setUserVacList(list);
        return "jsonView";
    }

    @RequestMapping("/subHoliday/setUserVacList2")
    public String setUserVacList2(@RequestParam("param") String params, @RequestParam("reason") String reason, Model model, HttpServletRequest request) {
        LoginVO loginVO = getLoginVO(request);
        JsonParser p = new JsonParser();
        JsonElement element = p.parse(params);
        JsonArray jsonArray = element.getAsJsonObject().getAsJsonObject("dataSource").getAsJsonArray("data");

        Gson gson = new Gson();
        List<Map<String, Object>> list = new ArrayList<>();
        for (JsonElement jsonElement : jsonArray) {
            Map<String, Object> jsonObject = gson.fromJson(jsonElement, new TypeToken<Map<String, Object>>() {
            }.getType());
            list.add(jsonObject);
        }
        subHolidayService.setUserVacList2(list, loginVO.getUniqId(), reason);
        return "jsonView";
    }

    //공휴일관리 페이지
    @RequestMapping("/subHoliday/holidayManagement.do")
    public String holidayManagement(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "/subHoliday/holidayManagement";
    }

    /**
     * 공휴일 데이터 조회
     */
    @RequestMapping("/subHoliday/getHolidayList")
    public String getHolidayList(@RequestParam Map<String, Object> params, ModelMap model) {
        model.addAttribute("rs", subHolidayService.getHolidayList(params));
        return "jsonView";
    }

    /**
     * 공휴일 저장(삽입,수정)
     */
    @RequestMapping("/subHoliday/setHoliday")
    public String setHoliday(@RequestParam Map<String, Object> params) {
        subHolidayService.setHoliday(params);
        return "jsonView";
    }

    /**
     * 공휴일 삭제
     */
    @RequestMapping("/subHoliday/setHolidayDel")
    public String setHolidayDel(@RequestParam Map<String, Object> params, ModelMap model) {
        subHolidayService.deleteHoliday(params);
        return "jsonView";

    }


    @RequestMapping("/subHoliday/getUserInfoList")
    public String getUserInfoList(@RequestParam Map<String,Object> map, Model model) {
        System.out.println("map : "+map);
        Map<String, Integer> countMap = subHolidayService.getCountMap2();

        model.addAttribute("countMap", countMap);
        model.addAttribute("list", subHolidayService.getUserInfoList(map));
        return "jsonView";
    }

    @RequestMapping(value = "/subHoliday/setSubHolidayByEmpInfo.do", method = RequestMethod.POST)
    public String setSubHoliday(@RequestParam Map<String, Object> params){
        subHolidayService.setSubHolidayByEmpInfo2(params);

        return "jsonView";
    }

    @RequestMapping("/subHoliday/getModVacList")
    public String getModVacList(@RequestParam Map<String, Object> map, ModelMap model) {
        model.addAttribute("list", subHolidayService.getModVacList(map));
        return "jsonView";
    }

    @RequestMapping("/subHoliday/getGrantDay")
    public String getGrantDay(@RequestParam Map<String, Object> map, ModelMap model) {
        model.addAttribute("list", subHolidayService.getGrantDay(map));
        return "jsonView";
    }

    @RequestMapping("/popup/subHoliday/approvalFormPopup/workHolidayUserApprovalPop.do")
    public String workHolidayUserApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        LoginVO login = getLoginVO(request);
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/subHoliday/approvalFormPopup/workHolidayUserApprovalPop";
    }

    @RequestMapping("/popup/subHoliday/approvalFormPopup/workHolidayAdminApprovalPop.do")
    public String workHolidayAdminApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        LoginVO login = getLoginVO(request);
        model.addAttribute("data", params);
        model.addAttribute("loginVO", login);
        return "/popup/subHoliday/approvalFormPopup/workHolidayAdminApprovalPop";
    }


    @RequestMapping(value = "/subHoliday/workHolidayReqUserApp")
    public String workHolidayReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try {
            subHolidayService.workHolidayReqApp(bodyMap);
        } catch (Exception e) {
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생(" + e.getMessage() + ")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    @RequestMapping(value = "/subHoliday/workHolidayReqAdminApp")
    public String workHolidayReqAdminApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try {
            subHolidayService.workHolidayReqAdminApp(bodyMap);
        } catch (Exception e) {
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생(" + e.getMessage() + ")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    @RequestMapping("/subHoliday/setDocReaderReset")
    public String setDocReaderReset(@RequestParam Map<String, Object> params) {
        try{

            subHolidayService.setDocReaderReset(params);
        }catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/subHoliday/delYn")
    public String delYn(@RequestParam Map<String, Object> params) {
        subHolidayService.delYn(params);
        return "jsonView";
    }
}
