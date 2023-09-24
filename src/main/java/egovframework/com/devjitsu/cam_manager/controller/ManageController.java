package egovframework.com.devjitsu.cam_manager.controller;

import egovframework.com.devjitsu.cam_manager.service.ManageService;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.common.service.CommonService;
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
import java.util.List;
import java.util.Map;

@Controller
public class ManageController {

    @Autowired
    private ManageService manageService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Autowired
    private CommonService commonService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    /**
     * 구매요청관리 리스트
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/manage/purcReqManageList.do")
    public String purcReqManageList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", session.getAttribute("LoginVO"));

        return "cam_manager/purcManage/purcReqManageList";
    }

    /**
     * 구매요청관리 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/manage/getPurcReqManageList.do")
    public String getProjectList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", manageService.getPurcReqManageList(params));
        return "jsonView";
    }

    /**
     * 구매요청서 작성페이지
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/manage/pop/regPurcReqPop.do")
    public String regPurcReqPop(HttpServletRequest request, @RequestParam Map<String, Object> params, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_manager/purcManage/regPurcReqPop";
    }

    /**
     * 구매요청 저장/수정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/manage/setPurcReq.do")
    public String setPurcReq(@RequestParam Map<String, Object> params, Model model, MultipartHttpServletRequest request) {
        manageService.setPurcReq(params, request, SERVER_DIR, BASE_DIR);
        return "jsonView";
    }

    /**
     * 구매요청 저장/수정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/manage/getPurcReq.do")
    public String getPurcReq(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("data", manageService.getPurcReq(params));
        return "jsonView";
    }


}
