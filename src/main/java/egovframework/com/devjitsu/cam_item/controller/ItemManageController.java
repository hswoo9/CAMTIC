package egovframework.com.devjitsu.cam_item.controller;

import egovframework.com.devjitsu.cam_crm.service.CrmService;
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

    @Autowired
    private CrmService crmService;

    @Value("#{properties['File.Server.Dir']}")
    private String SERVER_DIR;

    @Value("#{properties['File.Base.Directory']}")
    private String BASE_DIR;

    /** 캠아이템 > 아이템관리 > 기준정보 */

    /**
     * 표준단가관리 페이지
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/standardUnitPriceMa.do")
    public String standardUnitPriceMa(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/baseInfo/standardUnitPriceMa";
    }

    /**
     * 표준단가관리 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getItemStandardUnitPriceList.do")
    public String getItemStandardUnitPriceList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", itemManageService.getItemStandardUnitPriceList(params));
        return "jsonView";
    }

    /**
     * 표준단가등록 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popStandardUnitPriceReg.do")
    public String popStandardUnitPriceReg(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("item", itemSystemService.getItemMaster(params));

        return "popup/cam_item/popStandardUnitPriceReg";
    }

    /**
     * 품목표준단가 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getSdunitPriceList.do")
    public String getSdunitPriceList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", itemManageService.getSdunitPriceList(params));
        return "jsonView";
    }

    /**
     * 표준단가 데이터 저장
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/setSdUnitPriceReg.do")
    public String setSdUnitPriceReg(@RequestParam Map<String, Object> params, Model model){
        itemManageService.setSdUnitPriceReg(params);
        return "jsonView";
    }

    /**
     * 표준단가 데이터 삭제
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/setSdUnitPriceDel.do")
    public String setSdUnitPriceDel(@RequestParam Map<String, Object> params, Model model){
        itemManageService.setSdUnitPriceDel(params);
        return "jsonView";
    }


    /** 캠아이템 > 아이템관리 > 수주관리 */



    /** 캠아이템 > 아이템관리 > 출하관리 */

    /**
     * 출하실적 등록 리스트(사용자)
     * @param request
     * @return
     */
    @RequestMapping("/item/shipmentRecordRegList.do")
    public String shipmentRecordList(HttpServletRequest request){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/shipmentMa/shipmentRecordRegList";
    }

    /**
     * 출하실적 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getShipmentRecordList.do")
    public String getShipmentRecordList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", itemManageService.getShipmentRecordList(params));
        return "jsonView";
    }

    /**
     * 출하실적등록 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popShipmentRecordReg.do")
    public String popShipmentRecordReg(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_item/popShipmentRecordReg";
    }

    /**
     * 출고단가이력팝업
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popSrUnitPriceList.do")
    public String popSrUnitPriceList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getCrmInfo(params));
        model.addAttribute("rs", itemSystemService.getItemMaster(params));
        model.addAttribute("params", params);
        return "popup/cam_item/popSrUnitPriceList";
    }


    /**
     * 출하실적등록
     * @param params
     * @return
     */
    @RequestMapping("/item/setShipmentRecord.do")
    public String setShipmentRecord(@RequestParam Map<String, Object> params){
        itemManageService.setShipmentRecord(params);
        return "jsonView";
    }

    /** 캠아이템 > 아이템관리 > BOM */

    /**
     * BOM 등록 페이지
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/bomRegList.do")
    public String bomCodeList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/bom/bomRegList";
    }

    /**
     * BOM 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getBomList.do")
    public String getBomList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", itemManageService.getBomList(params));
        return "jsonView";
    }

    /**
     * BOM 삭제
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/setBomDel.do")
    public String setBomDel(@RequestParam Map<String, Object> params, Model model){
        itemManageService.setBomDel(params);
        return "jsonView";
    }

    /**
     * BOM 부자재 삭제
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/setBomDetailDel.do")
    public String setBomDetailDel(@RequestParam Map<String, Object> params, Model model){
        itemManageService.setBomDetailDel(params);
        return "jsonView";
    }

    /**
     * BOM 등록 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popBomReg.do")
    public String popBomReg(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);

        return "popup/cam_item/popBomReg";
    }

    /**
     * BOM 조회(단일)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getBom.do")
    public String getBom(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("bom", itemManageService.getBom(params));
        model.addAttribute("bomDetail", itemManageService.getBomDetailList(params));
        return "jsonView";
    }

    /**
     * BOM 등록
     * @param params
     * @return
     */
    @RequestMapping("/item/setBom.do")
    public String setBom(@RequestParam Map<String, Object> params){
        itemManageService.setBom(params);
        return "jsonView";
    }

    /**
     * BOM 조회 페이지
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/bomList.do")
    public String bomList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/bom/bomList";
    }

    /**
     * BOM 조회 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popBomView.do")
    public String popBomView(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("rs", itemManageService.getBom(params));
        model.addAttribute("detailList", itemManageService.getBomDetailList(params));

        return "popup/cam_item/popBomView";
    }

    /**
     * BOM 부자재 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getBomDetailList.do")
    public String getBomDetailList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", itemManageService.getBomDetailList(params));
        return "jsonView";
    }

    /**
     * BOM 제작가능여부 체크 (자재 체크)
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getInvenChk.do")
    public String getInvenChk(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("rs", itemManageService.getInvenChk(params));
        return "jsonView";
    }


    /**
     * BOM 제작 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popOutputByBom.do")
    public String popBomProduction(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("rs", itemManageService.getBom(params));
        model.addAttribute("params", params);

        return "popup/cam_item/popOutputByBom";
    }

    /**
     * 생산
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/setOutput.do")
    public String setOutput(@RequestParam Map<String, Object> params, Model model){
        itemManageService.setOutput(params);
        return "jsonView";
    }


    /** 캠아이템 > 아이템관리 > 구매관리 */

    /**
     * 자재단가관리
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/materialUnitPriceMa.do")
    public String materialUnitPriceMa(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/purcMa/materialUnitPriceMa";
    }

    /**
     * 자재단가관리 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getMaterialUnitPriceList.do")
    public String getMaterialUnitPriceList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", itemManageService.getMaterialUnitPriceList(params));
        return "jsonView";
    }

    /**
     * 고객 자재단가관리 등록 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popCrmItemUnitPriceReg.do")
    public String popCrmItemUnitPriceReg(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);
        model.addAttribute("params", params);
        model.addAttribute("item", itemSystemService.getItemMaster(params));

        return "popup/cam_item/popCrmItemUnitPriceReg";
    }

    /**
     * 고객 품목단가 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getCrmItemUnitPriceList.do")
    public String getCrmItemUnitPriceList(@RequestParam Map<String, Object> params, Model model) {
        model.addAttribute("list", itemManageService.getCrmItemUnitPriceList(params));
        return "jsonView";
    }

    /**
     * 고객 품목단가 데이터 저장
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/setCrmItemUnitPriceReg.do")
    public String setCrmItemUnitPriceReg(@RequestParam Map<String, Object> params, Model model){
        itemManageService.setCrmItemUnitPriceReg(params);
        return "jsonView";
    }

    /**
     * 고객 품목단가 데이터 삭제
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/setCrmItemUnitPriceDel.do")
    public String setCrmItemUnitPriceDel(@RequestParam Map<String, Object> params, Model model){
        itemManageService.setCrmItemUnitPriceDel(params);
        return "jsonView";
    }

    /**
     * 입고리스트 페이지
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/receivingRegList.do")
    public String receivingRegList(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());

        return "cam_item/itemMa/purcMa/receivingRegList";
    }

    /**
     * 입고등록 팝업
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/receivingReg.do")
    public String regReceipt(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("LoginVO");
        model.addAttribute("loginVO", loginVO);

        return "popup/cam_item/receivingReg";
    }

    /**
     * 품번선택팝업
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popItemNoList.do")
    public String popItemNoList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("params", params);
        return "popup/cam_item/popItemNoList";
    }


    /**
     * 입고단가이력팝업
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/pop/popRvUnitPriceList.do")
    public String popRvUnitPriceList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("data", crmService.getCrmInfo(params));
        model.addAttribute("rs", itemSystemService.getItemMaster(params));
        model.addAttribute("params", params);
        return "popup/cam_item/popRvUnitPriceList";
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
     * 재고이동등록 데이터 저장
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/setInvenTransferReg.do")
    public String setInvenTransferReg(@RequestParam Map<String, Object> params, Model model){
        itemManageService.setInvenTransferReg(params);
        return "jsonView";
    }

    /**
     * 재고이동현황
     * @param params
     * @param request
     * @param model
     * @return
     */
    @RequestMapping("/item/invenTransferHistory.do")
    public String invenTransferHistory(@RequestParam Map<String, Object> params, HttpServletRequest request, Model model){
        HttpSession session = request.getSession();
        LoginVO loginVO = (LoginVO) session.getAttribute("loginVO");
        session.setAttribute("menuNm", request.getRequestURI());
        model.addAttribute("loginVO", loginVO);

        return "cam_item/itemMa/invenMa/invenTransferHistory";
    }

    /**
     * 재고이동현황 리스트
     * @param params
     * @param model
     * @return
     */
    @RequestMapping("/item/getInvenTransferHistoryList.do")
    public String getInvenTransferHistoryList(@RequestParam Map<String, Object> params, Model model){
        model.addAttribute("list", itemManageService.getInvenTransferHistoryList(params));
        return "jsonView";
    }

    /** 캠아이템 > 아이템관리 > 마감관리 */


}
