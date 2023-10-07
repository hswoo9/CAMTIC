package egovframework.com.devjitsu.cam_item.controller;

import egovframework.com.devjitsu.cam_item.service.ItemManageService;
import egovframework.com.devjitsu.cam_item.service.ItemSystemService;
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
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
public class ItemManageController {

    @Autowired
    private ItemManageService itemManageService;

    @Autowired
    private ItemSystemService itemSystemService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    /** 캠아이템 > 아이템관리 > 기준정보 */



    /** 캠아이템 > 아이템관리 > 수주관리 */



    /** 캠아이템 > 아이템관리 > 출하관리 */



    /** 캠아이템 > 아이템관리 > BOM */



    /** 캠아이템 > 아이템관리 > 구매관리 */


    /**
     * 입고등록
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/receivingReg.do")
    public String regReceipt(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/purcMa/receivingReg";
    }

    /**
     * 입고등록 양식 다운로드
     * @param request
     * @return
     */
    @RequestMapping("/item/receivingExcelFormDown.do")
    public void receivingExcelFormDown(HttpServletRequest request, HttpServletResponse response) throws IOException {
        itemManageService.receivingExcelFormDown(request, response);
    }

    /**
     * 입고등록 엑셀 업로드
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/receivingExcelUpload.do")
    public String receivingExcelUpload(@RequestParam Map<String, Object> params, MultipartHttpServletRequest request, Model model) throws Exception{
        model.addAttribute("list", itemManageService.receivingExcelUpload(params, request));
        return "jsonView";
    }

    /**
     * 입고등록 데이터 저장
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/setReceivingReg.do")
    public String setReceivingReg(@RequestParam Map<String, Object> params, Model model){
        itemManageService.setReceivingReg(params);
        return "jsonView";
    }

    /**
     * 구매검수
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/purcInspection.do")
    public String purcInspection(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);

        return "cam_item/itemMa/purcMa/purcInspection";
    }

    /**
     * 입고데이터 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getItemWhInfoList.do")
    public String getItemWhInfoList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", itemManageService.getItemWhInfoList(params));
        return "jsonView";
    }

    /**
     * 검수완료처리
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/setInspectionUpd.do")
    public String setInspectionUpd(@RequestParam Map<String, Object> params, Model model){
        itemManageService.setInspectionUpd(params);
        return "jsonView";
    }

    /**
     * 입고현황
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/receivingStatus.do")
    public String receivingStatus(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);

        return "cam_item/itemMa/purcMa/receivingStatus";
    }


    /** 캠아이템 > 아이템관리 > 재고관리 */

    /**
     * 재고현황
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/invenStatus.do")
    public String invenStatus(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);

        return "cam_item/itemMa/invenMa/invenStatus";
    }

    /**
     * 재고현황 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getItemInvenList.do")
    public String getItemInvenList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", itemManageService.getItemInvenList(params));
        return "jsonView";
    }

    /**
     * 재고 조회(단일)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getItemInven.do")
    public String getItemInvenData(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", itemManageService.getItemInven(params));
        return "jsonView";
    }

    /**
     * 재고이동등록
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/invenTransferReg.do")
    public String invenTransferReg(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);

        return "cam_item/itemMa/invenMa/invenTransferReg";
    }

    /**
     * 재고선택팝업
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popItemInvenList.do")
    public String popCrmList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("params", params);
        return "popup/cam_item/popItemInvenList";
    }

    /** 캠아이템 > 아이템관리 > 마감관리 */


}
