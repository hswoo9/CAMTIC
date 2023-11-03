package egovframework.com.devjitsu.cam_project.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.cam_project.service.ProjectRndService;
import egovframework.com.devjitsu.cam_project.service.ProjectService;
import egovframework.com.devjitsu.cam_project.service.ProjectUnRndService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
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

    @Autowired
    private ProjectUnRndService projectUnRndService;

    @Autowired
    private ProjectRndService projectRndService;

    @Autowired
    private ProjectService projectService;

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




    /** 단위사업 개인회원 관리 페이지 */
    @RequestMapping("/projectUnRnd/personList.do")
    public String personList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "cam_project/unRnd/personList";
    }
    /** 단위사업 강사 관리 페이지 */
    @RequestMapping("/projectUnRnd/lectureTeacherList.do")
    public String lectureTeacherList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "cam_project/unRnd/lectureTeacherList";
    }

    /** 단위사업 등록 팝업창 */
    @RequestMapping("/projectUnRnd/lectureReqPop.do")
    public String lectureReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/unRnd/lectureReq";
    }
    /** 단위사업 강사 관리 팝업창 */
    @RequestMapping("/projectUnRnd/lectureTeacherPop.do")
    public String lectureTeacherPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/unRnd/lectureTeacher";
    }
    /** 단위사업 수강신청 관리 팝업창 */
    @RequestMapping("/projectUnRnd/lecturePersonPop.do")
    public String lecturePersonPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/unRnd/lecturePerson";
    }
    /** 단위사업 수강자 추가 팝업창 */
    @RequestMapping("/projectUnRnd/lecturePersonReqPop.do")
    public String lecturePersonReqPop(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        return "popup/cam_project/unRnd/lecturePersonReq";
    }

    /** 단위사업 강사 리스트 */
    @RequestMapping("/projectUnRnd/getLectureTeacherList")
    public String getLectureTeacherList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = projectUnRndService.getLectureTeacherList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }
    /** 단위사업 개인회원 리스트 */
    @RequestMapping("/projectUnRnd/getPersonList")
    public String getPersonList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = projectUnRndService.getPersonList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }
    /** 단위사업 선택강사 리스트 */
    @RequestMapping("/projectUnRnd/getLectureTeacherReqList")
    public String getLectureTeacherReqList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = projectUnRndService.getLectureTeacherReqList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }
    /** 단위사업 수강신청 개인회원 리스트 */
    @RequestMapping("/projectUnRnd/getLecturePersonReqList")
    public String getLecturePersonReqList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = projectUnRndService.getLecturePersonReqList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 단위사업 리스트 */
    @RequestMapping("/projectUnRnd/getLectureList")
    public String getLectureList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = projectUnRndService.getLectureList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    /** 단위사업 단일 데이터 */
    @RequestMapping("/projectUnRnd/getLectureInfo")
    public String getLectureInfo(@RequestParam Map<String, Object> params, Model model){
        Map<String, Object> data = projectUnRndService.getLectureInfo(params);
        model.addAttribute("data", data);
        return "jsonView";
    }

    /** 단위사업 등록 */
    @RequestMapping("/projectUnRnd/insLectureInfo")
    public String insLectureInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.insLectureInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업 강사 등록 */
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

    /** 단위사업 수강자 등록 */
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

    /** 단위사업 수정 */
    @RequestMapping("/projectUnRnd/updLectureInfo")
    public String updLectureInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            projectUnRndService.updLectureInfo(params);
            model.addAttribute("code", 200);
        } catch(Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /** 단위사업 삭제 */
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

    /** 단위사업 강사 삭제 */
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
}
