package egovframework.com.devjitsu.cam_project.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.cam_project.service.ProjectRndService;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.cam_project.service.ProjectUnRndService;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class ProjectUnRndController {

    private static final Logger logger = LoggerFactory.getLogger(ProjectUnRndController.class);

    @Autowired
    private ProjectUnRndService projectUnRndService;

    @Autowired
    private ProjectRndService projectRndService;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    @RequestMapping("/projectUnRnd/pop/regProject.do")
    public String regProject(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_project/unRnd/regProject";
    }


    /**
     * 프로젝트 비R&D > TAB0 > 사업정보
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/projectUnRnd/detailInfo.do")
    public String detailInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_project/unRnd/detailInfo";
    }


    /**
     * 기존 등록정보 저장
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/projectUnRnd/setSubjectInfo")
    public String setSubjectInfo(@RequestParam Map<String, Object> params, Model model){

        try{
            projectUnRndService.setSubjectInfo(params);
            model.addAttribute("params", params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/projectUnRnd/getUnRndDetail")
    public String getUnRndDetail(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("map", projectUnRndService.getUnRndDetail(params));

        return "jsonView";
    }

    @RequestMapping("/projectUnRnd/setUnRndDetail")
    public String setUnRndDetail(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model){
        try{
            projectUnRndService.setUnRndDetail(params, request, SERVER_DIR, BASE_DIR);
            model.addAttribute("code", 200);
            model.addAttribute("rs", params);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/projectUnRnd/setDelvApprove")
    public String setDelvApprove(@RequestParam Map<String, Object> params, Model model){

        try{
            projectUnRndService.setDelvApprove(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    /**
     * 프로젝트 > TAB2 > 개발계획
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/projectUnRnd/unRndDevPlan.do")
    public String unRndDevPlan(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_project/unRnd/devPlanInfo";
    }

    @RequestMapping("/projectUnRnd/unRndUnitBusn.do")
    public String unRndUnitBusn(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_project/unRnd/unitBusnInfo";
    }

    @RequestMapping("/projectUnRnd/lectureList.do")
    public String lectureList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        Map<String, Object> map = projectService.getProjectStep(params);

        model.addAttribute("map", new Gson().toJson(map));
        model.addAttribute("data", map);
        model.addAttribute("params", params);

        return "popup/cam_project/unRnd/lectureList";
    }




    /** 단위사업(교육) 개인회원 관리 페이지 */
    @RequestMapping("/projectUnRnd/personList.do")
    public String personList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "cam_project/unRnd/personList";
    }
    /** 단위사업(교육) 강사 관리 페이지 */
    @RequestMapping("/projectUnRnd/lectureTeacherList.do")
    public String lectureTeacherList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "cam_project/unRnd/lectureTeacherList";
    }

    /** 단위사업(교육) 등록 팝업창 */
    @RequestMapping("/projectUnRnd/lectureReqPop.do")
    public String lectureReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/unRnd/lectureReq";
    }

    /** 단위사업(컨설팅) 등록 팝업창 */
    @RequestMapping("/projectUnRnd/consultingReqPop.do")
    public String consultingReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/unRnd/consultingReq";
    }
    /** 단위사업(교육) 강사 관리 팝업창 */
    @RequestMapping("/projectUnRnd/lectureTeacherPop.do")
    public String lectureTeacherPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/unRnd/lectureTeacher";
    }
    /** 단위사업(컨설팅) 강사 관리 팝업창 */
    @RequestMapping("/projectUnRnd/consultingTeacherPop.do")
    public String consultingTeacherPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/unRnd/conTeacher";
    }
    /** 단위사업(교육) 수강신청 관리 팝업창 */
    @RequestMapping("/projectUnRnd/lecturePersonPop.do")
    public String lecturePersonPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/unRnd/lecturePerson";
    }
    /** 단위사업(교육) 이수 관리 팝업창 */
    @RequestMapping("/projectUnRnd/lectureEduPop.do")
    public String lectureEduPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/unRnd/lectureEdu";
    }
    /** 단위사업(교육) 교육비 관리 팝업창 */
    @RequestMapping("/projectUnRnd/lecturePayPop.do")
    public String lecturePayPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/unRnd/lecturePay";
    }
    /** 단위사업(교육) 수강자 추가 팝업창 */
    @RequestMapping("/projectUnRnd/lecturePersonReqPop.do")
    public String lecturePersonReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/unRnd/lecturePersonReq";
    }
    /** 단위사업(교육) 수강자 신규추가 팝업창 */
    @RequestMapping("/projectUnRnd/lecturePersonMngPop.do")
    public String lecturePersonMngPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/unRnd/lecturePersonMng";
    }
    /** 단위사업(교육) 강사 신규추가 팝업창 */
    @RequestMapping("/projectUnRnd/lectureTeacherMngPop.do")
    public String lectureTeacherMngPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/unRnd/lectureTeacherMng";
    }
    /** 단위사업(교육) 수강자 교육비납부/입금처리 팝업창 */
    @RequestMapping("/projectUnRnd/lecturePayReqPop.do")
    public String lecturePayReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/unRnd/lecturePayReq";
    }

    /** 수료증 인쇄 팝업 */
    @RequestMapping("/project/pop/personPrintPop.do")
    public String personPrintPop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        String hwpUrl = "";
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        if(request.getServerName().contains("localhost") || request.getServerName().contains("127.0.0.1")){
            hwpUrl = commonCodeService.getHwpCtrlUrl("l_hwpUrl");
        }else{
            hwpUrl = commonCodeService.getHwpCtrlUrl("s_hwpUrl");
        }

        params.put("hwpUrl", hwpUrl);
        model.addAttribute("hwpUrl", hwpUrl);
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", new Gson().toJson(params));
        model.addAttribute("data", params);

        return "popup/cam_project/unRnd/personPrintPop";
    }

    /** 단위사업(업체) 등록 팝업창 */
    @RequestMapping("/projectUnRnd/lectureTeamPop.do")
    public String lectureTeamPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/unRnd/lectureTeam";
    }

    /** 단위사업(교육) 강사 리스트 */
    @RequestMapping("/projectUnRnd/getLectureTeacherList")
    public String getLectureTeacherList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = projectUnRndService.getLectureTeacherList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }
    @RequestMapping("/projectUnRnd/getConTeacherList")
    public String getConTeacherList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = projectUnRndService.getConTeacherList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }
    /** 단위사업(교육) 개인회원 리스트 */
    @RequestMapping("/projectUnRnd/getPersonList")
    public String getPersonList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = projectUnRndService.getPersonList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }
    /** 단위사업(교육) 개인회원 단일 DATA */
    @RequestMapping("/projectUnRnd/getPersonData")
    public String getPersonData(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = projectUnRndService.getPersonData(params);
        model.addAttribute("data", data);
        return "jsonView";
    }
    /** 단위사업(교육) 개인회원 수료증 단일 DATA */
    @RequestMapping("/projectUnRnd/getPersonReqData")
    public String getPersonReqData(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = projectUnRndService.getPersonReqData(params);
        model.addAttribute("data", data);
        return "jsonView";
    }
    /** 단위사업(교육) 강사 단일 DATA */
    @RequestMapping("/projectUnRnd/getTeacherData")
    public String getTeacherData(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = projectUnRndService.getTeacherData(params);
        model.addAttribute("data", data);
        return "jsonView";
    }
    /** 단위사업(교육) 선택강사 리스트 */
    @RequestMapping("/projectUnRnd/getLectureTeacherReqList")
    public String getLectureTeacherReqList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = projectUnRndService.getLectureTeacherReqList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }
    /** 단위사업(컨설팅) 선택강사 리스트 */
    @RequestMapping("/projectUnRnd/getConTeacherReqList")
    public String getConTeacherReqList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = projectUnRndService.getConTeacherReqList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }
    /** 단위사업(교육) 수강신청 개인회원 리스트 */
    @RequestMapping("/projectUnRnd/getLecturePersonReqList")
    public String getLecturePersonReqList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = projectUnRndService.getLecturePersonReqList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }
    /** 단위사업(교육) 개인회원 아이디 중복체크 */
    @RequestMapping("/projectUnRnd/getLecturePersonDupleCk")
    public String getLecturePersonDupleCk(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = projectUnRndService.getLecturePersonDupleCk(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 단위사업(교육) 리스트 */
    @RequestMapping("/projectUnRnd/getLectureList")
    public String getLectureList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = projectUnRndService.getLectureList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }
    /** 단위사업(컨설팅) 리스트 */
    @RequestMapping("/projectUnRnd/getConsultingList")
    public String getConsultingList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = projectUnRndService.getConsultingList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 단위사업(교육) 단일 데이터 */
    @RequestMapping("/projectUnRnd/getLectureInfo")
    public String getLectureInfo(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = projectUnRndService.getLectureInfo(params);
        List<Map<String, Object>> list = projectUnRndService.getLectureTeacherInfo(params);
        model.addAttribute("data", data);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 단위사업(컨설팅) 단일 데이터 */
    @RequestMapping("/projectUnRnd/getConsultingInfo")
    public String getConsultingInfo(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = projectUnRndService.getConsultingInfo(params);
        List<Map<String, Object>> list = projectUnRndService.getConsultingTeacherInfo(params);

        model.addAttribute("data", data);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 단위사업(교육) 등록 */
    @RequestMapping("/projectUnRnd/insLectureInfo")
    public String insLectureInfo(@RequestParam Map<String, Object> params, Model model,  MultipartHttpServletRequest request){
        try{
            projectUnRndService.insLectureInfo(params, request, SERVER_DIR, BASE_DIR);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업(컨설팅) 등록 */
    @RequestMapping("/projectUnRnd/insConsultingInfo")
    public String insConsultingInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.insConsultingInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업(교육) 강사 등록 */
    @RequestMapping("/projectUnRnd/insLectureTeacherInfo")
    public String insLectureTeacherInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.insLectureTeacherInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }
    /** 단위사업(컨설팅) 강사 등록 */
    @RequestMapping("/projectUnRnd/insConTeacherInfo")
    public String insConTeacherInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.insConTeacherInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업(교육) 수강자 등록 */
    @RequestMapping("/projectUnRnd/insLecturePersonInfo")
    public String insLecturePersonInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.insLecturePersonInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업(교육) 신규수강자 등록 */
    @RequestMapping("/projectUnRnd/setLecturePersonData")
    public String setLecturePersonData(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.setLecturePersonData(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업(교육) 신규강사 등록 */
    @RequestMapping("/projectUnRnd/setLectureTeacherData")
    public String setLectureTeacherData(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.setLectureTeacherData(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업(교육) 신규수강자 삭제 */
    @RequestMapping("/projectUnRnd/delLecturePersonData")
    public String delLecturePersonData(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.delLecturePersonData(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업(교육) 신규강사 삭제 */
    @RequestMapping("/projectUnRnd/delLectureTeacherData")
    public String delLectureTeacherData(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.delLectureTeacherData(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업(교육) 수정 */
    @RequestMapping("/projectUnRnd/updLectureInfo")
    public String updLectureInfo(@RequestParam Map<String, Object> params, Model model, MultipartHttpServletRequest request){
        try{
            projectUnRndService.updLectureInfo(params, request, SERVER_DIR, BASE_DIR);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/projectUnRnd/updLectureTime")
    public String updLectureTime(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.updLectureTime(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업(컨설팅) 수정 */
    @RequestMapping("/projectUnRnd/updConsultingInfo")
    public String updConsultingInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.updConsultingInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/projectUnRnd/updConsultingTime")
    public String updConsultingTime(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.updConsultingTime(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업(교육) 수강자 수강신청 접수/취소 처리 */
    @RequestMapping("/projectUnRnd/updPersonApp")
    public String updPersonApp(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.updPersonApp(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업(교육) 수강자 불참사유서 접수/취소 처리 */
    @RequestMapping("/projectUnRnd/updPersonPartic")
    public String updPersonPartic(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.updPersonPartic(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업(교육) 수강자 청강 처리 */
    @RequestMapping("/projectUnRnd/updPersonAudit")
    public String updPersonAudit(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.updPersonAudit(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업(교육) 수강자 환불 처리 */
    @RequestMapping("/projectUnRnd/updPersonRefund")
    public String updPersonRefund(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.updPersonRefund(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업(교육) 입금 처리 */
    @RequestMapping("/projectUnRnd/updPersonPay")
    public String updPersonPay(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.updPersonPay(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업(교육) 수강자 삭제 */
    @RequestMapping("/projectUnRnd/delLecturePersonInfo")
    public String delLecturePersonInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.delLecturePersonInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업(교육) 삭제 */
    @RequestMapping("/projectUnRnd/delLectureInfo")
    public String delLectureInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.delLectureInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업(교육) 강사 삭제 */
    @RequestMapping("/projectUnRnd/delLectureTeacherInfo")
    public String delLectureTeacherInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.delLectureTeacherInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업(컨설팅) 강의 시간 입력*/
    @RequestMapping("/projectUnRnd/insConTeacherTimeInfo")
    public String insConTeacherTimeInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.insConTeacherTimeInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업(교육) 강사 삭제 */
    @RequestMapping("/projectUnRnd/delConTeacherInfo")
    public String delConTeacherInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.delConTeacherInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 사업정보 전자결재 페이지*/
    @RequestMapping("/popup/cam_project/approvalFormPopup/unRndDelvApprovalPop.do")
    public String unRndDelvApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "/popup/cam_project/approvalFormPopup/unRndDelvApprovalPop";
    }

    /** 계획서보고 전자결재 페이지*/
    @RequestMapping("/popup/cam_project/approvalFormPopup/unRndDevApprovalPop.do")
    public String unRndDevApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        Map<String, Object> map = projectService.getPjtSnToDev(params);
        params.put("pjtSn", map.get("PJT_SN"));
        return "/popup/cam_project/approvalFormPopup/unRndDevApprovalPop";
    }

    /** 결과보고 전자결재 페이지*/
    @RequestMapping("/popup/cam_project/approvalFormPopup/unRndResApprovalPop.do")
    public String unRndResApprovalPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("params", params);
        model.addAttribute("loginVO", login);
        return "/popup/cam_project/approvalFormPopup/unRndResApprovalPop";
    }

    /** 사업정보 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/projectUnRnd/delvReqApp")
    public String delvReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            projectUnRndService.updateUnRndDelvDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 계획서보고 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/projectUnRnd/devReqApp")
    public String devReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            projectUnRndService.updateUnRndDevDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    /** 결과보고 결재 상태값에 따른 UPDATE 메서드 */
    @RequestMapping(value = "/projectUnRnd/resReqApp")
    public String resReqApp(@RequestParam Map<String, Object> bodyMap, Model model) {
        System.out.println("bodyMap");
        System.out.println(bodyMap);
        String resultCode = "SUCCESS";
        String resultMessage = "성공하였습니다.";
        try{
            projectUnRndService.updateUnRndResDocState(bodyMap);
        }catch(Exception e){
            logger.error(e.getMessage());
            resultCode = "FAIL";
            resultMessage = "연계 정보 갱신 오류 발생("+e.getMessage()+")";
        }
        model.addAttribute("resultCode", resultCode);
        model.addAttribute("resultMessage", resultMessage);
        return "jsonView";
    }

    @RequestMapping("/projectUnRnd/setUnitBusnInfo")
    public String setUnitBusnInfo(@RequestParam Map<String, Object> params, Model model){

        try{
            projectUnRndService.setUnitBusnInfo(params);

            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/projectUnRnd/getPjtUnitData")
    public String getPjtUnitData(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("map", projectUnRndService.getPjtUnitData(params));
        model.addAttribute("list", projectUnRndService.getPjtUnitCrmList(params));

        return "jsonView";
    }

    @RequestMapping("/projectUnRnd/getPjtUnitCrmList")
    public String getPjtUnitCrmList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", projectUnRndService.getPjtUnitCrmList(params));

        return "jsonView";
    }

    @RequestMapping("/projectUnRnd/getUnitBusnList")
    public String getUnitBusnList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("list", projectUnRndService.getUnitBusnList(params));

        return "jsonView";
    }

    @RequestMapping("/projectUnRnd/delUnitBusn")
    public String delUnitBusn(@RequestParam Map<String, Object> params, Model model){

        try{
            projectUnRndService.delUnitBusn(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/projectUnRnd/lectureTeamListPop.do")
    public String lectureTeamListPop(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("params", params);


        return "popup/cam_project/unRnd/lectureTeamList";
    }

    @RequestMapping("/projectUnRnd/setPurcUnitCrm")
    public String setPurcUnitCrm(@RequestParam Map<String, Object> params, Model model){

        try{
            projectUnRndService.setPurcUnitCrm(params);

            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/unrnd/pop/unrndFilePop.do")
    public String unrndfilePop(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("params", params)
             .addAttribute("loginVO", loginVO);

        return "popup/cam_project/unRnd/unrndFilePop";
    }
}
