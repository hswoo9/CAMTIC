package egovframework.com.devjitsu.cam_crm.controller;

import egovframework.com.devjitsu.cam_crm.service.CrmService;
import egovframework.com.devjitsu.common.service.CommonCodeService;
import egovframework.com.devjitsu.common.service.CommonService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class CrmController {

    @Autowired
    private CrmService crmService;

    @Autowired
    private CommonCodeService commonCodeService;

    @Autowired
    private CommonService commonService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    @RequestMapping("/crm/crmView.do")
    public String crmView(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());

        model.addAttribute("loginVO", session.getAttribute("loginVO"));

        return "/cam_crm/crmView";
    }

    @RequestMapping("/crm/getCrmList")
    public String getCrmList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", crmService.getCrmList(params));
        return "jsonView";
    }

    /**
     * 고객 삭제(이력 같이 삭제)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/setCrmDel.do")
    public String setCrmDel(@RequestParam Map<String, Object> params, Model model){
        crmService.setCrmDel(params);
        return "jsonView";
    }

    @RequestMapping("/crm/pop/popCrmList.do")
    public String popCrmList(@RequestParam Map<String, Object> params, Model model){

        model.addAttribute("params", params);

        return "popup/cam_crm/popCrmList";
    }

    @RequestMapping("/crm/pop/popCrmMemList.do")
    public String popCrmMemList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("params", params);
        return "popup/cam_crm/popCrmMemList";
    }

    @RequestMapping("/crm/getPopCrmList")
    public String getPopCrmList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = crmService.getPopCrmList(params);
        model.addAttribute("list", list);
        return "jsonView";
    }

    @RequestMapping("/crm/getCrmData")
    public String getCrmData(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", crmService.getCrmData(params));
        return "jsonView";
    }

    @RequestMapping("/crm/pop/regCrmPop.do")
    public String regCrmPop(HttpServletRequest request, @RequestParam Map<String, Object> params, Model model){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        params.put("cmGroupCode", "CRM_ITEM_VALUE");

        model.addAttribute("data", commonService.commonCodeList(params));
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_crm/regCrmPop";
    }

    @RequestMapping("/crm/getCrmInfo")
    public String getCrmInfo(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");

        model.addAttribute("data", crmService.getCrmInfo(params));
        model.addAttribute("fileInfo", crmService.getCrmFileInfo(params));
        model.addAttribute("loginVO", loginVO);

        return "jsonView";
    }

    @RequestMapping("/crm/getCrmMemList")
    public String getCrmMemList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", crmService.getCrmMemList(params));

        return "jsonView";
    }

    @RequestMapping("/crm/setCrmInfo")
    public String setCrmInfo(@RequestParam Map<String, Object> params, Model model, MultipartHttpServletRequest request) {

        try{
            crmService.setCrmInfo(params, request, SERVER_DIR, BASE_DIR);
            model.addAttribute("params", params);
        } catch (Exception e) {
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/crm/setCrmMemInfo")
    public String setCrmMemInfo(@RequestParam Map<String, Object> params, Model model) {
        try{
            crmService.setCrmMemInfo(params);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    @RequestMapping("/crm/delCrmMemInfo")
    public String delCrmMemInfo(@RequestParam Map<String, Object> params, Model model){
        try{
            crmService.delCrmMemInfo(params);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }

        return "jsonView";
    }

    @RequestMapping("/crm/getCrmMemInfo")
    public String getCrmMemInfo(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getCrmMemInfo(params));
        return "jsonView";
    }

    /**
     * 고객 산업분야 조회
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getCrmIndustry.do")
    public String getCrmIndustry(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getCrmIndustry(params));
        return "jsonView";
    }

    /**
     * 고객 산업분야 저장/수정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/setCrmIndustry.do")
    public String setCrmIndustry(@RequestParam Map<String, Object> params, Model model){
        crmService.setCrmIndustry(params);
        return "jsonView";
    }

    /**
     * 고객 인증정보 조회
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getCrmCert.do")
    public String getCrmCert(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getCrmCert(params));
        return "jsonView";
    }

    /**
     * 고객 인증정보 저장/수정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/setCrmCert.do")
    public String setCrmCert(@RequestParam Map<String, Object> params, Model model){
        crmService.setCrmCert(params);
        return "jsonView";
    }

    /**
     * 고객 회계정보 조회
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getCrmAccounting.do")
    public String getCrmAccounting(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getCrmAccounting(params));
        return "jsonView";
    }

    /**
     * 고객 회계정보 저장/수정
     * @param params
     * @return
     */
    @RequestMapping("/crm/setCrmAccounting.do")
    public String setCrmAccounting(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request){
        crmService.setCrmAccounting(params, request, SERVER_DIR, BASE_DIR);
        return "jsonView";
    }

    /**
     * 고객 최근경영규모 조회
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getCrmMgScale.do")
    public String getCrmMgScale(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getCrmMgScale(params));
        return "jsonView";
    }

    /**
     * 고객 최근경영규모 저장/수정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/setCrmMgScale.do")
    public String setCrmMgScale(@RequestParam Map<String, Object> params, Model model){
        crmService.setCrmMgScale(params);
        return "jsonView";
    }

    /**
     * 고객 관심분야 조회
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getCrmInterests.do")
    public String getCrmInterests(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getCrmInterests(params));
        return "jsonView";
    }

    /**
     * 고객 관심분야 저장/수정
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/setCrmInterests.do")
    public String setCrmInterests(@RequestParam Map<String, Object> params, Model model){
        crmService.setCrmInterests(params);
        return "jsonView";
    }

    /**
     * 고객 이력관리 페이지
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/crm/crmHistView.do")
    public String crmHistView(Model model, HttpServletRequest request){

        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);

        return "/cam_crm/crmHistView";
    }

    /**
     * 고객 이력관리 리스트
     * @param params
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/crm/getCrmHistList")
    public String getCrmHistList(@RequestParam Map<String, Object> params, Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("list", crmService.getCrmHistList(params));

        return "jsonView";
    }

    /**
     * 이력관리 상세보기 팝업
     * @param request
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/pop/crmHistViewPop.do")
    public String regCrmHistViewPop(HttpServletRequest request, @RequestParam Map<String, Object> params, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("rs", crmService.getCrmHist(params));
        return "popup/cam_crm/crmHistViewPop";
    }

    /**
     * 이력관리 관계이력 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getCrmHistDetailList")
    public String getCrmHistDetailList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", crmService.getCrmHistDetailList(params));
        return "jsonView";
    }

    /**
     * 이력관리 등록 팝업
     * @param request
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/pop/regCrmHistPop.do")
    public String regCrmHistPop(HttpServletRequest request, @RequestParam Map<String, Object> params, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");

        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_crm/regCrmHistPop";
    }

    /**
     * 이력등록
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/setCrmHist")
    public String setCrmHist(@RequestParam Map<String, Object> params, Model model){
        try{
            crmService.setCrmHist(params);
            model.addAttribute("params", params);
        } catch (Exception e){
            e.printStackTrace();
        }
        return "jsonView";
    }

    /**
     * crm 제조업체총람 페이지
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/crm/mfOverview.do")
    public String mfOverView(Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        return "/cam_crm/mfOverview";
    }

    /**
     * 제조업체총람 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/getMfOverviewList")
    public String getMfOverviewList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getMfOverviewList(params));
        return "jsonView";
    }

    /**
     * 제조업체 총람 엑셀 업로드 팝업
     * @param model
     * @param request
     * @return
     */
    @RequestMapping("/crm/pop/mfExcelUploadPop.do")
    public String mfExcelUploadPop(Model model, HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        return "popup/cam_crm/mfExcelUploadPop";
    }

    /**
     * crm 그룹코드 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/mfExcelUpload.do")
    public String mfExcelUpload(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) throws Exception{
        crmService.mfExcelUpload(params, request);
        return "jsonView";
    }

    /**
     * crm 코드 관리
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/crm/codeManagement.do")
    public String codeManagement(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){

        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_crm/codeManagement";
    }

    /**
     * crm 그룹코드 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/groupCodeList")
    public String groupCodeList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", crmService.groupCodeList(params));
        return "jsonView";
    }

    /**
     * crm 코드 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/codeList")
    public String codeList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", crmService.codeList(params));
        return "jsonView";
    }

    /**
     * crm 그룹코드 저장
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/saveGroupCode")
    public String saveGroupCode(@RequestParam Map<String, Object> params, Model model){
        crmService.saveGroupCode(params);
        return "jsonView";
    }

    /**
     * crm 하위 코드 저장
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/crm/insSetLgCode")
    public String insSetLgCode(@RequestParam Map<String, Object> params, Model model){
        crmService.insSetLgCode(params);
        model.addAttribute("code", 200);
        return "jsonView";
    }

    @RequestMapping("/crm/smCodeList")
    @ResponseBody
    public List<Map<String, Object>> smCodeList(@RequestParam Map<String, Object> params, Model model){
        List<Map<String, Object>> list = new ArrayList<>();

        list = crmService.smCodeList(params);
        return list;
    }

    @RequestMapping("/crm/insCrmCode")
    public String insCrmCode(@RequestParam Map<String, Object> params, Model model){
        crmService.insCrmCode(params);
        model.addAttribute("code", 200);
        return "jsonView";
    }

    @RequestMapping("/crm/selLgCode")
    public String selLgCode(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", crmService.selLgCode(params));
        return "jsonView";
    }

    @RequestMapping("/crm/selSmCode")
    public String selSmCode(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", crmService.selSmCode(params));
        return "jsonView";
    }

    @RequestMapping("/crm/selLgSmCode")
    public String selLgSmCode(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", crmService.selLgSmCode(params));
        return "jsonView";
    }
}
