package egovframework.com.devjitsu.inside.recruit.controller;

import com.google.gson.Gson;
import egovframework.com.devjitsu.camtic.service.EvalService;
import egovframework.com.devjitsu.gw.login.dto.LoginVO;
import egovframework.com.devjitsu.hp.board.util.ArticlePage;
import egovframework.com.devjitsu.hp.board.util.PagingResponse;
import egovframework.com.devjitsu.hp.board.util.PostResponse;
import egovframework.com.devjitsu.inside.recruit.service.EvalManageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;
import java.util.Map;

@Controller
public class EvalManageController {

    private static final Logger logger = (Logger) LoggerFactory.getLogger(EvalManageController.class);

    @Autowired
    private EvalManageService evalManageService;

    @Autowired
    private EvalService evalService;

    /**
     * 면접평가표 관리 페이지
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/inEvalManage.do")
    public String inEvalManage(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession();
        session.setAttribute("menuNm", request.getRequestURI());
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("toDate", getCurrentDateTime());
        model.addAttribute("loginVO", login);
        return "inside/recruit/inEvalManage";
    }

    /**
     * 채용 심사 평가 관리 - 리스트
     * @return
     */
    @RequestMapping("/inside/getEvalItemMainList.do")
    public String setRecruitBoardManageList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", evalManageService.getEvalItemMainList(params));
        return "jsonView";
    }

    /**
     * 채용 심사 평가 복사
     * @return
     */
    @RequestMapping("/inside/setInEvalRegCopy.do")
    public String setInEvalRegCopy(@RequestParam Map<String, Object> params, Model model){
        evalManageService.setInEvalRegCopy(params);
        return "jsonView";
    }

    /**
     * 채용심사 평가항목 삭제
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/inside/setEvalItemActiveUpd.do")
    public String setEvalItemActiveUpd(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        evalManageService.setEvalItemActiveUpd(params);
        return "jsonView";
    }

    /**
     * 채용 심사 평가 관리 (면접) - 항목 등록 페이지
     * @return
     */
    @RequestMapping("/inside/pop/inEvalRegPop.do")
    public String docEvalItemManage(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO login = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", login);
        model.addAttribute("params", params);
        return "popup/inside/recruit/inEvalRegPop";
    }

    /**
     * 채용 심사 평가 관리 - 등록한 항목 조회 (상세페이지)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/getEvalItemMain.do")
    public String getEvalItemMain(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", evalManageService.getEvalItemMain(params));
        return "jsonView";
    }

    /**
     * 채용심사평가 항목 (면접) 등록
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/inside/setEvalItemMain.do")
    public String setEvalItemMain(@RequestParam Map<String, Object> params, Model model){
        evalManageService.setEvalItemMain(params);
        return "jsonView";
    }

    /**
     * 채용심사평가관리 - 저장된 평가지 불러오기
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/recruit/manage/eval/getRecruitEvalSelSheet.do")
    public String getRecruitEvalSelSheet(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", evalManageService.getRecruitEvalSelSheet(params));
        return "jsonView";
    }

    /**
     * 채용관리 - 평가결과 데이터
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/recruit/manage/eval/getApplicationScreenViewList.do")
    public String getApplicationScreenViewList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", evalManageService.getApplicationScreenViewList(params));
        return "jsonView";
    }

    /**
     * 채용관리 - 평가결과 데이터(면접심사)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/recruit/manage/eval/getApplicationInterViewList.do")
    public String getApplicationInterViewList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", evalManageService.getApplicationInterViewList(params));
        model.addAttribute("countH", evalManageService.getApplicationCountH(params));
        return "jsonView";
    }

    /**
     * 채용 심사 평가 관리 - 평가지 미리보기 팝업 ---- 미사용
     * @return
     */
    @RequestMapping("/recruit/manage/eval/docItemManageView.do")
    public String docItemManageView(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("params", params);
        return "recruit/manage/eval/docItemManageView";
    }

    /**
     * 채용 심사 평가 관리 - 평가지 미리보기 팝업(면접) ---- 미사용
     * @return
     */
    @RequestMapping("/recruit/manage/eval/inItemManageView.do")
    public String inItemManageView(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("params", params);
        return "recruit/manage/eval/inItemManageView";
    }

    /**
     * 오늘날짜 구하기 yyyyMMddhhmmss
     * @return
     */
    public static String getCurrentDateTime() {
        Date today = new Date();
        Locale currentLocale = new Locale("KOREAN", "KOREA");
        String pattern = "yyyyMMddHHmmss";
        SimpleDateFormat formatter = new SimpleDateFormat(pattern, currentLocale);
        return formatter.format(today);
    }
}
