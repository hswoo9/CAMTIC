package egovframework.com.devjitsu.inside.userManage.controller;

import dev_jitsu.MainLib;
import egovframework.com.devjitsu.inside.userManage.service.UserManageService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.gw.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
public class UserManageController {

    private static final Logger logger = LoggerFactory.getLogger(UserManageController.class);

    @Autowired
    private UserService userService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Autowired
    private UserManageService userManageService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    //인사기록카드 페이지
    @RequestMapping("/Inside/userPersonList.do")
    public String userPersonList(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        menuSession(request, session);

        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/userPersonList";
    }

    private static void menuSession(HttpServletRequest request, HttpSession session) {
        session.setAttribute("menuNm", request.getRequestURI());
    }

    //직원조회목록 페이지
    @RequestMapping("/Inside/userPersonnelRecord.do")
    public String userPersonnelRecord(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        menuSession(request, session);

        Map<String,Object> map = new HashMap<>();
        map.put("empSeq", login.getUniqId());
        Map<String,Object> userPersonnelRecordList = userManageService.getUserPersonnelRecordList(map);
        List<Map<String,Object>> educationalList = userManageService.getEducationalList(map);
        Map<String,Object> militarySvcInfo = userManageService.getMilitarySvcInfo(map);
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("uprList", userPersonnelRecordList);
        model.addAttribute("eList", educationalList);
        model.addAttribute("mInfo", militarySvcInfo);


        model.addAttribute("cList", userManageService.getCareerInfoList(map));
        model.addAttribute("fList", userManageService.getFamilyInfoList(map));
        model.addAttribute("lList", userManageService.getLicenceInfoList(map));
        model.addAttribute("aList", userManageService.getAppointInfoList(map));
        model.addAttribute("rList", userManageService.getRewardInfoList(map));
        model.addAttribute("dList", userManageService.getDutyInfoList(map));
        model.addAttribute("pList", userManageService.getProposalInfoList(map));

        return "inside/userManage/userPersonnelRecord";
    }

    //직원조회목록 페이지
    @RequestMapping("/Inside/pop/userReqPop.do")
    public String userReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");

        Map<String,Object> userPersonnelinformList = userManageService.getUserPersonnelinformList(params);

        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        model.addAttribute("uprinfList", userPersonnelinformList);

        System.out.println("parmas값 --------" + params);
        System.out.println("dfdf --------" + userPersonnelinformList);
        return "popup/inside/userManage/userReqPop";
    }

    //직원조회목록 페이지
    @RequestMapping("/Inside/pop/userReqPopImage.do")
    public String userReqPopImage(HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "popup/inside/userManage/userReqPopImage";
    }

    //성과결과조회 페이지
    @RequestMapping("/Inside/performanceResultList.do")
    public String performanceResultList(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/performanceResultList";
    }

    //인사정보변경신청 페이지
    @RequestMapping("/Inside/userInfoMod.do")
    public String userInfoMod(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/userInfoMod";
    }

    //근로계약서 페이지
    @RequestMapping("/Inside/employmentReq.do")
    public String employmentReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/employmentReq";
    }

    //연봉계약서 페이지
    @RequestMapping("/Inside/agreementReq.do")
    public String agreementReq(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/userManage/agreementReq";
    }

    @RequestMapping("/Inside/pop/sign/popDrawSignView.do")
    public String popDrawSignView(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/userManage/popDrawSignView";
    }

    //오늘날짜 구하기 yyyyMMddhhmmss
    public static String getCurrentDateTime() {
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }

    @RequestMapping("/useManage/userPersonnelRecordPop.do")
    public String userPersonnelRecordEduAddPop(@RequestParam String popName) {
        switch(popName) {
            case "degree":
                return "popup/inside/userManage/userPersonnelRecordDegreePop";
            case "career":
                return "popup/inside/userManage/userPersonnelRecordCareerPop";
            case "military":
                return "popup/inside/userManage/userPersonnelRecordMilitaryPop";
            case "family":
                return "popup/inside/userManage/userPersonnelRecordFamilyPop";
            case "license":
                return "popup/inside/userManage/userPersonnelRecordLicensePop";
            case "job":
                return "popup/inside/userManage/userPersonnelRecordJobPop";
            case "appointing":
                return "popup/inside/userManage/userPersonnelRecordAppointingPop";
            case "reward":
                return "popup/inside/userManage/userPersonnelRecordRewardPop";
            case "edu":
                return "popup/inside/userManage/userPersonnelRecordEduPop";
            case "workEval":
                return "popup/inside/userManage/userPersonnelRecordWorkEvalPop";
            case "proposal":
                return "popup/inside/userManage/userPersonnelRecordProposalPop";
        }
        return "redirect:inside/userManage/userPersonnelRecord";
    }
    @RequestMapping("/useManage/setUserPersonnelRecordInfo")
    public String setUserDegreeInfo(@RequestParam Map<String,Object> map, Model model,HttpServletRequest request) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        Map<String,Object> params = new HashMap<>();
        params.put("EMP_SEQ", login.getUniqId());
        params.put("EMP_NAME", login.getName());
        params.putAll(map);
        System.out.println("D A T A : : : : : : : : : : "+params);
        switch(params.get("type").toString()) {
            case "degree":
                try {
                    userManageService.setEducationalInfo(params);
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
            case "career":
                try {
                    userManageService.setCareerInfo(params);
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
            case "military":
                try {
                    userManageService.setMilitaryInfo(params);
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
            case "family":
                try {
                    userManageService.setFmailyInfo(params);
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
            case "license":
                try {
                    userManageService.setLicenceInfo(params);
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
            case "job":
                try {
                    userManageService.setJobInfo(params);
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
            case "appointing":
                try {
                    userManageService.setAppointingInfo(params);
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
            case "reward":
                try {
                    userManageService.setRewardInfo(params); //////
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
            case "edu":
                try {
                    userManageService.setEduInfo(params);
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
            case "workEval":
                try {
                    userManageService.setWorkEvalInfo(params);
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
            case "proposal":
                try {
                    userManageService.setProposalInfo(params);
                    model.addAttribute("rs", "SUCCESS");
                }catch (Exception e) {
                    model.addAttribute("rs", "FAILED");
                    e.printStackTrace();
                }
                break;
        }
        return "jsonView";
    }
    @RequestMapping("/userManage/getPersonRecordApplyList")
    public String getPersonRecordApplyList(@RequestParam Map<String,Object> map, Model model) {
        model.addAttribute("list", userManageService.getPersonRecordApplyList(map));
        return "jsonView";
    }
    @RequestMapping("/userManage/getCodeList")
    public String getCodeList(Model model) {
        model.addAttribute("rs", userManageService.getCodeList());
        return "jsonView";
    }

    //직원추가
    @RequestMapping("/userManage/setUserReqDetailInsert")
    @ResponseBody
    public Map<String, Object> setUserInfoReqSave(@RequestParam Map<String, Object> params, HttpServletRequest request) {
        Map<String,Object> result = new HashMap<>();
        System.out.println("test : : : : : : : : "+params);

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        params.put("regEmpSeq", loginVO.getUniqId());
        String code = "";
        String message = "";
        try{
            userManageService.setUserReqDetailInsert(params);
            code = "200";
            message = "저장되었습니다.";
        }catch (Exception e){
            code = "500";
            message = "실패했습니다.";
        }
        result.put("code", code);
        result.put("message", message);

        return result;
    }

    //유저코드 - 부서코드리스트
    @RequestMapping("/userManage/getDeptCodeList2")
    @ResponseBody
    public Map<String, Object> getDeptCodeList2(@RequestParam Map<String, Object> params){
        Map<String,Object> result = new HashMap<>();
        result.put("list", userManageService.getDeptCodeList2(params));
        return result;
    }

    //유저코드 - 팀코드리스트
    @RequestMapping("/userManage/getDeptCodeList")
    @ResponseBody
    public Map<String, Object> getDeptCodeList(@RequestParam Map<String, Object> params){
        Map<String,Object> result = new HashMap<>();
        result.put("list", userManageService.getDeptCodeList(params));
        return result;
    }
    @RequestMapping("/userManage/getEmpInfoList")
    public String getEmpInfoList(@RequestParam Map<String,Object> map, Model model) {
        System.out.println("map : "+map);
        model.addAttribute("list", userManageService.getEmpInfoList(map));
        return "jsonView";
    }

    @RequestMapping("/userManage/getEmpInfoDetailList")
    public String getEmpInfoDetailList(@RequestParam Map<String,Object> map, Model model) {
        map.put("searchDetail1",map.get("searchDetail1").toString().replaceAll("\"","'").replaceAll("\\[","").replaceAll("\\]","").replaceAll("\\[]",""));
        map.put("searchDetail2",map.get("searchDetail2").toString().replaceAll("\"","'").replaceAll("\\[","").replaceAll("\\]","").replaceAll("\\[]",""));
        map.put("searchDetail3",map.get("searchDetail3").toString().replaceAll("\"","'").replaceAll("\\[","").replaceAll("\\]","").replaceAll("\\[]",""));
        map.put("searchDetail4",map.get("searchDetail4").toString().replaceAll("\"","'").replaceAll("\\[","").replaceAll("\\]","").replaceAll("\\[]",""));
        map.put("searchDetail5",map.get("searchDetail5").toString().replaceAll("\"","'").replaceAll("\\[","").replaceAll("\\]","").replaceAll("\\[]",""));
        map.put("searchDetail6",map.get("searchDetail6").toString().replaceAll("\"","'").replaceAll("\\[","").replaceAll("\\]","").replaceAll("\\[]",""));
        map.put("searchDetail7",map.get("searchDetail7").toString().replaceAll("\"","'").replaceAll("\\[","").replaceAll("\\]","").replaceAll("\\[]",""));
        map.put("searchDetail8",map.get("searchDetail8").toString().replaceAll("\"","'").replaceAll("\\[","").replaceAll("\\]","").replaceAll("\\[]",""));
        System.out.println("searchDetail1 : "+map.get("searchDetail1"));
        System.out.println("searchDetail2 : "+map.get("searchDetail2"));
        System.out.println("searchDetail3 : "+map.get("searchDetail3"));
        System.out.println("searchDetail4 : "+map.get("searchDetail4"));
        System.out.println("searchDetail5 : "+map.get("searchDetail5"));
        System.out.println("searchDetail6 : "+map.get("searchDetail6"));
        System.out.println("searchDetail7 : "+map.get("searchDetail7"));
        System.out.println("searchDetail8 : "+map.get("searchDetail8"));
        model.addAttribute("list", userManageService.getEmpInfoDetailList(map));
        return "jsonView";
    }

    @RequestMapping("/userManage/setUpdateUserInfoModY")
    @ResponseBody
    public Map<String,Object> setUpdateUserInfoModY(@RequestParam Map<String,Object> map, Model model) {
        Map<String,Object> tmp = new HashMap<>();
        try{
            userManageService.setUpdateUserInfoModY(map);
            tmp.put("rs","SUCCESS");
        }catch (Exception e) {
            tmp.put("rs","FAILED");
        }
        return tmp;
    }
    @RequestMapping("/userManage/setUpdateUserInfoModN")
    @ResponseBody
    public Map<String,Object> setUpdateUserInfoModN(@RequestParam Map<String,Object> map, Model model) {
        Map<String,Object> tmp = new HashMap<>();
        try{
            userManageService.setUpdateUserInfoModN(map);
            tmp.put("rs","SUCCESS");
        }catch (Exception e) {
            tmp.put("rs","FAILED");
        }
        return tmp;
    }
    /*김승환 작성 반려 컬럼추가 RETURNYN RETURNYN_DATE 로 반려 업데이트*/
    @RequestMapping("/userManage/setUpdateUserInfoReturnY")
    @ResponseBody
    public Map<String,Object> setUpdateUserInfoReturnY(@RequestParam Map<String,Object> map, Model model) {
        Map<String,Object> tmp = new HashMap<>();
        try{
            userManageService.setUpdateUserInfoReturnY(map);
            tmp.put("rs","SUCCESS");
        }catch (Exception e) {
            tmp.put("rs","FAILED");
        }
        return tmp;
    }
    @RequestMapping("/userManage/setUpdateUserInfoReturnN")
    @ResponseBody
    public Map<String,Object> setUpdateUserInfoReturnN(@RequestParam Map<String,Object> map, Model model) {
        Map<String,Object> tmp = new HashMap<>();
        try{
            userManageService.setUpdateUserInfoReturnN(map);
            tmp.put("rs","SUCCESS");
        }catch (Exception e) {
            tmp.put("rs","FAILED");
        }
        return tmp;
    }

    //이미지관리 파일 추가
    @RequestMapping("/userManage/setempInfoFileSave.do")
    public String setempInfoFileSave(@RequestParam Map<String, Object> params, @RequestParam("idPhotoFile") MultipartFile[] idPhotoFile, MultipartHttpServletRequest request, Model model) throws Exception {
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        LocalDate now = LocalDate.now();
        DateTimeFormatter fmt = DateTimeFormatter.ofPattern("yyyy/MM/dd");
        String fmtNow = now.format(fmt);

        String server_path = SERVER_DIR + params.get("menuCd").toString()+"/" + fmtNow + "/";
        String base_path = BASE_DIR + params.get("menuCd").toString()+"/" + fmtNow + "/";

        MainLib mainLib = new MainLib();
        List<Map<String, Object>> list = new ArrayList<>();
        list = mainLib.multiFileUpload(idPhotoFile, server_path);

        int photoFileId = userManageService.setThumbnailUpload(list, params, base_path);

        params.put("loginEmpSeq", loginVO.getUniqId());
        params.put("photoFileId", photoFileId);
        userManageService.setUserInfoReqUpd(params);

        return "jsonView";
    }
    @RequestMapping("/userManage/userInfoModDetail")
    public String userInfoModeDetail(@RequestParam Map<String,Object> map, Model model) {
        System.out.println(map.get("KEY_SN"));
        model.addAttribute("rs", userManageService.getUserInfoModDetail(map));
        return "jsonView";
    }
    @RequestMapping("/userManage/modDetailPop.do")
    public String modDetailPop(@RequestParam String typeName) {
        switch(typeName) {
            case "학력사항" : return "popup/inside/userManageView/degreePop";
            case "병력사항" : return "popup/inside/userManageView/militaryPop";
            case "가족사항" : return "popup/inside/userManageView/familyPop";
            case "직무사항" : return "popup/inside/userManageView/jobPop";
            case "발령사항" : return "popup/inside/userManageView/appointingPop";
            case "경력사항" : return "popup/inside/userManageView/careerPop";
            case "보유면허" : return "popup/inside/userManageView/licensePop";
            case "상벌사항" : return "popup/inside/userManageView/rewardPop";
            case "제안제도" : return "popup/inside/userManageView/proposalPop";
        }
        return "";
    }
}
